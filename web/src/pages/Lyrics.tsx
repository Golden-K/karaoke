import YouTube from "react-youtube";
import { useLyricsLoader } from "./useLyricsLoader";

export const Lyrics = () => {
  const { actions, data, refs, state } = useLyricsLoader();
  const { handleVideoStateChange } = actions;
  const { playerOptions } = data;
  const { playerRef } = refs;
  const { queue } = state;

  return (
    <div style={styles.container}>
      <YouTube
        style={styles.player}
        videoId={queue[0]?.videoId ?? "5bCwue1d9Js"}
        // videoId={queue[0]?.videoId ?? "dQw4w9WgXcQ"}
        opts={playerOptions}
        onReady={(e) => (playerRef.current = e)}
        onStateChange={handleVideoStateChange}
      />
      {/* <QueueWidget queue={queue} /> */}
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
