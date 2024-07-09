import YouTube, { YouTubeEvent } from "react-youtube";
import { useLyricsLoader } from "./Lyrics.VM";

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
        opts={playerOptions}
        onReady={(e: YouTubeEvent) => (playerRef.current = e)}
        onStateChange={handleVideoStateChange}
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
