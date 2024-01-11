import Pause from "@mui/icons-material/Pause";
import Play from "@mui/icons-material/PlayArrow";
import Skip from "@mui/icons-material/SkipNext";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import { QueueList } from "../components/QueueList";
import { VIDEO_STATUS } from "../constants";
import { useQueueLoader } from "./useQueueLoader";

export const Queue = () => {
  const { actions, state } = useQueueLoader();
  const {
    handleDelete,
    handleMoveUp,
    handleMoveDown,
    handlePause,
    handleResume,
    handleSkip,
  } = actions;
  const { queue, status } = state;

  return (
    <Box style={styles.container}>
      {queue.length ? (
        <Box style={styles.queueContainer}>
          <Typography variant="h4" style={styles.currentlyContainer}>
            <div style={styles.currentlySingingContainer}>
              <b>Currently Singing</b>
              <span style={styles.currentSinging}>{queue[0].karaokeName}</span>
            </div>

            <div style={styles.currentSongContainer}>
              <b>Current Song</b>
              <span style={styles.marquee}>{queue[0].title}</span>
            </div>
          </Typography>
          <Box style={styles.listContainer}>
            <QueueList
              queue={queue.slice(1)}
              handleDelete={handleDelete}
              handleMoveUp={handleMoveUp}
              handleMoveDown={handleMoveDown}
            />
          </Box>
        </Box>
      ) : null}

      <Box style={styles.spacer} />

      <Box style={styles.controlsContainer}>
        <NavLink to="/">Add Song</NavLink>
        <Box style={styles.spacer} />
        {queue.length > 1 ? (
          <IconButton onClick={handleSkip}>
            <Skip color="primary" fontSize="large" />
          </IconButton>
        ) : null}
        {queue.length ? (
          status === VIDEO_STATUS.PLAYING ? (
            <IconButton onClick={handlePause}>
              <Pause fontSize="large" />
            </IconButton>
          ) : (
            <IconButton onClick={handleResume}>
              <Play color="success" fontSize="large" />
            </IconButton>
          )
        ) : null}
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  controlsContainer: {
    alignItems: "center",
    backgroundColor: "white",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    position: "sticky",
    width: "100%",
  },
  currentlyContainer: {
    width: "100%",
  },
  marquee: {
    animation: "marquee 20s linear infinite 5s",
    color: "lawngreen",
    display: "block",
    whiteSpace: "nowrap",
  },
  currentSinging: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    color: "lawngreen",
  },
  currentlySingingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
    width: "100%",
  },
  currentSongContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 32,
    overflow: "hidden",
    width: "100%",
  },
  listContainer: {
    borderBottom: "3px groove orange",
    marginTop: 16,
    padding: 0,
    width: "100%",
  },
  queueContainer: { width: "100%" },
  spacer: { flex: 1 },
} as const;
