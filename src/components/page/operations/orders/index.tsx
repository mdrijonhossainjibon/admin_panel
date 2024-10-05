import { useEffect, useState } from "react";
 
import { ReloadOutlined } from "@ant-design/icons";
 
import {   AdminOrdersVariables } from "../../../../queries/AdminOrders";

import { useTranslation } from "react-i18next";
import { OrderFetchType } from '../../../../constants/orders';
import OrderTable from "./OrderTable";
 
import { AdminDepositsVariables } from '../../../../queries/AdminDeposits';

import qs from "querystring";
import { Button, Card, Tabs } from "antd";
import { useHistory } from "react-router-dom";
 
export default function Orders() {
  const [type, setType] = useState<OrderFetchType>(OrderFetchType.Open);
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.operations.orders.${id}`);
  const history = useHistory();
  
  const [filter, setFilter] = useState<AdminDepositsVariables | undefined>({});
 

  useEffect(() => setFilter({}), [type]);

  const changeFilter = (filter: AdminOrdersVariables) => {
    const params = { ...filter };
    const queryString = qs.stringify(params);
    history.push ({ search: queryString });
    setFilter(filter);
  };

  const panes = [
    { tab: t("table.panes.open"), key: OrderFetchType.Open },
    { tab: t("table.panes.history"), key: OrderFetchType.History },
  ];

  const headerExtra = (
    <Button icon={<ReloadOutlined />}  >
      {t("table.reload")}
    </Button>
  );

  return (
    <>
      <Card
        className="setter-page-header"
         
        title={translate("setter.layouts.operations.nav.orders")}
        extra={headerExtra}
      >
        <Tabs defaultActiveKey={type} onChange={(key) => setType(key as OrderFetchType)}>
          {panes.map((pane) => (
            <Tabs.TabPane {...pane} />
          ))}
        </Tabs>

        <OrderTable
          changeFilter={changeFilter}
          orders={[
            {
              "id": 1,
              "uuid": "order-uuid-1",
              "side": "buy",
              "ord_type": "limit",
              "price": 45000,
              "avg_price": 44900,
              "state": "wait",
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
                "created_at": "2023-01-10T08:00:00Z",
                "updated_at": "2023-01-10T08:00:00Z"
              },
              "created_at": "2024-08-20T10:00:00Z",
              "updated_at": "2024-08-20T10:15:00Z",
              "origin_volume": 1.0,
              "remaining_volume": 0.0,
              "executed_volume": 1.0,
              "trades_count": 5,
              "user": {
                "uid": "user123",
                "role": "trader",
                "email": "user123@example.com"
              }
            },
            {
              "id": 2,
              "uuid": "order-uuid-2",
              "side": "sell",
              "ord_type": "market",
              "price": 3000,
              "avg_price": 2950,
              "state": "completed",
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
                "created_at": "2023-02-15T09:00:00Z",
                "updated_at": "2023-02-15T09:00:00Z"
              },
              "created_at": "2024-08-19T11:00:00Z",
              "updated_at": "2024-08-19T11:20:00Z",
              "origin_volume": 2.5,
              "remaining_volume": 0.0,
              "executed_volume": 2.5,
              "trades_count": 3,
              "user": {
                "uid": "user456",
                "role": "trader",
                "email": "user456@example.com"
              }
            },
            {
              "id": 3,
              "uuid": "order-uuid-3",
              "side": "buy",
              "ord_type": "limit",
              "price": 1.5,
              "avg_price": 1.4,
              "state": "open",
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
                "created_at": "2023-03-20T12:00:00Z",
                "updated_at": "2023-03-20T12:00:00Z"
              },
              "created_at": "2024-08-18T12:30:00Z",
              "updated_at": "2024-08-18T12:45:00Z",
              "origin_volume": 1000,
              "remaining_volume": 500,
              "executed_volume": 500,
              "trades_count": 7,
              "user": {
                "uid": "user789",
                "role": "trader",
                "email": "user789@example.com"
              }
            },
            {
              "id": 4,
              "uuid": "order-uuid-4",
              "side": "sell",
              "ord_type": "market",
              "price": 50,
              "avg_price": 49.5,
              "state": "canceled",
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
                "created_at": "2023-04-05T14:00:00Z",
                "updated_at": "2023-04-05T14:00:00Z"
              },
              "created_at": "2024-08-17T13:00:00Z",
              "updated_at": "2024-08-17T13:10:00Z",
              "origin_volume": 10,
              "remaining_volume": 8,
              "executed_volume": 2,
              "trades_count": 1,
              "user": {
                "uid": "user112",
                "role": "trader",
                "email": "user112@example.com"
              }
            },
            {
              "id": 5,
              "uuid": "order-uuid-5",
              "side": "buy",
              "ord_type": "limit",
              "price": 1.2,
              "avg_price": 1.15,
              "state": "completed",
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
                "created_at": "2023-05-10T15:00:00Z",
                "updated_at": "2023-05-10T15:00:00Z"
              },
              "created_at": "2024-08-16T14:00:00Z",
              "updated_at": "2024-08-16T14:30:00Z",
              "origin_volume": 500,
              "remaining_volume": 0,
              "executed_volume": 500,
              "trades_count": 2,
              "user": {
                "uid": "user115",
                "role": "trader",
                "email": "user115@example.com"
              }
            }
          ]
          }
          loading={false}
          filter={filter}
          openOrders={type === OrderFetchType.Open}
           
        />
      </Card>
    </>
  );
}
