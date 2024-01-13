import Pause from "@mui/icons-material/Pause";
import Play from "@mui/icons-material/PlayArrow";
import Skip from "@mui/icons-material/SkipNext";
import Restart from "@mui/icons-material/SkipPrevious";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QueueList } from "../components/QueueList";
import { SearchResultsModal } from "../components/SearchResultsModal";
import { VIDEO_STATUS } from "../constants";
import { useHomeLoader } from "./useHomeLoader";

export const Home = () => {
  const { actions, state } = useHomeLoader();
  const {
    clearSearchResults,
    handleCloseSnackbar,
    handleDelete,
    handleMoveDown,
    handleMoveUp,
    handlePause,
    handleRestartSong,
    handleResume,
    handleSearch,
    handleSelectSong,
    handleSkip,
    setKaraokeName,
    setSearchTerm,
  } = actions;
  const {
    alert,
    isLoading,
    karaokeName,
    queue,
    searchResults,
    searchTerm,
    status,
  } = state;

  return (
    <Box style={styles.container}>
      {queue.length ? (
        <Box style={styles.queueContainer}>
          <Typography variant="body1" style={styles.currentlyContainer}>
            <div style={styles.currentlySingingContainer}>
              <b>Currently Singing</b>
              <span style={styles.currentSinging}>{queue[0].karaokeName}</span>
            </div>

            <div style={styles.currentSongContainer}>
              <b>Current Song</b>
              <span style={styles.marquee}>{queue[0].title}</span>
            </div>
          </Typography>

          <Box style={styles.fullWidth}>
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

      <SearchResultsModal
        searchResults={searchResults}
        handleSelectSong={handleSelectSong}
        clearSearchResults={clearSearchResults}
      />

      <Box style={styles.optionsContainer}>
        <IconButton onClick={handleRestartSong}>
          <Restart color="primary" fontSize="large" />
        </IconButton>
        {status === VIDEO_STATUS.PLAYING ? (
          <IconButton onClick={handlePause}>
            <Pause fontSize="large" />
          </IconButton>
        ) : (
          <IconButton onClick={handleResume}>
            <Play color="success" fontSize="large" />
          </IconButton>
        )}

        {queue.length > 0 ? (
          <IconButton onClick={handleSkip}>
            <Skip color="primary" fontSize="large" />
          </IconButton>
        ) : null}

        <Box style={styles.spacer} />

        <Box style={styles.inputContainer}>
          <Input
            type="text"
            placeholder="Karaoke Name"
            value={karaokeName}
            onChange={({ target }) => setKaraokeName(target.value)}
          />
          <Input
            type="text"
            placeholder="Artist and Song"
            value={searchTerm}
            onChange={({ target }) => setSearchTerm(target.value)}
            onKeyUpCapture={({ key }) => {
              if (key === "Enter") {
                handleSearch();
              }
            }}
          />
        </Box>

        <Box style={styles.spacer} />

        <Button onClick={() => handleSearch()}>Search</Button>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        open={!!alert}
      >
        <Alert onClose={handleCloseSnackbar} severity={alert?.severity}>
          {alert?.message}!
        </Alert>
      </Snackbar>

      <LoadingSpinner isLoading={isLoading} />
    </Box>
  );
};

const styles = {
  container: {
    flexDirection: "column",
    display: "flex",
    height: "100vh",
    alignItems: "center",
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
    overflow: "hidden",
    width: "100%",
  },
  fullWidth: { width: "100%" },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  optionsContainer: {
    alignItems: "flex-end",
    backgroundColor: "white",
    display: "flex",
    flexDiection: "row",
    width: "100%",
    position: "sticky",
    bottom: 0,
  },
  queueContainer: { width: "100%" },
  spacer: { flex: 1 },
} as const;
