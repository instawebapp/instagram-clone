import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user";
import { GetUserById } from "../services/firebase";
import { getPhotos } from "../services/firebase";

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);
  useEffect(() => {
    async function getTimelinePhotos() {
      let ans = await GetUserById(userId);
      if (ans) {
        let following = ans.following;
        let followedUserPhotos = [];
        // does the user follow people
        if (following.length > 0) {
          followedUserPhotos = await getPhotos(userId, following);
          followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
          setPhotos(followedUserPhotos);
        }
      }
    }
    getTimelinePhotos();
  }, [userId]);
  return { photos };
}
