import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { updateChatLastMessage, getChatById } from '../data/chatsData';
import '../styles/ProjectChat.css';

function ProjectChat() {
  const { chatId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatInfo, setChatInfo] = useState({ name: '', project: '' });

  useEffect(() => {
    const chat = location.state?.chat || getChatById(Number(chatId));
    if (chat) {
      setChatInfo({
        name: chat.name,
        project: chat.project
      });
      setMessages(chat.messages || []);
    } else {
      navigate('/chats');
    }
  }, [chatId, location.state, navigate]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      sender: 'Me',
      text: newMessage,
      time: getCurrentTime(),
      fromMe: true
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    updateChatLastMessage(Number(chatId), {
      text: newMessage,
      time: newMsg.time,
      sender: 'You'
    });
    setNewMessage('');
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h1>{chatInfo.project || chatInfo.name}</h1>
        {chatInfo.project && <p>{chatInfo.name}</p>}
      </div>
      
      <div className="messages">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className={`msg ${msg.fromMe ? 'right' : 'left'}`}>
              <span className="sender">{msg.fromMe ? 'You' : msg.sender}</span>
              <div className="bubble">{msg.text}</div>
              <span className="time">{msg.time}</span>
            </div>
          ))
        ) : (
          <div className="no-messages">No messages yet. Start the conversation!</div>
        )}
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="send-btn" onClick={handleSend}>
          <span className="send-icon">➤</span>
        </button>
      </div>
    </div>
  );
}

export default ProjectChat;