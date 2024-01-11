import { ErrorBoundary } from "react-error-boundary";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Lyrics } from "./pages/Lyrics";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
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
