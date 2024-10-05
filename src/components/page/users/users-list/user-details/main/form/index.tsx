import { ProfileState } from "constants/user";
import { AdminUser_adminUser_profiles } from "queries/AdminUser";
import { useTranslation } from "react-i18next";
import { AutoComplete, Form as AutoForm, DatePicker, Input, Button as SubmitField } from 'antd'
import { countryISO } from "helpers";
 
interface Props {
    uid: string;
    initialValues: AdminUser_adminUser_profiles;
    onCompleted: () => void;
}


export type ProfileData = {
    first_name: string;
    last_name: string;
    dob: Date;
    address: string;
    postcode: string;
    city: string;
    country: string;
    state: string;
    nationality: string;
};


const { Item: AutoField } = AutoForm;

export default function ProfileForm({ initialValues, uid, onCompleted }: Props) {
    const { i18n, t: translate } = useTranslation();

    const t = (id: string) => translate(`setter.layouts.users.details.main.profile.${id}`);


    const handleSubmit = (values: ProfileData) => {
        console.log({
            variables: {
                ...values,
                uid,
                dob: values.dob.toISOString(),
                metadata: JSON.stringify({ nationality: values.nationality }),
            },
        });

        onCompleted()
    };

    const _initialValues: ProfileData = {
        ...initialValues,
        dob: new Date(initialValues.dob),
        nationality: JSON.parse(initialValues.metadata || "{}")?.nationality,
    };

    const stateOptions = Object.values(ProfileState).map((state) => ({
        value: state,
        label: t(`state.${state}`),
    }));

    const countryOptions = countryISO.getCountryOptions(i18n.language.split("-")[0])
 
    return (
        <AutoForm className="setter-form" onFinish={handleSubmit} initialValues={_initialValues}>
            <AutoField name="first_name" label={t("first_name")} > <AutoComplete><Input /></AutoComplete> </AutoField>
            <AutoField name="last_name" label={t("last_name")}> <AutoComplete><Input /></AutoComplete> </AutoField>
            <AutoField name="dob" label={t("dob")}   >   <DatePicker onChange={(e) => console.log(e)} format="MMM D, YYYY" style={{ width: '100%' }} />   </AutoField>
            <AutoField name="address" label={t("address")} > <AutoComplete><Input /></AutoComplete></AutoField>
            <AutoField name="postcode" label={t("postcode")} > <AutoComplete><Input /></AutoComplete> </AutoField>
            <AutoField name="city" label={t("city")}> <AutoComplete><Input /></AutoComplete> </AutoField>
            <AutoField name="country" label={t("country")} ><AutoComplete options={countryOptions}   > <Input /> </AutoComplete></AutoField>
            <AutoField name="state" label={t("state.title")}  > <AutoComplete options={stateOptions} > <Input /> </AutoComplete></AutoField>
            <AutoField name="nationality" label={t("nationality")} ><AutoComplete><Input /></AutoComplete></AutoField>
            <SubmitField type='primary' htmlType='submit' > {t("edit")} </SubmitField>
        </AutoForm>
    );

}