import { useState } from "react";

import { EllipsisOutlined, ReloadOutlined } from "@ant-design/icons";
import { AdminMarketsList_adminMarkets, } from "queries/AdminMarketsList";

import { Table, Switch, Button, Modal, Card, Space } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useTranslation } from "react-i18next";

import { Routes } from "../../../../constants/routes";

import { useDate } from "utils/hooks";
import qs from "querystring";
import { useHistory } from "react-router-dom";

export default function Markets() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { formatDate } = useDate();

  const { t: translate } = useTranslation();
  const history = useHistory();


  const goToMarketDetails = (id: string) => {
    history.push(Routes.withParams.MarketsDetails({ id }));
  };

  const t = (id: string) => translate(`setter.layouts.configurations.markets.${id}`);



  const mockData: any[] = [
    {
      id: "1",
      name: "BTC/USDT",
      base_currency: { name: "BTC" },
      quote_currency: { name: "USDT" },
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-08-01T00:00:00Z",
      max_price: 50000,
      min_price: 30000,
      min_amount: 0.001,
      enabled: true,
      start_time: "2024-08-21T09:00:00Z",
      end_time: "2024-08-21T17:00:00Z",
    },
    {
      id: "2",
      name: "LTC/USD",
      base_currency: { name: "LTC" },
      quote_currency: { name: "USD" },
      created_at: "2024-02-01T00:00:00Z",
      updated_at: "2024-08-01T00:00:00Z",
      max_price: 300,
      min_price: 50,
      min_amount: 0.01,
      enabled: true,
      start_time: "2024-08-21T09:00:00Z",
      end_time: "2024-08-21T17:00:00Z",
    },
    {
      id: "3",
      name: "USDT/BTC",
      base_currency: { name: "USDT" },
      quote_currency: { name: "BTC" },
      created_at: "2024-03-01T00:00:00Z",
      updated_at: "2024-08-01T00:00:00Z",
      max_price: 0.00003,
      min_price: 0.00001,
      min_amount: 1,
      enabled: false,
      start_time: "2024-08-21T09:00:00Z",
      end_time: "2024-08-21T17:00:00Z",
    },
  ];

  const columns: ColumnsType<AdminMarketsList_adminMarkets> = [
    {
      title: t("table.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("table.baseCurrency"),
      dataIndex: ["base_currency", "name"],
      key: "base_currency.name",
    },
    {
      title: t("table.quoteCurrency"),
      dataIndex: ["quote_currency", "name"],
      key: "quote_currency.name",
    },
    {
      title: t("table.startTime"),
      dataIndex: "start_time",
      key: "start_time",
      render: (timeString: string) => formatDate(timeString),
    },
    {
      title: t("table.endTime"),
      dataIndex: "end_time",
      key: "end_time",
      render: (timeString: string) => formatDate(timeString),
    },
    {
      title: t("table.created"),
      dataIndex: "created_at",
      key: "created_at",
      render: (dateString: string) => formatDate(dateString),
    },
    {
      title: t("table.updated"),
      dataIndex: "updated_at",
      key: "updated_at",
      render: (dateString: string) => formatDate(dateString),
    },
    {
      title: t("table.maxPrice"),
      dataIndex: "max_price",
      key: "max_price",
    },
    {
      title: t("table.minPrice"),
      dataIndex: "min_price",
      key: "min_price",
    },
    {
      title: t("table.minAmount"),
      dataIndex: "min_amount",
      key: "min_amount",
    },
    {
      title: t("table.status.title"),
      dataIndex: "enabled",
      key: "enabled",
      render: (value: boolean, record: AdminMarketsList_adminMarkets) => (
        <Switch
          size="small"
          onClick={(_, e) => e.stopPropagation()}
          defaultChecked={value}
          onChange={(val) => {

            console.log({
              variables: {
                ...record,
                max_price: Number(record.max_price),
                min_price: Number(record.min_price),
                min_amount: Number(record.min_amount),
                enabled: val,
              },
            });
          }}
        />
      ),
    },
    {
      title: "",
      dataIndex: "details",
      width: 75,
      align: "center",
      // sorter: sortUser("state"),
      render: (_, row) => {
        return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => goToMarketDetails(row.id)} />;
      },
    },
  ];



  return (
    <>
      <Card

        className="setter-page-header"
        title={translate("setter.layouts.configurations.nav.markets")}
        extra={[
          <Space><Button icon={<ReloadOutlined />}  >
            {t("table.reload")}
          </Button>,
            <Button type="primary" onClick={() => setModalOpen(true)}>
              + {t("table.new")}
            </Button>,</Space>
        ]}
      >
        <Table
          bordered
          dataSource={mockData}
          rowKey="id"
          columns={columns}
          loading={false}
          pagination={{
            position: ["bottomLeft"],

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
          onRow={(market) => ({
            tabIndex: 0,
            onClick: () => goToMarketDetails(market.id),
            onKeyDown: (e) => e.key === "Enter" && goToMarketDetails(market.id),
          })}
        />
        <Modal
          title={t("modal.create")}
          open={isModalOpen}
          onCancel={() => setModalOpen(false)}
          footer={null}
          destroyOnClose={true}
        >
          MarketsForm
        </Modal>
      </Card>
    </>
  );
}
