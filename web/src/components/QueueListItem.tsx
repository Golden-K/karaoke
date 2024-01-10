import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { QueueItem } from "../../types";

type QueueItemProps = {
  isWidget?: boolean;
  item: QueueItem;
};

export const QueueListItem = ({ isWidget, item }: QueueItemProps) => {
  return (
    <Box style={styles.itemContainer}>
      <Typography variant={isWidget ? "h4" : "body1"} style={styles.itemText}>
        {item.karaokeName}
      </Typography>
      <Typography variant={isWidget ? "h4" : "body1"} style={styles.itemText}>
        {item.title}
      </Typography>
    </Box>
  );
};

const styles = {
  itemContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: { flex: 1 },
} as const;
