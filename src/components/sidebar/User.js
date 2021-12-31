import { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
const User = ({ username, fullName }) => {
  return !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <div>
      <Link to={`/p/${username}`} className="user">
        <div className="user_avatar">
          <img src={`/images/avatars/${username}.jpg`} alt={`${username}`} />
        </div>
        <div className="details">
          <p className="username">{username}</p>
          <p className="fullname">{fullName}</p>
        </div>
      </Link>
    </div>
  );
};

export default memo(User);

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};
