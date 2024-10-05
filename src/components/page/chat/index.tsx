import { Avatar, Button, Input, Slider, Dropdown, Menu } from "antd";
import { useEffect, useRef, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";

export default function ComponentChat() {
    const [chats, setChats] = useState([
        {
            id: 1,
            user: {
                name: "John Doe",
                avatar: "/placeholder-user.jpg",
            },
            messages: [
                { id: 1, content: "Hi there, how can I help you today?", sender: "admin", timestamp: "2023-08-08T09:00:00" },
                { id: 2, content: "I have a question about your product", sender: "user", timestamp: "2023-08-08T09:01:00" },
                { id: 3, content: "Sure, what would you like to know?", sender: "admin", timestamp: "2023-08-08T09:01:30" },
                {
                    id: 4,
                    content: "Can you tell me more about the features?",
                    sender: "user",
                    timestamp: "2023-08-08T09:02:00",
                },
            ],
        }
    ]);

    const [currentChat, setCurrentChat] = useState<number | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [avatarSize, setAvatarSize] = useState(40);

  
    const handleAdminReply = (chatIndex: number, message: string) => {
        const newMessageObj = {
            id: chats[chatIndex].messages.length + 1,
            content: message,
            sender: "admin",
            timestamp: new Date().toISOString(),
        };
        setChats((prevChats) => {
            const updatedChats = [...prevChats];
            updatedChats[chatIndex].messages.push(newMessageObj);
            return updatedChats;
        });
    };

    const menu = (
        <Menu>
            <Menu.Item key="1">Mark as Read</Menu.Item>
            <Menu.Item key="2">Delete Chat</Menu.Item>
            <Menu.Item key="3">Archive Chat</Menu.Item>
        </Menu>
    );

    const ws = useRef<WebSocket | null>(null);



    useEffect(() => {
        // Establish WebSocket connection
        ws.current = new WebSocket("ws://localhost:9003");

        ws.current.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            console.log(receivedMessage)
        };

        return () => {
            if (ws.current) ws.current.close();
        };
    }, []);


    const handleSendMessage = () => {
        if (newMessage.trim() !== "") {
            const newMessageObj = {
                id: chats[currentChat!].messages.length + 1,
                content: newMessage,
                sender: "user",
                timestamp: new Date().toISOString(),
                chatIndex: currentChat!,
            };
            if (ws.current) ws.current.send(JSON.stringify(newMessageObj));
            setNewMessage("");
        }
    };


    return (
        <div className="flex flex-col h-screen md:flex-row">
            <div className="bg-gray-100 border-b md:border-r w-full md:w-80 p-4 md:p-2">
                <h2 className="text-lg font-medium mb-4">Active Chats</h2>
                <div className="space-y-4">
                    {chats.map((chat, index) => (
                        <div
                            key={chat.id}
                            className={`flex items-center gap-3 cursor-pointer hover:bg-gray-200 rounded-md p-2 ${currentChat === index ? 'bg-gray-300' : ''
                                }`}
                            onClick={() => setCurrentChat(index)}
                        >
                            <Avatar src={chat.user.avatar} size={avatarSize} />
                            <div className="flex-1">
                                <h3 className="font-medium text-sm md:text-base">{chat.user.name}</h3>
                                <p className="text-xs md:text-sm text-gray-500 line-clamp-1">
                                    {chat.messages[chat.messages.length - 1].content}
                                </p>
                            </div>
                            <Button
                                type='dashed'
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAdminReply(index, "Hello, how can I assist you?");
                                }}
                            >
                                <MessageCircleIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
            {currentChat !== null && (
                <div className="flex-1 flex flex-col">
                    <div className="bg-gray-100 border-b p-4 flex items-center gap-3">
                        <Avatar size={avatarSize} src={chats[currentChat].user.avatar} />
                        <h2 className="font-medium text-base flex-1">{chats[currentChat].user.name}</h2>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button icon={<EllipsisOutlined />} />
                        </Dropdown>
                    </div>
                    <div className="p-4">
                        <Slider
                            min={30}
                            max={60}
                            value={avatarSize}
                            onChange={(value) => setAvatarSize(value)}
                            tooltipVisible
                        />
                    </div>
                    <div className="flex-1 overflow-auto p-4">
                        <div className="space-y-4">
                            {chats[currentChat].messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex items-start gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"
                                        }`}
                                >
                                    {message.sender === "admin" && (
                                        <Avatar size={avatarSize} src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
                                    )}
                                    <div
                                        className={`p-3 rounded-lg max-w-[70%] ${message.sender === "user"
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200 text-black"
                                            }`}
                                    >
                                        <p className="text-sm">{message.content}</p>
                                        <p className="text-xs text-gray-500 mt-1">{new Date(message.timestamp).toLocaleString()}</p>
                                    </div>
                                    {message.sender === "user" && (
                                        <Avatar size={avatarSize} src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-100 border-t p-4 flex items-center gap-3">
                        <Input
                            type="text"
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSendMessage();
                                }
                            }}
                            className="flex-1"
                        />
                        <Button onClick={handleSendMessage} size="small">Send</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

 

function MessageCircleIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
    );
}
