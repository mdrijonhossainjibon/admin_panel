import { Tag } from "antd";
import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { UserState } from "constants/user";
 

export default function UserStatus({ Status } : any) {
  
  return  (

    <Tag icon={  Status === UserState.Active ? <CheckCircleOutlined /> : <ExclamationCircleOutlined  />} color={Status === UserState.Active ? 'success' : 'error'}>
        {Status}
    </Tag>
  ) 
  
  
  
}