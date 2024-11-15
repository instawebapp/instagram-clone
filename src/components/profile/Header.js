/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";
import UserContext from "../../context/user";
import { DEFAULT_IMAGE_PATH } from "../../constants/img_paths";
import Button from "../form/Button";
export default function Header({
  photosCount,
  followerCount,
  setFollowerCount,
  userAvatar,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers,
    following,
    username: profileUsername,
    bio,
  },
}) {
  console.log(bio);
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.uid);
  const [isFollowingProfile, setIsFollowingProfile] = useState(null);
  const activeBtnFollow = user?.username && user?.username !== profileUsername;

  console.log("p", profileUsername, "u", user.username);

  const handleToggleFollowKey = (e) => {
    if (e.key === "Enter") {
      handleToggleFollow();
    }
  };

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(!!isFollowing);
    };

    if (user?.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user?.username, profileUserId]);

  const handleSubmitClick = (e) => {
    // e.preventDefault();
  };
  const handleSubmitKey = (e) => {
    // e.preventDefault();
    if (e.key === "Enter") {
    }
  };

  return (
    <div className="user_profile_header">
      <div className="user_profile_avatar">
        {profileUsername ? (
          <div>
            <img
              alt={`${fullName} profile picture`}
              src={userAvatar || DEFAULT_IMAGE_PATH}
              onError={(e) => {
                e.target.src = DEFAULT_IMAGE_PATH;
              }}
            />
          </div>
        ) : (
          <Skeleton circle height={150} width={150} count={1} />
        )}
      </div>
      <div className="user_profile_details">
        <div className="edit_profile">
          <Link to={"/cropper"}>
            <Button
              btnType={"button"}
              btnClass={"btn edit_btn"}
              btnTitle={"Edit Profile"}
              icon={""}
              handleClick={handleSubmitClick}
              handleKey={handleSubmitKey}
            />
          </Link>
        </div>
        <div className="info">
          <div>
            <p className="text">@{profileUsername}</p>
            <div className="username">
              <p className="fullname">
                {!fullName ? <Skeleton count={1} height={24} /> : fullName}
              </p>
            </div>
          </div>
          {activeBtnFollow && isFollowingProfile === null ? (
            <Skeleton count={1} width={80} height={32} />
          ) : (
            activeBtnFollow && (
              <Button
                btnType={"button"}
                btnClass="btn follow_btn"
                btnTitle={`${isFollowingProfile ? "Unfollow" : "Follow"}`}
                icon={""}
                handleClick={handleToggleFollow}
                handleKey={handleToggleFollowKey}
              />
            )
          )}
        </div>

        <div className="bio">
          <p>{bio?.text}</p>
          {bio?.hashtaglist.length > 0 &&
            bio?.hashtaglist.map((item, index) => {
              return (
                <span className="hashtag" key={index}>
                  #{item}
                </span>
              );
            })}
        </div>
        <div className="count_list">
          {!followers || !following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <div className="count">
              <p className="title">
                <span className="text">{photosCount}</span> photos
              </p>
              <p className="title">
                <span className="text">{followerCount}</span>
                {followerCount === 1 ? `follower` : `followers`}
              </p>
              <p className="title">
                <span className="text">{following?.length}</span> following
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  // photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
  }).isRequired,
};

/*
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UseUser from "../../hooks/use-user";
import { isUserFollowingProfile } from "../../services/firebase";
export default function Header({
  photoCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    following = [],
    username: profileUsername,
  },
}) {
  const { user } = UseUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user.username && user.username != profileUsername;

  useEffect(() => {
    const isLoggedUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(isFollowing);
    };

    if (user.username && profileUserId) {
      isLoggedUserFollowingProfile();
    }
  }, [user.username, profileUserId]);

  return (
    <div className="grid grid-cols-3 justify-between mx-auto gap-4 max-w-screen-lg">
      <div className="container flex justify-center">
        {user.username && (
          <img
            src={`/images/avatars/${profileUsername}.jpg`}
            alt={`${user.username}`}
            className="flex rounded-full w-40 h-40"
          />
        )}
      </div>
      <div className="container flex items-center">
        <p className="text-2xl mr-4">{profileUsername}</p>
      </div>
    </div>
  );
}

Header.propTypes = {
  photoCount: PropTypes.number,
  followerCount: PropTypes.number,
  setFollowerCount: PropTypes.func,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
    fullName: PropTypes.string,
    following: PropTypes.array,
  }).isRequired,
};
*/
