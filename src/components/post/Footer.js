import PropTypes from "prop-types";
import { updateLinkViews } from "../../services/firebase";

export default function Footer({ caption, username, links, docId, userId }) {
  const { text } = caption;
  const { hashtaglist } = caption;

  const handleClick = async (e) => {
    await updateLinkViews(docId, userId);
  };

  return (
    <div className="post_footer">
      <div className="username">{username}</div>
      <div className="caption">{text}</div>
      {hashtaglist.length > 0 &&
        hashtaglist.map((item, index) => {
          return (
            <span className="hashtag" key={index}>
              #{item}
            </span>
          );
        })}
      {links.length > 0 &&
        links.map((item, index) => {
          return (
            <div className="links" key={index}>
              <a
                key={index}
                href={item}
                target={"_blank"}
                rel={"noreferrer"}
                onClick={handleClick}
              >
                {item}
              </a>
            </div>
          );
        })}
    </div>
  );
}

Footer.propTypes = {
  username: PropTypes.string,
  caption: PropTypes.object,
};
