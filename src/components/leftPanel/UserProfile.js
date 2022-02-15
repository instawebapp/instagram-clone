import { useContext, useState, useEffect } from "react";
import { DEFAULT_IMAGE_PATH } from "../../constants/img_paths";
import UserContext from "../../context/user";
import { GetUserById } from "../../services/firebase";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
export default function UserProfile() {
  const { user } = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await GetUserById(user.uid);
      console.log(response);
      if (response) {
        setUserName(response?.username);
        setUserFullName(response?.fullName);
        setUserAvatar(response?.avatar?.avatarURL);
      }
    }
    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <section className="userProfile_section">
      <div className="user_avatar">
        <img src={userAvatar || DEFAULT_IMAGE_PATH} alt="user-avatar" />
      </div>
      <div className="user_details">
        <h2 className="user_fullname">{userFullName}</h2>
        <Link to={`/p/${userName}`}>
          <h4 className="username">@{userName}</h4>
        </Link>
      </div>
    </section>
  );
}
