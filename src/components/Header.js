import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { LOGO } from "../constants/img_paths";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import { GetUserById } from "../services/firebase";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "./form/Button";
const Header = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  const [userName, setUserName] = useState("");
  // const [userAvatar, setUserAvatar] = useState(null);
  const handleLogoutClick = (e) => {
    firebase.auth().signOut();
  };
  const handleLogoutKey = (e) => {
    if (e.key === "Enter") {
      firebase.auth().signOut();
    }
  };
  const handleLogin = (e) => {
    console.log("Login...");
  };
  const handleSignUp = (e) => {
    console.log("SignUp...");
  };

  useEffect(() => {
    async function fetchData() {
      const response = await GetUserById(user.uid);
      if (response) {
        setUserName(response.username);
        // setUserAvatar(response?.avatar?.avatarURL);
      }
    }
    if (user) {
      fetchData();
    }
  }, [user]);
  return (
    <header className="header">
      <div className="header_container">
        <div className="header_logo">
          <h1>
            <Link to={ROUTES.DASHBOARD}>
              <img src={LOGO} alt="Instagram Logo" />
            </Link>
          </h1>
        </div>
        <div className="header_info">
          {userName !== "" ? (
            <div className="header_loggedIn_icons">
              <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                <div className="icon">
                  <HomeIcon style={{ color: "" }} />
                </div>
              </Link>
              <Link to="/upload">
                <div className="icon">
                  <AddCircleOutlineIcon />
                </div>
              </Link>
              <Button
                btnType={"button"}
                btnTitle={""}
                btnClass={"logout_btn"}
                icon={<LogoutIcon />}
                handleClick={handleLogoutClick}
                handleKey={handleLogoutKey}
              />
              {/* <div className="header_user_avatar">
                <Link to={`/p/${userName}`}>
                  <img
                    src={
                      userName !== ""
                        ? `${userAvatar}`
                        : `${DEFAULT_IMAGE_PATH}`
                    }
                    alt={
                      userName !== "" ? `${userName} profile` : `user profile`
                    }
                  />
                </Link>
              </div> */}
            </div>
          ) : (
            <div className="header_loggedOut_btns">
              <Link to={ROUTES.LOGIN}>
                <Button
                  btnType={"button"}
                  btnTitle={"Log In"}
                  btnClass={"btn login_btn"}
                  icon={""}
                  handleClick={handleLogin}
                  handleKey={handleLogin}
                />
              </Link>
              <Link to={ROUTES.SIGN_UP}>
                <Button
                  btnType={"button"}
                  btnTitle={"Sign Up"}
                  btnClass={"btn signup_btn"}
                  icon={""}
                  handleClick={handleSignUp}
                  handleKey={handleSignUp}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
