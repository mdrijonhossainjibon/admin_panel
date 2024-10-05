import { useState } from "react";
import TweenOne from "rc-tween-one";
 

import { AdminMetrics_adminMetrics } from "queries/AdminMetrics";
import { Card, Statistic, Row, Col, Divider } from "antd";

import {
  ArrowUpOutlined,
  FieldTimeOutlined,
  TeamOutlined,
  DownloadOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  AuditOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import { StatisticProps } from "antd/lib";
 
export const formatter: StatisticProps['formatter'] = (value) => (
  <CountUp end={value as number} separator="," />
);

function findUpdates(object1: any, object2: any) {
  //const keys1 = Object.keys(object1 || {});
  const keys2 = Object.keys(object2 || {});

  let res = [];

  for (let key of keys2) {
    if (object1[key] !== object2[key]) {
      res.push(key);
    }
  }

  return res;
}

export default function Dashboard() {
  const { t: translate } = useTranslation();
  const t = (id: string) => translate(`setter.layouts.dashboard.${id}`);


  const defaultMetrics: AdminMetrics_adminMetrics = {
    usersTotal: 1000,
    users24H: 50,
    depositsTotal: 20000,
    deposits24H: 500,
    withdrawsTotal: 15000,
    withdraws24H: 300,
    tradesTotal: 30000,
    trades24H: 800,
    ordersTotal: 50000,
    ordersTotalPending: 200,
    orders24H: 1000,
    orders24HPartialFilled: 150,
    orders24HFilled: 850
  };


  const [metrics] = useState<AdminMetrics_adminMetrics>(defaultMetrics);


  const [old, setOld] = useState(metrics);

  const upd = findUpdates(old, metrics);

  if (upd.length > 0) {
    setTimeout(() => {
      setOld(metrics as any);
    }, 250);
  }
 

  return (
    <>
      <Divider>{t("General")}</Divider>
      <Row gutter={[8, 8]} style={{ margin: 1 }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <TweenOne animation={{ scale: upd.indexOf("usersTotal") > -1 || upd.indexOf("users24H") > -1 ? 0.9 : 1 }}>
            <Card>
              <Statistic
                title={`${t("usersTotal")}: ${metrics.usersTotal}`}
                prefix={<TeamOutlined />}
                value={metrics?.users24H} formatter={formatter}
                suffix={
                  <>
                    <FieldTimeOutlined />
                    24
                  </>
                }
              />
            </Card>
          </TweenOne>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <TweenOne
            animation={{ scale: upd.indexOf("depositsTotal") > -1 || upd.indexOf("deposits24H") > -1 ? 0.9 : 1 }}
          >
            <Card>
              <Statistic
                title={`${t("depositsTotal")}: ${metrics?.depositsTotal}`}
                prefix={<DownloadOutlined />}
                value={metrics.deposits24H} formatter={formatter}
                suffix={
                  <>
                    <FieldTimeOutlined />
                    24
                  </>
                }
              />
            </Card>
          </TweenOne>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <TweenOne
            animation={{ scale: upd.indexOf("withdrawsTotal") > -1 || upd.indexOf("withdraws24H") > -1 ? 0.9 : 1 }}
          >
            <Card>
              <Statistic
                title={`${t("withdrawsTotal")}: ${metrics.withdrawsTotal}`}
                prefix={<UploadOutlined />}
                value={metrics.withdraws24H}
                formatter={formatter}
                suffix={
                  <>
                    <FieldTimeOutlined />
                    24
                  </>
                }
              />
            </Card>
          </TweenOne>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <TweenOne animation={{ scale: upd.indexOf("tradesTotal") > -1 || upd.indexOf("trades24H") > -1 ? 0.9 : 1 }}>
            <Card>
              <Statistic
                title={`${t("tradesTotal")}: ${metrics.tradesTotal}`}
                prefix={<ArrowUpOutlined />}
                value={metrics.trades24H} formatter={formatter}
                suffix={
                  <>
                    <FieldTimeOutlined />
                    24
                  </>
                }
              />
            </Card>
          </TweenOne>
        </Col>
      </Row>

      <Divider>{t("Orders")}</Divider>

      <Row gutter={[8, 8]} style={{ margin: 1 }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <TweenOne
            animation={{ scale: upd.indexOf("ordersTotal") > -1 || upd.indexOf("ordersTotalPending") > -1 ? 0.9 : 1 }}
          >
            <Card>
              <Statistic
                title={`${t("ordersTotalPending")}`}
                value={metrics.ordersTotal} formatter={formatter}
                suffix={
                  <>
                    <AuditOutlined />
                    {metrics.ordersTotalPending}
                  </>
                }
              />
            </Card>
          </TweenOne>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6}>
          <TweenOne animation={{ scale: upd.indexOf("orders24H") > -1 ? 0.9 : 1 }}>
            <Card>
              <Statistic title={`${t("orders24H")}`} value={metrics.orders24H} suffix={<AuditOutlined />} formatter={formatter} />
            </Card>
          </TweenOne>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <TweenOne animation={{ scale: upd.indexOf("orders24HPartialFilled") > -1 ? 0.9 : 1 }}>
            <Card>
              <Statistic
                title={`${t("orders24HPartialFilled")}`}
                value={metrics.orders24HPartialFilled} formatter={formatter}
                suffix={<CheckOutlined />}
              />
            </Card>
          </TweenOne>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <TweenOne animation={{ scale: upd.indexOf("orders24HFilled") > -1 ? 0.9 : 1 }}>
            <Card>
              <Statistic
                title={`${t("orders24HFilled")}`}
                value={metrics.orders24HFilled} formatter={formatter}
                suffix={<CheckCircleOutlined />}
              />
            </Card>
          </TweenOne>
        </Col>
      </Row>
    </>
  );
}
