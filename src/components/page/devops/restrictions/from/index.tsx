import { Col, Row, Form, Button, Input, AutoComplete } from "antd";
import { AdminRestrictions_adminRestrictions_result } from "queries/AdminRestrictions";
import { useTranslation } from "react-i18next";
import { renderRows } from "utils/component-utils";
import { RestrictionCategory, RestrictionScope, RestrictionState } from "constants/restrictions";

export interface RestrictionOption {
    key: string;
    value: string;
}

interface Props {
    initialData?: AdminRestrictions_adminRestrictions_result;
    onCompleted?: () => void;
}

const { Item: FormItem } = Form;

export type RestrictionData = {
    id: number;
    state: string;
    scope: string;
    value: string;
    category: string;
};

export default function RestrictionForm({ initialData, onCompleted }: Props) {
    const { t: translate } = useTranslation();
    const isUpdating = !!initialData;

    const t = (id: string) => translate(`setter.layouts.devops.restrictions.${id}`);

    const handleSubmit = (values: RestrictionData) => {
        const variables = {
            id: values.id,
            category: values.category,
            scope: values.scope,
            state: values.state,
            value: values.value,
        };
        console.log(variables);
        // if (isUpdating) updateRestriction({ variables });
        // else createRestriction({ variables });
    };

    const generalRows = [
        [
            <FormItem
                name="category"
                label={t("form.category")}
                key="category"
            >
                <AutoComplete options={Object.values(RestrictionCategory).map(scope => ({ value: scope }))}>
                    <Input />
                </AutoComplete>
            </FormItem>,
        ],
        [
            <FormItem
                name="scope"
                label={t("form.scope")}
                key="scope"
            >
                <AutoComplete options={Object.values(RestrictionScope).map(scope => ({ value: scope }))}>
                    <Input />
                </AutoComplete>
            </FormItem>,
        ],
        [
            <FormItem
                name="value"
                label={t("form.value")}
                key="value"
            >
                <AutoComplete>
                    <Input />
                </AutoComplete>
            </FormItem>,
        ],
        [
            <FormItem
                name="state"
                label={t("form.state")}
                key="state"
            >
                <AutoComplete options={Object.values(RestrictionState).map(scope => ({ value: scope }))}>
                    <Input />
                </AutoComplete>
            </FormItem>,
        ],
    ];

    return (
        <Form
            className="setter-form"
            initialValues={initialData}
            onFinish={handleSubmit}
        >
            <Row gutter={24}>
                <Col span={24} className="form-section">
                    {renderRows(generalRows)}
                </Col>
            </Row>
            <FormItem>
                <Button type='primary' htmlType='submit'>
                    {isUpdating ? t("form.update") : t("form.create")}
                </Button>
            </FormItem>
        </Form>
    );
}
