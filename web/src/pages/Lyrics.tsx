import { Box, Link, Typography } from "@mui/material";
import { useLyricsLoader } from "./Lyrics.VM";

export const Lyrics = () => {
  const { actions, state } = useLyricsLoader();
  const { nextSong } = actions;
  const { queue } = state;

  return (
    <Box style={styles.container}>
      {queue[0]?.videoId ? (
        <Typography variant="h1">
          <Link
            href={`https://www.youtube.com/v/${queue[0].videoId}`}
            target="_blank"
            onClick={nextSong}
          >
            {queue[0].title}
          </Link>
        </Typography>
      ) : (
        <Typography variant="h1">Queue is empty</Typography>
      )}
    </Box>
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
