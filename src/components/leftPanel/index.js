import Explore from "./Explore";
import Tabs from "./Tabs";
import UserProfile from "./UserProfile";
import { useContext, useState, useEffect } from "react";
import UserContext from "../../context/user";
import { GetUserById } from "../../services/firebase";
export default function LeftPanel() {
  const { user } = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await GetUserById(user.uid);
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
    <div className="leftPanel_container">
      <UserProfile
        userAvatar={userAvatar}
        userName={userName}
        userFullName={userFullName}
      />
      <Tabs userName={userName} />
      <Explore />
    </div>
  );
}
