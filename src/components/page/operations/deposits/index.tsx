import { useState } from "react";

import { ReloadOutlined } from "@ant-design/icons";
import { Button, Modal, Card, Popover, Space } from "antd";
import { useTranslation } from "react-i18next";


import DepositTable from "./DepositTable";

const data = [
  {
    id: 1,
    uid: 'ID9NLOSN91004',
    txid: '0x46559e498c735e6daf761170df10a89217ba4a98',
    currency: {
      explorer_transaction: 'https://bscscan.com/address/0x46559e498c735e6daf761170df10a89217ba4a98'
    },
    type: 'coin',
    created_at: new Date('2023-08-01T10:00:00Z'),
    amount: 5,
    currency_code: 'BTC',
    confirmations: 5,
    state: 'skipped'
  },
  {
    id: 2,
    uid: 'ID8PLTRM82015',
    txid: '0xb8c77482e45f1f44de1745f52c74426c631bdd52',
    currency: {
      explorer_transaction: 'https://bscscan.com/address/0xb8c77482e45f1f44de1745f52c74426c631bdd52'
    },
    type: 'coin',
    created_at: new Date('2023-08-02T11:00:00Z'),
    amount: 10,
    currency_code: 'ETH',
    confirmations: 10,
    state: 'collected'
  },
  {
    id: 3,
    uid: 'ID7QUXNP73026',
    txid: '0x6a52860e7d9b3a9ff2a1c3e5c4a5e9dfd9bd2a7d',
    currency: {
      explorer_transaction: 'https://bscscan.com/address/0x6a52860e7d9b3a9ff2a1c3e5c4a5e9dfd9bd2a7d'
    },
    type: 'coin',
    created_at: new Date('2023-08-03T12:00:00Z'),
    amount: 2.5,
    currency_code: 'BNB',
    confirmations: 8,
    state: 'processing'
  },
  {
    id: 4,
    uid: 'ID6RVWQP64037',
    txid: '0xf9e2d4e5c96488da6e66ed5f5af4d982b93440d5',
    currency: {
      explorer_transaction: 'https://bscscan.com/address/0xf9e2d4e5c96488da6e66ed5f5af4d982b93440d5'
    },
    type: 'coin',
    created_at: new Date('2023-08-04T13:00:00Z'),
    amount: 7.5,
    currency_code: 'XRP',
    confirmations: 12,
    state: 'skipped'
  },
  {
    id: 5,
    uid: 'ID5SXZRO55048',
    txid: '0x0d2e5fdb66ae8a28df217a3204edb5556fd6ff29',
    currency: {
      explorer_transaction: 'https://bscscan.com/address/0x0d2e5fdb66ae8a28df217a3204edb5556fd6ff29'
    },
    type: 'coin',
    created_at: new Date('2023-08-05T14:00:00Z'),
    amount: 1.0,
    currency_code: 'DOGE',
    confirmations: 3,
    state: 'rejected'
  },
  {
    id: 6,
    uid: 'ID4TYASP46059',
    txid: '0x4a7e6f20e85f67b7e8b4cf4a774c7994c2052e0e',
    currency: {
      explorer_transaction: 'https://bscscan.com/address/0x4a7e6f20e85f67b7e8b4cf4a774c7994c2052e0e'
    },
    type: 'coin',
    created_at: new Date('2023-08-06T15:00:00Z'),
    amount: 12.0,
    currency_code: 'ADA',
    confirmations: 20,
    state: 'accept'
  },
  {
    id: 7,
    uid: 'ID3UZBTQ37060',
    txid: '0xd5a5c22da8b0f93dca87a9870d3f52a29c394248',
    currency: {
      explorer_transaction: 'https://bscscan.com/address/0xd5a5c22da8b0f93dca87a9870d3f52a29c394248'
    },
    type: 'coin',
    created_at: new Date('2023-08-07T16:00:00Z'),
    amount: 0.75,
    currency_code: 'SOL',
    confirmations: 4,
    state: 'skipped'
  },
  {
    id: 8,
    uid: 'ID2VACTP28071',
    txid: '0x24c091b4a3e5a9d01f01d1b2e59b9b35b620b2a2',
    currency: {
      explorer_transaction: 'https://bscscan.com/address/0x24c091b4a3e5a9d01f01d1b2e59b9b35b620b2a2'
    },
    type: 'coin',
    created_at: new Date('2023-08-08T17:00:00Z'),
    amount: 8.0,
    currency_code: 'DOT',
    confirmations: 15,
    state: 'processing'
  },
  {
    id: 9,
    uid: 'ID1WBXUR19082',
    txid: '0x63c0644288de7f4b9b752efbd44f233741b6b59f',
    currency: {
      explorer_transaction: 'https://bscscan.com/address/0x63c0644288de7f4b9b752efbd44f233741b6b59f'
    },
    type: 'coin',
    created_at: new Date('2023-08-09T18:00:00Z'),
    amount: 6.25,
    currency_code: 'LTC',
    confirmations: 7,
    state: 'skipped'
  },
  {
    id: 10,
    uid: 'ID0XBYVS10193',
    txid: '0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30',
    currency: {
      explorer_transaction: 'https://bscscan.com/address/0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30'
    },
    type: 'coin',
    created_at: new Date('2023-08-10T19:00:00Z'),
    amount: 3.0,
    currency_code: 'BTC',
    confirmations: 10,
    state: 'processing'
  },
   
    {
      "id": 10,
      "uid": "ID0XBYVS10193",
      "txid": "0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30",
      "currency": {
        "explorer_transaction": "https://bscscan.com/address/0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30"
      },
      "type": "coin",
      "created_at": "2023-08-10T19:00:00Z",
      "amount": 3.0,
      "currency_code": "BTC",
      "confirmations": 10,
      "state": "processing"
    },
    {
      "id": 10,
      "uid": "ID0XBYVS10193",
      "txid": "0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30",
      "currency": {
        "explorer_transaction": "https://bscscan.com/address/0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30"
      },
      "type": "coin",
      "created_at": "2023-08-10T19:00:00Z",
      "amount": 3.0,
      "currency_code": "BTC",
      "confirmations": 10,
      "state": "processing"
    },
    {
      "id": 10,
      "uid": "ID0XBYVS10193",
      "txid": "0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30",
      "currency": {
        "explorer_transaction": "https://bscscan.com/address/0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30"
      },
      "type": "coin",
      "created_at": "2023-08-10T19:00:00Z",
      "amount": 3.0,
      "currency_code": "BTC",
      "confirmations": 10,
      "state": "processing"
    },
    {
      "id": 10,
      "uid": "ID0XBYVS10193",
      "txid": "0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30",
      "currency": {
        "explorer_transaction": "https://bscscan.com/address/0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30"
      },
      "type": "coin",
      "created_at": "2023-08-10T19:00:00Z",
      "amount": 3.0,
      "currency_code": "BTC",
      "confirmations": 10,
      "state": "processing"
    },
    {
      "id": 10,
      "uid": "ID0XBYVS10193",
      "txid": "0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30",
      "currency": {
        "explorer_transaction": "https://bscscan.com/address/0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30"
      },
      "type": "coin",
      "created_at": "2023-08-10T19:00:00Z",
      "amount": 3.0,
      "currency_code": "BTC",
      "confirmations": 10,
      "state": "processing"
    },
    {
      "id": 10,
      "uid": "ID0XBYVS10193",
      "txid": "0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30",
      "currency": {
        "explorer_transaction": "https://bscscan.com/address/0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30"
      },
      "type": "coin",
      "created_at": "2023-08-10T19:00:00Z",
      "amount": 3.0,
      "currency_code": "BTC",
      "confirmations": 10,
      "state": "processing"
    },
    {
      "id": 10,
      "uid": "ID0XBYVS10193",
      "txid": "0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30",
      "currency": {
        "explorer_transaction": "https://bscscan.com/address/0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30"
      },
      "type": "coin",
      "created_at": "2023-08-10T19:00:00Z",
      "amount": 3.0,
      "currency_code": "BTC",
      "confirmations": 10,
      "state": "processing"
    },
    {
      "id": 10,
      "uid": "ID0XBYVS10193",
      "txid": "0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30",
      "currency": {
        "explorer_transaction": "https://bscscan.com/address/0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30"
      },
      "type": "coin",
      "created_at": "2023-08-10T19:00:00Z",
      "amount": 3.0,
      "currency_code": "BTC",
      "confirmations": 10,
      "state": "processing"
    },
    {
      "id": 10,
      "uid": "ID0XBYVS10193",
      "txid": "0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30",
      "currency": {
        "explorer_transaction": "https://bscscan.com/address/0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30"
      },
      "type": "coin",
      "created_at": "2023-08-10T19:00:00Z",
      "amount": 3.0,
      "currency_code": "BTC",
      "confirmations": 10,
      "state": "processing"
    },
    {
      "id": 10,
      "uid": "ID0XBYVS10193",
      "txid": "0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30",
      "currency": {
        "explorer_transaction": "https://bscscan.com/address/0x7d6f435cdb8d3024d7e74e5b8af8c4f6fddf0e30"
      },
      "type": "coin",
      "created_at": "2023-08-10T19:00:00Z",
      "amount": 3.0,
      "currency_code": "BTC",
      "confirmations": 10,
      "state": "processing"
    }
   
  
]



export default function Deposits() {
  const { t: translate } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);

  const t = (id: string) => translate(`setter.layouts.operations.deposits.${id}`);


  const [filter, setFilter] = useState({});


  const changeFilter = (filter: any) => {

    setFilter(filter);
  };

  return (
    <Card

      title={translate("setter.layouts.operations.nav.deposits")}
      extra={[
        <Space> <Popover
          content={<div> DepositFilterForm </div>}
          placement='bottomRight'
          trigger="click"
        ></Popover>
          <Button icon={<ReloadOutlined />}  >
            {t("table.reload")}
          </Button>
          <Button type="primary" onClick={() => setModalOpen(true)}>
            + {t("table.new")}
          </Button>
        </Space>
      ]}
    >

      <DepositTable
        deposits={data}
        loading={false}
        changeFilter={changeFilter}
        filter={filter}
      />

      {/*<PaginationComponent />*/}
      <Modal
        title={t("form.title")}
        open={isModalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        destroyOnClose={true}
      >
        DepositForm
      </Modal>
    </Card>
  );
}
