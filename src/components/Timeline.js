import usePhotos from "../hooks/use-photos";
import Skeleton from "react-loading-skeleton";
import Post from "./post";
import Stories from "./stories";
import { useEffect, useState } from "react";
const Timeline = () => {
  let { photos } = usePhotos();
  const [time, setTime] = useState(true);
  console.log("photos", photos);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!photos) {
        setTime(false);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="timeline">
      <Stories />
      {!photos && time ? (
        <Skeleton count={4} width={640} height={500} className="skeleton" />
      ) : photos ? (
        photos.map((content) => <Post key={content.docId} content={content} />)
      ) : (
        <p className="text">Follow people to see photos</p>
      )}
    </div>
  );
};

export default Timeline;
