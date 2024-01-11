import Down from "@mui/icons-material/ArrowDownward";
import Up from "@mui/icons-material/ArrowUpward";
import Delete from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { QueueItem } from "../../types";
import { QueueListItem } from "./QueueListItem";

type QueueListProps = {
  queue: QueueItem[];
  handleDelete: (id: string) => void;
  handleMoveUp: (id: string) => void;
  handleMoveDown: (id: string) => void;
};

export const QueueList = ({
  queue,
  handleDelete,
  handleMoveUp,
  handleMoveDown,
}: QueueListProps) => {
  return (
    <List style={styles.listContainer}>
      {queue.map((item: QueueItem, index: number) => (
        <ListItem
          key={`${item.videoId}-${index}`}
          style={styles.queueItemContainer}
        >
          <IconButton aria-label="delete" onClick={() => handleDelete(item.id)}>
            <Delete color="error" />
          </IconButton>
          <QueueListItem item={item} />
          <Box style={styles.actionsContainer} />

          {index < queue.length - 1 ? (
            <IconButton
              aria-label="down"
              onClick={() => handleMoveDown(item.id)}
            >
              <Down color="warning" />
            </IconButton>
          ) : (
            <Box style={styles.iconSpacer} />
          )}

          {index > 0 ? (
            <IconButton aria-label="up" onClick={() => handleMoveUp(item.id)}>
              <Up color="success" />
            </IconButton>
          ) : (
            <Box style={styles.iconSpacer} />
          )}
        </ListItem>
      ))}
    </List>
  );
};

const styles = {
  actionsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listContainer: { padding: 0 },
  iconSpacer: { width: 40 },
  queueItemContainer: {
    display: "flex",
    alignContent: "center",
    backgroundColor: "white",
    borderTop: "3px groove orange",
    color: "black",
    msUserSelect: "none",
    overflow: "auto",
    userSelect: "none",
    WebkitUserSelect: "none",
  },
} as const;
