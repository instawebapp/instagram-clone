import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import { GetUserById } from "../services/firebase";
const Header = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await GetUserById(user.uid);
      if (response) {
        setUserName(response.username);
      }
    }
    if (user) {
      fetchData();
    }
  }, [user]);
  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="flex items-center align-items cursor-pointer text-gray-700 text-center">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD}>
                <img
                  src="/images/logo.png"
                  alt="Instagram logo"
                  className="mt-2 w-1/2"
                />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center h-full">
            {userName !== "" ? (
              <div className="flex items-center">
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8  mr-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
                <button
                  type="button"
                  title="SignOut"
                  onClick={() => firebase.auth().signOut()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      firebase.auth().signOut();
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8  mr-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${userName}`}>
                    <img
                      className="rounded-full h-8 w-8 flex"
                      src={
                        userName !== ""
                          ? `/images/avatars/${userName.jpg}`
                          : `images/avatars/default.png`
                      }
                      alt={
                        userName !== "" ? `${userName} profile` : `user profile`
                      }
                    />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-center mt-1">
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium  w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
