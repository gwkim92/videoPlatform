import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";

function ReplyComment(props) {
  console.log("reply test : ", props);
  const [ChildCommentNum, setChildCommentNum] = useState(0);
  const [OpenReplyCommnets, setOpenReplyCommnets] = useState(false);
  useEffect(() => {
    let commentNumber = 0;
    props.commentLists.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });
    setChildCommentNum(commentNumber);
  }, [props.commentLists, props.parentCommentId]);

  const renderReplyComment = (parentCommentId) => {
    return props.commentLists.map((comment, index) => (
      <React.Fragment key={index}>
        {comment.responseTo === parentCommentId && (
          <div style={{ width: "80%", marginLeft: "40px" }}>
            <SingleComment
              refreshFunction={props.refreshFunction}
              comment={comment}
              postId={props.postId}
            />
            <ReplyComment
              parentCommentId={comment._id}
              postId={props.postId}
              commentLists={props.commentLists}
            />
          </div>
        )}
      </React.Fragment>
    ));
  };

  const onHandleChange = () => {
    setOpenReplyCommnets(!OpenReplyCommnets);
  };
  return (
    <div
      style={{ fontSize: "14px", margin: 0, color: "gray" }}
      onClick={onHandleChange}
    >
      {ChildCommentNum > 0 && <p>view {ChildCommentNum} more comments</p>}
      {OpenReplyCommnets && renderReplyComment(props.parentCommentId)}
    </div>
  );
}

export default ReplyComment;
