import {   Table,  Tag,  Card,    Switch,   Space,   Button, Modal, Select, Tabs, Input } from "antd";
import { useState } from "react";
import {   SettingOutlined,  RobotOutlined,  KeyOutlined } from "@ant-design/icons"; // Importing icons

// Define types for the channel and bot data
interface Channel {
    key: string;
    username: string;
    channelUrls: string;
    role: "admin" | "user"; // Role can be either 'admin' or 'user'
    status: "active" | "deactive"; // Status can be 'active' or 'deactive'
}

interface Bot {
    key: string;
    status: "on" | "off"; // Bot status
    withdraw: "enabled" | "disabled"; // Withdraw status
    apiKey: string; // API Key
}

const initialChannels: Channel[] = [
    {
        key: "1",
        username: "ChannelUser1",
        channelUrls: "https://t.me/channel1",
        role: "admin",
        status: "active",
    },
    {
        key: "2",
        username: "ChannelUser2",
        channelUrls: "https://t.me/channel2",
        role: "user",
        status: "deactive",
    },
    {
        key: "3",
        username: "ChannelUser3",
        channelUrls: "https://t.me/channel3",
        role: "user",
        status: "deactive",
    },
];

// Sample data for bot configurations
const initialBots: Bot[] = [
    {
        key: "1",
        status: "on",
        withdraw: "enabled",
        apiKey: "API-KEY-123",
    },

];


export default function List() {
    const [channels, setChannels] = useState<Channel[]>(initialChannels); // State for the list of channels
    const [bots, setBots] = useState<Bot[]>(initialBots); // State for bot settings
    const [showOnlyAdmins, setShowOnlyAdmins] = useState<boolean>(false); // State for toggling admin-only view
    const [showModal, setShowModal] = useState<boolean>(false); // Modal visibility state for removing a channel
    const [showApiKeyModal, setShowApiKeyModal] = useState<boolean>(false); // Modal visibility state for managing API keys
    const [channelToRemove, setChannelToRemove] = useState<Channel | null>(null); // State for the channel to be removed
    const [apiKeyToManage, setApiKeyToManage] = useState<Bot | null>(null); // State for the bot whose API key is managed
    const [newApiKey, setNewApiKey] = useState<string>(""); // State for the new API key input

    // Sample data for channels



    // Handle modal visibility and setting the selected channel for removal
    const openModal = (channel: Channel): void => {
        setChannelToRemove(channel);
        setShowModal(true);
    };

    // Handle the removal of a channel
    const handleRemove = (): void => {
        setChannels((prevChannels) =>
            prevChannels.filter((channel) => channel.key !== channelToRemove?.key)
        );
        setShowModal(false);
    };

    // Toggle the channel status
    const toggleStatus = (key: string): void => {
        setChannels((prevChannels) =>
            prevChannels.map((channel) =>
                channel.key === key
                    ? {
                        ...channel,
                        status: channel.status === "active" ? "deactive" : "active",
                    }
                    : channel
            )
        );
    };

    // Change the role of the channel
    const changeRole = (key: string, newRole: "admin" | "user"): void => {
        setChannels((prevChannels) =>
            prevChannels.map((channel) =>
                channel.key === key ? { ...channel, role: newRole } : channel
            )
        );
    };

    // Toggle bot status (On/Off)
    const toggleBotStatus = (key: string): void => {
        setBots((prevBots) =>
            prevBots.map((bot) =>
                bot.key === key ? { ...bot, status: bot.status === "on" ? "off" : "on" } : bot
            )
        );
    };

    // Toggle withdraw (Enable/Disable)
    const toggleWithdraw = (key: string): void => {
        setBots((prevBots) =>
            prevBots.map((bot) =>
                bot.key === key
                    ? { ...bot, withdraw: bot.withdraw === "enabled" ? "disabled" : "enabled" }
                    : bot
            )
        );
    };

    // Filter channels based on the "Show Only Admins" switch
    const filteredChannels = showOnlyAdmins
        ? channels.filter((channel) => channel.role === "admin") // Show only admins
        : channels;

    // Define the columns for the Ant Design table for channels
    const channelColumns = [
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Channel URL",
            dataIndex: "channelUrls",
            key: "channelUrls",
            render: (text: string) => <a href={text}>{text}</a>,
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: "active" | "deactive", record: Channel) => (
                <Space>
                    <Tag color={status === "active" ? "green" : "red"}>{status}</Tag>
                    <Switch
                        checked={status === "active"}
                        onChange={() => toggleStatus(record.key)}
                        checkedChildren="Active"
                        unCheckedChildren="Deactive"
                    />
                </Space>
            ),
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (role: "admin" | "user", record: Channel) => (
                <Select
                    defaultValue={role}
                    onChange={(value) => changeRole(record.key, value)}
                    style={{ width: 120 }}
                >
                    <Select.Option value="admin">Admin</Select.Option>
                    <Select.Option value="user">User</Select.Option>
                </Select>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (text: string, record: Channel) => (
                <Space size="middle">
                    <Button onClick={() => openModal(record)} danger>
                        Remove
                    </Button>
                </Space>
            ),
        },
    ];

    // Define the columns for the bot configuration table
    const botColumns = [
        {
            title: "Bot Status",
            dataIndex: "status",
            key: "status",
            render: (status: "on" | "off", record: Bot) => (
                <Switch
                    checked={status === "on"}
                    onChange={() => toggleBotStatus(record.key)}
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
                    onChange={() => toggleWithdraw(record.key)}
                    checkedChildren="Enabled"
                    unCheckedChildren="Disabled"
                />
            ),
        },
        {
            title: "API Key",
            dataIndex: "apiKey",
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
        setNewApiKey(bot.apiKey); // Set the current API key to the input
        setShowApiKeyModal(true);
    };

    // Handle adding a new API key
    const handleAddApiKey = (): void => {
        if (apiKeyToManage) {
            setBots((prevBots) =>
                prevBots.map((bot) =>
                    bot.key === apiKeyToManage.key
                        ? { ...bot, apiKey: newApiKey } // Update the API key
                        : bot
                )
            );
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
        <Card title="Telegram Channel and Bot Configuration">
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
                    />
                    <Modal
                        title="Confirm Remove"
                        visible={showModal}
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
                        dataSource={bots}
                    />
                    <Modal
                        title="Manage API Key"
                        visible={showApiKeyModal}
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
