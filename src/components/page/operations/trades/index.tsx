import { useState } from "react";
 
import {  AdminTradesVariables } from "../../../../queries/AdminTrades";
import TradeTable from "./TradeTable";
import { Button, Card } from "antd";
import { useTranslation } from "react-i18next";
import { AdminDepositsVariables } from "../../../../queries/AdminDeposits";
 
import qs from "querystring";
import { ReloadOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

export default function Trades() {
  const { t } = useTranslation();

  const history = useHistory();

   
  const [filter, setFilter] = useState<AdminTradesVariables | undefined>({});
 

  const changeFilter = (filter: AdminDepositsVariables) => {
    const params = { ...filter };
    const queryString = qs.stringify(params);
    history.push ({ search: queryString });
    setFilter(filter);
  };

  return (
    <>
      <Card
        title={t("setter.layouts.operations.nav.trades")}
        
        className="setter-page-header"
        extra={[
          <Button icon={<ReloadOutlined />}  >
            {t("reload")}
          </Button>,
        ]}
      >
        <TradeTable
          trades={ [
            {
              "id": 1,
              "price": 45000,
              "amount": 0.5,
              "total": 22500,
              "market": {
                "id": "BTC-USD",
                "name": "Bitcoin/US Dollar",
                "base_currency": {
                  "code": "BTC",
                  "type": "crypto"
                },
                "quote_currency": {
                  "code": "USD",
                  "type": "fiat"
                },
                "created_at": "2023-01-15T08:00:00Z",
                "updated_at": "2023-01-15T08:00:00Z"
              },
              "taker_type": "buy",
              "maker": {
                "uid": "user123",
                "email": "maker@example.com",
                "role": "trader"
              },
              "maker_fee_currency": "BTC",
              "maker_fee_amount": 0.00025,
              "taker": {
                "uid": "user456",
                "email": "taker@example.com",
                "role": "trader"
              },
              "taker_fee_currency": "USD",
              "taker_fee_amount": 11.25,
              "created_at": "2024-08-22T10:00:00Z"
            },
            {
              "id": 2,
              "price": 3000,
              "amount": 2,
              "total": 6000,
              "market": {
                "id": "ETH-USD",
                "name": "Ethereum/US Dollar",
                "base_currency": {
                  "code": "ETH",
                  "type": "crypto"
                },
                "quote_currency": {
                  "code": "USD",
                  "type": "fiat"
                },
                "created_at": "2023-02-10T09:30:00Z",
                "updated_at": "2023-02-10T09:30:00Z"
              },
              "taker_type": "sell",
              "maker": {
                "uid": "user789",
                "email": "maker2@example.com",
                "role": "trader"
              },
              "maker_fee_currency": "ETH",
              "maker_fee_amount": 0.001,
              "taker": {
                "uid": "user101",
                "email": "taker2@example.com",
                "role": "trader"
              },
              "taker_fee_currency": "USD",
              "taker_fee_amount": 30,
              "created_at": "2024-08-21T11:15:00Z"
            },
            {
              "id": 3,
              "price": 1.5,
              "amount": 1000,
              "total": 1500,
              "market": {
                "id": "USDT-USD",
                "name": "Tether/US Dollar",
                "base_currency": {
                  "code": "USDT",
                  "type": "crypto"
                },
                "quote_currency": {
                  "code": "USD",
                  "type": "fiat"
                },
                "created_at": "2023-03-05T14:00:00Z",
                "updated_at": "2023-03-05T14:00:00Z"
              },
              "taker_type": "buy",
              "maker": {
                "uid": "user112",
                "email": "maker3@example.com",
                "role": "trader"
              },
              "maker_fee_currency": "USDT",
              "maker_fee_amount": 1.5,
              "taker": {
                "uid": "user113",
                "email": "taker3@example.com",
                "role": "trader"
              },
              "taker_fee_currency": "USD",
              "taker_fee_amount": 7.5,
              "created_at": "2024-08-20T12:45:00Z"
            },
            {
              "id": 4,
              "price": 50,
              "amount": 10,
              "total": 500,
              "market": {
                "id": "SOL-USD",
                "name": "Solana/US Dollar",
                "base_currency": {
                  "code": "SOL",
                  "type": "crypto"
                },
                "quote_currency": {
                  "code": "USD",
                  "type": "fiat"
                },
                "created_at": "2023-04-12T16:00:00Z",
                "updated_at": "2023-04-12T16:00:00Z"
              },
              "taker_type": "sell",
              "maker": {
                "uid": "user114",
                "email": "maker4@example.com",
                "role": "trader"
              },
              "maker_fee_currency": "SOL",
              "maker_fee_amount": 0.05,
              "taker": {
                "uid": "user115",
                "email": "taker4@example.com",
                "role": "trader"
              },
              "taker_fee_currency": "USD",
              "taker_fee_amount": 2.5,
              "created_at": "2024-08-19T14:30:00Z"
            },
            {
              "id": 5,
              "price": 1.2,
              "amount": 500,
              "total": 600,
              "market": {
                "id": "ADA-USD",
                "name": "Cardano/US Dollar",
                "base_currency": {
                  "code": "ADA",
                  "type": "crypto"
                },
                "quote_currency": {
                  "code": "USD",
                  "type": "fiat"
                },
                "created_at": "2023-05-20T18:00:00Z",
                "updated_at": "2023-05-20T18:00:00Z"
              },
              "taker_type": "buy",
              "maker": {
                "uid": "user116",
                "email": "maker5@example.com",
                "role": "trader"
              },
              "maker_fee_currency": "ADA",
              "maker_fee_amount": 0.6,
              "taker": {
                "uid": "user117",
                "email": "taker5@example.com",
                "role": "trader"
              },
              "taker_fee_currency": "USD",
              "taker_fee_amount": 3,
              "created_at": "2024-08-18T15:00:00Z"
            }
          ]
          }
          loading={ false }
          changeFilter={changeFilter}
          filter={filter}
          
        />
      </Card>
    </>
  );
}
