import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:2004"; // Change this to your backend URL

export const socket = io(SOCKET_SERVER_URL, {
  autoConnect: false, // Prevents auto connection before explicitly calling connect()
});
