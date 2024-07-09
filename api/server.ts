import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { QueueItem } from "./types";

const VIDEO_STATUS = {
  PAUSED: "PAUSED",
  PLAYING: "PLAYING",
} as const;
let status: keyof typeof VIDEO_STATUS = VIDEO_STATUS.PAUSED;
let queue: QueueItem[] = [];
const connections: Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>[] = [];

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? [process.env.SITE_URL ?? ""]
        : ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  connections.push(socket);
  console.log(" %s sockets is connected", connections.length);

  socket.on("disconnect", () => {
    connections.splice(connections.indexOf(socket), 1);
  });

  socket.emit("update_queue", queue);

  socket.on("add_song", (queueItem) => {
    if (queue.length > 100) {
      return socket.emit("add_song_ack", { status: "error" });
    }
    queueItem.id = crypto.randomUUID();
    queue.push(queueItem);
    socket.emit("add_song_ack", { status: "success" });
    io.emit("update_queue", queue);
  });

  socket.on("delete_from_queue", (id) => {
    queue = queue.filter((item) => item.id !== id);
    io.emit("update_queue", queue);
  });

  socket.on("get_queue", () => {
    io.emit("update_queue", queue);
  });

  socket.on("get_video_status", () => {
    io.emit("update_status", status);
  });

  socket.on("next_song", () => {
    if (queue.length === 0) return;
    queue.shift();
    io.emit("next_song_ack", { status: "success" });
  });

  socket.on("reorder_queue", (newQueue) => {
    queue = newQueue;
    io.emit("update_queue", queue);
  });

  socket.on("restart_song", () => {
    io.emit("restart_song_ack");
  });

  socket.on("set_status", (newStatus) => {
    status = newStatus;
    io.emit("update_status", status);
  });
});

httpServer.listen(3333);
