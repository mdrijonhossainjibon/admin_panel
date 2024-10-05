import React, { useState } from "react";
import {
 
  AdminAssetsVariables,
} from "../../../../queries/AdminAssets";
import { ColumnsType } from "antd/lib/table";
import { Table } from "antd";
import { useDate } from "../../../../utils/hooks";
import { useTranslation } from "react-i18next";
import qs from "querystring";
import { useHistory } from "react-router-dom";

export default function Assets() {
  const { formatDate } = useDate();
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.operations.businessAnalytics.assets.${id}`);

  const history = useHistory();

  const [filter, setFilter] = useState<AdminAssetsVariables>({});

  const changeFilter = (filter: AdminAssetsVariables) => {
    const params = { ...filter };
    const queryString = qs.stringify(params);
    history.push({ search: queryString });
    setFilter(filter);
  };

  const columns: ColumnsType<any> = [
    {
      title: t("id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("code"),
      dataIndex: "code",
      key: "code",
    },
    {
      title: t("currency"),
      dataIndex: ["currency", "code"],
      key: "currencyCode",
      render: (value: string) => value.toUpperCase(),
    },
    {
      title: t("refId"),
      key: "rid",
      dataIndex: "rid",
    },
    {
      title: t("refType"),
      key: "reference_type",
      dataIndex: "reference_type",
    },
    {
      title: t("credit"),
      key: "credit",
      dataIndex: "credit",
    },
    {
      title: t("debit"),
      key: "debit",
      dataIndex: "debit",
    },
    {
      title: t("date"),
      key: "created_at",
      dataIndex: "created_at",
      render: (value: string) => formatDate(value),
    },
  ];

  // Mock Data
  const mockData: any[] = [
    {
      id: "1",
      code: "ASSET1",
      currency: { code: "USD" },
      rid: "REF123",
      reference_type: "Deposit",
      credit: 1000,
      debit: 0,
      created_at: "2024-08-22T12:00:00Z",
    },
    {
      id: "2",
      code: "ASSET2",
      currency: { code: "EUR" },
      rid: "REF124",
      reference_type: "Withdrawal",
      credit: 0,
      debit: 500,
      created_at: "2024-08-21T15:30:00Z",
    },
    {
      id: "3",
      code: "ASSET3",
      currency: { code: "BTC" },
      rid: "REF125",
      reference_type: "Trade",
      credit: 0.5,
      debit: 0,
      created_at: "2024-08-20T09:45:00Z",
    },
    {
      id: "4",
      code: "ASSET4",
      currency: { code: "ETH" },
      rid: "REF126",
      reference_type: "Transfer",
      credit: 2,
      debit: 0,
      created_at: "2024-08-19T14:20:00Z",
    },
    {
      id: "5",
      code: "ASSET5",
      currency: { code: "USDT" },
      rid: "REF127",
      reference_type: "Deposit",
      credit: 10000,
      debit: 0,
      created_at: "2024-08-18T08:00:00Z",
    },
  ];

  return (
    <React.Fragment>
      <Table
        bordered
        dataSource={mockData} // Use mock data here
        rowKey="id"
        columns={columns}
        onChange={(p) => {
          const params: any = {
            page: p.current,
            limit: p.pageSize,
          };
          if (changeFilter) {
            changeFilter(params);
          }
        }}
        pagination={{
          position: ["bottomLeft"],
          current: filter ? filter.page : undefined,
          pageSize: filter ? filter.limit : undefined,
          showQuickJumper: true,
          showSizeChanger: true,
        }}
      />
    </React.Fragment>
  );
}
