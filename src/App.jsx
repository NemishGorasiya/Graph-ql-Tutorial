import MediaGallery from "./components/MediaGallery";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AnimeProfile from "./components/AnimeProfile";
import MediaPage from "./components/MediaPage";
import Layout from "./components/Layout";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      path: "/",
      children: [
        {
          index: true,
          element: <MediaGallery />,
        },
        {
          path: ":id",
          // element: <AnimeProfile />,
          element: <MediaPage />,
        },
      ],
    },
  ]);
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
