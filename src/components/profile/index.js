import { useEffect, useReducer } from "react";
import Header from "./Header";
import Photos from "./Photos";
// import PropTypes from "prop-types";
import { getUserPhotosByUserId } from "../../services/firebase";

export default function Profile({ user }) {
  const userIMG = user?.avatar?.avatarURL;
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: {},
    followerCount: 0,
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getUserPhotosByUserId(user.userId);
      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    }
    if (user.username) {
      getProfileInfoAndPhotos();
    }
  }, [user, user.username]);
  return (
    <div className="profile_container">
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
        userAvatar={userIMG}
      />
      <Photos photosCollection={photosCollection} />
    </div>
  );
}
