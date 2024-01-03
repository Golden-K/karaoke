import YouTube from "react-youtube";
import { useLyricsLoader } from "./useLyricsLoader";

export const Lyrics = () => {
  const { actions, data, refs, state } = useLyricsLoader();
  const { handleNextSong } = actions;
  const { playerOptions } = data;
  const { videoRef } = refs;
  const { currentSong } = state;

  return (
    <div style={styles.container}>
      <YouTube
        style={styles.player}
        videoId={currentSong?.videoId ?? "dQw4w9WgXcQ"}
        opts={playerOptions}
        onEnd={handleNextSong}
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    height: "100vh",
    overflow: "hidden",
  },
  player: { width: "100%", height: "100%", border: "none" },
};
