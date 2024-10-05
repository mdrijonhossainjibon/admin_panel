import {   useState } from "react";
import { useTranslation } from "react-i18next";
import { AdminCurrenciesList_adminCurrencies } from "queries/AdminCurrenciesList";
 
import { ReloadOutlined, EllipsisOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";


import { Button, Table, Card, Modal, Space, Skeleton } from "antd";

import { Routes } from "../../../../constants/routes";
import { CurrencyType, CurrencyVisible } from "../../../../constants/currencies";
import { useDate } from "utils/hooks";
import ToggleSwitch from "../ToggleSwitch";

import qs from "querystring";
import { useHistory } from "react-router-dom";
import CurrenciesForm from "./form";
 


export default function Currencies() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();
  const history = useHistory();
  const { formatDate } = useDate();
  
  const queryData = history.location.search ? qs.parse(history.location.search.replace("?", "")) : {};

  const filter: any = {
    limit: queryData.limit ? Number(queryData.limit) : 10,
    page: queryData.page ? Number(queryData.page) : 1,
  };

  if (queryData.visible) {
    filter.visible = queryData.visible;
  }
  if (queryData.type) {
    filter.type = queryData.type;
  }


  const data : any[]=  [
    {
      code: "BTC",
      name: "Bitcoin",
      symbol: "BTC",
      type: "coin",
      created_at: "2021-01-01T00:00:00Z",
      visible: true,
      deposit_enabled: true,
      withdrawal_enabled: true,
      options: "{}",
      min_deposit_amount: "0.001",
      min_withdraw_amount: "0.001",
      deposit_fee: "0.0005",
      withdraw_fee: "0.0005",
      withdraw_limit_24h: "10",
      withdraw_limit_72h: "30",
    },
    {
      code: "ETH",
      name: "Ethereum",
      symbol: "ETH",
      type: "coin",
      created_at: "2021-01-01T00:00:00Z",
      visible: true,
      deposit_enabled: true,
      withdrawal_enabled: false,
      options: "{}",
      min_deposit_amount: "0.01",
      min_withdraw_amount: "0.01",
      deposit_fee: "0.005",
      withdraw_fee: "0.005",
      withdraw_limit_24h: "20",
      withdraw_limit_72h: "60",
    },
    // Add more mock data as needed
  ]; ///useSelector(SelectCurrencies);
  const loading = false //useSelector(SelectCurrenciesLoading)

  const typeFilters = Object.values(CurrencyType).map((el) => {
    return { text: String(el), value: String(el) };
  });

  const visibleFilters = Object.values(CurrencyVisible).map((el) => {
    return { text: String(el), value: el };
  });



  const handleToggle = (variables: AdminCurrenciesList_adminCurrencies) => {
    console.log({
      variables: {
        ...variables,
        options: JSON.stringify(variables.options),
        min_deposit_amount: Number(variables.min_deposit_amount),
        min_withdraw_amount: Number(variables.min_withdraw_amount),
        deposit_fee: Number(variables.deposit_fee),
        withdraw_fee: Number(variables.withdraw_fee),
        withdraw_limit_24h: Number(variables.withdraw_limit_24h),
        withdraw_limit_72h: Number(variables.withdraw_limit_72h),
      },
    });
  };

  const openCurrencyDetails = (code: string) => {
    history.push(Routes.withParams.CurrenciesDetails({ code }));
  };

  const columns: ColumnsType<AdminCurrenciesList_adminCurrencies> = [
    {
      title: t("setter.layouts.configurations.currencies.table.code"),
      dataIndex: "code",
      key: "code",
      render: (code: string) => code.toUpperCase(),
    },
    {
      title: t("setter.layouts.configurations.currencies.table.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("setter.layouts.configurations.currencies.table.symbol"),
      dataIndex: "symbol",
      key: "symbol",
    },
    {
      title: t("setter.layouts.configurations.currencies.table.type"),
      dataIndex: "type",
      key: "type",
      filters: typeFilters,
      filterMultiple: false,
      onFilter: (_, record) => !filter.type || String(record.type) === filter.type,
      filtered: filter && filter.type ? true : false,
      filteredValue: filter && filter.type ? [filter.type] : [],
       //render: (type: string) => {
       //return <DepositType type={type}/>;
      // },
    },
    {
      title: t("setter.layouts.configurations.currencies.table.created"),
      dataIndex: "created_at",
      key: "created_at",
      render: (dateString: string) => formatDate(dateString),
    },
    {
      title: t("setter.layouts.configurations.currencies.table.visible"),
      dataIndex: "visible",
      key: "visible",
      align: "center",
      filters: visibleFilters,
      filterMultiple: false,
      filtered: false,
      filteredValue: null,
      //onFilter: (_, record) => !filter.visible || String(record.visible) === filter.visible,
      render: (_, record: AdminCurrenciesList_adminCurrencies) => (
        <ToggleSwitch value={record} name="visible" onChange={handleToggle} error={'updateError'} />
      ),
    },
    {
      title: t("setter.layouts.configurations.currencies.table.deposit"),
      dataIndex: "deposit_enabled",
      key: "deposit_enabled",
      align: "center",
      render: (_, record: AdminCurrenciesList_adminCurrencies) => (
        <ToggleSwitch   value={record} name="deposit_enabled" onChange={handleToggle} error={'updateError'} />
      ),
    },
    {
      title: t("setter.layouts.configurations.currencies.table.withdrawal"),
      dataIndex: "withdrawal_enabled",
      key: "withdrawal_enabled",
      align: "center",
      render: (_, record: AdminCurrenciesList_adminCurrencies) => (
        <ToggleSwitch value={record} name="withdrawal_enabled" onChange={handleToggle} error={'updateError'}  loading={ true } />
      ),
    },
    {
      title: "",
      dataIndex: "details",
      width: 75,
      align: "center",
      // sorter: sortUser("state"),
      render: (_, row) => {
        return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => openCurrencyDetails(row.code)} />;
      },
    },
  ];

   


  return (
    <>
      <Card

        className="setter-page-header"
        title={t("setter.layouts.configurations.nav.currencies")}
        extra={[
          <Space>
            <Button icon={<ReloadOutlined />} loading={loading}  >
              {t("setter.layouts.configurations.currencies.table.reload")}
            </Button>
            <Button type="primary" onClick={() => setModalOpen(true)}>
              + {t("setter.layouts.configurations.currencies.table.new")}
            </Button>
          </Space>
        ]}
      >
        <Skeleton active loading={loading} />

        {loading === false ? (
          <Table
            dataSource={data as any}
            bordered
            rowKey="code"
            columns={columns}
            loading={false}
            pagination={{
              position: ["bottomLeft"],
              showQuickJumper: true,
              showSizeChanger: true,
            }}
            onChange={(p, f) => {
              console.log("onchange", p, f);
              const params: any = {
                page: p.current,
                limit: p.pageSize,
              };
              if (f.type && f.type.length > 0) {
                params.type = f.type[0];
              }
              if (f.visible && f.visible.length > 0) {
                params.visible = f.visible[0];
              }
              const queryString = qs.stringify(params);
              history.push({ search: queryString });
            }}
          />
        ) : null}
      </Card >
      <Modal
        title={t("setter.layouts.configurations.currencies.modal.title.create")}
        open={isModalOpen}
        onCancel={() => setModalOpen(false)}
        width="75%"
        footer={null}
        className="currencies-form-modal"
        destroyOnClose={true}
      >
        <CurrenciesForm initialData={ data }  /> 
      </Modal>
    </>
  );
}
