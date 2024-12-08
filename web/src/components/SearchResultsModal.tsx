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
      style={styles.container}
    >
      <List style={styles.list}>
        {searchResults.map((result, index) => (
          <ListItem
            key={`${result.title}-${index}`}
            onClick={() => handleSelectSong(result)}
            style={styles.listItemContainer}
          >
            <Box style={styles.listItem}>
              <Box>{result.title}</Box>
              <Box style={styles.thumbnailContainer}>
                <img
                  src={result.thumbnails.medium.url}
                  alt={result.title}
                  height="50px"
                  width="auto"
                />
                <Box>{result.channelTitle}</Box>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Modal>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
  },
  list: {
    position: "relative",
    backgroundColor: "white",
    maxHeight: "80%",
    maxWidth: "90%",
    padding: 0,
    overflow: "auto",
  },
  listItem: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    color: "white",
  },
  listItemContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    border: "3px groove steelblue",
    padding: 0,
    background: "radial-gradient(steelblue, black)",
  },
  thumbnailContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 16,
  },
} as const;
