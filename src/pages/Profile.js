import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { getUserByUsername } from "../services/firebase";
import Header from "../components/Header";
import UserProfile from "../components/profile";
export default function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function checkUserExist() {
      const [user] = await getUserByUsername(username);
      if (user?.userId) {
        setUser(user);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }
    checkUserExist();
  }, [username, history]);

  return user?.username ? (
    <div className="profile">
      <Header />
      <div className="profile_section">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}
