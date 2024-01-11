import { useEffect, useState } from "react";
import { Alert, Item, QueueItem, SongItem } from "../../types";
import { VIDEO_STATUS } from "../constants";
import { socket } from "../socket";

const MAX_API_KEYS = 2;
const apiKeys: Array<string | undefined> = [];

// YouTube's API key is rate limited to 10,000 "units" per day, and searches cost 100 "units", which equates to 100 searches...
// This is a hack to get around that limit by using 2 API keys from different projects
for (let i = 1; i <= MAX_API_KEYS; i++) {
  const keyName = `REACT_APP_GOOGLE_API_KEY_${i}`;
  apiKeys.push(process.env[keyName]);
}

export const useHomeLoader = () => {
  const [alert, setAlert] = useState<Alert | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [karaokeName, setKaraokeName] = useState("");
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [searchResults, setSearchRestults] = useState<SongItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<keyof typeof VIDEO_STATUS>(
    VIDEO_STATUS.PAUSED
  );

  useEffect(() => {
    socket.emit("get_queue", console.error);
    socket.emit("get_video_status", console.error);

    socket.on("update_queue", setQueue);
    socket.on("update_status", setStatus);
    socket.on("add_song_ack", (data) => {
      setIsLoading(false);
      if (data.status === "error") {
        return setAlert({
          message: "Error adding song to queue",
          severity: "error",
        });
      }

      setSearchTerm("");
      setSearchRestults([]);
      setAlert({ message: "Song added to queue", severity: "success" });
    });

    const localKaraokeName = localStorage.getItem("karaokeName");
    if (localKaraokeName) setKaraokeName(localKaraokeName);

    return () => {
      socket.off("add_song_ack");
      socket.off("update_queue");
      socket.off("update_status");
    };
  }, []);

  useEffect(() => {
    if (!karaokeName) return;
    localStorage.setItem("karaokeName", karaokeName);
  }, [karaokeName]);

  const clearSearchResults = () => {
    setSearchRestults([]);
  };
  const moveSong = (fromIndex: number, toIndex: number) => {
    const item = queue.splice(fromIndex + 1, 1)[0];
    queue.splice(toIndex - 1, 0, item);
    socket.emit("reorder_queue", queue, console.error);
  };

  const handleSearch = async (apiKeyIndex = 0): Promise<void> => {
    if (!karaokeName || !searchTerm) {
      return setAlert({
        message: "Please enter a karaoke name and search term",
        severity: "error",
      });
    }
    try {
      setIsLoading(true);
      const params = {
        key: apiKeys[apiKeyIndex],
        maxResults: 7,
        part: "snippet, id",
        q: "karaoke with lyrics " + searchTerm,
        type: "video",
        videoEmbeddable: true,
      };
      const parsedParams = Object.entries(params).map(
        ([key, value]) => `${key}=${value}`
      );
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?${parsedParams.join("&")}`
      );
      if (response.status === 403) {
        if (apiKeyIndex === MAX_API_KEYS - 1) {
          throw new Error("No more API keys available");
        }
        // If we have another API key, we'll wait a second then make the request again
        return handleSearch(apiKeyIndex + 1);
      }
      if (response.status !== 200) {
        throw new Error("Error searching songs");
      }
      const data = await response.json();
      const { items } = data;
      setSearchRestults(
        items.map((item: Item) => ({
          ...item.snippet,
          videoId: item.id.videoId,
        }))
      );
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);
      setAlert({ message: error.message, severity: "error" });
    }
  };
  const handleSelectSong = (song: SongItem) => {
    if (!karaokeName) {
      return setAlert({
        message: "Please enter a karaoke name",
        severity: "error",
      });
    }
    setIsLoading(true);
    const dataForQueue = {
      karaokeName,
      videoId: song.videoId,
      title: song.title,
      channelTitle: song.channelTitle,
    };
    socket.emit("add_song", dataForQueue, console.error);
  };
  const handleCloseSnackbar = () => {
    setAlert(null);
  };
  const handleDelete = (id: string) => {
    socket.emit("delete_from_queue", id, console.error);
  };
  const handleMoveUp = (id: string) => {
    const index = queue.findIndex((item) => item.id === id);
    moveSong(index - 1, index);
  };
  const handleMoveDown = (id: string) => {
    const index = queue.findIndex((item) => item.id === id);
    moveSong(index, index + 1);
  };
  const handlePause = () => {
    socket.emit("set_status", VIDEO_STATUS.PAUSED, console.error);
  };
  const handleResume = () => {
    socket.emit("set_status", VIDEO_STATUS.PLAYING, console.error);
  };
  const handleSkip = () => {
    socket.emit("next_song", console.error);
  };

  const actions = {
    clearSearchResults,
    handleCloseSnackbar,
    handleDelete,
    handleMoveDown,
    handleMoveUp,
    handlePause,
    handleResume,
    handleSearch,
    handleSelectSong,
    handleSkip,
    setKaraokeName,
    setSearchTerm,
  };
  const state = {
    alert,
    isLoading,
    karaokeName,
    queue,
    searchResults,
    searchTerm,
    status,
  };
  return { actions, state };
};
