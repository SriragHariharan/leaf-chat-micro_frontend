import { io } from "socket.io-client";

// Change this in your frontend socket.ts
const SOCKET_SERVER_URL = "https://api.leaf.monster"; // Remove /socket.io
export const socket = io(SOCKET_SERVER_URL, {
  transports: ["websocket"],
  path: "/socket.io", // Explicitly set the path to match your ingress
});