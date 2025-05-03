//chatsData
export let chats = [
    {
      id: 1,
      name: "Hassan",
      unread: 1,
      project: "SWE-363 PROJECT",
      messages: [
        { sender: 'Hassan (Admin)', text: 'Hello', time: '10:32 PM', fromMe: false },
        { sender: 'Mohammed', text: 'What we will do Today?', time: '10:35 PM', fromMe: false }
      ]
    },
    {
      id: 2,
      name: "Project Team",
      unread: 3,
      project: "Mobile App",
      messages: [
        { sender: 'Ali', text: 'UI designs are ready', time: '9:15 AM', fromMe: false },
        { sender: 'Me', text: 'Great job!', time: '9:20 AM', fromMe: true }
      ]
    },
    {
      id: 3,
      name: "Support",
      unread: 0,
      project: "Website",
      messages: [
        { sender: 'Support Team', text: 'Your ticket has been resolved', time: '2:45 PM', fromMe: false }
      ]
    }
  ];
  
  export const updateChatLastMessage = (chatId, newMessage) => {
    const chatIndex = chats.findIndex(c => c.id === chatId);
    if (chatIndex !== -1) {
      chats[chatIndex].lastMessage = {
        text: newMessage.text,
        time: newMessage.time,
        sender: newMessage.sender
      };
      chats[chatIndex].unread = 0; // Mark as read when updated
    }
  };
  
  export const getChatById = (chatId) => {
    return chats.find(chat => chat.id === chatId);
  };