import { useEffect, useState } from "react";
import "./ChatRoom.scss";
import { getRoomMessages } from "../../services/userService";

const Chat = ({ to, currentUserId, username, onClose, socket }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const roomId = [currentUserId, to].sort().join("_");

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await getRoomMessages(roomId);
      if (res.status === "successful") {
        setChat(res.messages);
      } else {
        setChat([]);
      }
    };
    fetchMessages();
  }, [roomId]);

  useEffect(() => {
    if (!socket) return;

    console.log("Joining room:", roomId);
    socket.emit("join_room", roomId);

    const handleNewMessage = (data) => {
      console.log("Received message in ChatRoom:", data);
      // Only handle messages for the current room
      if (data.room === roomId) {
        setChat((prev) => [...prev, data]);
      }
    };

    socket.on("receive_message", handleNewMessage);

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("message_error", (error) => {
      console.error("Message error:", error);
    });

    return () => {
      console.log("Leaving room:", roomId);
      socket.off("receive_message", handleNewMessage);
      socket.off("message_error");
      socket.emit("leave_room", roomId);
    };
  }, [roomId, socket]);

  const handleSend = () => {
    if (!socket || !message.trim()) return;

    const data = {
      room: roomId,
      message: message.trim(),
      sender: currentUserId,
      receiver: to,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: new Date().toLocaleDateString(),
    };

    console.log("Sending message:", data);
    // Add message to chat immediately for the sender
    setChat((prev) => [...prev, data]);
    // Send the message through socket
    socket.emit("send_message", data);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-title">
          <h3>Private Chat with {username}</h3>
        </div>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="messages">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={
              msg.sender === currentUserId
                ? "message-container received"
                : "message-container sent"
            }
          >
            <div className="message-content">
              <p>{msg.message}</p>
            </div>
            <div className="message-time">
              <span className="time">{msg.time}</span>
              <span className="date">{msg.date}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
