import { QueueItem } from "../../types";
import { QueueRow } from "./QueueRow";

type QueueWidgetProps = {
  queue: QueueItem[];
};

export const QueueWidget = ({ queue }: QueueWidgetProps) => {
  return queue.length ? (
    <div style={styles.container}>
      {queue.slice(1).map((item) => (
        <QueueRow item={item} />
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
} as const;
