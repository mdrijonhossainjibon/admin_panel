import { useEffect, useState } from "react";
import { AutoComplete, Button, Col, Form, Input, Row, Typography } from "antd";
// import { AdminCurrenciesList_adminCurrencies } from "../../../../../graphql/queries/AdminCurrenciesList";
import { useTranslation } from "react-i18next";

import { renderRows } from "../../../../../utils/component-utils";
import { CurrencyType } from "constants/currencies";
import CurrencyOptionForm from "./CurrencyOptionForm";

export interface CurrencyOption {
    key: string;
    value: string;
}

interface Props {
    initialData?: any; //AdminCurrenciesList_adminCurrencies;
    onCompleted?: () => void;
}

const { Item: AutoField } = Form;

export default function CurrenciesForm({ initialData, onCompleted }: Props) {
    const [optionFields, setOptionFields] = useState<CurrencyOption[]>(initialData?.options || []);
    const [currencyType, setCurrencyType] = useState<string | undefined>(undefined);
    const { t: translate } = useTranslation();

    const isUpdating = !!initialData?.type;
    const isCoin = currencyType === "coin";

    const t = (id: string) => translate(`setter.layouts.configurations.currencies.${id}`);

    useEffect(() => {
        if (initialData?.type) {
            setCurrencyType(initialData.type);
        }
    }, [initialData]);


    const handleFormChange = (value: any) => {
        setCurrencyType(value);
    };

    const blockchains: any[] = []

    //successMessage: t("form.updatedSuccess"),

    //successMessage: t("form.createdSuccess"),

    const blockchainOptions = blockchains.map((blockchain) => ({ label: blockchain.key, value: blockchain.key })) || [];

    const handleSubmit = (values: any) => {
        const variables = {
            ...values,
            options: isCoin ? JSON.stringify(optionFields) : null,
            min_collection_amount: values.min_collection_amount !== undefined ? Number(values.min_collection_amount) : 0,
            min_deposit_amount: Number(values.min_deposit_amount),
            min_withdraw_amount: Number(values.min_withdraw_amount),
            deposit_fee: Number(values.deposit_fee),
            withdraw_fee: Number(values.withdraw_fee),
            withdraw_limit_24h: Number(values.withdraw_limit_24h),
            withdraw_limit_72h: Number(values.withdraw_limit_72h),
        };

        console.log(variables)
        //if (isUpdating) updateCurrency({ variables });
        //else createCurrency({ variables });
    };

    const generalRows = [
        [<AutoField name="visible" label={t("form.visible")} >  <AutoComplete><Input /> </AutoComplete> </AutoField>],
        [
            <AutoField name="name" label={t("form.name")} >  <AutoComplete><Input /> </AutoComplete> </AutoField>,
            <AutoField

                name="type"
                label={t("form.type")}


            ><AutoComplete onChange={handleFormChange} options={Object.values(CurrencyType).map((value) => ({ value }))} size='middle'><Input /> </AutoComplete>
            </AutoField>,
        ],
        [
            <AutoField name="code" label={t("form.code")} > <AutoComplete ><Input /> </AutoComplete> </AutoField>,
            <AutoField name="symbol" label={t("form.symbol")} > <AutoComplete ><Input /> </AutoComplete> </AutoField>,
        ],
        [
            isCoin && (
                <AutoField
                    name="blockchain_key"


                    label={t("form.blockchain_key")}
                > <AutoComplete options={blockchainOptions}><Input /> </AutoComplete> </AutoField>
            ),
            <AutoField name="position" label={t("form.position")} > <AutoComplete><Input /> </AutoComplete> </AutoField>,
        ],
        [
            <AutoField name="precision" label={t("form.precision")} > <AutoComplete ><Input /> </AutoComplete> </AutoField>,
            <AutoField name="subunits" label={t("form.subunits")}> <AutoComplete disabled={isUpdating || !isCoin} ><Input /> </AutoComplete> </AutoField>,
        ],
        [<AutoField name="icon_url" label={t("form.icon_url")} >  <AutoComplete><Input /> </AutoComplete> </AutoField>],
    ];

    const depositRows = [
        [<AutoField name="deposit_enabled" label={t("form.deposit_enabled")} > <AutoComplete><Input /> </AutoComplete> </AutoField>],
        [<AutoField name="deposit_fee" label={t("form.deposit_fee")} >  <AutoComplete><Input /> </AutoComplete> </AutoField>],
        [<AutoField name="min_deposit_amount" label={t("form.min_deposit_amount")} >  <AutoComplete><Input /> </AutoComplete> </AutoField>],
        [<AutoField name="min_collection_amount" label={t("form.min_collection_amount")} >  <AutoComplete><Input /> </AutoComplete></AutoField>],
    ];

    const withdrawRows = [
        [<AutoField name="withdrawal_enabled" label={t("form.withdrawal_enabled")} >  <AutoComplete><Input /> </AutoComplete> </AutoField>],
        [<AutoField name="withdraw_fee" label={t("form.withdraw_fee")} >  <AutoComplete><Input /> </AutoComplete> </AutoField>],
        [<AutoField name="min_withdraw_amount" label={t("form.min_withdraw_amount")} >  <AutoComplete><Input /> </AutoComplete> </AutoField>],
        [<AutoField name="withdraw_limit_24h" label={t("form.withdraw_limit_24h")} >  <AutoComplete><Input /> </AutoComplete> </AutoField>],
        [<AutoField name="withdraw_limit_72h" label={t("form.withdraw_limit_72h")} >  <AutoComplete><Input /> </AutoComplete></AutoField>],
    ];

    return (
        <>
            <Form
                className="setter-form" initialValues={initialData} onFinish={handleSubmit}  >
                <Row gutter={24}>
                    <Col span={12} className="form-section">
                        <Typography.Title level={5}>General</Typography.Title>
                        {renderRows(generalRows)}
                    </Col>
                    <Col span={6} className="form-section">
                        <Typography.Title level={5}>Deposit</Typography.Title>
                        {renderRows(depositRows)}
                    </Col>
                    <Col span={6} className="form-section">
                        <Typography.Title level={5}>Withdraw</Typography.Title>
                        {renderRows(withdrawRows)}
                    </Col>
                </Row>
                {isCoin && (
                    <Row>
                        <Col span={24} className="form-section">
                            <CurrencyOptionForm fields={optionFields} setFields={setOptionFields} />
                        </Col>
                    </Row>
                )}

                <Button type='primary' htmlType='submit'> {isUpdating ? t("form.update") : t("form.create")} </Button>
            </Form>
        </>
    );
}
