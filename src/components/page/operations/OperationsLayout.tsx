
import { Layout } from "antd";
import { useTranslation } from "react-i18next";

import {
    AuditOutlined,
    PieChartOutlined,
    DownloadOutlined,
    UploadOutlined,
    FieldTimeOutlined,
    TransactionOutlined,
    ControlOutlined,
} from "@ant-design/icons";

import TabbedMenuLayout from "../../TabbedMenuLayout";

import { Routes } from "constants/routes";
import { Redirect, Route, Switch } from "react-router-dom";
import { lazy } from "react";

const deposits = lazy(() => import("./deposits/"));
const depositsDetails = lazy(() => import("./deposits/depositDetails"));

const withdrawals = lazy(() => import("./withdrawals"));

const pendingWithdrawals = lazy(() => import("./pending-withdrawals"));
const adjustments = lazy(() => import("./adjustments"));
const orders = lazy(() => import("./orders"));
const trades = lazy(() => import("./trades"));
const businessAnalytics = lazy(() => import("./business-analytics"));

export default function OperationsLayout() {
    const { Content } = Layout;
    const { t } = useTranslation();

    const menuItems = [
        {
            key: Routes.Deposits,
            content: (
                <>
                    <DownloadOutlined />
                    <span>{t("setter.layouts.operations.nav.deposits")}</span>
                </>
            ),
        },
        {
            key: Routes.Withdrawals,
            content: (
                <>
                    <UploadOutlined />
                    <span>{t("setter.layouts.operations.nav.withdrawals")}</span>
                </>
            ),
        },
        {
            key: Routes.PendingWithdrawals,
            content: (
                <>
                    <FieldTimeOutlined />
                    <span>{t("setter.layouts.operations.nav.pendingWithdrawals")}</span>
                </>
            ),
        },
        {
            key: Routes.Adjustments,
            content: (
                <>
                    <ControlOutlined />
                    <span>{t("setter.layouts.operations.nav.adjustments")}</span>
                </>
            ),
        },
        {
            key: Routes.Orders,
            content: (
                <>
                    <AuditOutlined />
                    <span>{t("setter.layouts.operations.nav.orders")}</span>
                </>
            ),
        },
        {
            key: Routes.Trades,
            content: (
                <>
                    <TransactionOutlined />
                    <span>{t("setter.layouts.operations.nav.trades")}</span>
                </>
            ),
        },
        {
            key: Routes.BusinessAnalytics,
            content: (
                <>
                    <PieChartOutlined />
                    <span>{t("setter.layouts.operations.nav.businessAnalytics")}</span>
                </>
            ),
        },
    ];

    return (
        <>
            <TabbedMenuLayout items={menuItems} />
            <Content>
                <Switch >  
                     <Route path={Routes.DepositsDetails} component={depositsDetails} />
                     <Route path={Routes.Deposits} component={deposits} /> 
                     
                     <Route path={Routes.Withdrawals} component={withdrawals} />

                     <Route path={Routes.PendingWithdrawals} component={pendingWithdrawals} />

                     <Route path={Routes.Adjustments} component={adjustments} />
                     <Route path={Routes.Orders} component={orders} />
                     <Route path={Routes.Trades} component={trades} />
                     <Route path={Routes.BusinessAnalytics} component={businessAnalytics} />

                    <Redirect to={Routes.Deposits} />
                </Switch>
            </Content>
        </>
    );
}
