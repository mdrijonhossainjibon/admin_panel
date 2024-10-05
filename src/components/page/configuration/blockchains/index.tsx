import  { useState } from "react";
import { Button, Table, Card, Space } from "antd";
import { AdminBlockchains_adminBlockchains } from "../../../../queries/AdminBlockchains";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { EllipsisOutlined, ReloadOutlined } from "@ant-design/icons";
 
import { Routes } from "../../../../constants/routes";
import { useDate } from "../../../../utils/hooks";
import ToggleSwitch from "../ToggleSwitch";
import { useHistory } from "react-router-dom";
import BlockchainFormModal from "./madal";
 

export type BlockchainsData = {
  name: string | undefined | null;
  enabled: boolean | undefined | null;
  client: string | undefined | null;
  key: string | undefined | null;
  server: string | undefined | null;
  height: number | undefined | null;
  explorer_address: string | undefined | null;
  explorer_transaction: string | undefined | null;
  min_confirmations: number | undefined | null;
};

// Mock data for blockchains
const mockData: AdminBlockchains_adminBlockchains[] = [{
  id: 1,
  name: 'BSC-TESTNET',
  enabled: true,
  client: 'parity',
  key: 'bsc-testnet',
  height: 0,
  server: 'https://localhost:3000',
  explorer_address: 'https://bscscan.com/address/#{txid}',
  explorer_transaction: 'https://bscscan.com/tx/#{txid}',
  min_confirmations: 5,
  created_at: new Date() 
}];

export default function Blockchains() {
  const { t } = useTranslation();
  const history = useHistory();
  const [isCreateModalVisible, setCreateModalState] = useState(false);

  const { formatDate } = useDate();

  const handleCreateCancel = () => {
    setCreateModalState(false);
  };

  const handleToggle = (variables: AdminBlockchains_adminBlockchains) => {
    // Implement toggle functionality
  };

  const submitCreateForm = async (formModel: BlockchainsData) => {
    // Mock submission
    console.log("Submitting form:", formModel);
    setCreateModalState(false);
  };

  const openBlockchainDetails = (id: any) => {
    history.push(Routes.withParams.BlockchainsDetails({ id }));
  };

  const onClickAddNewBlockchain = () => {
    setCreateModalState(true);
  };

  const columns: ColumnsType<AdminBlockchains_adminBlockchains> = [
    {
      title: t("setter.layouts.configurations.blockchains.table.id"),
      dataIndex: "id",
      key: "id",
    },
    {
      title: t("setter.layouts.configurations.blockchains.table.key"),
      dataIndex: "key",
      key: "key",
    },
    {
      title: t("setter.layouts.configurations.blockchains.table.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("setter.layouts.configurations.blockchains.table.client"),
      dataIndex: "client",
      key: "client",
    },
    {
      title: t("setter.layouts.configurations.blockchains.table.height"),
      dataIndex: "height",
      key: "height",
    },
    {
      title: t("setter.layouts.configurations.blockchains.table.createdAt"),
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => formatDate(date),
    },
    {
      title: t("setter.layouts.configurations.blockchains.table.status.title"),
      dataIndex: "enabled",
      key: "enabled",
      align: "center",
      render: (_, record: AdminBlockchains_adminBlockchains) => (
        <ToggleSwitch value={record} name="enabled" onChange={handleToggle} error={''} />
      ),
    },
    {
      title: "",
      dataIndex: "details",
      width: 75,
      align: "center",
      render: (_, row) => (
        <Button icon={<EllipsisOutlined />} shape="circle" onClick={() => openBlockchainDetails(row.key as string)} />
      ),
    },
  ];

  return (
    <>
      <Card
        className="setter-page-header"
        title={t("setter.layouts.configurations.nav.blockchains")}
        extra={[
          <Space key="extra-buttons">
            <Button icon={<ReloadOutlined />} >
              {t("setter.layouts.configurations.blockchains.table.reload")}
            </Button>
            <Button type="primary" onClick={onClickAddNewBlockchain}>
              + {t("setter.layouts.configurations.blockchains.table.new")}
            </Button>
          </Space>
        ]}
      >
        <Table
          bordered
          dataSource={mockData}
          rowKey="id"
          columns={columns}
          loading={false}
          pagination={{ position: ["bottomLeft"] }}
          onRow={(blockchain) => ({
            tabIndex: 0,
            onClick: () => openBlockchainDetails(blockchain.id),
            onKeyDown: (e) => e.key === "Enter" && openBlockchainDetails(blockchain.id),
          })}
        />
        <BlockchainFormModal isModalVisible={ isCreateModalVisible }  initialValues={ mockData }  onSubmit={  submitCreateForm } onCancel={ handleCreateCancel} titleKey="e"/>
      </Card>
    </>
  );
}
