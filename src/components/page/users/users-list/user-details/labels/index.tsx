import React, { useState } from "react";
import { Button, Card, Tag, Typography, Modal, Space, Tooltip, Descriptions, Empty } from "antd";
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import LabelForm from "./LabelForm";
import { useTranslation } from "react-i18next";
 


 

export default function UserLabels({ user }: any) {
  const { t: translate } = useTranslation();
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>(undefined);

  const t = (id: string) => translate(`setter.layouts.users.details.labels.${id}`);

  const handleDelete = (e: React.MouseEvent, label: any) => {
    e.stopPropagation();

    Modal.confirm({
      maskClosable: true,
      title: t("confirm.title"),
      icon: <ExclamationCircleOutlined />,
      okText: t("confirm.ok"),
      cancelText: t("confirm.cancel"),
      onOk: () => {
        // Delete label logic here
      },
    });
  };



 

  const handleFormModal = (isOpen: boolean, formData?: any) => {
    setFormModalOpen(isOpen);
    setFormData(formData);
  };

  const handleFormComplete = () => {
    setFormModalOpen(false);
  };

  return (
    <Card className="setter-details-card">
      <Descriptions
        title={
          <Space>
            <Typography.Text strong>{t("title")}</Typography.Text>
            <Button type="primary" onClick={() => setFormModalOpen(true)}>
              + {t("new")}
            </Button>
          </Space>
        }
      >
        <Descriptions.Item>
          {user?.labels && user.labels.length > 0 ? (
            user.labels.map((label: any, index: number) => (
              <Tag
                key={index}
                color="success"
                tabIndex={0}
                onClick={() => handleFormModal(true, label)}
                style={{ padding: "0.25rem 0.75rem" }}
              >
                <Space size={8}>
                  <span>
                    {label.key}: {label.value}
                  </span>
                  <Tooltip title={t("delete")}>
                    <Button
                      shape="circle"
                      icon={<DeleteOutlined />}
                      onClick={(e) => handleDelete(e, label)}
                    />
                  </Tooltip>
                </Space>
              </Tag>
            ))
          ) : (
            <Empty description={t("noLabels")} />
          )}
        </Descriptions.Item>
      </Descriptions>
      <Modal
        title={formData ? t("form.edit") : t("form.create")}
        visible={isFormModalOpen}
        onCancel={() => handleFormModal(false)}
        footer={null}
        destroyOnClose={true}
      >
        <LabelForm user={user} onCompleted={handleFormComplete} initialData={formData} />
      </Modal>
    </Card>
  );
}
