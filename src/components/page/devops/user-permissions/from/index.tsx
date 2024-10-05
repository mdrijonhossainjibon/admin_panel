import { useEffect, useState } from "react";
import { Button, Col, Row, Form, AutoComplete, Input } from "antd";
import { AdminPermissions_adminPermissions_result } from "queries/AdminPermissions";
import { useTranslation } from "react-i18next";
import { renderRows } from "../../../../../utils/component-utils";
import { UserPermissionAction, UserPermissionVerb } from "constants/userPermissions";
import { UserRole } from "constants/user";
import { useDispatch } from "react-redux";
import { addPermissionRequest,  updatePermissionRequest } from "modules";

export interface PermissionOption {
    key: string;
    value: string;
}

interface Props {
    initialData?: AdminPermissions_adminPermissions_result;
    onCompleted?: () => void;
}

const { Item: FormItem } = Form;

export default function PermissionForm({ initialData, onCompleted }: Props) {
    const [userPermissionAction, setUserPermissionAction] = useState<string | undefined>(undefined);
    const isAudit = userPermissionAction === "AUDIT";
    const { t: translate } = useTranslation();
    const dispatch = useDispatch();
    const isUpdating = !!initialData;

    const t = (id: string) => translate(`setter.layouts.devops.userPermissions.${id}`);

    useEffect(() => {
        if (initialData?.action) {
            setUserPermissionAction(initialData.action);
        }
    }, [initialData]);

    const handleSubmit = (values: any) => {
       

        // Add _id if updating
        const variables = {
            ...(isUpdating ? { _id : initialData?._id } : {}),
            role: values.role,
            verb: values.verb,
            url: values.url,
            action: values.action,
            topic: values.topic,
        };

        console.log(variables);

        // Trigger onCompleted callback to close the modal
        if (onCompleted) {
            onCompleted();
        }

        // Uncomment if updating/creating logic is implemented
        if (isUpdating) {
            dispatch(updatePermissionRequest(variables as any) as any); // updatePermission({ variables });
        } else {
            dispatch(addPermissionRequest(variables as any) as any); // createPermission({ variables });
        }
    };

    const generalRows = [
        [
            <FormItem key="role" name="role" label={t("form.role")}>
                <AutoComplete options={Object.values(UserRole).map(role => ({ value: role }))}>
                    <Input />
                </AutoComplete>
            </FormItem>,
            <FormItem key="action" name="action" label={t("form.action")}>
                <AutoComplete options={Object.values(UserPermissionAction).map(action => ({ value: action }))}>
                    <Input />
                </AutoComplete>
            </FormItem>,
        ],
        [
            <FormItem key="url" name="url" label={t("form.path")}>
                <AutoComplete>
                    <Input />
                </AutoComplete>
            </FormItem>,
            <FormItem key="verb" name="verb" label={t("form.verb")}>
                <AutoComplete options={Object.values(UserPermissionVerb).map(verb => ({ value: verb }))}>
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
            {isAudit && (
                <Row>
                    <Col span={24} className="form-section">
                        <FormItem name="topic" label={t("form.topic")}>
                            <Input />
                        </FormItem>
                    </Col>
                </Row>
            )}
            <FormItem>
                <Button type="primary" htmlType="submit">
                    {isUpdating ? t("form.update") : t("form.create")}
                </Button>
            </FormItem>
        </Form>
    );
}
