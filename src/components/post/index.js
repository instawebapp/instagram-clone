import PropTypes from "prop-types";
import { useEffect, useRef, useContext, useState } from "react";
import Header from "./Header";
import Image from "./Image";
import Actions from "./Actions";
import Footer from "./Footer";
import Comments from "./Comments";
import UserContext from "../../context/user";
import { GetUserById } from "../../services/firebase";

export default function Post({ content }) {
  const { user } = useContext(UserContext);
  // components
  // -> header,image, action (like, comment) , footer , comments
  const commentInput = useRef(null);
  const handleFocus = () => {
    commentInput.current.focus();
  };
  const [counter, setCounter] = useState(true);
  const [userDetails, setuserDetails] = useState({});
  useEffect(() => {
    async function fetchData() {
      const response = await GetUserById(user.uid);
      setuserDetails(response);
    }
    if (counter) {
      fetchData();
    }
    setCounter(false);
  }, [counter, user.uid]);

  return (
    <div className="post_container">
      <Header username={content.username} userDetails={userDetails} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer
        username={content.username}
        caption={content.caption}
        links={content.links}
        docId={content.docId}
        userId={user.uid}
      />
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
    caption: PropTypes.object,
    imageSrc: PropTypes.string,
    comments: PropTypes.array,
    likes: PropTypes.array,
    userLikedPhoto: PropTypes.bool,
    docId: PropTypes.string,
    dateCreated: PropTypes.number,
  }),
};
