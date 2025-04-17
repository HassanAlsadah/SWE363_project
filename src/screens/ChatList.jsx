import React from 'react';
import './ChatList.css';

const chats = [
  { name: "Hassan", message: "ok, see you tommorow", unread: 1, project: "project 2" },
  { name: "ProjectSWE363 ", message: "Hassan : noted", unread: 23 },
  { name: "Ali", message: "I have no issues", unread: 1, project: "project 2" }
];

const ChatList = () => {
  return (
    <div className="chatlist-container">
      <h1>Chat</h1>
      {chats.map((chat, index) => (
        <div key={index} className="chat-card">
          <div>
            <strong>{chat.name}</strong>
            <p>{chat.message}</p>
          </div>
          <div className="right-bubble">
            <div className="count">{chat.unread}</div>
            {chat.project && <div className="project-name">{chat.project}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
