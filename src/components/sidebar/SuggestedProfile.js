import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/firebase";

export default function SuggestedProfile({
  username,
  profileDocId,
  profileId,
  userId,
  loggedInUserDocId,
}) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true);
    //    firebase : create 2 services (functions )
    //   update the following array of logged in user (in this case , my profile)
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    //   update the followers array of user who has been followed
    await updateFollowedUserFollowers(profileDocId, userId, false);
  }

  return !followed ? (
    <div className="flex flex-row items-center justify-between ">
      <div className="flex items-center justify-between ">
        <img
          src={`/images/avatars/${username}.jpg`}
          alt={`${username}`}
          className={"rounded-full w-8 h-8 flex mr-3"}
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        type="button"
        className="font-bold text-xs text-blue-medium"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  username: PropTypes.string,
  profileDocId: PropTypes.string,
  profileId: PropTypes.string,
  userId: PropTypes.string,
  loggedInUserDocId: PropTypes.string,
};
