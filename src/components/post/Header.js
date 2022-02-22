import PropTypes from "prop-types";
import { Link } from "react-router-dom";
export default function Header({ username }) {
  console.log(username);
  return (
    <div className="post_header">
      <div className="details">
        <Link to={`/p/${username}`} className="info">
          <img src={`/images/avatars/${username}.jpg`} alt={`${username}`} />
          <p className="text">{username}</p>
        </Link>
      </div>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string,
};
