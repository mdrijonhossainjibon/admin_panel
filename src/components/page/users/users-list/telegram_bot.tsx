import { EllipsisOutlined, FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Input, Space, Table } from "antd";
import { Routes } from "constants/routes";
import { UID, UserRole, UserState } from "constants/user";
import { fetchUserTgRequest, RootState } from "modules";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDate } from "utils";
import UserStatus from "../UserStatus";







export default function TelegramUsers() {
    const { t } = useTranslation();
    const history = useHistory();
    const formatDate = useDate();
    const dispatch = useDispatch();
    const { loading, users } = useSelector((state: RootState) => state.public.telegramUsers);

    const stateFilters = Object.values(UserState).map((el) => {
        return { text: String(el), value: String(el) };
    });
    const roleFilters = Object.values(UserRole).map((el) => {
        return { text: String(el), value: String(el) };
    });


    const openUserDetails = (uid: UID) => { history.push(Routes.withParams.UsersDetails({ uid })) };
    return (
        <>
            <Card title='Telegram Users' extra={
                [
                    <Space key="space">
                        <Button key="reload" loading={loading} icon={<ReloadOutlined />} onClick={() => dispatch(fetchUserTgRequest())}>
                            {t("setter.layouts.configurations.blockchains.table.reload")}
                        </Button>
                    </Space>
                ]
            }>

                <Table loading={loading} dataSource={users} columns={[


                    {
                        title: '#',
                        render(value, record, index) {
                            return `# ${index}`
                        }
                    }
                    , {
                        title: t("setter.layouts.users.table.userId"),
                        dataIndex: "uid",
                        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                            <div style={{ padding: 8 }}>
                                <Input
                                    placeholder={ t("setter.layouts.users.filter.uid") }
                                    value={selectedKeys[0] || ""}
                                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                                    onPressEnter={confirm as any}
                                    style={{ width: 188, marginBottom: 8, display: "block" }}
                                />
                                <Space>
                                    <Button
                                        size="small"
                                        icon={<FilterOutlined />}
                                        onClick={confirm as any}
                                        type="primary"
                                        style={{ width: 90 }}
                                    >
                                        Search
                                    </Button>
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            clearFilters && clearFilters();
                                            setSelectedKeys([]);
                                            confirm();
                                        }}
                                        style={{ width: 90 }}
                                    >
                                        Reset
                                    </Button>
                                </Space>
                            </div>
                        ),
                        filterIcon: (filtered: boolean) => (
                            <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
                        ),
                        onFilter: (value, record) => value === record.uid,
                    },
                    {
                        title: t("setter.layouts.users.table.tgid"),
                        dataIndex: "userid",
                        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                            <div style={{ padding: 8 }}>
                                <Input
                                      placeholder={ t("setter.layouts.users.filter.tgid") }
                                    value={selectedKeys[0] || ""}
                                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                                    onPressEnter={confirm as any}
                                    style={{ width: 188, marginBottom: 8, display: "block" }}
                                />
                                <Space>
                                    <Button
                                        size="small"
                                        icon={<FilterOutlined />}
                                        onClick={confirm as any}
                                        type="primary"
                                        style={{ width: 90 }}
                                    >
                                        Search
                                    </Button>
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            clearFilters && clearFilters();
                                            setSelectedKeys([]);
                                            confirm();
                                        }}
                                        style={{ width: 90 }}
                                    >
                                        Reset
                                    </Button>
                                </Space>
                            </div>
                        ),
                        filterIcon: (filtered: boolean) => (
                            <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
                        ),

                        onFilter: (value, record) => parseInt(value as any) === record.userid,
                    }
                    , {
                        title: t("setter.layouts.users.table.username"),
                        dataIndex: "username",
                        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                            <div style={{ padding: 8 }}>
                                <Input
                                      placeholder={ t("setter.layouts.users.filter.username") }
                                    value={selectedKeys[0] || ""}
                                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                                    onPressEnter={confirm as any}
                                    style={{ width: 188, marginBottom: 8, display: "block" }}
                                />
                                <Space>
                                    <Button
                                        size="small"
                                        icon={<FilterOutlined />}
                                        onClick={confirm as any}
                                        type="primary"
                                        style={{ width: 90 }}
                                    >
                                        Search
                                    </Button>
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            clearFilters && clearFilters();
                                            setSelectedKeys([]);
                                            confirm();
                                        }}
                                        style={{ width: 90 }}
                                    >
                                        Reset
                                    </Button>
                                </Space>
                            </div>
                        ),
                        filterIcon: (filtered: boolean) => (
                            <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
                        ),
                        onFilter: (value : any, record) => {
                            const value2 : string = value.split(`@`)[1]
                             
                            return value2?.includes(record.username)
                        },
                        render: (_: null, row: any) => `@${_}`
                    }
                    , {
                        title: t("setter.layouts.users.table.balance"),
                        dataIndex: "balance",
                        render: (_: null, row: any) => Number(_).toPrecision(6)
                    }, {
                        title: t("setter.layouts.users.table.referralUid"),
                        dataIndex: "referralUid",

                    },
                    {
                        title: t("setter.layouts.users.table.role"),
                        dataIndex: 'role',
                        key: 'role',
                        align: "center",
                        width: 150,
                        filters: roleFilters,
                        onFilter: (value: any, record: any) => record.role.includes(value),
                    }
                    , {
                        title: t("setter.layouts.users.table.state"),
                        dataIndex: 'status',
                        filters: stateFilters,
                        onFilter: (value: any, record: any) => record.status.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
                        render: (Status: any) => (
                            <UserStatus state={Status} />
                        ),
                    },
                    {
                        title: t('setter.layouts.users.table.created'),
                        dataIndex: 'created_at',
                        key: 'created_at',
                        align: "center",

                        render: (_: null, row: any) => formatDate.formatDate(row.created_at)
                    },
                    {
                        title: "",
                        dataIndex: "uid",
                        width: 75,
                        align: "center",
                        render: (_: null, row: any) => (
                            <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => openUserDetails(row.uid)} />
                        ),
                    }
                ]} />
            </Card>

        </>
    )
}