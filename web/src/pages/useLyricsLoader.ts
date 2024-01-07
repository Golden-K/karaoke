import { useEffect, useRef, useState } from "react";
import { YouTubeEvent } from "react-youtube";
import { QueueItem } from "../../types";
import { VIDEO_STATUS } from "../constants";
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
  const [isStartingNewSong, setIsStartingNewSong] = useState(false);

  useEffect(() => {
    socket.timeout(5000).emit("get_queue", console.error);

    socket.on("update_status", (status) => {
      switch (status) {
        case VIDEO_STATUS.PLAYING:
          resumeSong();
          break;
        case VIDEO_STATUS.PAUSED:
          pauseSong();
          break;
      }
    });
    socket.on("update_queue", (newQueue) => {
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
    return () => {
      socket.off("update_status");
      socket.off("update_queue");
    };
  }, [isStartingNewSong]);

  const handleVideoStateChange = (event: YouTubeEvent) => {
    switch (event.data) {
      case 0:
        socket.emit("next_song", console.error);
        break;
      case 1: // playing
        socket.emit("set_status", VIDEO_STATUS.PLAYING, console.error);
        break;
      case 2: // paused
        socket.emit("set_status", VIDEO_STATUS.PAUSED, console.error);
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
