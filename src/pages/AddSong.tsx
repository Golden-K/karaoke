import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Snackbar from "@mui/material/Snackbar";
import { LoadingSpinner } from "../components/LoadingSpinner";
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
  const { alert, isLoading, karaokeName, searchTerm, searchResults } = state;
  return (
    <div>
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
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <List>
        {searchResults.map((result, index) => (
          <ListItem
            key={`${result.title}-${index}`}
            onClick={() => handleSelectSong(result)}
          >
            <Link href="#">{result.title}</Link>
          </ListItem>
        ))}
      </List>

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
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
} as const;
