import { useEffect, useState } from "react";
import { QueueItem } from "../../types";
import { socket } from "../socket";

export const useCurrentLoader = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [isStartingNewSong, setIsStartingNewSong] = useState(false);

  useEffect(() => {
    socket.timeout(5000).emit("get_queue", console.error);
    socket.on("update_queue", (newQueue: QueueItem[]) => {
      setQueue(newQueue);
    });
    socket.on("next_song_ack", () => {
      socket.emit("get_queue", console.error);
      setIsStartingNewSong(true);
    });
  }, [isStartingNewSong]);

  const nextSong = () => socket.emit("next_song", console.error);

  const actions = { nextSong };
  const state = { queue };

  return { state, actions };
};
