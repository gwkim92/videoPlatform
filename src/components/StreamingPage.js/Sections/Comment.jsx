import React, { useState } from "react";
import axionInstance from "../../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
function Comment(props) {
  const videoId = props.postId;
  const userData = useSelector((state) => state.user?.userData);
  const userId = userData.id;
  console.log("유저데이터 확인 :", userData);
  console.log("댓글 리스트 데이터 체크 : ", props.commentLists);
  const [commentValue, setcommentValue] = useState("");
  const handleClick = (event) => {
    setcommentValue(event.currentTarget.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const variables = {
      content: commentValue,
      writer: userId,
      postId: videoId,
    };

    axionInstance.post("/comments/saveComment", variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
        setcommentValue("");
        props.refreshFunction(response.data.result);
      } else {
        alert("댓글 작성 실패했습니다.");
      }
    });
  };
  return (
    <div>
      {/* root comment form */}
      <form
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "40px",
          marginBottom: "30px",
        }}
        onSubmit={onSubmit}
      >
        <img
          src={userData.image} // 여기에 원하는 아바타 이미지 URL을 삽입하세요.
          alt="avatar"
          style={{
            width: "50px",
            height: "50px",
            alignSelf: "flex-start",
            marginRight: "10px",
            alignSelf: "center",
          }}
        />
        <div style={{ flex: "1" }}>
          <textarea
            style={{
              marginTop: "20px",
              width: "100%",
              whiteSpace: "pre-wrap",
              backgroundColor: "transparent",
              borderBottom: "3px solid #ccc",
              borderTop: "none",
              outline: "none",
              resize: "none",
              color: "white",
            }}
            onChange={handleClick}
            value={commentValue}
            placeholder="댓글을 작성해주세요"
          />
          <button
            style={{
              marginTop: "10px",
              width: "5%",
              height: "30px",
              borderRadius: "5px",
              backgroundColor: "grey",
              float: "right",
            }}
            onClick={onSubmit}
          >
            댓글
          </button>
        </div>
      </form>

      {/* comment lists */}
      {props.commentLists &&
        props.commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment key={index}>
                <SingleComment
                  refreshFunction={props.refreshFunction}
                  comment={comment}
                  postId={videoId}
                />
                <ReplyComment
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                  postId={videoId}
                  commentLists={props.commentLists}
                />
              </React.Fragment>
            )
        )}
    </div>
  );
}

export default Comment;
