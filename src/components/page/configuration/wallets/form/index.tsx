
import { useState } from "react";
import { AutoComplete, Form as AutoForm, Input, Button as SubmitField } from "antd";
import { Col, Descriptions, Row, Skeleton, Card } from "antd";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { renderRows } from "../../../../../utils/component-utils";
import { RouteParams, WalletRouteParams } from "../../../../../constants/routes";
import { AdminWallet_adminWallet } from "../../../../../queries/AdminWallet";
import { CurrencyType } from "../../../../../constants/currencies";
import { WalletKind } from "../../../../../constants/wallets";

interface Props {
  initialData?: AdminWallet_adminWallet;
  onCompleted?: () => void;
}

enum SubmitType {
  General = "general",
  Settings = "settings",
}
const { Item: AutoField } = AutoForm;

export default function WalletsForm({ initialData, onCompleted }: Props) {
  const [submitType, setSubmitType] = useState<SubmitType | undefined>(undefined);
  const [walletKind, setWalletKind] = useState<WalletKind | undefined>(undefined);
  const { id } = useParams<RouteParams<WalletRouteParams>>();
  console.log(id)
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.configurations.wallets.form.${id}`);

  const isUpdating = !!initialData;

  const blockchains: any[] = [];
  const gateways: any[] = [];
  const currencies: any[] = []

  // const [createWallet, { loading: loadingCreate }] = useMutation<CreateWallet, CreateWalletVariables>(CreateWalletGQL, {
  //  onCompleted,

  // });

  //successMessage: t("createSuccess"),

  // const [updateWallet, { loading: loadingUpdate }] = useMutation<UpdateWallet, UpdateWalletVariables>(UpdateWalletGQL, {
  // onCompleted,

  // invalidateCache: false,
  // });

  //successMessage: t("updateSuccess"),


  //const [updateWalletSettings, { loading: loadingSettings }] = 
  //  UpdateWalletSettings,
  //  UpdateWalletSettingsVariables
  // >(UpdateWalletSettingsGQL, { , invalidateCache: false });

  //successMessage: t("settings.updateSuccess")


  //const { data: blockchains, loading: loadingBlockchains } = useQuery<AdminBlockchains, AdminBlockchainsVariables>(
  //   BlockchainsListGQL
  // );

  //const { data: gateways, loading: loadingGateways } = useQuery<AdminWalletGateways, AdminWalletGatewaysVariables>(
  //   AdminWalletGatewaysGQL
  //  );

  // const { data: currencies, loading: loadingCurrencies } = useQuery<AdminCurrenciesList, AdminCurrenciesListVariables>(
  //  AdminCurrenciesListGQL
  // );


  const blockchainOptions = blockchains?.map((blockchain) => ({ label: blockchain.key, value: blockchain.key, })) || [];

  const gatewaysOptions = gateways?.map(({ gateway }) => ({ label: gateway, value: gateway })) || [];

  const currencyOptions = currencies?.filter((currency) => currency.type === CurrencyType.Coin)
    .map((currency) => ({ label: `${currency.name} (${currency.code.toUpperCase()})`, value: currency.code, })) || [];

  const handleSubmit = async (values: any) => {
    const settings: any = { uri: values.uri };

    if (values.secret) {
      settings.secret = values.secret;
    }

    if (values.gateway === "bitgo") {
      settings.access_token = values.access_token;
      settings.testnet = values.testnet;
      settings.wallet_id = values.wallet_id;
    }

    const variables = {
      ...values,
      settings: JSON.stringify(settings),
    };


    console.log(variables)
    if (submitType === SubmitType.Settings) {
      /// updateWalletSettings({ variables: { id: Number(id), settings: JSON.stringify(settings) }   });
    } else {
      ///if (isUpdating) await updateWallet({ variables: { ...variables, id: Number(id) } });
      // else await createWallet({ variables });
    }

    setSubmitType(undefined);
  };

  const handleFormChange = (value: string) => {
    if (value === "kind") {
      setWalletKind(value as WalletKind);
    }
  };

  const parseInitialData = () => {
    if (initialData) {
      return {
        ...initialData,
        uri: initialData?.settings?.uri,
        secret: initialData?.settings?.secret,
        currency: initialData.currency_code,
        max_balance: Number(initialData.max_balance),
        testnet: initialData?.settings?.testnet,
        access_token: initialData?.settings?.access_token,
        wallet_id: initialData?.settings?.wallet_id,
      };
    }

    return undefined;
  };

  const formRows = [
    [<AutoField name="enabled" label={t("enabled")} >  <AutoComplete   > <Input /> </AutoComplete> </AutoField>],
    [<AutoField name="name" label={t("name")} >  <AutoComplete   > <Input /> </AutoComplete> </AutoField>],
    [
      <AutoField name="currency" label={t("currency")}  > <AutoComplete options={currencyOptions} > <Input /> </AutoComplete> </AutoField>,
      <AutoField name="blockchain_key" label={t("blockchain_key")} > <AutoComplete options={blockchainOptions} > <Input /> </AutoComplete></AutoField>,
    ],
    [
      <AutoField name="kind" label={t("kind")}  ><AutoComplete onSelect={handleFormChange} options={Object.values(WalletKind).map((value) => ({ value }))} > <Input /> </AutoComplete></AutoField>,
      <AutoField name="gateway" label={t("gateway")} > <AutoComplete options={gatewaysOptions} > <Input /> </AutoComplete> </AutoField>,
    ],
    [<AutoField name="address" label={t("address")} style={{ width: "100%" }} >  <AutoComplete   > <Input /> </AutoComplete> </AutoField>],
    [<AutoField name="max_balance" label={t("max_balance")} >  <AutoComplete   > <Input /> </AutoComplete> </AutoField>, []],
  ];

  console.log(WalletKind.Cold, WalletKind.Deposit, walletKind);

  const settingsRows = [
    [
      <AutoField name="uri" label={t("settings.uri")} />,
      ![WalletKind.Cold, WalletKind.Deposit, undefined].includes(
        walletKind ? walletKind : (parseInitialData()?.kind as WalletKind)
      ) && <AutoField name="secret" label={t("settings.secret")}  > <AutoComplete> <Input /> </AutoComplete> </AutoField>,
    ],
    [parseInitialData()?.gateway === "bitgo" && <AutoField name="access_token" label={t("settings.accessToken")} />],
    [parseInitialData()?.gateway === "bitgo" && <AutoField name="testnet" label={t("settings.testnet")} />],
    [parseInitialData()?.gateway === "bitgo" && <AutoField name="wallet_id" label={t("settings.walletId")} />],
  ];

  const loadingGeneral = false // loadingCreate || loadingUpdate;
  const loadingValues = false //loadingBlockchains || loadingGateways || loadingCurrencies;

  const generalSubmitField = (
    <SubmitField loading={loadingGeneral} onClick={() => setSubmitType(SubmitType.General)} disabled={false} >  {isUpdating ? t("update") : t("create")} </SubmitField>
  );

  const settingsSubmitField = (
    <SubmitField onClick={() => setSubmitType(SubmitType.Settings)} disabled={false}  > {t("settings.submit")}  </SubmitField>
  );

  const formColStyle = {
    flex: 1,
    minWidth: "320px",
  };

  //onValidate={submitType === SubmitType.General ? undefined : () => null}



  return (
    <>
      <AutoForm
        className="setter-form" initialValues={parseInitialData()} onFinish={handleSubmit}
      >
        <Skeleton paragraph={{ rows: 10 }} loading={loadingValues}>
          <Row gutter={[24, 16]}>
            <Col style={formColStyle}>
              <Card>
                <Descriptions title={t("title")} style={{ marginBottom: "1rem" }}>
                  <Descriptions.Item>
                    <Row gutter={24} style={{ width: "100%" }}>
                      <Col span={24}>{renderRows(formRows)}</Col>
                    </Row>

                    {isUpdating && generalSubmitField}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col style={formColStyle}>
              <Card>
                <Descriptions title={t("settings.title")}>
                  <Descriptions.Item>
                    <Row gutter={24}>
                      <Col span={24}>
                        {renderRows(settingsRows)}
                        <br />
                        {isUpdating && settingsSubmitField}
                      </Col>
                    </Row>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
          {!isUpdating && generalSubmitField}
        </Skeleton>
      </AutoForm>
    </>
  );
}
