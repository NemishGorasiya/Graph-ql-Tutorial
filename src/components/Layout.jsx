import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { isAuthorized, setCookie } from "../helper";

const GET_USER = gql`
  query User {
    Viewer {
      name
      avatar {
        medium
      }
    }
  }
`;

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isUserAuthorized = isAuthorized();

  const handleLogout = () => {
    setCookie("accessToken", "", -1);
  };

  const { data, loading, error } = useQuery(GET_USER);

  console.log("data", data);
  const {
    Viewer: { avatar: { medium: avatar } = {}, name: username = "" } = {},
  } = data || {};

  useEffect(() => {
    const hashParams = new URLSearchParams(location.hash.slice(1));
    const accessToken = hashParams.get("access_token");
    console.log("accessToken", accessToken);
    if (accessToken) {
      setCookie("accessToken", accessToken, 7);
      navigate("/");
    }
  }, [location.hash, navigate]);

  return (
    <>
      <div className="bg-gray-200 flex justify-between items-center p-4">
        <div className="flex gap-4">
          <Link to={"/"}>Home</Link>
        </div>
        <div className="flex gap-4">
          {isUserAuthorized ? (
            <>
              {data && (
                <Link to={`/user/${username}`}>
                  <img
                    title={username}
                    className="w-8 h-8"
                    src={avatar}
                    alt="profile-avatar"
                  />
                </Link>
              )}

              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link
              to={`https://anilist.co/api/v2/oauth/authorize?client_id=${
                import.meta.env.VITE_CLIENT_ID
              }&response_type=token`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
