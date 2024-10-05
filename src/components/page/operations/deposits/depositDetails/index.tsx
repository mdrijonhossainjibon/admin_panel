 
import { Badge, Button, Descriptions, List, Card, Skeleton } from "antd";
import { DepositDetailsRouteParams, RouteParams, Routes } from "../../../../../constants/routes";
import { EllipsisOutlined, LinkOutlined, ReloadOutlined } from "@ant-design/icons";
import DepositType from "../DepositType";
import DepositStateCell from "../DepositState";
import { useHistory , useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserStatus from "../../../users/UserStatus";

const mockDeposit = {
  amount: 1000.00,
  fee: 10.00,
  type: 'coin',
  state: 'success',
  txid: '1234567890abcdef',
  txout: '0',
  block_number: '123456',
};

const mockCurrency = [
  { code: 'BTC', name: 'Bitcoin', visible: true },
  { code: 'ETH', name: 'Ethereum', visible: false },
];

const mockUser = [
  { email: 'user@example.com', uid: 'ID9NLOSN91004', state: 'active' },
];

const mockBlockchain = [
  { id: 'blockchain123', name: 'Bitcoin Blockchain', key: 'BTC', enabled: true },
];

export default function DepositDetails() {
  const history = useHistory ();

  const goToCurrencyDetails = (code: string) => {
    history.push(Routes.withParams.CurrenciesDetails({ code }));
  };

  const goToBlockchainDetails = (id: string) => {
    history.push(Routes.withParams.BlockchainsDetails({ id }));
  };

  const goToUserDetails = (uid: string) => {
    history.push(Routes.withParams.UsersDetails({ uid }));
  };

  const { t: translate } = useTranslation();
  const t = (id: string) => translate(`setter.layouts.operations.deposits.${id}`);

  const { tid } = useParams<RouteParams<DepositDetailsRouteParams>>();
 

  const currencyPrecision = 2;
  const currencyCode = "USD";
  const isCoin = true;

  const onReject = () => {
    console.log(tid)
  };

  const onApprove = () => {
    // handle approve
  };

   if(!mockDeposit.block_number){ return <Skeleton   active />  }

  return (
    <Card
      title={t("details.title")}
      extra={[
        <Button
          key={1}
          icon={<ReloadOutlined />}
          onClick={() => console.log('Reload')}
        >
          {t("table.reload")}
        </Button>,
      ]}
    >
       
        <Descriptions bordered column={{ lg: 2, md: 1 }}>
          <Descriptions.Item label={t("details.type")}>
            <List>
              <List.Item>
                <List.Item.Meta title={'deposit.tid'} description={<DepositType type={mockDeposit.type} />} />
              </List.Item>
            </List>
          </Descriptions.Item>
          <Descriptions.Item label={t("details.deposit.state")}>
            <List>
              <List.Item
                actions={[
                  <Button type="primary" danger onClick={onReject}>
                    {t("details.deposit.reject")}
                  </Button>,
                  <Button type="primary" onClick={onApprove}>
                    {t("details.deposit.approve")}
                  </Button>,
                ]}
              >
                <List.Item.Meta title={<DepositStateCell deposit={mockDeposit} />} />
              </List.Item>
            </List>
          </Descriptions.Item>

          <Descriptions.Item label={t("details.deposit.amount")}>
            {`${mockDeposit.amount.toFixed(currencyPrecision)} ${currencyCode}`}
          </Descriptions.Item>
          <Descriptions.Item label={t("details.deposit.fee")}>
            {`${mockDeposit.fee.toFixed(currencyPrecision)} ${currencyCode}`}
          </Descriptions.Item>
          <Descriptions.Item label={t("details.user.title")}>
            <List
              itemLayout="horizontal"
              dataSource={mockUser}
              renderItem={(c: any) => (
                <List.Item
                  extra={
                    <Button
                      shape="circle"
                      icon={<EllipsisOutlined />}
                      onClick={() => goToUserDetails(c.uid)}
                    />
                  }
                >
                  <List.Item.Meta
                    title={`${c.email} (${c.uid})`}
                    description={<UserStatus state={c.state} />}
                  />
                </List.Item>
              )}
            />
          </Descriptions.Item>

          <Descriptions.Item label={t("details.deposit.currency")}>
            <List
              itemLayout="horizontal"
              dataSource={mockCurrency}
              renderItem={(c: any) => (
                <List.Item
                  extra={
                    <Button
                      shape="circle"
                      icon={<EllipsisOutlined />}
                      onClick={() => goToCurrencyDetails(c.code)}
                    />
                  }
                >
                  <List.Item.Meta
                    title={<Badge status={c.visible ? "success" : "error"} text={`${c.name} (${c.code})`} />}
                  />
                </List.Item>
              )}
            />
          </Descriptions.Item>

          {isCoin && (
            <>
              <Descriptions.Item label={t("details.deposit.blockchain")}>
                <List
                  itemLayout="horizontal"
                  dataSource={mockBlockchain}
                  renderItem={(c: any) => (
                    <List.Item
                      extra={
                        <Button
                          shape="circle"
                          icon={<EllipsisOutlined />}
                          onClick={() => goToBlockchainDetails(c.id)}
                        />
                      }
                    >
                      <List.Item.Meta
                        title={<Badge status={c.enabled ? "success" : "error"} text={`${c.name} (${c.key})`} />}
                      />
                    </List.Item>
                  )}
                />
              </Descriptions.Item>
              <Descriptions.Item label={t("details.deposit.txid")}>
                <List
                  itemLayout="horizontal"
                  dataSource={[{ txid: mockDeposit.txid }]}
                  renderItem={(c: any) => (
                    <List.Item>
                      <List.Item.Meta title={c.txid} />
                      <Button
                        shape="circle"
                        target="_blank"
                        icon={<LinkOutlined />}
                        href={`https://explorer.example.com/tx/${c.txid}`}
                      />
                    </List.Item>
                  )}
                />
              </Descriptions.Item>
              <Descriptions.Item label={t("details.deposit.txout")}>
                {mockDeposit.txout}
              </Descriptions.Item>
              <Descriptions.Item label={t("details.deposit.block_number")}>
                {mockDeposit.block_number}
              </Descriptions.Item>
            </>
          )}
        </Descriptions>
       
    </Card>
  );
}
