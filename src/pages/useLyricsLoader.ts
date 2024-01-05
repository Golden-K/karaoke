import { useEffect, useRef, useState } from "react";
import { YouTubeEvent } from "react-youtube";
import { QueueItem } from "../../types";
import { socket } from "../socket";

const playerOptions = {
  height: "100%",
  width: "100%",
  playerVars: {
    autoplay: 1,
    fs: 1,
    modestbranding: 1,
    rel: 0,
  },
};

export const useLyricsLoader = () => {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const playerRef = useRef<YouTubeEvent | null>(null);
  const [isWaitingForQueueUpdate, setIsWaitingForQueueUpdate] = useState(false);

  useEffect(() => {
    socket.timeout(5000).emit("get_queue", console.error);

    socket.on("pause_song", () => {
      pauseSong();
    });
    socket.on("resume_song", () => {
      resumeSong();
    });
    socket.on("update_queue", (newQueue) => {
      setQueue(newQueue);
      if (isWaitingForQueueUpdate) {
        if (playerRef.current) {
          playerRef.current.target.seekTo(0);
          playerRef.current.target.playVideo();
          setIsWaitingForQueueUpdate(false);
        }
      }
    });
    socket.on("next_song_ack", () => {
      socket.emit("get_queue", console.error);
      setIsWaitingForQueueUpdate(true);
    });
    return () => {
      socket.off("pause_song");
      socket.off("resume_song");
      socket.off("update_queue");
    };
  }, []);

  const handleVideoStateChange = (event: YouTubeEvent) => {
    switch (event.data) {
      case 0:
        socket.emit("next_song", console.error);
        break;
    }
  };

  const pauseSong = () =>
    playerRef.current && playerRef.current.target
      ? playerRef.current.target.pauseVideo()
      : null;
  const resumeSong = () =>
    playerRef.current && playerRef.current.target
      ? playerRef.current.target.playVideo()
      : null;

  const actions = { handleVideoStateChange };
  const data = { playerOptions };
  const refs = { playerRef };
  const state = { queue };

  return { actions, data, refs, state };
};
