import { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { CurrencyType } from "../../../../constants/currencies";
import { useTranslation } from "react-i18next";
 
import {
   
  AdminWithdrawsVariables,
  AdminWithdraws_adminWithdraws_result,
} from "../../../../queries/AdminWithdraws";
 
import { Space, Tabs, Table, Card , Button } from "antd";
import { EllipsisOutlined, ReloadOutlined, LinkOutlined } from "@ant-design/icons";
 
import { useDate } from "../../../../utils/hooks";
import { Routes } from "../../../../constants/routes";
 
import qs from "querystring";
 
import { useHistory } from "react-router-dom";
 
export default function PendingWithdrawals() {
  const history = useHistory();
 
 
  
  const [filter, setFilter] = useState<AdminWithdrawsVariables | undefined>({});

 

  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.operations.withdrawals.table.${id}`);

  const { formatDate } = useDate();
 

  const panes = [
    { tab: t("panes.coin"), key: CurrencyType.Coin },
    { tab: t("panes.fiat"), key: CurrencyType.Fiat },
  ];

  const openWithdrawalDetails = (id: string) => {
    history.push(Routes.withParams.WithdrawalDetails({ id }));
  };

  const columns: ColumnsType<AdminWithdraws_adminWithdraws_result> = [
    {
      title: t("id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("txid.title"),
      dataIndex: "blockchain_txid",
      key: "txid",
      // width: 250,
      render: (txid: string, row) => {
        const href = row.currency?.explorer_transaction?.replace("#{txid}", txid);

        function truncate(input: string) {
          const l = 26;
          if (input.length > l) {
            return input.substring(0, l - 2) + "...";
          }
          return input;
        }
        return txid ? (
          <>
            <Button icon={<LinkOutlined />} type="link" target="_blank" href={href}>
              {truncate(txid)}
            </Button>
          </>
        ) : null;
      },
    },
    {
      title: t("created_at"),
      dataIndex: "created_at",
      key: "created_at",
      render: (dateString: string) => formatDate(dateString),
    },
    {
      title: t("currency"),
      dataIndex: ["currency", "code"],
      key: "currency",
       
      filterMultiple: false,
      filtered: filter && filter.currency ? true : false,
      filteredValue: filter && filter.currency ? [filter.currency] : [],
      render: (code: string) => code.toUpperCase(),
    },
    {
      title: t("amount"),
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
      key: "amount",
    },
    {
      title: t("rid"),
      dataIndex: "rid",
      key: "rid",
      // width: 250,
      align: "center",
      render: (rid: string, row) => {
        const href = row.currency?.explorer_address?.replace("#{address}", rid);
        console.log(row.currency?.explorer_address, "row.currency row.currency row.currency");

        function truncate(input: string) {
          const l = 26;
          if (input.length > l) {
            return input.substring(0, l - 2) + "...";
          }
          return input;
        }
        return rid ? (
          <>
            <Button icon={<LinkOutlined />} type="link" target="_blank" href={href}>
              {truncate(rid)}
            </Button>
          </>
        ) : null;
      },
    },
    {
      title: t("state.title"),
      dataIndex: "state",
      key: "state",
      align: "center",
      //render: (_, row) => <WithdrawalStatus withdrawal={row} />,
    },
    {
      title: "",
      dataIndex: "details",
      align: "center",
      // width: 75,
      render: (_, row) => {
        return <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => openWithdrawalDetails(row.id as any)} />;
      },
    },
  ];

  const changeFilter = (filter: AdminWithdrawsVariables | undefined) => {
    const params = { ...filter };
    const queryString = qs.stringify(params);
    history .push({ search: queryString });
    setFilter(filter);
  };

  const changeCurrencyType = (type: string) => {
    const params = { ...filter, type };
    const queryString = qs.stringify(params);
    history .push({ search: queryString });
    setFilter(params);
  };

  return (
    <>
      <Card 
        className="setter-page-header"
        
        title={translate("setter.layouts.operations.nav.pendingWithdrawals")}
        extra={[
          <Space>
            <Button icon={<ReloadOutlined />} >
              {t("reload")}
            </Button>
          </Space>,
        ]}
      >
        <Tabs defaultActiveKey={filter?.type} onChange={changeCurrencyType}>
          {panes.map((pane) => (
            <Tabs.TabPane {...pane} />
          ))}
        </Tabs>

        <Table
          tableLayout={"auto"}
          bordered
           
          dataSource={ [
            {
              "id": 201,
              "currency": {
                "code": "BTC",
                "type": "crypto",
                "explorer_transaction": "https://blockchain.info/tx/",
                "explorer_address": "https://blockchain.info/address/"
              },
              "type": "withdraw",
              "sum": 0.5,
              "fee": 0.0005,
              "blockchain_txid": "abc123txid",
              "rid": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
              "state": "Completed",
              "confirmations": 6,
              "note": "Withdrawal processed successfully",
              "created_at": "2024-08-22T10:00:00Z",
              "updated_at": "2024-08-22T11:00:00Z",
              "completed_at": "2024-08-22T12:00:00Z",
              "member": {
                "user": {
                  "uid": "user001",
                  "email": "user001@example.com",
                  "profiles": [
                    {
                      "first_name": "John",
                      "last_name": "Doe"
                    }
                  ]
                }
              },
              "beneficiary": {
                "id": 301,
                "name": "John's BTC Wallet",
                "state": "Active"
              },
              "account": "BTC-ACC001",
              "block_number": 680000,
              "amount": 0.4995,
              "tid": "txn001"
            },
            {
              "id": 202,
              "currency": {
                "code": "ETH",
                "type": "crypto",
                "explorer_transaction": "https://etherscan.io/tx/",
                "explorer_address": "https://etherscan.io/address/"
              },
              "type": "withdraw",
              "sum": 10,
              "fee": 0.01,
              "blockchain_txid": "def456txid",
              "rid": "0x32Be343B94f860124dC4fEe278FDCBD38C102D88",
              "state": "Pending",
              "confirmations": 0,
              "note": "Waiting for blockchain confirmation",
              "created_at": "2024-08-21T09:00:00Z",
              "updated_at": "2024-08-21T09:30:00Z",
              "completed_at": null,
              "member": {
                "user": {
                  "uid": "user002",
                  "email": "user002@example.com",
                  "profiles": [
                    {
                      "first_name": "Jane",
                      "last_name": "Smith"
                    }
                  ]
                }
              },
              "beneficiary": {
                "id": 302,
                "name": "Jane's ETH Wallet",
                "state": "Pending"
              },
              "account": "ETH-ACC002",
              "block_number": 12345678,
              "amount": 9.99,
              "tid": "txn002"
            },
            {
              "id": 203,
              "currency": {
                "code": "USD",
                "type": "fiat",
                "explorer_transaction": "",
                "explorer_address": ""
              },
              "type": "withdraw",
              "sum": 5000,
              "fee": 25,
              "blockchain_txid": null,
              "rid": "USBankAccount123",
              "state": "Rejected",
              "confirmations": 0,
              "note": "Withdrawal rejected due to insufficient balance",
              "created_at": "2024-08-20T08:00:00Z",
              "updated_at": "2024-08-20T09:00:00Z",
              "completed_at": null,
              "member": {
                "user": {
                  "uid": "user003",
                  "email": "user003@example.com",
                  "profiles": [
                    {
                      "first_name": "Alice",
                      "last_name": "Johnson"
                    }
                  ]
                }
              },
              "beneficiary": {
                "id": 303,
                "name": "Alice's Bank Account",
                "state": "Inactive"
              },
              "account": "USD-ACC003",
              "block_number": null,
              "amount": 4975,
              "tid": "txn003"
            }
          ]
          }
          rowKey="id"
          columns={columns as any}
          pagination={{
            position: ["bottomLeft"],
            
            current: filter ? filter.page : undefined,
            pageSize: filter ? filter.limit : undefined,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
          onChange={(p, f) => {
            const params: any = {
              ...filter,
              page: p.current,
              limit: p.pageSize,
            };
            if (f.currency && f.currency.length !== 0) {
              params.currency = f.currency[0];
            } else {
              if (params.currency) {
                delete params.currency;
              }
            }
            if (changeFilter) {
              changeFilter(params);
            }
          }}
        />
      </Card >
    </>
  );
}
