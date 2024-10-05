import { useState } from "react";
import { Button, Card, Space, Tabs } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
 
import {   AdminWithdrawsVariables } from "../../../../queries/AdminWithdraws";
import { CurrencyType } from "../../../../constants/currencies";
import { useTranslation } from "react-i18next";
import WithdrawalTable from "./WithdrawalTable";
import qs from "querystring";
import { useHistory } from "react-router-dom";
 

export default function Withdrawals() {
  const { t: translate } = useTranslation();
  const history = useHistory();

  const t = (id: string) => translate(`setter.layouts.operations.withdrawals.table.${id}`);

 

  const [filter, setFilter] = useState<AdminWithdrawsVariables | undefined>({});
  const [currencyType, setCurrencyType] = useState<CurrencyType>(CurrencyType.Coin);

 

  const changeFilter = (filter: AdminWithdrawsVariables | undefined) => {
    const params = { ...filter };
    const queryString = qs.stringify(params);
    history.push({ search: queryString });
    setFilter(filter);
  };
  const changeCurrencyType = (type: CurrencyType) => {
    changeFilter(undefined);
    setCurrencyType(type);
  };

  const panes = [
    { tab: t("panes.coin"), key: CurrencyType.Coin },
    { tab: t("panes.fiat"), key: CurrencyType.Fiat },
  ];

  const extraTabContent = (
    <Space>
      <Button
        icon={<ReloadOutlined />}
        
        type="default"
       
      >
        {t("reload")}
      </Button>
    </Space>
  );

  return (
    <>
      <Card
        className="setter-page-header"
         
        title={translate("setter.layouts.operations.nav.withdrawals")}
        extra={[extraTabContent]}
      >
        <Tabs defaultActiveKey={currencyType} onChange={changeCurrencyType as (type: string) => void}>
          {panes.map((pane) => (
            <Tabs.TabPane {...pane} />
          ))}
        </Tabs>
        <WithdrawalTable
          loading={false}
          type={currencyType}
          withdrawals={   [
            {
              "id": 1,
              "user": {
                "email": "user1@example.com"
              },
              "blockchain_txid": "0x46559e498c735e6daf761170df10a89217ba4a98",
              "currency": {
                "code": "BTC",
                "explorer_transaction": "https://bscscan.com/address/#{txid}",
                "explorer_address": "https://bscscan.com/address/#{address}"
              },
              "type": "coin",
              "created_at": "2024-08-30T08:00:00Z",
              "amount": 5,
              "rid": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
              "state": "skipped"
            },
            {
              "id": 2,
              "user": {
                "email": "user2@example.com"
              },
              "blockchain_txid": "0xe3b123789b635e8daf741170df00a89211fa4b22",
              "currency": {
                "code": "ETH",
                "explorer_transaction": "https://etherscan.io/tx/#{txid}",
                "explorer_address": "https://etherscan.io/address/#{address}"
              },
              "type": "coin",
              "created_at": "2024-08-29T08:00:00Z",
              "amount": 10,
              "rid": "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
              "state": "processing"
            },
            {
              "id": 3,
              "user": {
                "email": "user3@example.com"
              },
              "blockchain_txid": "0x58953df789b635e9af481171df00a89215fa4b44",
              "currency": {
                "code": "USDT",
                "explorer_transaction": "https://bscscan.com/tx/#{txid}",
                "explorer_address": "https://bscscan.com/address/#{address}"
              },
              "type": "fiat",
              "created_at": "2024-08-28T08:00:00Z",
              "amount": 200,
              "rid": "1234567890",
              "state": "canceled"
            },
            {
              "id": 4,
              "user": {
                "email": "user4@example.com"
              },
              "blockchain_txid": "0xa1f73df789b635e9df481178df00a89213fa4b55",
              "currency": {
                "code": "LTC",
                "explorer_transaction": "https://bscscan.com/tx/#{txid}",
                "explorer_address": "https://bscscan.com/address/#{address}"
              },
              "type": "coin",
              "created_at": "2024-08-27T08:00:00Z",
              "amount": 50,
              "rid": "LVg2kJoFNg45Nbpy53kRKHkV9ndyQG65JX",
              "state": "confirming"
            },
            {
              "id": 5,
              "user": {
                "email": "user5@example.com"
              },
              "blockchain_txid": "0xc3e73df789b635e9bf381178df00a89212fa4b66",
              "currency": {
                "code": "BNB",
                "explorer_transaction": "https://bscscan.com/tx/#{txid}",
                "explorer_address": "https://bscscan.com/address/#{address}"
              },
              "type": "coin",
              "created_at": "2024-08-26T08:00:00Z",
              "amount": 0.5,
              "rid": "bnb1grpf0955h0ykjlf3g0mvu7cp6m7u8hdnl9x8yd",
              "state": "confirming"
            },
            {
              "id": 6,
              "user": {
                "email": "user6@example.com"
              },
              "blockchain_txid": "0xa1f73df789b635e9cf481178df00a89212fa4b77",
              "currency": {
                "code": "ADA",
                "explorer_transaction": "https://cardanoscan.io/transaction/#{txid}",
                "explorer_address": "https://cardanoscan.io/address/#{address}"
              },
              "type": "coin",
              "created_at": "2024-08-25T08:00:00Z",
              "amount": 1000,
              "rid": "addr1q8s0gxpqydmjfh4z4wr5s0z4sdz4kfj0zp3dhkfvkwz5gk53m5g8n0c87f",
              "state": "confirming"
            },
            {
              "id": 7,
              "user": {
                "email": "user7@example.com"
              },
              "blockchain_txid": "0xa2f73df789b635e9df481178df00a89213fa4b88",
              "currency": {
                "code": "XRP",
                "explorer_transaction": "https://xrpscan.com/tx/#{txid}",
                "explorer_address": "https://xrpscan.com/address/#{address}"
              },
              "type": "fiat",
              "created_at": "2024-08-24T08:00:00Z",
              "amount": 3000,
              "rid": "9876543210",
              "state": "confirming"
            },
            {
              "id": 8,
              "user": {
                "email": "user8@example.com"
              },
              "blockchain_txid": "0xa3f73df789b635e9cf481178df00a89214fa4b99",
              "currency": {
                "code": "DOGE",
                "explorer_transaction": "https://dogechain.info/tx/#{txid}",
                "explorer_address": "https://dogechain.info/address/#{address}"
              },
              "type": "coin",
              "created_at": "2024-08-23T08:00:00Z",
              "amount": 1500,
              "rid": "DFunddPu4NqsoKoFboVd8nqAU1Mwd2wxCc",
              "state": "skipped"
            },
            {
              "id": 9,
              "user": {
                "email": "user9@example.com"
              },
              "blockchain_txid": "0xa4f73df789b635e9ef481178df00a89211fa4baa",
              "currency": {
                "code": "DOT",
                "explorer_transaction": "https://polkascan.io/polkadot/tx/#{txid}",
                "explorer_address": "https://polkascan.io/polkadot/account/#{address}"
              },
              "type": "coin",
              "created_at": "2024-08-22T08:00:00Z",
              "amount": 700,
              "rid": "15cd3dCpefCrFgRboDFunBPR5jHCRPi7Mz",
              "state": "failed"
            },
            {
              "id": 10,
              "user": {
                "email": "user10@example.com"
              },
              "blockchain_txid": "0xa5f73df789b635e9ef481178df00a89214fa4bbc",
              "currency": {
                "code": "SOL",
                "explorer_transaction": "https://solscan.io/tx/#{txid}",
                "explorer_address": "https://solscan.io/address/#{address}"
              },
              "type": "fiat",
              "created_at": "2024-08-21T08:00:00Z",
              "amount": 100,
              "rid": "sol1e3cDce0C6R3dCrFgEoD55pLboBb6nF",
              "state": "confirming"
            }
          ]
            }
          filter={filter}
          changeFilter={changeFilter}
          
        />
      </Card>
    </>
  );
}
