import {   Table,  Tag,  Card,    Switch,   Space,   Button, Modal, Select, Tabs, Input } from "antd";
import { useEffect, useState } from "react";
import {   SettingOutlined,  RobotOutlined,  KeyOutlined, DeleteOutlined } from "@ant-design/icons"; // Importing icons
import { ChannelConfig, deleteChannelConfigRequest, fetchBotConfigRequest, fetchChannelConfigRequest, putBotConfigRequest, putChannelConfigRequest, RootState } from "modules";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";

// Define types for the channel and bot data
 

interface Bot {
    key: string;
    status: "on" | "off"; // Bot status
    withdraw: "enabled" | "disabled"; // Withdraw status
    token : string; // API Key
}

 

 


export default function List() {
   
     
    const [showOnlyAdmins, setShowOnlyAdmins] = useState<boolean>(false); // State for toggling admin-only view
    const [showModal, setShowModal] = useState<boolean>(false); // Modal visibility state for removing a channel
    const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(false); // Modal visibility state for managing API keys
    const [channelToRemove, setChannelToRemove] = useState< ChannelConfig | null>(null); // State for the channel to be removed
    const [apiKeyToManage, setApiKeyToManage] = useState<Bot | null>(null); // State for the bot whose API key is managed
    const [newApiKey, setNewApiKey] = useState<string>(""); // State for the new API key input
    
    const dispatch = useDispatch();
    useEffect(() =>{
            dispatch(fetchChannelConfigRequest());
            dispatch(fetchBotConfigRequest());
    } , [ dispatch ])


    const {  channelConfig   , loading , botConfig  } = useSelector((state: RootState) => state.public.Telegram);

  
    // Sample data for channels
   

    // Handle modal visibility and setting the selected channel for removal
    const openModal = (channel:  ChannelConfig): void => {
        setChannelToRemove(channel);
        setShowModal(true);
    };

    // Handle the removal of a channel
    const handleRemove = (): void => {
        dispatch( deleteChannelConfigRequest({ username : channelToRemove?.username }));
        setShowModal(false);
    };

    // Toggle the channel status
    const toggleStatus = ({ username , status   }: ChannelConfig): void => {
        dispatch(putChannelConfigRequest({ username , status : status === 'active' ?  'deactive' : 'active'   }))
    };

    // Change the role of the channel
    const changeRole = (username: string, role: "admin" | "member"): void => {
        dispatch(putChannelConfigRequest({ username ,  role }))
    };

    // Toggle bot status (On/Off)
    const toggleBotStatus = (toggle_bot : any): void => {
       dispatch(putBotConfigRequest({ toggle_bot :  toggle_bot === 'on' ? 'off' : 'on' }))
    };

    // Toggle withdraw (Enable/Disable)
    const toggleWithdraw = (withdraw :any): void => {
          dispatch(putBotConfigRequest({ withdraw :   withdraw === 'disabled' ? 'enabled' : 'disabled' }))
    };

    // Filter channels based on the "Show Only Admins" switch
    const filteredChannels = showOnlyAdmins  ? channelConfig.filter((channel) => channel.role === "admin")  : channelConfig;

    // Define the columns for the Ant Design table for channels
    const channelColumns = [
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Channel URL",
            dataIndex: "channelurl",
            key: "channelUrls",
            render: (text: string) => <a href={text}>{text}</a>,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: "active" | "deactive", record:  ChannelConfig) => (
               
                    
                    <Switch
                        checked={status === "active"}
                        onChange={() => toggleStatus(record)}
                        checkedChildren="Active"
                        unCheckedChildren="Deactive"
                    />
               
            ),
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (role: "admin" | "member", record:  ChannelConfig) => (
                <Select
                    defaultValue={role}
                    onChange={(value) => changeRole(record.username, value)}
                    style={{ width: 120 }}
                >
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="member">Member</Select.Option>
                </Select>
            ),
        },
        {   title : 'Created_At',
            dataIndex : 'created_at'
        },
        {
            title: "Actions",
            key: "actions",
            
            render: (text: string, record:  ChannelConfig) => (
                <Space size="middle">
                     <Button icon={ <DeleteOutlined  size={ 55 }   /> }   onClick={() => openModal(record)}     danger> Delete  </Button>
                     
                </Space>
            ),
        },
    ];

    // Define the columns for the bot configuration table
    const botColumns = [
        {
            title: "Bot Status",
            dataIndex: "toggle_bot",
            key: "toggle_bot",
            render: (status: "on" | "off", record: Bot) => (
                <Switch
                loading={ loading }
                    checked={status === "on"}
                    onChange={() => toggleBotStatus(status)}
                    checkedChildren="On"
                    unCheckedChildren="Off"
                />
            ),
        },
        {
            title: "Withdraw",
            dataIndex: "withdraw",
            key: "withdraw",
            render: (withdraw: "enabled" | "disabled", record: Bot) => (
                <Switch
                    checked={withdraw === "enabled"}
                    onChange={() => toggleWithdraw(withdraw)}
                    checkedChildren="Enabled"
                    unCheckedChildren="Disabled"
                />
            ),
        },
        {
            title: "API Key",
            dataIndex: "token",
            key: "apiKey",
            render: (apiKey: string, record: Bot) => (
                <Space>
                    <Tag color="blue">{apiKey}</Tag>
                    <Button
                        icon={<KeyOutlined />}
                        type="primary"
                        onClick={() => openApiKeyModal(record)}
                    >
                        Manage API Key
                    </Button>
                </Space>
            ),
        },
    ];

    // Open the Manage API Key modal
    const openApiKeyModal = (bot: Bot): void => {
        setApiKeyToManage(bot);
        setNewApiKey(bot.key); // Set the current API key to the input
        setShowApiKeyModal(true);
        
    };

    // Handle adding a new API key
    const handleAddApiKey = (): void => {
        if (apiKeyToManage) {
            dispatch(putBotConfigRequest({ token : newApiKey }))
            setShowApiKeyModal(false);
            setNewApiKey(""); // Clear the input
        }
    };

    // Define the content for the Manage API Key modal
    const apiKeyModalContent = (
        <div>
            <h3>Manage API Key for Bot {apiKeyToManage?.key}</h3>
            <Input
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
                placeholder="Enter new API Key"
            />
        </div>
    );

    return (
        <Card title={ t('setter.layouts.configurations.nav.tgc_L')}>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane
                    tab={
                        <span>
                            <SettingOutlined /> Channel Configuration
                        </span>
                    }
                    key="1"
                >
                    <Space style={{ marginBottom: 16 }}>
                        <Switch
                            checked={showOnlyAdmins}
                            onChange={() => setShowOnlyAdmins(!showOnlyAdmins)}
                            checkedChildren="Show Only Admins"
                            unCheckedChildren="Show All"
                        />
                    </Space>
                    <Table
                        pagination={false}
                        columns={channelColumns}
                        dataSource={filteredChannels}
                        loading={ loading }
                    />
                    <Modal
                        title="Confirm Remove"
                        open={showModal}
                        onOk={handleRemove}
                        onCancel={() => setShowModal(false)}
                    >
                        <p>
                            Are you sure you want to remove the channel{" "}
                            {channelToRemove?.username}?
                        </p>
                    </Modal>
                </Tabs.TabPane>
                <Tabs.TabPane
                    tab={
                        <span>
                            <RobotOutlined /> Bot Configuration
                        </span>
                    }
                    key="2"
                >
                    <Table
                        pagination={false}
                        columns={botColumns}
                        dataSource={ [ botConfig as any ]}
                        loading={ loading }
                    />
                    <Modal
                        title="Manage API Key"
                        open={showApiKeyModal}
                        onOk={handleAddApiKey}
                        onCancel={() => setShowApiKeyModal(false)}
                    >
                        {apiKeyModalContent}
                    </Modal>
                </Tabs.TabPane>
            </Tabs>
        </Card>
    );
}
