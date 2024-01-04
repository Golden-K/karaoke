import { Delete } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { QueueItem } from "../../types";
import { QueueRow } from "./QueueRow";

type QueueListProps = {
  queue: QueueItem[];
  handleDelete?: (id: string) => void;
};

export const QueueList = ({ queue, handleDelete }: QueueListProps) => {
  return (
    <List>
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
          <QueueRow item={item} />
        </ListItem>
      ))}
    </List>
  );
};

const styles = {
  queueItemContainer: {
    alignContent: "center",
    borderBottom: "3px groove orange",
    cursor: "grab",
    WebkitUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
  },
} as const;
