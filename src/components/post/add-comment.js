import { useContext, useState } from "react";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import PropTypes from "prop-types";
export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
}) {
  const [comment, setcomment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);

  const {
    user: { displayName },
  } = useContext(UserContext);

  const handleSubmitComment = (e) => {
    e.preventDefault();

    setComments([...comments, { displayName, comment }]);

    setcomment("");

    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
  };

  return (
    <div className="add_comment_section">
      <form
        className="form"
        method="POST"
        onSubmit={(e) =>
          comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault()
        }
      >
        <input
          arai-label="add a comment"
          type="text"
          className="input comment_input"
          name="add-comment"
          autoComplete="off"
          placeholder="Add a comment"
          value={comment}
          onChange={({ target }) => setcomment(target.value)}
          ref={commentInput}
        />
        <button
          className="add_btn btn"
          disabled={comment.length < 1}
          type="button"
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string,
  comments: PropTypes.array,
  commentInput: PropTypes.object,
};
