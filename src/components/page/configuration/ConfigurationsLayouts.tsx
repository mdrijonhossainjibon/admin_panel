
import { Layout } from "antd";
import { useTranslation } from "react-i18next";
import { Routes } from "../../../constants/routes";
import { DollarOutlined, ShopOutlined, WalletOutlined, BlockOutlined, PercentageOutlined, SendOutlined, AlignRightOutlined } from "@ant-design/icons";
import TabbedMenuLayout from "../../TabbedMenuLayout";

import { Route, Switch, Redirect } from "react-router-dom";
import { lazy } from "react";

const blockchains = lazy(() => import("./blockchains"));
const blockchainDetailsLayout = lazy(() => import("./blockchains/Details"));

const currencies = lazy(() => import("./currencies"));
const currenciesDetailsLayout = lazy(() => import("./currencies/details/"));

const markets = lazy(() => import('./markets'));

const marketsDetailsLayout = lazy(() => import("./markets/details/MarketDetailsLayout"));

const feesSchedule = lazy(() => import('./feesSchedule'));


const wallets = lazy(() => import("./wallets"));
const walletsDetailsLayout = lazy(() => import("./wallets/details"));


const Telegram_Confing = lazy(() => import('./telegram'));

const Telegram_Confing_List = lazy(() => import('./telegram/list'));

export default function ConfigurationsLayouts() {
  const { Content } = Layout;
  const { t } = useTranslation();

  const menuItems = [
    {
      key: Routes.Blockchains,
      content: (
        <>
          <BlockOutlined />
          <span> {t("setter.layouts.configurations.nav.blockchains")}</span>
        </>
      ),
    },
    {
      key: Routes.Currencies,
      content: (
        <>
          <DollarOutlined />
          <span> {t("setter.layouts.configurations.nav.currencies")}</span>
        </>
      ),
    },
    {
      key: Routes.Wallets,
      content: (
        <>
          <WalletOutlined />
          <span> {t("setter.layouts.configurations.nav.wallets")}</span>
        </>
      ),
    },
    {
      key: Routes.Markets,
      content: (
        <>
          <ShopOutlined />
          <span> {t("setter.layouts.configurations.nav.markets")}</span>
        </>
      ),
    }
    ,
    {
      key: Routes.Telegram_Confing,
      content: (
        <>
          <SendOutlined />
          <span> {t("setter.layouts.configurations.nav.tgc")}</span>
        </>
      ),
    },
    {
      key: Routes.Telegram_Confing_List,
      content: (
        <>
          <AlignRightOutlined />
          <span> {t("setter.layouts.configurations.nav.tgc_L")}</span>
        </>
      ),
    },
    {
      key: Routes.FeesSchedule,
      content: (
        <>
          <PercentageOutlined />
          <span> {t("setter.layouts.configurations.nav.feesSchedule")}</span>
        </>
      ),
    },
  ];

  return (
    <>
      <TabbedMenuLayout items={menuItems} />
      <Content>
        <Switch >
          <Route exact path={Routes.FeesSchedule} component={feesSchedule} />
          <Route exact path={Routes.Blockchains} component={blockchains} />
          <Route exact path={Routes.BlockchainsDetails} component={blockchainDetailsLayout} />
          <Route exact path={Routes.BlockchainsDetailsEdit} component={blockchainDetailsLayout} />

          <Route exact path={Routes.Currencies} component={currencies} />
          <Route exact path={Routes.CurrenciesDetails} component={currenciesDetailsLayout} />
          <Route exact path={Routes.CurrenciesDetailsEdit} component={currenciesDetailsLayout} />

          <Route exact path={Routes.Markets} component={markets} />
          <Route exact path={Routes.MarketsDetailsEdit} component={marketsDetailsLayout} />
          <Route exact path={Routes.MarketsDetails} component={marketsDetailsLayout} />


          <Route exact path={Routes.Wallets} component={wallets} />
          <Route exact path={Routes.WalletsDetails} component={walletsDetailsLayout} />
          <Route exact path={Routes.WalletsDetailsEdit} component={walletsDetailsLayout} />

          <Route  path={Routes.Telegram_Confing} component={ Telegram_Confing } />
          
          <Route  path={Routes.Telegram_Confing_List} component={ Telegram_Confing_List } />
          
          <Redirect to={Routes.Blockchains} />

        </Switch>
      </Content>
    </>
  );
}
