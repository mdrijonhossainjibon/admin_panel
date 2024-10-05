import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Tabs, Button, Space, Skeleton, Empty } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { RouteParams, Routes, WalletRouteParams } from "../../../../../constants/routes";
import { useLocation, useHistory, useParams, Switch, Route, Redirect } from "react-router-dom";
import WalletsForm from "../form";
import WalletDetailsMain from "./main";
export default function WalletDetailsLayout({ children }: { children?: React.ReactNode }) {
  const { t } = useTranslation();

  const { id } = useParams<RouteParams<WalletRouteParams>>();
  const location = useLocation();
  const history = useHistory();

  const [selectedTab, setSelectedTab] = useState(location.pathname);


  const wallet: any = { address: '0x7455e18958a54aa28c46f2621ad2f8437e6efacf', name: 'Bitcoin', currency_code: 'BTC', enabled: true, id: 1, kind: 'deposit' };

  const handleTabChange = (key: string) => {
    setSelectedTab(String(key));

    if (String(key) !== location.pathname) {
      history.push(String(key));
    }
  };

  return (
    <>
      <Card

        className="setter-page-header"

        title={wallet?.name}
        extra={
          <Button icon={<ReloadOutlined />} >
            {t("setter.layouts.configurations.wallets.table.reload")}
          </Button>
        }
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Tabs defaultActiveKey={selectedTab} onChange={handleTabChange}>
            <Tabs.TabPane
              tab={t("setter.layouts.configurations.wallets.details.nav.info")}
              key={Routes.withParams.WalletsDetails({ id })}
            >   {children} </Tabs.TabPane>
            <Tabs.TabPane
              tab={t("setter.layouts.configurations.wallets.details.nav.edit")}
              key={Routes.withParams.WalletsDetailsEdit({ id })}
            >

            </Tabs.TabPane>
          </Tabs>

          <Switch>
            <Route
              path={Routes.WalletsDetailsEdit}
              render={() => (
                <Skeleton paragraph={{ rows: 20 }} loading={false}>
                  <WalletsForm initialData={wallet} />
                </Skeleton>
              )}
            />
            <Route
              path={Routes.WalletsDetails}
              render={() => (
                <Skeleton paragraph={{ rows: 12 }} loading={false}>
                  {wallet ? <WalletDetailsMain /> : <Empty />}
                </Skeleton>
              )}
            />
            <Redirect to={Routes.withParams.WalletsDetails({ id })} />
          </Switch>

        </Space>
      </Card>
    </>
  );
}
