import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/firebase";
import Button from "../form/Button";
export default function SuggestedProfile({
  username,
  profileDocId,
  profileId,
  userId,
  loggedInUserDocId,
}) {
  const [followed, setFollowed] = useState(false);

  const handleFollowKey = (e) => {
    if (e.key === "Enter") {
      handleFollowUser();
    }
  };

  async function handleFollowUser() {
    setFollowed(true);
    //    firebase : create 2 services (functions )
    //   update the following array of logged in user (in this case , my profile)
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    //   update the followers array of user who has been followed
    await updateFollowedUserFollowers(profileDocId, userId, false);
  }

  return !followed ? (
    <div className="suggested_profile_section">
      <div className="profile_img">
        <img src={`/images/avatars/${username}.jpg`} alt={`${username}`} />
        <Link to={`/p/${username}`}>
          <p className="text">{username}</p>
        </Link>
      </div>
      <Button
        btnType={"button"}
        btnClass={"btn follow_btn"}
        btnTitle={"Follow"}
        icon={""}
        handleClick={handleFollowUser}
        handleKey={handleFollowKey}
      />
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
