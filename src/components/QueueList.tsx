import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { QueueItem } from "../../types";
import { QueueListItem } from "./QueueListItem";

type QueueListProps = {
  queue: QueueItem[];
  handleDelete?: (id: string) => void;
};

export const QueueList = ({ queue, handleDelete }: QueueListProps) => {
  return (
    <List style={styles.listContainer}>
      {queue.map((item: QueueItem, index: number) => (
        <ListItem
          key={`${item.videoId}-${index}`}
          style={styles.queueItemContainer}
        >
          {handleDelete ? (
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(item.id)}
            >
              <Delete color="error" />
            </IconButton>
          ) : null}
          <QueueListItem item={item} />
        </ListItem>
      ))}
    </List>
  );
};

const styles = {
  listContainer: { padding: 0 },
  queueItemContainer: {
    alignContent: "center",
    backgroundColor: "white",
    borderTop: "3px groove orange",
    color: "black",
    cursor: "grab",
    WebkitUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
  },
} as const;
