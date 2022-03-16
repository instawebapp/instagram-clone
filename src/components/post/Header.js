import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { DEFAULT_IMAGE_PATH } from "../../constants/img_paths";
export default function Header({ username, userDetails }) {
  console.log(username);
  return (
    <div className="post_header">
      <div className="details">
        <Link to={`/p/${username}`} className="info">
          <img src={DEFAULT_IMAGE_PATH} alt={`${username}`} />
          <p className="text">{username}</p>
        </Link>
      </div>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string,
};
