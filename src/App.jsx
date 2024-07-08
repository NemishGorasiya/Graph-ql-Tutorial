import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MediaPage from "./components/MediaPage";
import Layout from "./components/Layout";
import MediaGallery from "./components/MediaGallery";
import UserProfile from "./components/UserProfile";
import "./App.css";

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
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <MediaPage />
            </Suspense>
          ),
        },
        {
          path: "user/:username",
          element: <UserProfile />,
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
