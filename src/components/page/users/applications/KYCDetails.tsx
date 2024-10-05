import { Row, Col, Image, Collapse, Descriptions } from "antd";
import { countryISO } from "helpers";

import { useTranslation } from "react-i18next";



export default function KYCDetails({ record }: { record: any }) {
  const { i18n, t: translate } = useTranslation();
  const lang = i18n.language.split("-")[0];

  const t = (id: string) => translate(`setter.layouts.users.applications.${id}`);

  const data = () => {
    return (
      <Collapse accordion defaultActiveKey={["0"]}>
        {record.documents.map((el: any, ind: number) => (
          <Collapse.Panel
            header={`${el.doc_type} #${el.doc_number} ${t("expired")} ${el.doc_expire}`}
            key={String(ind)}
          >
            <Image width="100%" alt="doc" src={el.upload.url} />
          </Collapse.Panel>
        ))}
      </Collapse>
    );
  };


  const metadata = record.profiles?.metadata ? JSON.parse(record.profiles.metadata) : {};
  const nationality = record.profiles?.metadata && metadata.nationality ? metadata.nationality : "";


  if (nationality) {
    delete metadata.nationality;
  }


  const renderMetadata = () => {
    return Object.keys([metadata]).map((el) => {
      return (
        <Descriptions.Item label={t(el)} key={el}>
          {metadata[el]}
        </Descriptions.Item>
      );
    });
  };

  const countryName = countryISO.getName(record.profiles?.country || 'US', lang)

 
  const address = `${record.profiles?.address || ''} ${record.profiles?.city || ''} ${record.profiles?.postcode || ''} ${countryName}`
  return (
    <Row>
      <Col span={16}>
        <Descriptions bordered size="small" column={2}>
          <Descriptions.Item label={t("name")}>
            {[record.profiles?.first_name, record.profiles?.last_name].join(" ")}
          </Descriptions.Item>
          <Descriptions.Item label={t("birthDate")}>{record.profiles?.dob}</Descriptions.Item>
          <Descriptions.Item label={t("nationality")}>{nationality}</Descriptions.Item>
          <Descriptions.Item label={t("address")}>{address}</Descriptions.Item>
          {record.profile?.metadata ? renderMetadata() : null}
        </Descriptions>
      </Col>
      <Col span={8}>{data()}</Col>
    </Row>
  );
}
