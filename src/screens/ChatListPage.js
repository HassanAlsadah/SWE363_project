import React from 'react';
import { useNavigate } from 'react-router-dom';
import { chats } from '../data/chatsData';
import '../styles/ChatList.css';

const ChatList = () => {
  const navigate = useNavigate();

  const getLastMessagePreview = (chat) => {
    if (chat.messages?.length > 0) {
      const lastMsg = chat.messages[chat.messages.length - 1];
      return `${lastMsg.fromMe ? 'You' : lastMsg.sender.split(' ')[0]}: ${lastMsg.text}`;
    }
    return chat.lastMessage?.text || "No messages yet";
  };

  const getLastMessageTime = (chat) => {
    return chat.messages?.length > 0 
      ? chat.messages[chat.messages.length - 1].time 
      : chat.lastMessage?.time || '';
  };

  const handleChatClick = (chat) => {
    navigate(`/chat/${chat.id}`, { state: { chat } });
  };

  return (
    <div className="chatlist-container">
      <h1>Messages</h1>
      <div className="chat-list">
        {chats.map((chat) => (
          <div key={chat.id} className="chat-card" onClick={() => handleChatClick(chat)}>
            <div className="chat-avatar">{chat.name.charAt(0)}</div>
            <div className="chat-content">
              <div className="chat-header">
                <span className="chat-name">{chat.name}</span>
                <span className="chat-time">{getLastMessageTime(chat)}</span>
              </div>
              <p className="chat-preview">{getLastMessagePreview(chat)}</p>
              {chat.project && <span className="chat-project">{chat.project}</span>}
            </div>
            {chat.unread > 0 && <div className="unread-badge">{chat.unread}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;