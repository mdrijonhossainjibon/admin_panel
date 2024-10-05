import { useEffect, useState } from "react";
import { Button, InputNumber, message, Row, Col, Card, Space } from "antd";

import BlockchainForm from '../../from';



import { useHistory, useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { BlockchainRouteParams, RouteParams, Routes } from "../../../../../../constants/routes";

import { BlockchainsData } from "../..";



interface Props {
  data?: any;
  loading: boolean;
}



export default function BlockchainDetailsEdit(props: Props) {

  const { id } = useParams<RouteParams<BlockchainRouteParams>>();
  const { t } = useTranslation();
  const history = useHistory();
  const [blockchainHeight, setBlockchainHeight] = useState(0);

  useEffect(() => {

  }, []);


  const submitUpdateForm = (formModel: BlockchainsData) => {
    console.log({
      variables: {
        id: Number(id),
        key: formModel.key,
        name: formModel.name,
        client: formModel.client,
        explorer_transaction: formModel.explorer_transaction,
        explorer_address: formModel.explorer_address,
        server: formModel.server,
        enabled: formModel.enabled,
        min_confirmations: formModel.min_confirmations,
      },
    })

    message.success(t("setter.global.messages.success.update"));
    history.push(Routes.withParams.BlockchainsDetails({ id: id }));

  };

  const updateBlockchainHeight = () => {
    // resetBlockchainHeight({ variables: { id: Number(id), height: blockchainHeight } }) 

    message.success(t("setter.global.messages.success.blockchain.height"));
  };

  const heightInputOnChange = (value: number | string | undefined) => {
    if (value) {
      setBlockchainHeight(Number(value));
    }
  };

  //if (props.loading) return <Skeleton active paragraph={{ rows: 9 }} />;

  return (
    <>
      <Row gutter={[24, 16]}>
        <Col md={24} lg={18}>
          <Card>
            <BlockchainForm onSubmit={submitUpdateForm} />
          </Card>
        </Col>
        <Col md={24} lg={6}>
          <Card>
            <Space direction="vertical">
              <InputNumber
                style={{ width: "100%" }}
                value={blockchainHeight}
                onChange={(value) => heightInputOnChange(value as number)}
              />

              <Button style={{ width: 100 }} type="primary" onClick={updateBlockchainHeight}>
                {t("setter.layouts.configurations.blockchains.details.edit.reset")}
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  );
}
