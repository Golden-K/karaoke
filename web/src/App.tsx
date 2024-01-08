import { ErrorBoundary } from "react-error-boundary";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { AddSong } from "./pages/AddSong";
import { Lyrics } from "./pages/Lyrics";
import { Queue } from "./pages/Queue";

const router = createHashRouter([
  {
    path: "/",
    element: <AddSong />,
  },
  { path: "/queue", element: <Queue /> },
  { path: "/lyrics", element: <Lyrics /> },
]);

function App() {
  return (
    <ErrorBoundary fallback={<h1>Err0r!</h1>}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ErrorBoundary>
  );
}

export default App;
