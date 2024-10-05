import { Layout } from "antd";
import { useTranslation } from "react-i18next";
import { Routes } from "../../../constants/routes";
import { ExceptionOutlined, FileDoneOutlined } from "@ant-design/icons";
import TabbedMenuLayout from "../../TabbedMenuLayout";
import { Route, Switch } from "react-router-dom"; // Import the correct Switch from react-router-dom
import { lazy } from "react";


const  Restrictions  = lazy (() => import('./restrictions'));
const userPermissions = lazy(() => import("./user-permissions"));

export default function DevopsLayout() {
  const { Content } = Layout;
  const { t } = useTranslation();

  const menuItems = [
    {
      key: Routes.Restrictions,
      content: (
        <>
          <FileDoneOutlined />
          <span>{t("setter.layouts.devops.nav.restrictions")}</span>
        </>
      ),
    },
    {
      key: Routes.UserPermissions,
      content: (
        <>
          <ExceptionOutlined />
          <span>{t("setter.layouts.devops.nav.userPermissions")}</span>
        </>
      ),
    },
  ];

  return (
    <>
      <TabbedMenuLayout items={menuItems} />
      <Content>
        <Switch>  {/* Correct Switch for routing */}
          <Route path={Routes.UserPermissions} component={userPermissions} />
          <Route path={Routes.Restrictions} component={Restrictions} />
        </Switch>
      </Content>
    </>
  );
}
