import { useEffect, useRef, useState } from "react";
import { YouTubeEvent } from "react-youtube";
import { QueueItem } from "../../types";
import { socket } from "../socket";

export const useLyricsLoader = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const playerRef = useRef<YouTubeEvent | null>(null);
  const [isStartingNewSong, setIsStartingNewSong] = useState(false);

  useEffect(() => {
    socket.timeout(5000).emit("get_queue", console.error);
    socket.on("update_queue", (newQueue: QueueItem[]) => {
      setQueue(newQueue);
      if (isStartingNewSong) {
        if (playerRef.current) {
          playerRef.current.target.seekTo(0);
          playerRef.current.target.playVideo();
          setIsStartingNewSong(false);
        }
      }
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
