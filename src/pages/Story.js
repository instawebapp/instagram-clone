import { useParams, Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import * as ROUTES from "../constants/routes";
import { useEffect, useState } from "react";
import { getAllStories, updateStoryViews } from "../services/firebase";
export default function Story() {
  const [selectedStory, setSelectedStory] = useState(null);
  let { id } = useParams();
  useEffect(() => {
    async function fetchData() {
      let response = await getAllStories();
      if (response) {
        let [res] = response.filter((item) => item.start === Number(id));
        if (res) {
          setSelectedStory(res);
        }
      }
    }
    fetchData();
  }, [id]);
  const handleLoad = async () => {
    await updateStoryViews(id);
  };
  return (
    <div className="story">
      {selectedStory !== null ? (
        <div>
          <div className="close_icon_div">
            <Link to={ROUTES.DASHBOARD}>
              <div className="">
                <IoClose />
              </div>
            </Link>
          </div>
          <div className="display_story_section">
            <div className="story_content">
              <img src={selectedStory.url} alt="story" onLoad={handleLoad} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
