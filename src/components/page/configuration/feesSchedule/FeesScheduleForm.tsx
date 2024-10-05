import { AutoComplete, Form as AutoForm , Input, Button as SubmitField } from "antd";
 
import { useTranslation } from "react-i18next";
 

import { AdminTradingFees_adminTradingFees } from "../../../../queries/AdminTradingFees";

type Maybe<T> = T | null | undefined;


export type FeesScheduleData = {
  group: Maybe<string>;
  market_id: Maybe<string>;
  maker: Maybe<number>;
  taker: Maybe<number>;
};




interface Props {
  initialData?: AdminTradingFees_adminTradingFees;
  onCompleted?: () => void;
}

const { Item : AutoField } = AutoForm;

export default function FeesScheduleForm({ initialData, onCompleted }: Props) {
  const { t: translate } = useTranslation();

  const t = (id: string) => translate(`setter.layouts.configurations.feesSchedule.form.${id}`);

  const isUpdating = !!initialData;

   //successMessage: t("updateSuccess")

   //successMessage: t("createSuccess") 

  const   markets :any[]  = [] 

  const marketOptions =  markets?.map((market) => ({  label: market.id,   value: market.id,  })) || [];

  marketOptions.unshift({ label: "any", value: "any" });

  const handleSubmit = (values: FeesScheduleData) => {
    
      
     if(onCompleted){
      onCompleted()
     }

   if (isUpdating) {
    //(variables).id = initialData?.id;
      //updateFee({ variables });
    //} else {
      //createFee({ variables });
    }
  };

  return (
    <AutoForm className="setter-form"   initialValues={initialData} onFinish={handleSubmit}>
      <AutoField name="group" label={t("group")} />
      <AutoField name="market_id"  label={t("market_id")}   />
      <AutoField name="maker" label={t("maker")} > <AutoComplete  options={ marketOptions }> <Input /> </AutoComplete></AutoField>
      <AutoField name="taker" label={t("taker")} />
      <SubmitField  type='primary'  htmlType='submit' > {isUpdating ? t("edit") : t("create")} </SubmitField>
    </AutoForm>
  );
}
