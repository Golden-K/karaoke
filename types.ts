export type Thumbnail = {
  height: number;
  url: string;
  width: number;
};

export type Snippet = {
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
  publishTime: Date;
  publishedAt: Date;
  thumbnails: {
    default: Thumbnail;
    high: Thumbnail;
    medium: Thumbnail;
  };
  title: string;
};

export type Id = {
  kind: string;
  videoId: string;
};

export type Item = {
  snippet: Snippet;
  id: Id;
};

export type SongItem = Snippet & Id;

export type Alert = {
  message: string;
  severity: "error" | "info" | "success" | "warning";
};

export type QueueItem = {
  karaokeName: string;
  title: string;
  videoId: string;
  id: string;
};
