import React, { useEffect } from "react";
import { Button, Card, Space, Table, Typography } from "antd";
import { useDate } from "utils/hooks";
import { useTranslation } from "react-i18next";
import { UAParser } from "ua-parser-js";
import { AdminUserActivitiesVariables } from "queries/AdminUserActivities";
import { ActivityResult } from "../../../../../../constants/user";
import { BlockProps } from "antd/lib/typography/Base";
import qs from "querystring";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchActivitiesRequest } from "modules";
import { RouteParams, UserRouteParams } from "constants/routes";

const activityColors: { [key in ActivityResult]: BlockProps["type"] } = {
  [ActivityResult.Succeed]: "success",
  [ActivityResult.Denied]: "danger",
  [ActivityResult.Failed]: "danger",
  [ActivityResult.Pending]: 'secondary'
};
 

 




export default function UserDetailsActivities( ) {
  const { formatDate } = useDate();
  const { t: translate } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const queryData = history.location.search ? qs.parse(history.location.search.replace("?", "")) : {};
  
  const { uid } = useParams<RouteParams<UserRouteParams>>();


  useEffect(()=>{
    dispatch(fetchActivitiesRequest())
  }, [ dispatch ])


  const query: any = {
    ...queryData,
    uid ,
    limit: queryData.limit ? queryData.limit : "20",
    page: queryData.page ? queryData.page : "1",
  };

  const data = useSelector((state :any) => state.users.activities) as any[]; // Replace this with actual data fetching logic
  

  const [filterA, setFilterA] = React.useState<AdminUserActivitiesVariables | undefined>(query);
 

  const activities = data.map((activity) => {
    const ua = new UAParser(activity.user_agent);
    const noteObj = activity.data && JSON.parse(activity.data);

    let note: string | undefined = undefined;

    if (noteObj) {
      if (noteObj.note) note = noteObj.note;
      if (noteObj.reason) note = noteObj.reason;
    }

    return {
      ...activity,
      note,
      browser: ua.getBrowser().name,
      os: ua.getOS().name,
    };
  });

  const t = (id: string) => translate(`setter.layouts.users.details.activities.${id}`);


  const uniqueOS = [...new Set(activities.map(activity => activity.os))];
  const uniqueBrowsers = [...new Set(activities.map(activity => activity.browser))];



  const columns = [
    {
      title: t("date"),
      dataIndex: "created_at",
      key: "created_at",
      render: (value: string) => formatDate(value),
    },
    {
      title: t("action"),
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: t("result.title"),
      dataIndex: "result",
      key: "result",
      render: (value: ActivityResult) => (
        <Typography.Text type={activityColors[value]}>{t(`result.${value?.toLocaleLowerCase()}`)}</Typography.Text>
      ),
    },
    {
      title: t("note"),
      dataIndex: "note",
      key: "note",
      withd: "100%"
    },
    {
      title: t("ip"),
      dataIndex: "user_ip",
      key: "user_ip",
    },
    {
      title: t("browser"),
      dataIndex: "browser",
      key: "browser",
      filters: uniqueBrowsers.map(browser => ({ text: browser, value: browser })),
      onFilter: (value: any, record: any) => record.browser === value,
    },
    {
      title: t("os"),
      dataIndex: "os",
      key: "os",
      filters: uniqueOS.map(os => ({ text: os, value: os })),
      onFilter: (value: any, record: any) => record.os === value,
    },
  ];




  return (
    <>
      <Card extra={[<Space><Button type='default' >Reload</Button></Space>]}>
        <Table
          dataSource={activities}
          columns={columns as any[]}
          onChange={(pagination) => {
            const params: any = {
              page: String(pagination.current),
              limit: String(pagination.pageSize),
            };
            const queryString = qs.stringify(params);
            history.push({ search: queryString });
            setFilterA(params);
          }}
          pagination={{
            position: ['bottomRight'],
            current: filterA ? Number(filterA.page) : 1,
            pageSize: filterA ? Number(filterA.limit) : 20,
            showQuickJumper: true,
            showSizeChanger: true,
          }}
        />
      </Card>
    </>
  );
}
