import Pause from "@mui/icons-material/Pause";
import Play from "@mui/icons-material/PlayArrow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ReactDragListView from "react-drag-listview";
import { Link } from "react-router-dom";
import { QueueList } from "../components/QueueList";
import { useQueueLoader } from "./useQueueLoader";

export const Queue = () => {
  const { actions, state } = useQueueLoader();
  const { handleDelete, handleDragEnd, handlePause, handleResume } = actions;
  const { queue } = state;

  return (
    <Box style={styles.container}>
      {queue.length ? (
        <Typography variant="h4" style={styles.currentlyContainer}>
          <div style={styles.currentContainer}>
            <b>Currently Singing</b>
            <span style={styles.currentSinging}>{queue[0].karaokeName}</span>
          </div>

          <div style={styles.currentContainer}>
            <b>Current Song</b>
            <span style={styles.marquee}>{queue[0].title}</span>
          </div>
        </Typography>
      ) : null}
      <Box style={styles.listContainer}>
        <ReactDragListView
          onDragEnd={handleDragEnd}
          nodeSelector="li"
          handleSelector="span"
        >
          <QueueList queue={queue.slice(1)} handleDelete={handleDelete} />
        </ReactDragListView>
      </Box>
      {/* <Box style={styles.spacer} /> */}

      <Box style={styles.controlsContainer}>
        <Link to="/">
          <Button>Add Song</Button>
        </Link>
        <IconButton>
          <Pause onClick={handlePause} fontSize="large" />
        </IconButton>
        <IconButton>
          <Play color="success" onClick={handleResume} fontSize="large" />
        </IconButton>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    flexDirection: "column",
    display: "flex",
    height: "100vh",
    alignItems: "center",
  },
  controlsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  currentlyContainer: {
    width: "100%",
  },
  marquee: {
    whiteSpace: "nowrap",
    display: "block",
    animation: "marquee 20s linear infinite 5s",
  },
  currentSinging: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  currentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    overflow: "hidden",
    width: "100%",
  },
  listContainer: {
    marginTop: 32,
    borderTop: "3px groove orange",
    flex: 1,
    width: "100%",
  },

  spacer: { flex: 1 },
} as const;
