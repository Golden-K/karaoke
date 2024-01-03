import { createServer } from "http";
import { Server } from "socket.io";
import { QueueItem } from "../types";

const queue: QueueItem[] = [];

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production" ? false : ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  socket.on("add_song", (queueItem) => {
    if (queue.length > 100) {
      return socket.emit("add_song_ack", { status: "error" });
    }
    queue.push(queueItem);
    socket.emit("add_song_ack", { status: "success" });
    io.emit("update_queue", queue);
  });
  socket.on("next_song", () => {
    if (queue.length === 0) return;
    queue.shift();
    socket.emit("next_song_ack", { status: "success" });
  });
  socket.on("get_queue", () => {
    socket.emit("update_queue", queue);
  });
});

httpServer.listen(3333);
