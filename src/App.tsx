import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AddSong } from "./pages/AddSong";
import { Lyrics } from "./pages/Lyrics";
import { Queue } from "./pages/Queue";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AddSong />,
  },
  { path: "/queue", element: <Queue /> },
  { path: "/lyrics", element: <Lyrics /> },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
