import { Card, Tabs } from "antd";
import { Routes } from "../../../../constants/routes";
import {     useLocation,  useHistory } from "react-router-dom";
import Assets from "./Assets";
import { useTranslation } from "react-i18next";

export default function BusinessAnalytics() {
  const history =  useHistory();
  const location = useLocation();
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.operations.businessAnalytics.${id}`);

  const handleMenu = (key: string) => {
    history.push(key);
  };

  const routes = [
    { route: Routes.Assets,   name: t("nav.assets") , component : <Assets />},
    { route: Routes.Liabilities,  name: t("nav.liabilities"), component : <Assets /> },
    { route: Routes.Revenues,  name: t("nav.revenues") ,component : <Assets />  },
    { route: Routes.Expenses,  name: t("nav.expenses") ,component : <Assets /> },
  ];

  const selectedKey = routes.find((item) => item.route === location.pathname)?.route;

  return (
    <>
      <Card
        className="setter-page-header"
        
        title={translate("setter.layouts.operations.nav.businessAnalytics")}
      >
        <Tabs activeKey={selectedKey} onChange={handleMenu}>
          {routes.map((item) => (
            <Tabs.TabPane tab={item.name} key={item.route} > { item.component } </Tabs.TabPane>
          ))}
        </Tabs>

          
        
      </Card>
    </>
  );
}
