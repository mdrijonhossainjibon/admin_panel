import React, { useMemo, useCallback } from "react";
import { Button, Card, Space, Table, Image, Input } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useTranslation } from "react-i18next";
import { EllipsisOutlined, FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Routes } from "constants/routes";

interface Currency {
  code: string;
  imgUrl: string;
}

interface UserDetailsBalancesProps {}

interface RowData {
  currency: Currency;
  balance: number;
  locked: number;
}

const UserDetailsBalances: React.FC<UserDetailsBalancesProps> = () => {
  const { t: translate } = useTranslation();
  const history = useHistory();
  //const [searchText, setSearchText] = useState<string>('');
  
  // Wrap 't' in a useCallback to prevent it from changing on every render
  const t = useCallback((id: string) => translate(`setter.layouts.users.details.balances.${id}`), [translate]);

  // Wrap the initialization of 'defaultDataSource' in its own useMemo hook
  const defaultDataSource: RowData[] = useMemo(() => [
    { currency: { code: "BNB", imgUrl: "https://bscscan.com/assets/bsc/images/svg/logos/token-light.svg?v=24.7.4.1" }, balance: 100, locked: 20 },
    { currency: { code: "USDT", imgUrl: "https://bscscan.com/token/images/wormholeusdtet_32.png" }, balance: 150, locked: 30 },
    { currency: { code: "BTC", imgUrl: "https://bscscan.com/token/images/dforcebtc_32.png?v=312" }, balance: 200, locked: 40 },
    { currency: { code: "SOL", imgUrl: "https://bscscan.com/token/images/solana_32.png" }, balance: 250, locked: 50 },
    { currency: { code: "TUSD", imgUrl: "https://bscscan.com/token/images/trueusd_32.png" }, balance: 300, locked: 60 },
    { currency: { code: "TRX", imgUrl: "https://bscscan.com/token/images/tronnetwork_32.png" }, balance: 350, locked: 70 },
    { currency: { code: "STRX", imgUrl: "https://bscscan.com/token/images/strikex_32.png" }, balance: 400, locked: 80 },
    { currency: { code: "BNB", imgUrl: "https://bscscan.com/assets/bsc/images/svg/logos/token-light.svg?v=24.7.4.1" }, balance: 100, locked: 20 },
    { currency: { code: "USDT", imgUrl: "https://bscscan.com/token/images/wormholeusdtet_32.png" }, balance: 150, locked: 30 },
    { currency: { code: "MATIC", imgUrl: "https://assets.coingecko.com/coins/images/4713/standard/polygon.png?1698233745" }, balance: 200, locked: 40 },
    { currency: { code: "SOL", imgUrl: "https://assets.coingecko.com/coins/images/4128/standard/solana.png?1718769756" }, balance: 250, locked: 50 },
    { currency: { code: "TUSD", imgUrl: "https://bscscan.com/token/images/trueusd_32.png" }, balance: 300, locked: 60 },
    { currency: { code: "DOGS", imgUrl: "https://assets.coingecko.com/coins/images/39699/standard/dogs_logo_200x200.png?1723687163" }, balance: 350, locked: 70 },
    { currency: { code: "TON", imgUrl: "https://assets.coingecko.com/coins/images/17980/standard/img-ton.jpg?1724681212" }, balance: 400, locked: 80 },
  ], []);

  const openCurrenciesDetails = useCallback((code: string) => {
    history.push(Routes.withParams.CurrenciesDetails({ code }));
  }, [history]);

  const handleSearch = (selectedKeys: string[], confirm: () => void) => {
    confirm();
    //setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    //setSearchText('');
  };

  const columns: ColumnsType<RowData> = useMemo(
    () => [
      {
        title: t("currency"),
        dataIndex: ["currency", "code"],
        key: "currencyCode",
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={`Search ${t("currency")}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
              style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys as string[], confirm)}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
              </Button>
              <Button onClick={() => handleReset(clearFilters as () => void)} size="small" style={{ width: 90 }}>
                Reset
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered: boolean) => <FilterOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
        onFilter: (value, record) => record.currency.code.toString().toLowerCase().includes(value.toString().toLowerCase()),
        render: (_, row: RowData) => (
          <Space>
            <Image src={row.currency.imgUrl} width={24} />
            {row.currency.code}
          </Space>
        ),
      },
      {
        title: t("available"),
        dataIndex: "balance",
        key: "balance",
        render: (_, row: RowData) => row?.balance.toPrecision(8),
      },
      {
        title: t("locked"),
        dataIndex: "locked",
        key: "locked",
        render: (_, row: RowData) => row?.locked.toPrecision(8),
      },
      {
        title: t("total"),
        dataIndex: "total",
        key: "total",
        render: (_, row: RowData) => (row.balance + row.locked).toPrecision(8),
      },
      {
        title: "",
        dataIndex: "actions",
        width: 75,
        align: "center",
        render: (_: null, row: RowData) => (
          <Button
            icon={<EllipsisOutlined />}
            shape="round"
            onClick={() => openCurrenciesDetails(row.currency.code)}
          />
        ),
      },
    ],
    [t, openCurrenciesDetails]
  );

  const dataSource = useMemo(() => defaultDataSource, [defaultDataSource]);

  return (
    <Card
      
    >
      <Table 
        dataSource={dataSource} 
        columns={columns} 
        rowKey={(record) => record.currency.code} 
        pagination={{ position: ['bottomRight'] }} 
      />
    </Card>
  );
};

export default UserDetailsBalances;
