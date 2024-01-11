import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Snackbar from "@mui/material/Snackbar";
import { NavLink } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QueueList } from "../components/QueueList";
import { SearchResultsModal } from "../components/SearchResultsModal";
import { useAddSongLoader } from "./useAddSAongLoader";

export const AddSong = () => {
  const { actions, state } = useAddSongLoader();
  const {
    clearSearchResults,
    handleSearch,
    handleSelectSong,
    handleCloseSnackbar,
    setKaraokeName,
    setSearchTerm,
  } = actions;
  const { alert, isLoading, karaokeName, queue, searchTerm, searchResults } =
    state;

  return (
    <Box style={styles.container}>
      <Box style={styles.fullWidth}>
        <QueueList queue={queue} />
      </Box>

      <Box style={styles.spacer} />

      <SearchResultsModal
        searchResults={searchResults}
        handleSelectSong={handleSelectSong}
        clearSearchResults={clearSearchResults}
      />

      <Box style={styles.optionsContainer}>
        <NavLink to="/queue">Queue</NavLink>

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

        <Button onClick={handleSearch}>Search</Button>
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
  fullWidth: { width: "100%" },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "0 18px",
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
  spacer: { flex: 1 },
} as const;
