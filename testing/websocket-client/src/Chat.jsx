import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

// Create a socket connection to the backend
const socket = io('http://localhost:3002', {
  transports: ['websocket'],  // Force WebSocket connection instead of polling
  withCredentials: true,
});

export default function ChatApp() {
  const [roomCode, setRoomCode] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [joined, setJoined] = useState(false);

  // Listen for messages from the server (join and sendMessage events)
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("receiveMessage", (data) => {
      console.log("Message received:", data); // Debugging log
      setMessages((prevMessages) => [
        ...prevMessages,
        `${data.sender}: ${data.message}`,
      ]);
    });

    socket.on("userJoined", (msg) => {
      console.log("User joined:", msg); // Debugging log
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on("error", (error) => {
      console.error("Error:", error);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userJoined");
      socket.off("error");
    };
  }, []);

  // Join a room and start the session
  const joinRoom = () => {
    console.log("Joining room with code:", roomCode, "and user ID:", userId);
    if (roomCode && userId) {
      socket.emit("joinRoom", { roomCode, userId });
      setJoined(true);
    }
  };

  // Send a message to the room
  const sendMessage = () => {
    console.log("Sending message:", message); // Debugging log
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
