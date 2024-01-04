import YouTube from "react-youtube";
import { QueueWidget } from "../components/QueueWidget";
import { useLyricsLoader } from "./useLyricsLoader";

export const Lyrics = () => {
  const { actions, data, refs, state } = useLyricsLoader();
  const { handleNextSong } = actions;
  const { playerOptions } = data;
  const { playerRef } = refs;
  const { queue } = state;

  return (
    <div style={styles.container}>
      <YouTube
        style={styles.player}
        videoId={queue[0]?.videoId ?? "dQw4w9WgXcQ"}
        opts={playerOptions}
        onEnd={handleNextSong}
        onReady={(e) => (playerRef.current = e)}
      />
      <QueueWidget queue={queue} />
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
