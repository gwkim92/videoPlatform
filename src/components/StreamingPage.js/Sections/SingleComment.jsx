import React, { useState } from "react";
import axionInstance from "../../../utils/axios";
import { Avatar, Button, Col, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";

const { TextArea } = Input;

function SingleComment(props) {
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");
  const userData = useSelector((state) => state.user?.userData);
  const userId = userData.id;
  console.log("댓글 리스트 props 체크", props);
  const onHandleChange = (event) => {
    setCommentValue(event.currentTarget.value);
  };
  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };
  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      답글 달기
    </span>,
  ];
  const onSubmit = (event) => {
    event.preventDefault();
    const variables = {
      content: CommentValue,
      writer: userId,
      postId: props.postId,
      responseTo: props.comment._id,
    };

    axionInstance.post("/comments/saveComment", variables).then((response) => {
      if (response.data.success) {
        console.log(response.data.result);
        setCommentValue("");
        props.refreshFunction(response.data.result);
      } else {
        alert("댓글 작성 실패했습니다.");
      }
    });
  };
  return (
    <div style={{ marginBottom: "16px", color: "#ffffff" }}>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <Avatar
          src={props.comment.writer.image}
          alt={props.comment.writer.name}
        />
        <div style={{ marginLeft: "8px", flex: "1" }}>
          <div style={{ fontWeight: "bold" }}>@{props.comment.writer.name}</div>
          <p style={{ whiteSpace: "pre-wrap" }}>{props.comment.content}</p>
          <div onClick={onClickReplyOpen} style={{ cursor: "pointer" }}>
            답글 달기
          </div>
          {OpenReply && (
            <form
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginBottom: "5px",
              }}
              onSubmit={onSubmit}
            >
              <img
                src={userData.image} // 여기에 원하는 아바타 이미지 URL을 삽입하세요.
                alt="avatar"
                style={{
                  width: "30px",
                  height: "30px",
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
                    borderLeft: "none",
                    borderRight: "none",
                    outline: "none",
                    resize: "none",
                    color: "white",
                  }}
                  onChange={onHandleChange}
                  value={CommentValue}
                  placeholder="댓글을 작성해주세요"
                />

                <button
                  htmlType="submit"
                  type="primary"
                  style={{
                    marginTop: "10px",
                    width: "5%",
                    height: "30px",
                    borderRadius: "5px",
                    float: "right",
                  }}
                  onClick={onSubmit}
                >
                  댓글
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleComment;
