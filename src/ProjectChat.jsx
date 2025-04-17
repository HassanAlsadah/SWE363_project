import React, { useState } from 'react';
import './ProjectChat.css';

function ProjectChat() {
  const [messages, setMessages] = useState([
    { sender: 'Hassan (Admin)', text: 'Hello', time: '10:32 PM', fromMe: false },
    { sender: 'Mohammed', text: 'What we will do Today?', time: '10:35 PM', fromMe: false },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSend = () => {
    if (newMessage.trim() === '') return;
    const newMsg = {
      sender: 'Me',
      text: newMessage,
      time: getCurrentTime(),
      fromMe: true,
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <div className="chat-box">
      <h1>SWE-363 PROJECT</h1>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`msg ${msg.fromMe ? 'right' : 'left'}`}>
            <span className="sender">{msg.sender}</span>
            <div className="bubble">{msg.text}</div>
            <span className="time">{msg.time}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="send" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ProjectChat;

