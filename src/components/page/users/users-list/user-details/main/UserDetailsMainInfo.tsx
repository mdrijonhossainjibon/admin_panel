import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Card, Col, Descriptions, Empty, List, Modal, Row, Select, Skeleton, Space, Switch, Typography } from "antd";
import { BlockProps } from "antd/es/typography/Base";
import { Routes } from "constants/routes";
import { ProfileState, UserRole, UserState } from "constants/user";
import React, { FC, useState } from "react"
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";

import { useDate } from "utils";
import ProfileForm from "./form";
import KYCVerification from "../kyc/KYCVerification";
import UserLabels from "../labels";



const profileStateColors: { [key in ProfileState]: BlockProps["type"] } = {
  [ProfileState.Verified]: "success",
  [ProfileState.Rejected]: "danger",
  [ProfileState.Submitted]: "warning",
  [ProfileState.Drafted]: undefined,
};


const UserDetailsMainInfo: FC<{ user: any[]  , loading : boolean }> = (props): React.JSX.Element => {

  const { formatDate } = useDate();
  const { t: translate } = useTranslation();
  const history = useHistory();
  const { uid } = useParams<{ uid: string }>()

  const t = (id: string) => translate(`setter.layouts.users.details.main.${id}`);

  const users = props.user.find((item) => item.uid === uid)
  const profile = users?.profile ? users.profile[users.profile.length - 1] : null;

 

  const renderProfileValues = () => {
    if (profile) {
      const _profile = {
        ...profile,
        nationality: JSON.parse(profile.metadata || "{}")?.nationality,
      };

      const keys: Array<keyof typeof _profile> = [
        "state",
        "first_name",
        "last_name",
        "address",
        "city",
        "country",
        "dob",
        "nationality",
        "postcode",
      ];

      const onHandleState = (state: string) => {
        //updateUserProfile({ variables: { uid: user.uid, state } });
      };

      return keys.map((key) => {
        let value: any = _profile[key];
        let label = t(`profile.${key as any}`);

        if (key === "dob") value = formatDate(value, "PP");

        if (key === "state") {
          if (value === "submitted") {
            value = (
              <List>
                <List.Item
                  actions={[
                    <Button type="primary" danger onClick={() => onHandleState("rejected")}>
                      {t("profile.reject")}
                    </Button>,
                    <Button type="primary" onClick={() => onHandleState("verified")}>
                      {t("profile.approve")}
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    description={
                      <Typography.Text strong type={profileStateColors[value as ProfileState]}>
                        {t(`profile.state.${value}`)}
                      </Typography.Text>
                    }
                  />
                </List.Item>
              </List>
            );
          } else {
            value = (
              <Typography.Text strong type={profileStateColors[value as ProfileState]}>
                {t(`profile.state.${value}`)}
              </Typography.Text>
            );
          }
          label = t(`profile.state.title`);
        }

        return (
          <Descriptions.Item key={key as any} label={label}>
            {value}
          </Descriptions.Item>
        );
      });
    }

    return null;
  };

 
  if (props.loading || !users) {
    return <Skeleton />
  }
   
  return (
    <>  <Card className="setter-details-card">
      <Descriptions column={2} bordered title={t("title")}>
        <Descriptions.Item label={t("uid")}>{ uid }</Descriptions.Item>
        <Descriptions.Item label={t("level")}>{users.level}</Descriptions.Item>
        <Descriptions.Item label={t("email")}>
          <EditableItem
            t={t}
            value={users.role}
            onUpdate={async (role) => {
              //await updateUserRole({ variables: { role, uid: user.uid } });
            }}
            options={Object.values(UserRole)}
          />

        </Descriptions.Item>
        <Descriptions.Item label={t("referral")}>
          {users.referral_uid ? (
            <List>
              <List.Item
                extra={
                  <Button
                    shape="circle"
                    icon={<EllipsisOutlined />}
                    onClick={() => {
                      history.push(Routes.withParams.UsersDetails({ uid: users.referral_uid }));
                    }}
                  />
                }
              >
                <List.Item.Meta title={users.referral_uid} />
              </List.Item>
            </List>
          ) : null}
        </Descriptions.Item>
        <Descriptions.Item label={t("feeGroup")}>feeGroup</Descriptions.Item>
        <Descriptions.Item label={t("2fa.label")}>
          <Space>
            <Switch
              disabled={!users.otp}
              //loading={loadingUpdate}
              checked={users.otp}
            //onChange={(otp) => handleUpdate({ otp })}
            />
            <span>{users.otp ? t("2fa.enabled") : t("2fa.disabled")}</span>
          </Space>
        </Descriptions.Item>

        <Descriptions.Item label={t("state")}>
          <EditableItem
            t={t} onUpdate={async (state) => {
              ///await updateUserAttributes({ variables: { state, uid: user.uid } });
            }}
            value={users.state}
            options={Object.values(UserState)} />
        </Descriptions.Item>
      </Descriptions>

      <Row gutter={24}>
        <Col span={12}>
          <Descriptions title={<Space>  <div>{t("profile.title")}</div>  {profile?.state === ProfileState.Submitted && <EditProfile user={users} profile={profile} t={t} />}  </Space>} column={1} bordered >
            {!profile ? (
              <Descriptions.Item>
                <Empty description={t("profile.missing")} />
              </Descriptions.Item>
            ) : (
              renderProfileValues()
            )}

          </Descriptions>

          <Col span={12}>
            <KYCVerification user={users} />
          </Col>

        </Col>
      </Row>


      <UserLabels user={users} />

    </Card>

    </>
  )
}


interface EditProfile { t: (id: string) => string, profile: any, user: any }


const EditProfile: FC<EditProfile> = (props): React.JSX.Element => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleComplete = () => {
    setModalOpen(false);
  };


  return (
    <>
      <Button type='primary' onClick={() => setModalOpen(true)}> {props.t("profile.edit")} </Button>
      <Modal open={isModalOpen} onClose={() => setModalOpen(false)} title={props.t("profile.edit")}
        footer={null}
        destroyOnClose={true}
        onCancel={() => setModalOpen(false)}
      >  <ProfileForm initialValues={props.profile} uid="1" onCompleted={handleComplete} />  </Modal>
    </>
  )
}




const EditableItem = <T extends string>({ value, onUpdate, options, t, }: { value: T; onUpdate: (value: T) => Promise<void>; options: T[]; t: (id: string) => string; }) => {
  const [isEditing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSelect = async (selectedValue: any) => {
    setLoading(true);
    selectedValue !== value && (await onUpdate(selectedValue));
    setEditing(false);
    setLoading(false);
  };

  return (
    <>
      {isEditing ? (
        <Select loading={loading} defaultValue={value} onSelect={handleSelect} popupMatchSelectWidth={false}>
          {options.map((value) => (
            <Select.Option key={value} value={value}>
              {value}
            </Select.Option>
          ))}
        </Select>
      ) : (
        value
      )}
      <Button type="link" onClick={() => setEditing(!isEditing)}>
        {isEditing ? t("close") : t("edit")}
      </Button>
    </>
  );
};





export default UserDetailsMainInfo;
