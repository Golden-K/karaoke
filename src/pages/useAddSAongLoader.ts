import { useState } from "react";
import { Alert, Item, SongItem } from "../types";

const { REACT_APP_GOOGLE_API_KEY } = process.env;

export const useAddSongLoader = () => {
  const [alert, setAlert] = useState<Alert | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchRestults] = useState<SongItem[]>([]);

  const handleSearch = async () => {
    try {
      const params = {
        key: REACT_APP_GOOGLE_API_KEY,
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
      if (response.status !== 200) throw new Error("Error searching songs");
      const data = await response.json();
      const { items } = data;
      setSearchRestults(
        items.map((item: Item) => ({ ...item.snippet, id: item.id.videoId }))
      );
    } catch (error: any) {
      console.error(error);
      setAlert({ message: error.message, severity: "error" });
    }
  };

  const handleSelectSong = (song: SongItem) => {
    // TODO: Add song to queue
    setSearchTerm("");
    setSearchRestults([]);
    setAlert({ message: "Song added to queue", severity: "success" });
  };

  const handleCloseSnackbar = () => {
    setAlert(null);
  };

  const actions = {
    handleCloseSnackbar,
    handleSearch,
    handleSelectSong,
    setSearchTerm,
  };
  const state = { alert, searchResults, searchTerm };
  return { actions, state };
};
