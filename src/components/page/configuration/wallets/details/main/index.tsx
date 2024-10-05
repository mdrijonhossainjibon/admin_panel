import { Descriptions, Badge, List, Button } from "antd";
import { AdminWallet_adminWallet } from "../../../../../../queries/AdminWallet";
import { useTranslation } from "react-i18next";
import { EllipsisOutlined, LinkOutlined } from "@ant-design/icons";
import { useDate } from "utils/hooks";
import { Routes } from "../../../../../../constants/routes";
import { useHistory } from "react-router-dom";

export default function WalletDetailsMain() {
  const { t: translate } = useTranslation();
  const { formatDate } = useDate();
  const history = useHistory();
  const goToCurrencyDetails = (code: string) => {
    history.push(Routes.withParams.CurrenciesDetails({ code }));
  };
  const goToBlockchainDetails = (id: string) => {
    history.push(Routes.withParams.BlockchainsDetails({ id }));
  };

  const t = (id: string) => translate(`setter.layouts.configurations.wallets.details.${id}`);

  const wallet: AdminWallet_adminWallet = { address: '0x7455e18958a54aa28c46f2621ad2f8437e6efacf', name: 'Bitcoin', currency_code: 'BTC', enabled: true, id: 1, kind: 'deposit', blockchain_key: '', max_balance: '100  ' ,  gateway : '' , 
     settings : { uri : 'h' , secret : '' , access_token : '' , testnet :  true , wallet_id : 'gtryt'} ,
     currency : { code: 'BTC' , name: 'Bitcoin',  explorer_address: '',   type : 'coin' , visible : true }, created_at: new Date(),
     blockchain : { id: 1, name: 'BSC',   enabled: true, key : 'bst-terstnet' } , updated_at : new Date()

    }
  if (!wallet) return <></>;
  const currencies = [{ ...wallet.currency }];
  const addresses = [{ address: wallet.address }];
  const blockchains = [{ ...wallet.blockchain }];

  return (
    <Descriptions bordered column={2}>
      <Descriptions.Item label={t("name")}>
        <Badge status={wallet.enabled ? "success" : "error"} text={wallet.enabled ? t("enabled") : t("disabled")} />
        <div>{wallet.name}</div>
      </Descriptions.Item>
      <Descriptions.Item label={t("dates")}>
        <div>
          {t("created")}: {formatDate(wallet.created_at)}
        </div>
        <div>
          {t("updated")}: {formatDate(wallet.updated_at)}
        </div>
      </Descriptions.Item>
      <Descriptions.Item label={t("address")}>
        <List
          itemLayout="horizontal"
          dataSource={addresses}
          renderItem={(c: any) => (
            <List.Item
              extra={
                <Button
                  shape="circle"
                  target="_blank"
                  icon={<LinkOutlined />}
                  href={wallet.currency?.explorer_address?.replace("#{address}", wallet.address)}
                />
              }
            >
              <List.Item.Meta title={`${c.address}`} />
            </List.Item>
          )}
        />
      </Descriptions.Item>
      <Descriptions.Item label={t("blockchain_key")}>
        <List
          itemLayout="horizontal"
          dataSource={blockchains}
          renderItem={(c: any) => (
            <List.Item>
              <List.Item.Meta
                title={<Badge status={c.enabled ? "success" : "error"} text={`${c.name} (${c.key})`} />}
              />
              <Button shape="circle" icon={<EllipsisOutlined />} onClick={() => goToBlockchainDetails(c.id)} />
            </List.Item>
          )}
        />
      </Descriptions.Item>
      <Descriptions.Item label={t("currency")}>
        <List
          itemLayout="horizontal"
          dataSource={currencies}
          renderItem={(c: any) => (
            <List.Item
              extra={<Button shape="circle" icon={<EllipsisOutlined />} onClick={() => goToCurrencyDetails(c.code)} />}
            >
              <List.Item.Meta
                title={<Badge status={c.visible ? "success" : "error"} text={`${c.name} (${c.code?.toUpperCase()})`} />}
              />
            </List.Item>
          )}
        />
      </Descriptions.Item>
      <Descriptions.Item label={t("kind")}>{wallet.kind}</Descriptions.Item>
      <Descriptions.Item label={t("gateway")}>
        {wallet.gateway === "bitgo" ? (
          <List>
            <List.Item>{wallet.gateway}</List.Item>
            <List.Item>
              <List.Item.Meta title={t("accessToken")} description={wallet.settings?.access_token} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title={t("testnet")} description={wallet.settings?.testnet ? "true" : "false"} />
            </List.Item>
            <List.Item>
              <List.Item.Meta title={t("walletId")} description={wallet.settings?.wallet_id} />
            </List.Item>
          </List>
        ) : (
          wallet.gateway
        )}
      </Descriptions.Item>
      <Descriptions.Item label={t("max_balance")}>{wallet.max_balance}</Descriptions.Item>
    </Descriptions>
  );
}
