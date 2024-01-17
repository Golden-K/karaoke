import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SITE_URL
    : "http://localhost:3333";

export const socket = io(URL);
