import   {  useState } from "react";
import { Tabs, Button, Space, Card } from "antd";
import { BlockchainRouteParams, Routes, RouteParams } from "../../../../../constants/routes";
import { ReloadOutlined } from "@ant-design/icons";
import { useLocation, useHistory, useParams, Switch, Route, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import BlockchainDetailsEdit from "./fromEdit";
import BlockchainDetailsMain from "./main";
 
export default function BlockchainDetailsLayout( ) {
  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation();
  const { id } = useParams<RouteParams<BlockchainRouteParams>>();
  const { TabPane } = Tabs;
  const [selectedMenuItem, setSelectedMenuItem] = useState(location.pathname);

  const onChange = (key: string) => {
    setSelectedMenuItem(key);
    if (key !== location.pathname) {
      history.push(key)
    }
  };

  return (
    <Card
      className="setter-page-header"
      title={t("BSC TESTNET")}
      extra={
        <Button icon={<ReloadOutlined />}>
          {t("setter.layouts.configurations.blockchains.table.reload")}
        </Button>
      }
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Tabs defaultActiveKey={selectedMenuItem} onChange={onChange}>
          <TabPane
            tab={t("setter.layouts.configurations.blockchains.details.nav.main")}
            key={Routes.withParams.BlockchainsDetails({ id })}
          />
          <TabPane
            tab={t("setter.layouts.configurations.blockchains.details.nav.edit")}
            key={Routes.withParams.BlockchainsDetailsEdit({ id })}
          />
        </Tabs>
      
        <Switch>
            <Route
              path={Routes.BlockchainsDetailsEdit}
              render={() => <BlockchainDetailsEdit loading={false}   />}
            />
            <Route
              path={Routes.BlockchainsDetails}
              render={() => <BlockchainDetailsMain loading={false}  />}
            />
            <Redirect to={Routes.withParams.BlockchainsDetails({ id  })} />
          </Switch>

      </Space>
    </Card>
  );
}
