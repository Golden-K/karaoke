import { QueueItem } from "../../types";

type QueueItemProps = {
  item: QueueItem;
};

export const QueueListItem = ({ item }: QueueItemProps) => {
  return (
    <span style={styles.itemContainer}>
      <div style={{ flex: 1 }}>{item.karaokeName}</div>
      <div style={{ flex: 1 }}>{item.title}</div>
    </span>
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
