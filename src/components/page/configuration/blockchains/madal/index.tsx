
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
 
import { BlockchainsData } from "..";
import BlockchainForm from "../from";

interface Props {
  isModalVisible: boolean;
  onCancel: () => void;
  onSubmit: (formModel: BlockchainsData) => void;
  titleKey: string;
  initialValues : any
}

export default function BlockchainFormModal(props: Props) {
  const { t } = useTranslation();

  return (
    <Modal
      title={t(props.titleKey)}
      open={props.isModalVisible}
      onCancel={props.onCancel}
      okText={t("setter.layouts.configurations.blockchains.modal.save")}
      cancelText={t("setter.layouts.configurations.blockchains.modal.cancel")}
      footer={null}
      width="75%"
    >
      <BlockchainForm onSubmit={props.onSubmit} formModel={ props.initialValues }  />
    </Modal>
  );
}
