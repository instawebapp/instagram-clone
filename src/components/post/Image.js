import PropTypes from "prop-types";

export default function Image({ src, caption }) {
  const { text } = caption;

  return <img className="post_img" src={src} alt={text} />;
}

Image.propTypes = {
  caption: PropTypes.object,
  src: PropTypes.string,
};
