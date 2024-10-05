import { Card, Table, Switch, Input, Button, Space, Tag } from "antd";
import { useState } from "react";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";

export default function Telegram_Config() {
  const [botStatus, setBotStatus] = useState(false);
  const [withdrawStatus, setWithdrawStatus] = useState(false);
  const [channelUsernames, setChannelUsernames] = useState<string[]>([]);
  const [newUsername, setNewUsername] = useState("");
  const [channelUrls, setChannelUrls] = useState<string[]>([]);
  const [newUrl, setNewUrl] = useState("");
  const [apiKeys, setApiKeys] = useState<string>("");
  const [newApiKey, setNewApiKey] = useState("");

  // Add a new channel username to the list
  const addChannelUsername = () => {
    if (newUsername && !channelUsernames.includes(newUsername)) {
      setChannelUsernames([...channelUsernames, newUsername]);
      setNewUsername(""); // Clear input after adding
    }
  };

  // Remove a username from the list
  const removeChannelUsername = (username: string) => {
    setChannelUsernames(channelUsernames.filter((item) => item !== username));
  };

  // Add a new channel URL to the list
  const addChannelUrl = () => {
    if (newUrl && !channelUrls.includes(newUrl)) {
      setChannelUrls([...channelUrls, newUrl]);
      setNewUrl(""); // Clear input after adding
    }
  };

  // Remove a URL from the list
  const removeChannelUrl = (url: string) => {
    setChannelUrls(channelUrls.filter((item) => item !== url));
  };

  // Add a new API key
  const addApiKey = () => {
    setApiKeys(newApiKey);
    setNewApiKey(""); // Clear input after adding
  };


  const handleSave = () => {
    // Save configuration logic (e.g., API call to update settings)
    console.log({   toggle_bot  : botStatus ? 'on' : 'off' ,   withdraw : withdrawStatus ? 'enabled' : 'disabled', apiKeys,
      tg_group: channelUsernames.map((username, index) => ({
        username,
        channel: channelUrls[index] || "",
      })),
    });
  };

  const dataSource = [
    {
      key: "1",
      setting: "Bot Status (On/Off)",
      action: (
        <Switch
          checked={botStatus}
          onChange={(checked) => setBotStatus(checked)}
        />
      ),
    },
    {
      key: "2",
      setting: "Withdraw (Enable/Disable)",
      action: (
        <Switch
          checked={withdrawStatus}
          onChange={(checked) => setWithdrawStatus(checked)}
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
              {channelUsernames.map((username) => (
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
      key: "4",
      setting: "Channel URLs",
      action: (
        <div>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Input
              placeholder="Enter channel URL"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              onPressEnter={addChannelUrl} // Add when pressing Enter
            />
            <Button
              type="dashed"
              onClick={addChannelUrl}
              icon={<PlusOutlined />}
            >
              Add URL
            </Button>
            <div>
              {channelUrls.map((url) => (
                <Tag
                  key={url}
                  closable
                  onClose={() => removeChannelUrl(url)}
                  style={{ marginBottom: 8 }}
                >
                  {url}
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
            placeholder="Enter new API key"
            value={newApiKey}
            onChange={(e) => setNewApiKey(e.target.value)}
            onPressEnter={addApiKey} // Add when pressing Enter
            className="w-140"
          />
          <CloseCircleOutlined onClick={() => setNewApiKey("")} />
        </div>
      ),
    },
    {
      key: "6",
      setting: "",
      action: (
        <Button type="primary" onClick={handleSave}>
          Save Settings
        </Button>
      ),
    },
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
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </Card>
  );
}
