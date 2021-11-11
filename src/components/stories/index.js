import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/user";
import { str } from "../../data";
import SingleStory from "./SingleStory";
import UploadStory from "./UploadStory";
import { getUploadedStory, getAllStories } from "../../services/firebase";
export default function Stories() {
  const {
    user: { uid: userId },
  } = useContext(UserContext);
  const [storyAvailable, setStoryAvailable] = useState(false);
  const [uploadedStory, setUploadedStory] = useState(null);
  const [stories, setStories] = useState(str);
  useEffect(() => {
    async function fetchData() {
      const response = await getUploadedStory(userId);
      const ans = await getAllStories();
      if (ans) {
        let userStory = ans.filter((item) => item.docId === userId);
      }
      if (response) {
        setUploadedStory(response);
        setStoryAvailable(true);
      }
    }
    fetchData();
  }, [userId, storyAvailable]);
  // console.log("stories", stories.length);
  return (
    <div className="flex items-center rounded  bg-white border border-gray-primary mb-12 px-4">
      <UploadStory />
      <div className="flex w-full items-center">
        <SingleStory />
      </div>
    </div>
  );
}
