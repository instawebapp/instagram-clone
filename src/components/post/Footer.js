import PropTypes from "prop-types";
export default function Footer({ caption, username }) {
  return (
    <div className="post_footer">
      <span className="username">{username}</span>
      <span className="caption">{caption}</span>
    </div>
  );
}

Footer.propTypes = {
  username: PropTypes.string,
  caption: PropTypes.string,
};
