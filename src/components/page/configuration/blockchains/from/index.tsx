
import { AutoComplete, Button, Col, Form, Input, Row } from "antd";
import { useTranslation } from "react-i18next";
import { BlockchainsData } from "..";
import { renderRows } from "utils/component-utils";

interface Props {
  onSubmit: (formModel: BlockchainsData) => void;
  formModel?: BlockchainsData;
}

const { Item: FormItem } = Form;

export default function BlockchainForm(props: Props) {
  const { t } = useTranslation();

  // Sample data for blockchain clients; replace with actual data as needed
  const data = { BlockchainClients: [{ client: "Ethereum" }, { client: "Bitcoin" }] };

  const blockchainClientOptions = data?.BlockchainClients?.map(({ client }) => ({
    value: client,
  })) || [];

  const formRows = [
    [
      <FormItem
        name="name"
        label={t("setter.layouts.configurations.blockchains.modal.form.name")}
        key="name"
        rules={[{ required: true, message: t("setter.layouts.configurations.blockchains.modal.form.name_required") }]}
      >
        <Input />
      </FormItem>,
      <FormItem
        name="height"
        label={t("setter.layouts.configurations.blockchains.modal.form.height")}
        key="height"
      >
        <Input type="number" />
      </FormItem>,
    ],
    [
      <FormItem
        name="client"
        label={t("setter.layouts.configurations.blockchains.modal.form.client")}
        key="client"
      >
        <AutoComplete options={blockchainClientOptions}>
          <Input />
        </AutoComplete>
      </FormItem>,
      <FormItem
        name="min_confirmations"
        label={t("setter.layouts.configurations.blockchains.modal.form.min_confirmations")}
        key="min_confirmations"
      >
        <Input type="number" />
      </FormItem>,
    ],
    [
      <FormItem
        name="key"
        label={t("setter.layouts.configurations.blockchains.modal.form.key")}
        key="key"
      >
        <Input />
      </FormItem>,
      <FormItem
        name="explorer_address"
        label={t("setter.layouts.configurations.blockchains.modal.form.explorer_address")}
        key="explorer_address"
      >
        <Input />
      </FormItem>,
    ],
    [
      <FormItem
        name="server"
        label={t("setter.layouts.configurations.blockchains.modal.form.server")}
        key="server"
      >
        <Input />
      </FormItem>,
      <FormItem
        name="explorer_transaction"
        label={t("setter.layouts.configurations.blockchains.modal.form.explorer_transaction")}
        key="explorer_transaction"
      >
        <Input />
      </FormItem>,
    ],
    [
      <FormItem
        name="enabled"
        label={t("setter.layouts.configurations.blockchains.modal.form.enabled")}
        key="enabled"
      >
        <Input type="checkbox" />
      </FormItem>
    ],
  ];

  return (
    <Form className="setter-form" onFinish={props.onSubmit} initialValues={props.formModel}>
      <Row gutter={24}>
        <Col span={24}>{renderRows(formRows)}</Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {t("setter.layouts.configurations.blockchains.modal.form.submit")}
        </Button>
      </Form.Item>
    </Form>
  );
}
