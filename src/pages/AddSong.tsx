import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Snackbar from "@mui/material/Snackbar";
import { NavLink } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { QueueList } from "../components/QueueList";
import { useAddSongLoader } from "./useAddSAongLoader";

export const AddSong = () => {
  const { actions, state } = useAddSongLoader();
  const {
    handleSearch,
    handleSelectSong,
    handleCloseSnackbar,
    setKaraokeName,
    setSearchTerm,
  } = actions;
  const { alert, isLoading, karaokeName, queue, searchTerm, searchResults } =
    state;
  return (
    <div style={styles.container}>
      <QueueList queue={queue} />

      <div style={styles.spacer} />

      <List style={styles.listContainer}>
        {searchResults.map((result, index) => (
          <ListItem
            key={`${result.title}-${index}`}
            onClick={() => handleSelectSong(result)}
          >
            <Link href="#">{result.title}</Link>
          </ListItem>
        ))}
      </List>

      <div style={styles.optionsContainer}>
        <NavLink to="/queue">
          <Button>Go to Queue</Button>
        </NavLink>
        <div style={styles.inputContainer}>
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
        </div>
        <Button onClick={handleSearch}>Search</Button>
      </div>

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
    </div>
  );
};

const styles = {
  container: {
    flexDirection: "column",
    display: "flex",
    height: "100vh",
    alignItems: "center",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    padding: "0 18px",
  },
  listContainer: { backgroundColor: "white" },
  optionsContainer: {
    alignItems: "flex-end",
    backgroundColor: "white",
    display: "flex",
    flexDiection: "row",
    marginTop: 32,
  },
  spacer: { flex: 1 },
} as const;
