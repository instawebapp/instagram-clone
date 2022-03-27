import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Header from "../components/Header";
import {
  getLinkViews,
  getStoryViews,
  getUserByUsername,
  getUserPhotosByUserId,
} from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Index from "../components/analytics";
export default function Analytics() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [linkViews, setLinkViews] = useState([]);
  const [storyViews, setStoryViews] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function checkUserExist() {
      const [user] = await getUserByUsername(username);
      const views = await getLinkViews();
      const storyviews = await getStoryViews();
      setLinkViews(views);
      setStoryViews(storyviews);
      if (user?.userId) {
        const post = await getUserPhotosByUserId(user.userId);
        setPhotos(post);
        setUser(user);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }
    checkUserExist();
  }, [username, history]);
  return user?.username && photos ? (
    <div className="analytics">
      <Header />
      <div className="analytics_section">
        <Index
          user={user}
          photos={photos}
          linkViews={linkViews}
          storyViews={storyViews}
        />
        {/* graphs */}
      </div>
    </div>
  ) : null;
}
