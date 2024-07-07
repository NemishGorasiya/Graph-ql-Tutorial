import MediaGallery from "./components/MediaGallery";
import "./App.css";
import {
	RouterProvider,
	createBrowserRouter,
	useSearchParams,
} from "react-router-dom";
import AnimeProfile from "./components/AnimeProfile";
import MediaPage from "./components/MediaPage";
import Layout from "./components/Layout";
import { useEffect } from "react";
import UsersPage from "./components/UsersPage";
import UserProfile from "./components/UserProfile";

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
				{
					path: "users",
					element: <UsersPage />,
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
