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
    <Skeleton count={1} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="rounded flex flex-col">
      <div className="text-sm flex items-center align-items justify-between mb-2">
        <p className="font-bold text-gray-base">Suggsetions for you</p>
      </div>
      <div className="grid mt-4 gap-5">
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
