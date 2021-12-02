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
    <>
      {stories.length > 0 && storiesAvailable ? (
        <>
          {stories.map((item, index) => {
            return (
              <div
                className="flex flex-col items-center justify-center mr-8"
                key={index}
              >
                <div className="w-12 h-12 rounded-full bg-gray-primary mt-2 border-2 border-gray-primary">
                  <Link to={`/stories/${item.start}`}>
                    <img
                      src="/images/avatars/default.png"
                      alt={item.username}
                      className="w-full h-full bg-white rounded-full cursor-pointer"
                    />
                  </Link>
                </div>
                <h2 className="">{item.username}</h2>
              </div>
            );
          })}
        </>
      ) : null}
    </>
  );
}
