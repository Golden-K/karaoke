import { useRef, useState } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleNextSong = () => {};

  const actions = { handleNextSong };
  const data = { playerOptions };
  const refs = { videoRef };
  const state = { currentSong };

  return { actions, data, refs, state };
};
