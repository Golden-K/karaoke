import { useEffect, useState } from "react";
import { QueueItem } from "../../types";
import { socket } from "../socket";

export const useQueueLoader = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);

  useEffect(() => {
    socket.timeout(5000).emit("get_queue", console.error);

    socket.on("update_queue", setQueue);
    return () => {
      socket.off("update_queue");
    };
  }, []);

  const handleDelete = (id: string) => {
    socket.emit("delete_from_queue", id, console.error);
  };

  const handleDragEnd = (fromIndex: number, toIndex: number) => {
    const item = queue.splice(fromIndex + 1, 1)[0];
    queue.splice(toIndex + 1, 0, item);
    socket.emit("reorder_queue", queue, console.error);
  };

  const handlePause = () => {
    socket.emit("pause_song", console.error);
  };

  const handleResume = () => {
    socket.emit("resume_song", console.error);
  };

  const actions = { handleDelete, handleDragEnd, handlePause, handleResume };
  const state = { queue };
  return { actions, state };
};
