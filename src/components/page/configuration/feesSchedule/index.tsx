import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Space, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import { AdminTradingFees_adminTradingFees } from "queries/AdminTradingFees";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import qs from "querystring";
import FeesScheduleForm from "./FeesScheduleForm";

export default function FeesSchedule() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState<AdminTradingFees_adminTradingFees | undefined>(undefined);
    const { t: translate } = useTranslation()
    const t = (id: string) => translate(`setter.layouts.configurations.feesSchedule.${id}`);

    const history = useHistory();


    const handleModal = (isOpen: boolean, data?: AdminTradingFees_adminTradingFees) => {
        setModalOpen(isOpen);
        setModalData(data);
    };

    const handleDelete = (fee: AdminTradingFees_adminTradingFees) => {
        Modal.confirm({
            maskClosable: true,
            title: t("delete.title"),
            icon: <ExclamationCircleOutlined />,
            okText: t("delete.confirm"),
            cancelText: t("delete.cancel"),
            onOk: () => {
                console.log("confirm delete", fee.id);
            },
        });
    };

    const mockData: AdminTradingFees_adminTradingFees[] = [
        {
            id: "1",
            group: "Group A",
            market_id: "BTC/USD",
            maker: "0.1%",
            taker: "0.2%",
        },
        {
            id: "2",
            group: "Group B",
            market_id: "ETH/USD",
            maker: "0.15%",
            taker: "0.25%",
        },
        // Add more mock data as needed
    ];

    const columns: ColumnsType<AdminTradingFees_adminTradingFees> = [
        { title: t("table.id"), dataIndex: "id", key: "id" },
        { title: t("table.group"), dataIndex: "group", key: "group" },
        { title: t("table.market"), dataIndex: "market_id", key: "market_id" },
        { title: t("table.maker"), dataIndex: "maker", key: "maker" },
        { title: t("table.taker"), dataIndex: "taker", key: "taker" },
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
                        <Button shape="circle" icon={<DeleteOutlined />} onClick={() => handleDelete(row)} />
                    </Tooltip>
                </Space>
            ),
        },
    ];




    return (
        <>
            <Card

                className="setter-page-header"
                title={translate("setter.layouts.configurations.nav.feesSchedule")}
                extra={[
                    <Space> <Button icon={<ReloadOutlined />}  >
                        {t("table.reload")}
                    </Button>,
                        <Button type="primary" onClick={() => setModalOpen(true)}>
                            + {t("table.new")}
                        </Button>,</Space>
                ]}
            >
                <Table
                    bordered
                    className="fees-schedule-table"
                    columns={columns}
                    loading={false}
                    dataSource={mockData}
                    rowKey="id"
                    pagination={{
                        position: ['bottomRight'],

                        showQuickJumper: true,
                        showSizeChanger: true,
                    }}
                    onChange={(p) => {
                        const params: any = {
                            page: p.current,
                            limit: p.pageSize,
                        };
                        const queryString = qs.stringify(params);
                        history.push({ search: queryString });
                    }}
                />
                <Modal
                    title={modalData ? t("form.edit") : t("form.create")}
                    open={isModalOpen}
                    onCancel={() => handleModal(false)}
                    footer={null}
                    destroyOnClose={true}
                >
                    <FeesScheduleForm initialData= {modalData} onCompleted={ ()=> handleModal(false )} />
                </Modal>
            </Card>
        </>
    );


}