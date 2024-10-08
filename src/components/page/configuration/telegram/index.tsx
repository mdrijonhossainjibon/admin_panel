import { Card, Table, Switch, Input, Button, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {   deleteChannelConfigRequest, fetchBotConfigRequest, fetchChannelConfigRequest, putBotConfigRequest, putChannelConfigRequest, RootState } from "modules";

export default function Telegram_Config() {
  const [botStatus, setBotStatus] = useState(false);
  const [withdrawStatus, setWithdrawStatus] = useState(false);
   
  const [newUsername, setNewUsername] = useState("");
  
   
   
  const [newApiKey, setNewApiKey] = useState("");

  const dispatch = useDispatch();

  const { botConfig, loading } = useSelector((state: RootState) => state.public.Telegram);
   const tg_group: any = botConfig.tg_group;
   const channelUsernames : any[] = tg_group.username
  useEffect(() => {
    dispatch(fetchBotConfigRequest())
    dispatch(fetchChannelConfigRequest())
  }, [dispatch])


  useEffect(() => {
    if (botConfig) {
      setBotStatus(botConfig.toggle_bot === 'on');
      setWithdrawStatus(botConfig.withdraw === 'enabled');
      setNewApiKey(botConfig.token);
    }
  }, [botConfig])

  const addChannelUsername = () => {
    if (newUsername && !channelUsernames.includes(newUsername)) {
      //setChannelUsernames([...channelUsernames, newUsername]);
    }
    dispatch(putChannelConfigRequest({ username : newUsername }));
  };

  // Remove a username from the list
  const removeChannelUsername = (username: string) => {
    dispatch(deleteChannelConfigRequest({ username }));
  };

  
 

  // Add a new API key
  const addApiKey = () => {
    setNewApiKey(""); // Clear input after adding
    dispatch(putBotConfigRequest({ token : newApiKey }));
  };


   

  
  const handelBotStatus = (checked : boolean ) =>{
     setBotStatus(checked);
     dispatch(putBotConfigRequest({ toggle_bot :  checked ? 'on' : 'off' }))
  }

  const handelWithdrawStatus = (checked : boolean ) =>{
    setWithdrawStatus(checked)
    dispatch(putBotConfigRequest({ withdraw :  checked ? 'enabled' : 'disabled' }))
 }


  const dataSource = [
    {
      key: "1",
      setting: "Bot Status (On/Off)",
      action: (
        <Switch
          checked={botStatus}
          onChange={ handelBotStatus }
        />
      ),
    },
    {
      key: "2",
      setting: "Withdraw (Enable/Disable)",
      action: (
        <Switch
          checked={withdrawStatus}
          onChange={ handelWithdrawStatus }
        />
      ),
    },
    {
      key: "3",
      setting: "Channel Usernames",
      action: (
        <div>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Input
              placeholder="Enter channel username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              onPressEnter={addChannelUsername} // Add when pressing Enter
            />
            <Button
              type="dashed"
              onClick={addChannelUsername}
              icon={<PlusOutlined />}
            >
              Add Username
            </Button>
            <div>
              {channelUsernames?.map((username) => (
                <Tag
                  key={username}
                  closable
                  onClose={() => removeChannelUsername(username)}
                  style={{ marginBottom: 8 }}
                >
                  {username}
                </Tag>
              ))}
            </div>
          </Space>
        </div>
      ),
    },
     
    {
      key: "5",
      setting: "API Keys",
      action: (
        <div className="flex gap-3">
          <Input
            disabled={ botConfig.token ? true : false }
            placeholder="Enter new API key"
            value={newApiKey}
            onChange={(e) => setNewApiKey(e.target.value)}
            onPressEnter={addApiKey} // Add when pressing Enter
            
          />
         {  botConfig.token ? null : <CloseCircleOutlined onClick={() => setNewApiKey("")} />   }
        </div>
      ),
    } 
  ];

  const columns = [
    {
      title: "Setting",
      dataIndex: "setting",
      key: "setting",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];



  return (
    <Card title="Telegram Bot Configuration">
      <Table loading={loading} dataSource={dataSource} columns={columns} pagination={false} />
    </Card>
  );
}
