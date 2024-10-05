import { useState } from "react";
import { AdminRestrictions_adminRestrictions_result } from "../../../../queries/AdminRestrictions";
import { ReloadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tooltip, Button, Space, Modal, Card, Popconfirm, Table, Tag } from "antd";
import { useTranslation } from "react-i18next";
import RestrictionForm from "./from";
import { ColumnsType } from "antd/es/table";


const categoryColors: Record<string, string> = {
    whitelist: 'green',
    blacklist: 'red',
};

const stateColors: Record<string, string> = {
    active: 'blue',
    disabled: 'gray',
};

const scopeColors: Record<string, string> = {
    country: 'purple',
    region: 'orange',
    ip: 'cyan',
    ip_subnet: 'magenta',
    continent: 'geekblue',
    all: 'volcano',
};


export default function Restrictions() {
    const { t: translate } = useTranslation();
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState<AdminRestrictions_adminRestrictions_result | undefined>(undefined);

    const t = (id: string) => translate(`setter.layouts.devops.restrictions.${id}`);


    const handleModal = (isOpen: boolean, data?: AdminRestrictions_adminRestrictions_result) => {
        setModalOpen(isOpen);
        setModalData(data);
    };

    // Default mock data
    const data: AdminRestrictions_adminRestrictions_result[] = [
        { id: 1, category: 'whitelist', scope: 'country', value: 'block', state: 'disabled', code: 402, created_at: new Date(), updated_at: new Date() },
        { id: 2, category: 'blacklist', scope: 'region', value: 'allow', state: 'active', code: 301, created_at: new Date(), updated_at: new Date() },
        { id: 3, category: 'whitelist', scope: 'ip', value: 'block', state: 'active', code: 403, created_at: new Date(), updated_at: new Date() },
        { id: 4, category: 'blacklist', scope: 'ip_subnet', value: 'allow', state: 'disabled', code: 302, created_at: new Date(), updated_at: new Date() },
        { id: 5, category: 'whitelist', scope: 'continent', value: 'block', state: 'active', code: 404, created_at: new Date(), updated_at: new Date() },
        { id: 6, category: 'blacklist', scope: 'country', value: 'allow', state: 'disabled', code: 303, created_at: new Date(), updated_at: new Date() },
        { id: 7, category: 'whitelist', scope: 'region', value: 'block', state: 'active', code: 405, created_at: new Date(), updated_at: new Date() },
        { id: 8, category: 'blacklist', scope: 'ip', value: 'allow', state: 'disabled', code: 304, created_at: new Date(), updated_at: new Date() },
        { id: 9, category: 'whitelist', scope: 'ip_subnet', value: 'block', state: 'active', code: 406, created_at: new Date(), updated_at: new Date() },
        { id: 10, category: 'blacklist', scope: 'all', value: 'allow', state: 'disabled', code: 305, created_at: new Date(), updated_at: new Date() },
    ]

    const columns: ColumnsType<AdminRestrictions_adminRestrictions_result> = [
        {
            title: t("table.category"),
            dataIndex: "category",
            key: "category",
            render: (category: string) => <Tag color={categoryColors[category] || 'default'}>{category.toUpperCase()}</Tag>,
        },
        {
            title: t("table.scope"),
            dataIndex: "scope",
            key: "scope",
            render: (scope: string) => <Tag color={scopeColors[scope] || 'default'}>{scope.toUpperCase()}</Tag>,
        },
        {
            title: t("table.value"),
            dataIndex: "value",
            key: "value",
        },
        {
            title: t("table.state"),
            dataIndex: "state",
            key: "state",
            align: "center",
            render: (state: string) => <Tag color={stateColors[state] || 'default'}>{state.toUpperCase()}</Tag>,
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
                            title={t("delete.title")}
                            placement="topRight"
                            okText={t("delete.confirm")}
                            cancelText={t("delete.cancel")}
                            onConfirm={() => handleDelete(row.id)} // Add delete handler
                        >
                            <Button danger shape="circle" icon={<DeleteOutlined />} />
                        </Popconfirm>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const handleDelete = (id: number) => {
        // Implement your delete logic here
        console.log(`Deleted item with id: ${id}`);
    };

    return (
        <>
            <Card
                title={translate("setter.layouts.devops.nav.restrictions")}
                extra={[
                    <Space key="actions">
                        <Button icon={<ReloadOutlined />} onClick={() => console.log("Reload action")}>
                            {t("table.reload")}
                        </Button>
                        <Button type="primary" onClick={() => setModalOpen(true)}>
                            + {t("table.new")}
                        </Button>
                    </Space>
                ]}
            />
            <Table
                dataSource={data}
                rowKey="id"
                columns={columns}

            />
            <Modal
                title={t("form.title")}
                open={isModalOpen}
                onCancel={() => handleModal(false)}
                footer={null}
                destroyOnClose
            >
                <RestrictionForm initialData={modalData} />
            </Modal>
        </>
    );
}
