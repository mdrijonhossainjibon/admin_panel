
import { Card, Button, Space, Table } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useDate } from "utils";
import { useHistory } from "react-router-dom";
import { columns } from "./Column"; // Assuming you have defined your table columns in a separate file
import { useSelector } from "react-redux";
import { fetchUserRequest, selectCurrentLanguage, SelectoUser, SelectoUserLIstLoading } from "modules";
import { useDispatch  } from 'react-redux';


const ListUsersPage = () => {
  const formatDate = useDate();
  const history = useHistory();
  const { t } = useTranslation();
  const lang = useSelector(selectCurrentLanguage)
  const dispatch =  useDispatch();
   const dataSource = useSelector(SelectoUser);
   const loading = useSelector(SelectoUserLIstLoading)

  const handleReload = () => {
    dispatch(fetchUserRequest())
  };

 

  return (
    <Card title="Users" extra={[
      <Space key="space">
        <Button key="reload" loading={ loading } icon={<ReloadOutlined />} onClick={handleReload}>
          {t("setter.layouts.configurations.blockchains.table.reload")}
        </Button>
      </Space>
    ]}>
      <Table
        bordered
        loading={ loading }  
        dataSource={dataSource}
        columns={columns({ t, formatDate, history, lang }) }
        rowKey="uid"
      />
    </Card>
  );
};

export default ListUsersPage;
