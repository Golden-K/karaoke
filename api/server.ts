import { createServer } from "http";
import { Server } from "socket.io";
import { QueueItem } from "../types";

let queue: QueueItem[] = [
  {
    id: crypto.randomUUID(),
    title: "testing skjfklds;jfajdss;f",
    karaokeName: "anojlkfjdsf",
    videoId: "_fhDVVfELsM",
  },
  {
    id: crypto.randomUUID(),
    title: "testing skjfklds;jfajdss;f",
    karaokeName: "anojlkfjdsf",
    videoId: "_fhDVVfELsM",
  },
  {
    id: crypto.randomUUID(),
    title: "testing skjfklds;jfajdss;f",
    karaokeName: "anojlkfjdsf",
    videoId: "_fhDVVfELsM",
  },
  {
    id: crypto.randomUUID(),
    title: "testing skjfklds;jfajdss;f",
    karaokeName: "anojlkfjdsf",
    videoId: "_fhDVVfELsM",
  },
  {
    id: crypto.randomUUID(),
    title: "testing skjfklds;jfajdss;f",
    karaokeName: "anojlkfjdsf",
    videoId: "_fhDVVfELsM",
  },
];

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production" ? false : ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
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

  socket.on("next_song", () => {
    if (queue.length === 0) return;
    queue.shift();
    io.emit("next_song_ack", { status: "success" });
  });

  socket.on("pause_song", () => {
    io.emit("pause_song");
  });

  socket.on("resume_song", () => {
    io.emit("resume_song");
  });

  socket.on("reorder_queue", (newQueue) => {
    queue = newQueue;
    io.emit("update_queue", queue);
  });
});

httpServer.listen(3333);
