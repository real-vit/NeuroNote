import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3003");

export default function ChatApp() {
  const [roomCode, setRoomCode] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, `${data.sender}: ${data.message}`]);
    });

    socket.on("userJoined", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userJoined");
    };
  }, []);

  const joinRoom = () => {
    if (roomCode && userId) {
      socket.emit("joinRoom", { roomCode, userId });
      setJoined(true);
    }
  };

  const sendMessage = () => {
    if (message && roomCode && userId) {
      socket.emit("sendMessage", { roomCode, userId, message });
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-2xl font-bold">WebSocket Chat</h1>
      {!joined ? (
        <div className="flex flex-col items-center space-y-2">
          <input
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="p-2 border rounded"
          />
          <button onClick={joinRoom} className="p-2 bg-blue-500 text-white rounded">
            Join Room
          </button>
        </div>
      ) : (
        <div className="w-full max-w-md">
          <div className="h-64 overflow-auto border p-2 mb-2">
            {messages.map((msg, index) => (
              <div key={index} className="p-1 border-b">{msg}</div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Enter Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-2 border w-full"
          />
          <button onClick={sendMessage} className="p-2 bg-green-500 text-white w-full mt-2">
            Send Message
          </button>
        </div>
      )}
    </div>
  );
}

