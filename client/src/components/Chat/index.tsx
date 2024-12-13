import React, { useState, useEffect } from "react";
import "./Chat.css";

function Chat({ groupId, onHoveredSenderChange }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [groupId]);

  const fetchMessages = async () => {
  
  };

  const handleMouseEnter = (senderId) => {
    onHoveredSenderChange(senderId);
  };

  const handleMouseLeave = () => {
    onHoveredSenderChange(null);
  };
  const handleClick = (location) => {
    console.log("mensagens:", [messages]);
  };
  return (
    <div onClick={handleClick} className="flex flex-col items-start justify-start w-full h-full overflow-t  -auto">
      te
      {messages.map((message, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-start w-full"
          onMouseEnter={() => handleMouseEnter(message.sender)}
          onMouseLeave={handleMouseLeave}
        >
          <span className="font-bold mr-2">{message.sender}</span>
          <span>{message.message}</span>
          <span>{new Date(message.createdAt).toLocaleString()}</span>
        </div>
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default Chat;
