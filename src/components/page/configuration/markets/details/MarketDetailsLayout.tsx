import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, Skeleton, Button, Space, Card } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { MarketRouteParams, RouteParams, Routes } from "../../../../../constants/routes";
import { useParams, useLocation, useHistory, Switch, Route, Redirect } from "react-router-dom";
import MarketDetailsMain from "./main/MarketDetailsMain";
import MarketsForm from '../form';
 

export default function MarketDetailsLayout() {
    const { t } = useTranslation();
    const { id } = useParams<RouteParams<MarketRouteParams>>();
    const location = useLocation();
    const history = useHistory();

    const [selectedTab, setSelectedTab] = useState(location.pathname);

    // Mock market data
    const market: any = {
        id: "1",
        name: "BTC/USD",
        base_unit: "btc",
        quote_unit: "usd",
        base_currency: "BTC",
        quote_currency: "USD",
        max_price: "60000",
        min_price: "10000",
        min_amount: "0.001",
        amount_precision: 8,
        price_precision: 2,
        position: 1,
        enabled: true,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-08-01T00:00:00Z",
        visible: true
    }
        ;

    const handleTabChange = (key: string) => {
        setSelectedTab(String(key));

        if (String(key) !== location.pathname) {
            history.replace(String(key));
        }
    };

    return (
        <>
            <Card
                
                className="setter-page-header"
                
                title={market?.name}
                extra={
                    <Button icon={<ReloadOutlined />}>
                        {t("setter.layouts.configurations.markets.table.reload")}
                    </Button>
                }
                 
            >
                <Space direction="vertical" style={{ width: "100%" }}>
                    <Tabs defaultActiveKey={selectedTab} onChange={handleTabChange}>
                        <Tabs.TabPane
                            tab={t("setter.layouts.configurations.markets.details.nav.info")}
                            key={Routes.withParams.MarketsDetails({ id })}
                        />
                        <Tabs.TabPane
                            tab={t("setter.layouts.configurations.markets.details.nav.edit")}
                            key={Routes.withParams.MarketsDetailsEdit({ id })}
                        />
                    </Tabs>

                    <Switch>
                        <Route
                            path={Routes.MarketsDetailsEdit}
                            render={() => (
                                <Skeleton paragraph={{ rows: 11 }} active loading={false}>
                                    <MarketsForm
                                        initialData={{
                                            ...market,
                                            max_price: Number(market.max_price),
                                            min_price: Number(market.min_price),
                                            min_amount: Number(market.min_amount),
                                            base_currency: market.base_unit,
                                            quote_currency: market.quote_unit,
                                        }}
                                    />
                                </Skeleton>
                            )}
                        />
                        <Route
                            path={Routes.MarketsDetails}
                            render={() => (
                                <Skeleton loading={false} paragraph={{ rows: 9 }} active>
                                    <MarketDetailsMain market={market!} />
                                </Skeleton>
                            )}
                        />
                        <Redirect to={Routes.withParams.MarketsDetails({ id })} />
                    </Switch>
                </Space>
            </Card>
        </>
    );
}
