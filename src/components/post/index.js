import PropTypes from "prop-types";
import { useRef } from "react";
import Header from "./Header";
import Image from "./Image";
import Actions from "./Actions";
import Footer from "./Footer";
import Comments from "./Comments";

export default function Post({ content }) {
  // components
  // -> header,image, action (like, comment) , footer , comments
  const commentInput = useRef(null);
  const handleFocus = () => {
    commentInput.current.focus();
  };

  return (
    <div className="rounded  bg-white border border-gray-primary mb-12 col-span-4">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer username={content.username} caption={content.caption} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string,
    userId: PropTypes.string,
    caption: PropTypes.string,
    imageSrc: PropTypes.string,
    comments: PropTypes.array,
    likes: PropTypes.array,
    userLikedPhoto: PropTypes.bool,
    docId: PropTypes.string,
    dateCreated: PropTypes.number,
  }),
};
