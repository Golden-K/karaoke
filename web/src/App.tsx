import { ErrorBoundary } from "react-error-boundary";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Current } from "./pages/Current";
import { Home } from "./pages/Home";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/current", element: <Current /> },
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
