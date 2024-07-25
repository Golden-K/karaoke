import { io } from "socket.io-client";

const socketURL = window.location.origin; // This will dynamically get the current origin (e.g., http://localhost:3000)
export const socket = io(
  process.env.NODE_ENV === "production" ? socketURL : "http://localhost:3333"
);
