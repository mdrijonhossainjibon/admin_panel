import React, { useRef, useState } from "react";
import { EllipsisOutlined, FolderOpenOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card, Input, Space, Table, DatePicker } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useDate } from "utils";
import type { ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { AdminPending_adminPending_result } from "queries/AdminPending";
import { countryISO } from "helpers";
import { Routes } from "constants/routes";
import KYCDetails from "./KYCDetails";
import moment from "moment";
import { useSelector } from "react-redux";
import { SelectoUser } from "modules";
import qs from "querystring";

type DataIndex = keyof AdminPending_adminPending_result;

// Utility function to parse table data
const parseTableData = (users: any[] | undefined, lang: string) =>
  users?.map((user) => {
    const { profile, documents, ...restUser } = user;
    const profiles = profile && profile[profile.length - 1];



    return {
      ...restUser,
      profiles,
      documents,
      numDocs: documents.length,
      country: profiles?.country ? countryISO.getName(profiles.country, lang) : "",
    };
  }) || [];




// Main component
const Application: React.FC<any> = () => {
  const history = useHistory();
  const { formatDate, isBetweenDays } = useDate();
  const { i18n, t } = useTranslation();

  const lang = i18n.language.split("-")[0];

  const [dateRange, setDateRange] = useState<[moment.Moment | null, moment.Moment | null] | null>(null);
  const searchInput = useRef<any>(null);

  const handleSearch = (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: DataIndex) => {
    confirm();
  };

  const queryData = history.location.search ? qs.parse(history.location.search.replace("?", "")) : {};
  const query = {
    ...queryData,
    limit: queryData.limit ? Number(queryData.limit) : 10,
    page: queryData.page ? Number(queryData.page) : 1,
    level: queryData.level ? Number(queryData.level) : undefined,
  };


  const [filter, setFilter] = useState(query);


  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };






  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<AdminPending_adminPending_result> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0] as string}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase())
        : false,
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const getColumnDateProps = (dataIndex: DataIndex): ColumnType<AdminPending_adminPending_result> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <DatePicker.RangePicker
          onChange={dates => {
            const startDate = dates?.[0] ? dates[0].format("YYYY-MM-DD") : null;
            const endDate = dates?.[1] ? dates[1].format("YYYY-MM-DD") : null;
            setDateRange(dates as any);
            setSelectedKeys(startDate && endDate ? [startDate, endDate] : []);
            confirm();
          }}
          style={{ marginBottom: 8, display: 'block' }} className="w-94"
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            size="small"
            style={{ width: 90 }}
          >
            Filter
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) => {
      if (!dateRange || dateRange[0] === null || dateRange[1] === null) return true;
      return isBetweenDays(record[dataIndex] as any, dateRange[0] as any, dateRange[1] as any);
    }
  });

  const handleReject = (row: AdminPending_adminPending_result) => {
    console.log({
      variables: {
        uid: row.uid,
        key: "document",
        scope: "private",
      },
    });
  };

  const handleVerify = (row: AdminPending_adminPending_result) => {
    console.log({
      variables: {
        uid: row.uid,
        key: "document",
        scope: "private",
        value: "verified",
      },
    });
  };

  const openUserDetails = (uid: string) => {
    history.push(Routes.withParams.UsersDetails({ uid }));
  };

  const columns: ColumnType<AdminPending_adminPending_result>[] = [
    {
      title: t("setter.layouts.users.table.userId"),
      dataIndex: "uid",
      key: "uid",
      width: 150,
      ...getColumnSearchProps('uid'),
    },
    {
      title: t("setter.layouts.users.table.email"),
      dataIndex: "email",
      key: "email",
      width: 250,
      ...getColumnSearchProps('email'),
    },
    {
      title: t("setter.layouts.users.table.name"),
      dataIndex: "profiles",
      key: "name",

      render: (profile: { first_name: string; last_name: string }) => `${profile?.first_name || ''} ${profile?.last_name || ''}`,

    },
    {
      title: t("setter.layouts.users.table.country"),
      dataIndex: "profiles",
      key: "country",


      render: (profile: { country?: string }) => {

        return countryISO.getName(profile?.country || 'US', lang)
      }

    },
    {
      title: t("setter.layouts.users.table.created"),
      dataIndex: "created_at",
      key: "created_at",
      width: 175,
      render: (value: string) => formatDate(value),
      ...getColumnDateProps('created_at'),
    },
    {
      title: t("setter.layouts.users.table.attachments"),
      dataIndex: "numDocs",
      key: "numDocs",
      width: 120,
      render: (value: number) => (
        <>
          {value} <FolderOpenOutlined />
        </>
      ),
    },
    {
      title: "",
      dataIndex: "details",
      key: "actions",
      align: "center",
      width: 250,
      render: (_: any, row: AdminPending_adminPending_result) => (
        <Space>
          <Button type="primary" danger onClick={() => handleReject(row)}>
            Reject
          </Button>
          &nbsp;
          <Button type="primary" onClick={() => handleVerify(row)}>
            Verify
          </Button>
        </Space>
      ),
    },
    {
      title: "",
      dataIndex: "details",
      key: "details",
      width: 75,
      align: "center",
      render: (_: any, row: AdminPending_adminPending_result) => (
        <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => openUserDetails(row.uid)} />
      ),
    },
  ];

  // Mock data for the table
  const dataSource = useSelector(SelectoUser);



  return (
    <Card
      title="Users"
      extra={
        <Space>
          <Button icon={<ReloadOutlined />}>{t("setter.layouts.configurations.blockchains.table.reload")}</Button>
        </Space>
      }
    >
      <Table
        bordered
        loading={false}
        dataSource={parseTableData(dataSource, lang) as any}
        columns={columns}
        rowKey="uid"
        tableLayout="fixed"
        expandable={{
          expandedRowRender: (record) => {
            return record && record.documents ? <KYCDetails record={record} /> : <p />;
          },
        }}
        pagination={{
          position: ['bottomRight'],
          current: filter ? filter.page : undefined,
          pageSize: filter ? filter.limit : undefined,
          showQuickJumper: true,

        }}

        onChange={(p) => {
          const params: any = {
            page: p.current,
            limit: p.pageSize,
          };
          const queryString = qs.stringify(params);
          history.push({ search: queryString });
          setFilter(params);
        }}

      />
    </Card>
  );
};

export default Application;
