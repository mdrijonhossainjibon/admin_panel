import UserOrderTable from "./UserOrderTable";


export default function UserDetailsOpenOrders({ user }: any) {

  const order = [
    {
      "id": 1,
      "uuid": "d5f9b8c0-9f7d-11eb-a8b3-0242ac130003",
      "side": "buy",
      "ord_type": "limit",
      "price": 50000,
      "avg_price": 49000,
      "state": "executed",
      "market": {
        "id": "btcusdt",
        "name": "BTC/USDT",
        "base_currency": {
          "code": "BTC",
          "type": "crypto"
        },
        "quote_currency": {
          "code": "USDT",
          "type": "crypto"
        },
        "created_at": "2023-08-23T08:30:00Z",
        "updated_at": "2023-08-23T08:35:00Z"
      },
      "created_at": "2023-08-23T08:25:00Z",
      "updated_at": "2023-08-23T08:40:00Z",
      "origin_volume": 1.5,
      "remaining_volume": 0,
      "executed_volume": 1.5,
      "trades_count": 3,
      "user": {
        "uid": "U123456789",
        "role": "trader",
        "email": "user@example.com"
      }
    },
    {
      "id": 2,
      "uuid": "e1b9b7f0-9f7d-11eb-a8b3-0242ac130003",
      "side": "sell",
      "ord_type": "market",
      "price": 51000,
      "avg_price": 50500,
      "state": "executed",
      "market": {
        "id": "ethusdt",
        "name": "ETH/USDT",
        "base_currency": {
          "code": "ETH",
          "type": "crypto"
        },
        "quote_currency": {
          "code": "USDT",
          "type": "crypto"
        },
        "created_at": "2023-08-24T09:15:00Z",
        "updated_at": "2023-08-24T09:20:00Z"
      },
      "created_at": "2023-08-24T09:10:00Z",
      "updated_at": "2023-08-24T09:25:00Z",
      "origin_volume": 2.0,
      "remaining_volume": 0,
      "executed_volume": 2.0,
      "trades_count": 5,
      "user": {
        "uid": "U987654321",
        "role": "trader",
        "email": "trader@example.com"
      }
    },
    {
      "id": 3,
      "uuid": "f2a9b8d0-9f7d-11eb-a8b3-0242ac130003",
      "side": "buy",
      "ord_type": "limit",
      "price": 48000,
      "avg_price": 47500,
      "state": "pending",
      "market": {
        "id": "btcusdt",
        "name": "BTC/USDT",
        "base_currency": {
          "code": "BTC",
          "type": "crypto"
        },
        "quote_currency": {
          "code": "USDT",
          "type": "crypto"
        },
        "created_at": "2023-08-25T10:05:00Z",
        "updated_at": "2023-08-25T10:10:00Z"
      },
      "created_at": "2023-08-25T10:00:00Z",
      "updated_at": "2023-08-25T10:15:00Z",
      "origin_volume": 1.2,
      "remaining_volume": 1.2,
      "executed_volume": 0,
      "trades_count": 0,
      "user": {
        "uid": "U234567890",
        "role": "trader",
        "email": "buyer@example.com"
      }
    },
    {
      "id": 4,
      "uuid": "03b9b8e1-9f7e-11eb-a8b3-0242ac130003",
      "side": "sell",
      "ord_type": "limit",
      "price": 47000,
      "avg_price": 46500,
      "state": "canceled",
      "market": {
        "id": "ethusdt",
        "name": "ETH/USDT",
        "base_currency": {
          "code": "ETH",
          "type": "crypto"
        },
        "quote_currency": {
          "code": "USDT",
          "type": "crypto"
        },
        "created_at": "2023-08-26T11:20:00Z",
        "updated_at": "2023-08-26T11:25:00Z"
      },
      "created_at": "2023-08-26T11:15:00Z",
      "updated_at": "2023-08-26T11:30:00Z",
      "origin_volume": 3.0,
      "remaining_volume": 3.0,
      "executed_volume": 0,
      "trades_count": 0,
      "user": {
        "uid": "U345678901",
        "role": "trader",
        "email": "seller@example.com"
      }
    },
    {
      "id": 5,
      "uuid": "14b9b8f2-9f7e-11eb-a8b3-0242ac130003",
      "side": "buy",
      "ord_type": "market",
      "price": 46000,
      "avg_price": 45500,
      "state": "executed",
      "market": {
        "id": "ltcusdt",
        "name": "LTC/USDT",
        "base_currency": {
          "code": "LTC",
          "type": "crypto"
        },
        "quote_currency": {
          "code": "USDT",
          "type": "crypto"
        },
        "created_at": "2023-08-27T12:40:00Z",
        "updated_at": "2023-08-27T12:45:00Z"
      },
      "created_at": "2023-08-27T12:35:00Z",
      "updated_at": "2023-08-27T12:50:00Z",
      "origin_volume": 1.8,
      "remaining_volume": 0,
      "executed_volume": 1.8,
      "trades_count": 2,
      "user": {
        "uid": "U456789012",
        "role": "trader",
        "email": "user2@example.com"
      }
    }
  ]
  

  return <UserOrderTable orders={ order } loading={false} />;
}
