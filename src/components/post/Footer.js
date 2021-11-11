import PropTypes from "prop-types";
export default function Footer({ caption, username }) {
  return (
    <div className="p-4 pt-2 pb-4">
      <span className="mr-1 font-bold">{username}</span>
      <span className="">{caption}</span>
    </div>
  );
}

Footer.propTypes = {
  username: PropTypes.string,
  caption: PropTypes.string,
};
