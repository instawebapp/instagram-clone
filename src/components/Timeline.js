import usePhotos from "../hooks/use-photos";
import Skeleton from "react-loading-skeleton";
import Post from "./post";
import Stories from "./stories";
import { useContext, useEffect, useRef, useState } from "react";
import { GetUserById } from "../services/firebase";
import UserContext from "../context/user";
const Timeline = () => {
  let { photos } = usePhotos();
  const { user } = useContext(UserContext);
  const [time, setTime] = useState(true);
  const [userDetails, setUserDetails] = useState(undefined);
  console.log("photos", photos);
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();
  useEffect(() => {
    const timer = setTimeout(() => {
      executeScroll();
      console.log("aave che");
      if (!photos) {
        console.log("aave che2");
        setTime(false);
      }
    }, 5000);

    // let res = GetUserById(userId);
    console.log(user);
    // setUserDetails(res);
    return () => clearTimeout(timer);
  }, [photos]);

  return (
    <div className="timeline" ref={myRef}>
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
