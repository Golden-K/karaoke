import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { QueueItem } from "../../types";

type QueueItemProps = {
  item: QueueItem;
};

export const QueueListItem = ({ item }: QueueItemProps) => {
  return (
    <Box style={styles.itemContainer}>
      <Typography variant="body1" style={styles.itemText}>
        {item.karaokeName}
      </Typography>
      <Typography variant="caption" style={styles.itemText}>
        {item.title}
      </Typography>
    </Box>
  );
};

const styles = {
  itemContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
  },
  itemText: { flex: 1 },
} as const;
