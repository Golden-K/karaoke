import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { QueueItem } from "../../types";

type QueueItemProps = {
  item: QueueItem;
};

export const QueueListItem = ({ item }: QueueItemProps) => {
  return (
    <Box style={styles.itemContainer}>
      <Typography variant="h4" style={{ flex: 1 }}>
        {item.karaokeName}
      </Typography>
      <Typography variant="h4" style={{ flex: 1 }}>
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
} as const;
