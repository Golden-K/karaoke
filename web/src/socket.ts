import { io } from "socket.io-client";

const socketURL = window.location.origin; // This will dynamically get the current origin (e.g., http://localhost:3000)
export const socket = io(socketURL);
