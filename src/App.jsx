import MediaGallery from "./components/MediaGallery";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AnimeProfile from "./components/AnimeProfile";
import MediaPage from "./components/MediaPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MediaGallery />,
    },
    {
      path: "/:id",
      // element: <AnimeProfile />,
      element: <MediaPage />,
    },
  ]);
  return (
    <div className="p-4">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
