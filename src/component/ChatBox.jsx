import React, { useState, useRef, useEffect } from "react";
import "../style/ChatBox.css";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { text: "Hello, I’m your driver! How can I assist you?", sender: "driver", time: new Date() }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to the bottom whenever a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessage = {
      text: input,
      sender: "user",
      time: new Date()
    };

    // Add user message to the chat
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Simulate driver reply after 1 second
    setTimeout(() => {
      const driverReply = {
        text: "I’m on my way, I’ll be there shortly!",
        sender: "driver",
        time: new Date()
      };

      setMessages((prevMessages) => [...prevMessages, driverReply]);
    }, 1000);

    setInput(""); // Reset the input field
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getChatTitle = () => {
    // Check the last sender to set the title accordingly
    const lastMessage = messages[messages.length - 1];
    return lastMessage.sender === "user" ? "You" : "Driver"; // Return the appropriate title
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">{getChatTitle()}</div>
      <div className="chatbox-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === "user" ? "user-msg" : "driver-msg"}`}
          >
            <div className="chat-bubble">
              <div>{msg.text}</div>
              <span className="chat-time">{formatTime(msg.time)}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbox-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
