import PropTypes from "prop-types";

export default function Image({ src, caption }) {
  return <img className="w-full  flex " src={src} alt={caption} />;
}

Image.propTypes = {
  caption: PropTypes.string,
  src: PropTypes.string,
};
