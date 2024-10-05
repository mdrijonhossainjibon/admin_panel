 
import { Form as AutoForm, Button as SubmitField , AutoComplete, Input } from "antd";
 
 
import { Col, Row, Skeleton } from "antd";
 
 
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { renderRows } from "../../../../../utils/component-utils";
import { MarketRouteParams, RouteParams } from "../../../../../constants/routes";

interface Props {
  initialData?: any[];
  onCompleted?: () => void;
}

const {  Item  :  AutoField } = AutoForm;
export default function MarketsForm({ initialData, onCompleted }: Props) {
  const { t: translate } = useTranslation();
  const { id } = useParams<RouteParams<MarketRouteParams>>();

  const isUpdating = !!initialData;

  const t = (id: string) => translate(`setter.layouts.configurations.markets.form.${id}`);
 
//successMessage: t("createSuccess"),
   
  //successMessage: t("updateSuccess"),

  console.log(id)

  const handleSubmit = (values :any) => {
    const variables = values;

    //if (isUpdating) updateMarket({ variables: { ...variables, id } });
    //else createMarket({ variables });

    console.log(variables)
  };

  const currencies :any[] = []
  const currencyOptions =  currencies.map((currency) => ({   label: `${currency.name} (${currency.code.toUpperCase()})`, value: currency.code,})) || [];

  const formRows = [
    [
      <AutoField  name="base_currency"  label={t("base_currency")} ><AutoComplete  options={ currencyOptions }> <Input /></AutoComplete></AutoField>,
      <AutoField name="quote_currency" label={t("quote_currency")} > <AutoComplete  options={ currencyOptions }> <Input /></AutoComplete> </AutoField>,
    ],
    [
      <AutoField  name="amount_precision" label={t("amount_precision")}  />,
      <AutoField  name="price_precision" label={t("price_precision")}   />,
    ],
    [
      <AutoField name="max_price" label={t("max_price")} />,
      <AutoField name="min_price" label={t("min_price")} />,
      <AutoField name="min_amount" label={t("min_amount")} />,
    ],
    [<AutoField   name="position" label={t("position")} />],
    [<AutoField name="enabled" label={t("enabled")} />],
  ];

  return (
    <AutoForm className="setter-form"  initialValues={ initialData} onFinish={ handleSubmit }>
      <Skeleton  active paragraph={{ rows: 9 }}>
        <Row gutter={24}>
          <Col span={24}>{renderRows(formRows)}</Col>
        </Row>
        <SubmitField   value={isUpdating ? t("update") : t("create")} />
      </Skeleton>
    </AutoForm>
  );
}
