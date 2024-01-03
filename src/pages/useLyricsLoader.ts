import { useEffect, useRef, useState } from "react";
import { YouTubeEvent } from "react-youtube";
import { SongItem } from "../types";

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
  const [currentSong, setCurrentSong] = useState<SongItem | null>(null);
  const playerRef = useRef<YouTubeEvent | null>(null);

  useEffect(() => {
    // Fetch queue
  }, []);

  const handleNextSong = () => {
    // Fetch queue
    // Or if we're using something in realtime, yeet the song that just finished from the queue
  };

  const pauseSong = () =>
    playerRef.current && playerRef.current.target
      ? playerRef.current.target.pauseVideo()
      : null;
  const resumeSong = () =>
    playerRef.current && playerRef.current.target
      ? playerRef.current.target.playVideo()
      : null;

  const actions = { handleNextSong };
  const data = { playerOptions };
  const refs = { playerRef };
  const state = { currentSong };

  return { actions, data, refs, state };
};
