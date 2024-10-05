
import { Card, Tabs } from "antd";
import { RouteParams, Routes, UserRouteParams } from "../../../../../constants/routes";
import { useHistory, useLocation, Switch, Route, useParams, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { sortMenuItems } from "../../../../TabbedMenuLayout";


import { UserState } from "../../../../../constants/user";
import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRequest, SelectoUser, SelectoUserLIstLoading } from "modules";







const UserDetailsMainInfo = lazy(() => import("./main/UserDetailsMainInfo"));
const UserDetailsKyc = lazy(() => import("./kyc/UserDetailsKYC"));
const UserDetailsOpenOrders = lazy(() => import("./open-orders/UserDetailsOpenOrders"));
const UserDetailsBalances = lazy(() => import("./balances"));
//const UserDetailsHistory = lazy(() => import("./history/UserDetailsHistory"));
const UserDetailsActivities = lazy(() => import('./activities'));


export default function UserDetailsLayout() {
    const location = useLocation();
    const history = useHistory();
    const { t } = useTranslation();
    const { uid } = useParams<RouteParams<UserRouteParams>>();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchUserRequest())
    }, [dispatch])

    const handleTabChange = (key: string) => {
        if (key !== location.pathname) {
            history.push(key);
        }
    };


    const user: any[] = [];
    const loading = useSelector(SelectoUserLIstLoading)

    const active = user.find((userv) => userv.uid === uid)
    
    const data = useSelector(SelectoUser)
 



    const menuItems = [
        {
            key: Routes.withParams.UsersDetails({ uid }),
            content: t("setter.layouts.users.details.nav.main"),
            show: true,
        },
        {
            key: Routes.withParams.UsersDetailsKYC({ uid }),
            content: t("setter.layouts.users.details.nav.kyc"),
            show: true,
        },
        {
            key: Routes.withParams.UsersDetailsOpenOrders({ uid }),
            content: t("setter.layouts.users.details.nav.openOrders"),
            show: true
        },
        {
            key: Routes.withParams.UsersDetailsBalances({ uid }),
            content: t("setter.layouts.users.details.nav.balances"),
            show: true,
        },
        {
            key: Routes.withParams.UsersDetailsHistory({ uid }),
            content: t("setter.layouts.users.details.nav.history"),
            show: active?.state === UserState.Active,
        },
        {
            key: Routes.withParams.UsersDetailsActivities({ uid }),
            content: t("setter.layouts.users.details.nav.activities"),
            show: true,
        },
    ];

    const selectedKey = sortMenuItems(menuItems).find((item) => location.pathname.includes(item.key))?.key;


    return (
        <>
            <Card title={active?.uid}  >
                <Tabs activeKey={selectedKey} onChange={handleTabChange} items={menuItems.filter(item => item.show).map((item) => ({ key: item.key, label: item.content }))} />
            </Card>


            <Switch>
                <Route exact path={Routes.UsersDetails} render={() => <UserDetailsMainInfo {...{ user : data , loading }} />} />
                <Route exact path={Routes.UsersDetailsKYC} render={() => <UserDetailsKyc {...{ user, loading }} />} />
                <Route path={Routes.UsersDetailsActivities} render={() => <UserDetailsActivities />} />
                <Route path={Routes.UsersDetailsBalances} render={() => <UserDetailsBalances />} />
                <Route path={Routes.UsersDetailsOpenOrders} render={() => <UserDetailsOpenOrders   {...{ user, loading }} />} />
                <Redirect to={Routes.withParams.UsersDetails({ uid })} />


            </Switch>

        </>
    );
}
