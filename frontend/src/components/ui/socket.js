// socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:3002", {
  transports: ["websocket"], // Ensure WebSocket connection
  reconnectionAttempts: 5,   // Retry if disconnected
  reconnectionDelay: 1000,   // Wait 1 second before retrying
});

export default socket;
