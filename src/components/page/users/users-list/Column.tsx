import { Avatar, Button, Input, Space } from "antd";
import { EllipsisOutlined, FilterOutlined } from "@ant-design/icons";
import React from "react";
import UserStatus from '../../UserStatus';

import { UID, UserRole, UserState } from '../../../../constants/user';
import { Routes } from "constants/routes";
import { countryISO } from "helpers";

interface ColumnsProps {
  t: Function;
  formatDate: {
    formatDate: (date: any, formatStr?: string) => string | null;
  };
  history: any;
  lang: string;
}

const roleFilters = Object.values(UserRole).map((el) => {
  return { text: String(el), value: String(el) };
});

const stateFilters = Object.values(UserState).map((el) => {
  return { text: String(el), value: String(el) };
});



export const columns: any = (props: ColumnsProps) => {

  const levelFilters = [0, 1, 2, 3].map((el) => {
    return { text: `${props.t("setter.layouts.users.table.level")} ${String(el)}`, value: String(el) };
  });
  const openUserDetails = (uid: UID) => {



    props.history.push(Routes.withParams.UsersDetails({ uid }));
  };
  return [
    {
      title: "#",
      dataIndex: 'avater',
      key: 'avater',
      width: 60,
      align: "center",
      render: (avater: string , objet : any ) => {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        return <Avatar className="rounded-full" style={{ backgroundColor: avater ? undefined : randomColor }} src={avater || undefined}  >{avater ? '' :  objet.uid.slice(3,5).toLocaleUpperCase() } </Avatar>
      }

    },
    {
      title: props.t("setter.layouts.users.table.userId"),
      dataIndex: 'uid',
      key: 'uid',
      width: 150,
      align: "center",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: { setSelectedKeys: React.Dispatch<React.SetStateAction<string[]>>, selectedKeys: string[], confirm: () => void, clearFilters: () => void }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Enter full UID"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={confirm}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button size="small" icon={<FilterOutlined />} onClick={confirm} style={{ width: 90 }}>
              Search
            </Button>
            <Button size="small" onClick={() => {
              setSelectedKeys([]);
              confirm();
            }} style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: any) => <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value: any, record: any) => record.uid.includes(value),
    },
    {
      title: props.t("setter.layouts.users.table.role"),
      dataIndex: 'role',
      key: 'role',
      align: "center",
      width: 150,
      filters: roleFilters,
      onFilter: (value: any, record: any) => record.role.includes(value),
    },
    {
      title: props.t("setter.layouts.users.table.level"),
      dataIndex: 'level',
      align: "center",
      width: 150,
      filters: levelFilters,
      onFilter: (value: string, record: any) => record.level.toString() === value,
    }, {
      title: props.t('setter.layouts.users.table.email'),
      dataIndex: 'email',
      key: 'email',
      align: "center",
      width: 150,
    },
    {
      title: props.t('setter.layouts.users.table.name'),
      dataIndex: 'name',
      key: 'name',
      align: "center",
      width: 250,
      render: (_: any, table: any) => `${table.profile[0]?.first_name || ''} ${table.profile[0]?.last_name || ''} `

    },
    {
      title: props.t('setter.layouts.users.table.referralUid'),
      dataIndex: 'referral_uid',
      key: 'referral_uid',
      align: "center",
      width: 150,
    },
    {
      title: props.t('setter.layouts.users.table.country'),
      dataIndex: 'country',
      key: 'country',
      align: "center",
      width: 150,
      filters: countryISO.getCountryOptionsFilter(props.lang),
      onFilter: (value: string, record: any) => {
        const { country } = JSON.parse(record.data)
        return countryISO.getName(country, props.lang || 'bn') === value
      },
      render: (_: any, table: any) => {
        const { country } = JSON.parse(table.data)
        return countryISO.getName(country, props.lang || 'bn')
      }
    }, {
      title: props.t('setter.layouts.users.table.created'),
      dataIndex: 'created_at',
      key: 'created_at',
      align: "center",
      width: 150,
      render: (_: null, row: any) => props.formatDate.formatDate(row.created_at)
    },
    {
      title: props.t("setter.layouts.users.table.state"),
      dataIndex: "status",
      align: "center",
      width: 150,
      filters: stateFilters,
      onFilter: (value: any, record: any) => record.status.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
      render: (Status: any) => (
        <UserStatus Status={Status} />
      ),
    },
    {
      title: "",
      dataIndex: "uid",
      width: 75,
      align: "center",
      render: (_: null, row: any) => (
        <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => openUserDetails(row.uid)} />
      ),
    },
  ]
}



