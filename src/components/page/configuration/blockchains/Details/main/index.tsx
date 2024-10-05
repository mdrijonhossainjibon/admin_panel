import { Badge, Button, Descriptions, List } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { BlockchainSingle_adminBlockchain_currencies } from "queries/BlockchainSingle";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../../../../constants/routes";
import { useTranslation } from "react-i18next";
import { useDate } from "utils/hooks";
 


const defaultBlockchainData = {
  adminBlockchain: {
    name: "BSC TESTNET",
    key: "bsc-testnet",
    enabled: true,
    height: 123456,
    client: "ExampleClient",
    server: "ExampleServer",
    min_confirmations: 6,
    created_at: "2024-01-01T12:00:00Z",
    updated_at: "2024-01-02T12:00:00Z",
    explorer_address: "https://explorer.example.com",
    explorer_transaction: "https://explorer.example.com/tx/",
    currencies: [
      { code: "BTC", name: "Bitcoin", visible: true },
      { code: "ETH", name: "Ethereum", visible: false },
    ],
  },
};

interface Props {
  data?: BlockchainSingle_adminBlockchain_currencies;
  loading: boolean;
}



export default function BlockchainDetailsMain(props : Props ) {
  const history = useHistory();
  const { t: translate } = useTranslation();
  const { formatDate } = useDate()

  const t = (id: string) => translate(`setter.layouts.configurations.blockchains.details.${id}`);

  const goToCurrencyDetails = (code: string) => {
    history.push(Routes.withParams.CurrenciesDetails({ code }));
  };

  // if (props.loading) {
  //    return <Skeleton active paragraph={{ rows: 9 }} />;
  // }

  return (
    <Descriptions bordered column={3}>
      <Descriptions.Item label={t("name")}>
        {defaultBlockchainData.adminBlockchain?.name} ({defaultBlockchainData.adminBlockchain?.key})<br />
        <Badge
          status={defaultBlockchainData.adminBlockchain?.enabled ? "success" : "error"}
          text={defaultBlockchainData.adminBlockchain?.enabled ? t("enabled") : t("disabled")}
        />
      </Descriptions.Item>

      <Descriptions.Item label={t("height")}>{defaultBlockchainData.adminBlockchain.height}</Descriptions.Item>

      <Descriptions.Item label={t("client")}>{defaultBlockchainData.adminBlockchain?.client}</Descriptions.Item>
      <Descriptions.Item label={t("server")}>{defaultBlockchainData.adminBlockchain?.server}</Descriptions.Item>
      <Descriptions.Item label={t("minConfirmations")}>
        {defaultBlockchainData.adminBlockchain?.min_confirmations}
      </Descriptions.Item>

      <Descriptions.Item label={t("dates")}>
        {t("createdAt")}: {formatDate(defaultBlockchainData.adminBlockchain?.created_at)}
        <br />
        {t("updatedAt")}: {formatDate(defaultBlockchainData.adminBlockchain?.updated_at)}
      </Descriptions.Item>

      <Descriptions.Item label={t("explorer")}>
        {defaultBlockchainData.adminBlockchain?.explorer_address}
        <br />
        {defaultBlockchainData.adminBlockchain?.explorer_transaction}
      </Descriptions.Item>

      <Descriptions.Item label={t("currencies")} span={2}>
        <List
          itemLayout="horizontal"
          dataSource={defaultBlockchainData.adminBlockchain.currencies as any}
          renderItem={(c: BlockchainSingle_adminBlockchain_currencies) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Badge status={c.visible ? "success" : "default"} text={`${c.name} (${c.code?.toUpperCase()})`} />
                }
              />
              <Button shape="circle" icon={<EllipsisOutlined />} onClick={() => goToCurrencyDetails(c.code)} />
            </List.Item>
          )}
        />
      </Descriptions.Item>
    </Descriptions>
  );
}
