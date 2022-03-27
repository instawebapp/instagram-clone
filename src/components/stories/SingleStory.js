import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/user";
import { getAllStoriesExceptUserUploadedStory } from "../../services/firebase";
export default function SingleStory() {
  const {
    user: { uid: userId },
  } = useContext(UserContext);
  const [stories, setStories] = useState([]);
  const [storiesAvailable, setStoriesAvailable] = useState(false);
  let _componentStatus = useRef(true);
  useEffect(() => {
    async function fetchData() {
      const response = await getAllStoriesExceptUserUploadedStory(userId);
      if (response) {
        setStories(response);
        setStoriesAvailable(true);
      }
    }
    if (_componentStatus) {
      fetchData();
    }
    return () => {
      _componentStatus.current = false;
    };
  }, [userId, storiesAvailable]);

  return (
    <div className="story_container">
      {stories.length > 0 && storiesAvailable ? (
        <div className="stories_section">
          {stories.map((item, index) => {
            return (
              <div className="single_story_section" key={index}>
                <div className="single_story">
                  <Link to={`/stories/${item.start}`}>
                    <img
                      src="/images/avatars/default.png"
                      alt={item.username}
                    />
                  </Link>
                </div>
                <h2 className="">{item.username}</h2>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
