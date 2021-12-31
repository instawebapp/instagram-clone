import { useEffect, useState } from "react";
import { getSuggestedProfiles } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";
import SuggestedProfile from "./SuggestedProfile";

export default function Suggestions({ userId, following, loggedInUserDocId }) {
  const [profiles, setProfiles] = useState(null);
  // hint: use the firebase service
  // call async fun within useEffect
  // store it in state
  // go ahead and get the suggested profiles

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }
    if (userId) {
      suggestedProfiles();
    }
  }, [following, userId]);

  // go ahead and render (wait on the profiles as in skeleton)
  return !profiles ? (
    <Skeleton count={1} height={150} style={{ marginTop: "1.25rem" }} />
  ) : profiles.length > 0 ? (
    <div className="suggestions_section">
      <div className="suggestions_title">
        <p className="">Suggsetions for you</p>
      </div>
      <div className="details">
        {profiles.length > 0 &&
          profiles.map((profile) => {
            return (
              <SuggestedProfile
                key={profile.docId}
                profileDocId={profile.docId} // sp -> suggeted profile
                username={profile.username}
                profileId={profile.userId}
                userId={userId}
                loggedInUserDocId={loggedInUserDocId}
              />
            );
          })}
      </div>
    </div>
  ) : null;
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string,
  profileDocId: PropTypes.string,
};
