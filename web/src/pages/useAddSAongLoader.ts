import { useEffect, useState } from "react";
import { Alert, Item, QueueItem, SongItem } from "../../types";
import { socket } from "../socket";

const MAX_API_KEYS = 10;
const apiKeys: Array<string | undefined> = [];

// YouTube's API key is rate limited to 10,000 "units" per day, and searches cost 100 "units", which equates to 100 searches...
// This is a hack to get around that limit by using 10 API keys, they even recommend it themselves
for (let i = 1; i <= MAX_API_KEYS; i++) {
  const keyName = `REACT_APP_GOOGLE_API_KEY_${i}`;
  apiKeys.push(process.env[keyName]);
}

export const useAddSongLoader = () => {
  const [alert, setAlert] = useState<Alert | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [karaokeName, setKaraokeName] = useState("");
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchRestults] = useState<SongItem[]>([]);
  const [apiKeyIndex, setApiKeyIndex] = useState(0);

  useEffect(() => {
    socket.emit("get_queue", console.error);

    socket.on("update_queue", setQueue);
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
    };
  }, []);

  useEffect(() => {
    if (!karaokeName) return;
    localStorage.setItem("karaokeName", karaokeName);
  }, [karaokeName]);

  const handleSearch = async () => {
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
        maxResults: 3,
        part: "snippet, id",
        q: "karafun karaoke " + searchTerm,
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
        setApiKeyIndex((prev) => {
          if (prev === MAX_API_KEYS - 1) {
            throw new Error("No more API keys available");
          }
          return prev + 1;
        });
        // If we have another API key, we'll wait a second then make the request again
        setTimeout(handleSearch, 1000);
        return;
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

  const clearSearchResults = () => {
    setSearchRestults([]);
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
    };
    socket.emit("add_song", dataForQueue, console.error);
  };

  const handleCloseSnackbar = () => {
    setAlert(null);
  };

  const actions = {
    clearSearchResults,
    handleCloseSnackbar,
    handleSearch,
    handleSelectSong,
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
  };
  return { actions, state };
};
