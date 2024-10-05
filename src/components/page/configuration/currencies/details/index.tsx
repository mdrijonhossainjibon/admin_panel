import {   useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Card, Tabs,   Space, Skeleton } from "antd";
import { CurrencyRouteParams, RouteParams, Routes } from "../../../../../constants/routes";
import { ReloadOutlined } from "@ant-design/icons";
import { useParams, useLocation, useHistory, Switch, Route, Redirect } from "react-router-dom";
import CurrencyDetailsEdit from "./edit";
import CurrencyDetailsMain from "./main";
 
 

 

export default function CurrencyDetailsLayout({  children  } : { children: React.ReactNode}) {
  const { t } = useTranslation();

  const { code } = useParams<RouteParams<CurrencyRouteParams>>();
  const location = useLocation();
  const history = useHistory();
   
  const [selectedTab, setSelectedTab] = useState(location.pathname);

 const CallCurrencies :any = []
 const loading = false




  const currency :any = {};

  const handleTabChange = (key: string) => {
     
    setSelectedTab(key);

    if (key !== location.pathname) {
      history.push(key);
    }
  };

  return (
    <>
      <Card
        className="setter-page-header"
        
        title={currency?.name}
      
        extra={[
          <Button icon={<ReloadOutlined />} onClick={ CallCurrencies }  loading= { loading }>
            {t("setter.layouts.configurations.currencies.table.reload")}
          </Button>,
        ]}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Tabs onChange={handleTabChange} activeKey={selectedTab}>
            <Tabs.TabPane
              tab={t("setter.layouts.configurations.currencies.details.nav.main")}
              key={Routes.withParams.CurrenciesDetails({ code })}
            />
            <Tabs.TabPane
              tab={t("setter.layouts.configurations.currencies.details.nav.edit")}
              key={Routes.withParams.CurrenciesDetailsEdit({ code })}
            />
          </Tabs>

 

          <Switch>
            <Route
              path={Routes.CurrenciesDetailsEdit}
              render={() => (
                <Skeleton loading={false} active paragraph={{ rows: 24 }}>
                  {currency && <CurrencyDetailsEdit    />}
                </Skeleton>
              )}
            />
            <Route
              path={Routes.CurrenciesDetails}
              render={() => (
                <Skeleton loading={false} active paragraph={{ rows: 9 }}>
                  {currency && <CurrencyDetailsMain   />}
                </Skeleton>
              )}
            />
            <Redirect to={Routes.withParams.CurrenciesDetails({ code })} />
          </Switch>

        </Space>
      </Card>
      
    </>
  );
}
