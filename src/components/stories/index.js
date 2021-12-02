import SingleStory from "./SingleStory";
import UploadStory from "./UploadStory";
export default function Stories() {
  return (
    <div className="flex items-center rounded  bg-white border border-gray-primary mb-12 px-4">
      <UploadStory />
      <div className="flex w-full items-center">
        <SingleStory />
      </div>
    </div>
  );
}
