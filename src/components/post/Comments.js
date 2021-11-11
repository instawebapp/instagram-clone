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
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length >= 3 && (
          <div className="flex">
            <p
              className="text-sm text-gray-base mb-2 cursor-pointer"
              onClick={() => setShow(!show)}
            >
              View all {comments.length} comments
            </p>
          </div>
        )}
        {comments.slice(0, 2).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-2 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        {show && (
          <div
            className={` "transform transition duration-500 ease-out"  ${show}?"block":"hidden"`}
          >
            {comments.slice(2, comments.length).map((item) => (
              <p key={`${item.comment}-${item.displayName}`} className="mb-1">
                <Link to={`/p/${item.displayName}`}>
                  <span className="mr-2 font-bold">{item.displayName}</span>
                </Link>
                <span>{item.comment}</span>
              </p>
            ))}
          </div>
        )}
        <p className="font-semibold text-gray-base capitalize text-xs mt-4">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string,
  comments: PropTypes.array,
  posted: PropTypes.number,
  commentInput: PropTypes.object,
};
