import React, { useEffect, useState } from "react";
import { Form, Input, Button, AutoComplete, Select } from "antd";
import { useTranslation } from "react-i18next";

interface LabelData {
  key: string;
  value: string;
  scope: "private" | "public";
}

interface User {
  uid: string;
  // Add other user properties here
}

interface Label {
  key: string;
  value: string;
  scope: "private" | "public";
  // Add other label properties here
}

interface Props {
  user: User;
  initialData?: Label;
  onCompleted: () => void;
}

const LabelForm: React.FC<Props> = ({ onCompleted, user, initialData }) => {
  const { t: translate } = useTranslation();
  const [form] = Form.useForm();
  const isUpdating = !!initialData;
  const [loading, setLoading] = useState(false);

  const t = (id: string) => translate(`setter.layouts.users.details.labels.form.${id}`);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    }
  }, [initialData, form]);

  const handleFormChange = (changedValues: Partial<LabelData>) => {
    if (changedValues.key) {
      form.setFieldsValue({ value: undefined });
    }
  };

  const handleSubmit = async (values: LabelData) => {
    setLoading(true);
    try {
      const variables :any = {
        uid: user.uid,
        ...values,
      };
      console.log(variables)

      // Perform create or update logic here
      if (isUpdating) {
        // Update label logic
      } else {
        // Create label logic
      }
      onCompleted();
    } finally {
      setLoading(false);
    }
  };

  const scopeOptions = ["private", "public"].map((value) => ({ label: t(`scope.${value}`), value }));

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleFormChange}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="key"
        label={t("key")}
        rules={[{ required: true, message: t("keyRequired") }]}
      >
        <AutoComplete
          options={[]}  // Add your options here
          disabled={isUpdating}
        >
          <Input />
        </AutoComplete>
      </Form.Item>
      <Form.Item
        name="value"
        label={t("value")}
        rules={[{ required: true, message: t("valueRequired") }]}
      >
        <AutoComplete
          options={[]}  // Add your options here
        >
          <Input />
        </AutoComplete>
      </Form.Item>
      <Form.Item
        name="scope"
        label={t("scope.label")}
        rules={[{ required: true, message: t("scopeRequired") }]}
      >
        <Select options={scopeOptions} disabled={isUpdating} />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          {isUpdating ? t("edit") : t("create")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LabelForm;
