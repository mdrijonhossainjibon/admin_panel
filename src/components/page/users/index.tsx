
import { Layout } from "antd";
import { /*BarsOutlined,*/ TeamOutlined, ContainerOutlined, BarsOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Routes } from "../../../constants/routes";
import TabbedMenuLayout from "../../TabbedMenuLayout";
import { Route, Switch } from "react-router-dom";
import { lazy, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserRequest, fetchUserTgRequest } from "modules";


const userDetailsLayout = lazy(() => import("./users-list/user-details/UserDetailsLayout"));
const userListPage = lazy(() => import("./users-list"));
const Telegram = lazy(() => import("./users-list/telegram_bot"));
const userActivities = lazy(() => import("./users-list/user-details/activities"));
const userApplications = lazy(() => import("./applications/Applications"));


export default function UsersLayout() {
  const { Content } = Layout;
  const { t } = useTranslation();

  const dispatch = useDispatch();


  useEffect(() => {
    
    dispatch(fetchUserRequest());
    dispatch(fetchUserTgRequest());

  }, [dispatch])



  const menuItems = [
    {
      key: Routes.Users,
      content: (
        <>
          <TeamOutlined />
          <span>{t("setter.layouts.users.nav.users")}</span>
        </>
      ),
    },
    {
      key: Routes.Applications,
      content: (
        <>
          <ContainerOutlined />
          <span>{t("setter.layouts.users.nav.applications")}</span>
        </>
      ),
    },
    {
      key: Routes.Activities,
      content: (
        <>
          <BarsOutlined />
          <span>{t("setter.layouts.users.nav.activities")}</span>
        </>
      ),
    },
    {
      key: Routes.Telegram,
      content: (
        <>
          <BarsOutlined />
          <span>{t("setter.layouts.users.nav.telegram")}</span>
        </>
      ),
    }
  ];

  return (
    <>
      <TabbedMenuLayout items={menuItems} />
      <Content>
        <Switch>
          <Route path={Routes.UsersDetails} component={userDetailsLayout} />
          <Route path={Routes.Applications} component={userApplications} />
          <Route path={Routes.Activities} component={userActivities} />
          <Route path={Routes.Telegram} component={Telegram} />
          <Route path="*" component={userListPage} />
        </Switch>
      </Content>
    </>
  );
}