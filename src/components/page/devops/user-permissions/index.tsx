import { useCallback, useEffect, useMemo, useState } from "react";
import { AdminPermissions_adminPermissions_result } from "../../../../queries/AdminPermissions";
import { ReloadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tooltip, Button, Space, Modal, Card, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import { Tag } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import PermissionForm from "./from";
import { fetchPermissionsRequest, removePermissionRequest, selectLoading, selectPermissions } from "modules";
import { useDispatch, useSelector } from "react-redux";

export default function UserPermissions() {
    const { t: translate } = useTranslation();
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState<AdminPermissions_adminPermissions_result | undefined>(undefined);

    // Wrap t function in useCallback
    const t = useCallback((id: string) => translate(`setter.layouts.devops.userPermissions.${id}`), [translate]);

    const dispatch = useDispatch();
    const permissions = useSelector(selectPermissions);
    const loading = useSelector(selectLoading);

    // Wrap handleModal in useCallback
    const handleModal = useCallback((isOpen: boolean, data?: AdminPermissions_adminPermissions_result) => {
        setModalOpen(isOpen);
        setModalData(data);
    }, []);

    const closeModal = useCallback(() => {
        handleModal(false);
    }, [handleModal]);

    useEffect(() => {
        dispatch(fetchPermissionsRequest() as any);
    }, [dispatch]);

    //const LoadApi = useCallback(() => {
      //  dispatch(fetchPermissionsRequest() as any);
    //}, [dispatch]);

    const columns: ColumnsType<AdminPermissions_adminPermissions_result> = useMemo(() => [
        {
            title: t("table.role"),
            dataIndex: "role",
            key: "role",
        },
        {
            title: t("table.verb"),
            dataIndex: "verb",
            key: "verb",
            render: (verb: string) => {
                return <Tag>{verb?.toUpperCase()}</Tag>;
            },
        },
        {
            title: t("table.path"),
            dataIndex: "url",
            key: "url",
        },
        {
            title: t("table.topic"),
            dataIndex: "topic",
            key: "topic",
        },
        {
            title: t("table.action"),
            dataIndex: "action",
            key: "action",
            render: (action: string) => {
                const colorTag = action === "ACCEPT" ? "success" : action === "DROP" ? "error" : "default";
                return <Tag color={colorTag}>{action?.toUpperCase()}</Tag>;
            },
        },
        {
            title: "",
            align: "center",
            width: 100,
            dataIndex: "actions",
            key: "actions",
            className: "actions-cell",
            render: (_, row) => (
                <Space size="middle" className="actions-container">
                    <Tooltip title={t("table.edit")}>
                        <Button shape="circle" icon={<EditOutlined />} onClick={() => handleModal(true, row)} />
                    </Tooltip>
                    <Tooltip title={t("table.delete")}>
                        <Popconfirm
                            placement="topRight"
                            title={t("delete.title")}
                            okText={t("delete.confirm")}
                            cancelText={t("delete.cancel")}
                            onConfirm={ () => dispatch(removePermissionRequest(row._id) as any) }
                        >
                            <Button  danger shape="circle" icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </Tooltip>
                </Space>
            ),
        },
        // eslint-disable-next-line
    ], [t, handleModal, permissions]);

    return (
        <>
            <Card
                title={translate("setter.layouts.devops.nav.userPermissions")}
                extra={[
                    <Space key="extra">
                        <Button loading={loading} icon={<ReloadOutlined onClick={ () => console.log('reload') } />}>
                            {t("table.reload")}
                        </Button>
                        <Button type="primary" onClick={() => setModalOpen(true)}>
                            + {t("table.new")}
                        </Button>
                    </Space>
                ]}
            />
            <Table
                dataSource={permissions as any}
                rowKey="id"
                columns={columns}
                loading={loading}
            />
            <Modal
                title={t("form.title")}
                open={isModalOpen}
                onCancel={closeModal}
                footer={null}
                destroyOnClose={true}
            >
                <PermissionForm initialData={modalData} onCompleted={closeModal} />
            </Modal>
        </>
    );
}
