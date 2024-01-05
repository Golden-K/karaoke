import { QueueItem } from "../../types";
import { QueueListItem } from "./QueueListItem";

type QueueWidgetProps = {
  queue: QueueItem[];
};

export const QueueWidget = ({ queue }: QueueWidgetProps) => {
  return queue.length ? (
    <div style={styles.container}>
      {queue.slice(1).map((item, index) => (
        <QueueListItem item={item} key={`${item.videoId}-${index}`} />
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
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    color: "black",
    width: "100%",
    zIndex: 9999,
    overflow: "hidden",
  },
} as const;
