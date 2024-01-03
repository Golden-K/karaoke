import { QueueItem } from "../../types";

type QueueListProps = {
  queue: QueueItem[];
};

export const QueueList = ({ queue }: QueueListProps) => {
  console.log("IN THE QUEUE LIST", queue);
  return queue.length ? (
    <div style={styles.container}>
      {queue.map((item) => (
        <div style={styles.itemContainer}>
          <div style={{ flex: 1 }}>{item.karaokeName}</div>
          <div style={{ flex: 1 }}>{item.title}</div>
        </div>
      ))}
    </div>
  ) : null;
};

const styles = {
  container: {
    position: "fixed",
    top: 0,
    right: 0,
    height: "20%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    zIndex: 9999,
    overflow: "hidden",
  },
  itemContainer: {
    marginTop: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
} as const;
