import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import { useState } from "react";
import AddComment from "./add-comment";
export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
}) {
  const [comments, setComments] = useState(allComments);
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="post_comments">
        {comments.length >= 3 && (
          <div className="comment_title">
            <p className="text" onClick={() => setShow(!show)}>
              View all {comments.length} comments
            </p>
          </div>
        )}
        {comments.slice(0, 2).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="comment">
            <Link to={`/p/${item.displayName}`}>
              <span className="text">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        {show && (
          <div className={`comment_title_animation ${show}?" show":" hide" `}>
            {comments.slice(2, comments.length).map((item) => (
              <p key={`${item.comment}-${item.displayName}`}>
                <Link to={`/p/${item.displayName}`}>
                  <span className="text">{item.displayName}</span>
                </Link>
                <span>{item.comment}</span>
              </p>
            ))}
          </div>
        )}
        <p className="post_timing">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </div>
  );
}

Comments.propTypes = {
  docId: PropTypes.string,
  comments: PropTypes.array,
  posted: PropTypes.number,
  commentInput: PropTypes.object,
};
