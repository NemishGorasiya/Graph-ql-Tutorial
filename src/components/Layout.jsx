import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="h-8 bg-gray-200">
        <a href="https://anilist.co/api/v2/oauth/authorize?client_id={client_id}&response_type=token">
          Login with AniList
        </a>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
