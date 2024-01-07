import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://karaoke.junglecorp.org"
    : "http://localhost:3333";

export const socket = io(URL);
