import { io } from "socket.io-client";

export const socket = io("http://karaoke-api:3333");
