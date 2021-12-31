import SingleStory from "./SingleStory";
import UploadStory from "./UploadStory";
export default function Stories() {
  return (
    <div className="stories_container">
      <UploadStory />
      <div className="single_stories_section">
        <SingleStory />
      </div>
    </div>
  );
}
