import { useEffect, useState } from "react";
import { QueueItem } from "../../types";
import { VIDEO_STATUS } from "../constants";
import { socket } from "../socket";

export const useQueueLoader = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [status, setStatus] = useState<keyof typeof VIDEO_STATUS>(
    VIDEO_STATUS.PAUSED
  );

  useEffect(() => {
    socket.emit("get_queue", console.error);
    socket.emit("get_video_status", console.error);

    socket.on("update_queue", setQueue);
    socket.on("update_status", setStatus);
    return () => {
      socket.off("update_queue");
      socket.off("update_status");
    };
  }, []);

  const handleDelete = (id: string) => {
    socket.emit("delete_from_queue", id, console.error);
  };

  const moveSong = (fromIndex: number, toIndex: number) => {
    const item = queue.splice(fromIndex + 1, 1)[0];
    queue.splice(toIndex - 1, 0, item);
    socket.emit("reorder_queue", queue, console.error);
  };

  const handleMoveUp = (id: string) => {
    const index = queue.findIndex((item) => item.id === id);
    moveSong(index - 1, index);
  };

  const handleMoveDown = (id: string) => {
    const index = queue.findIndex((item) => item.id === id);
    moveSong(index, index + 1);
  };

  const handlePause = () => {
    socket.emit("set_status", VIDEO_STATUS.PAUSED, console.error);
  };

  const handleResume = () => {
    socket.emit("set_status", VIDEO_STATUS.PLAYING, console.error);
  };

  const handleSkip = () => {
    socket.emit("next_song", console.error);
  };

  const actions = {
    handleDelete,
    handleMoveUp,
    handleMoveDown,
    handlePause,
    handleResume,
    handleSkip,
  };
  const state = { status, queue };
  return { actions, state };
};
