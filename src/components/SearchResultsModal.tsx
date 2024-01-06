import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Modal from "@mui/material/Modal";
import { SongItem } from "../../types";

type SearchResultsModalProps = {
  searchResults: SongItem[];
  handleSelectSong: (song: SongItem) => void;
  clearSearchResults: () => void;
};

export const SearchResultsModal = ({
  searchResults,
  handleSelectSong,
  clearSearchResults,
}: SearchResultsModalProps) => {
  return (
    <Modal
      open={!!searchResults.length}
      onClose={clearSearchResults}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box style={styles.listContainer}>
        <List style={styles.list}>
          {searchResults.map((result, index) => (
            <ListItem
              key={`${result.title}-${index}`}
              onClick={() => handleSelectSong(result)}
            >
              <a href="#">{result.title}</a>
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  );
};

const styles = {
  list: { backgroundColor: "white" },
  listContainer: {
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
  },
} as const;