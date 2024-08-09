import React, { useRef, useEffect, useState } from "react";
import Hls from "hls.js";
import "video-react/dist/video-react.css"; // 비디오 CSS import
import axionInstance from "../../utils/axios";
import { useParams } from "react-router-dom";
import { Avatar, List } from "antd";
import styled from "styled-components";
import Comment from "./Sections/Comment";

const DescriptionBox = styled.div`
  margin: 20px 0px 0px 0px;
  width: 100%;
  color: white;
  border-radius: 1%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // align-items: center;
  background-color: rgb(71, 71, 71);
  box-shadow: 4px 10px 20px 6px rgb(0 0 0 / 50%);
  // 조건부 스타일링 함수
  ${({ descriptionVisible }) =>
    descriptionVisible
      ? `
    height: auto;
  `
      : `
    height: 5rem;
  `}
`;

const StreamingPage = () => {
  const [videoData, setvideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [Comments, setComments] = useState([]);
  // useState를 추가하여 토글 상태 관리
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const { videoId } = useParams();
  const videoRef = useRef(null);
  console.log("videoId check : ", videoId);
  console.log("videoData check :", videoData);

  // 토글 함수를 작성하여 클릭 시 상태 변경.
  const toggleDescription = () => {
    setDescriptionVisible(!descriptionVisible);
  };

  const getKoreanTime = (inputDate) => {
    if (!inputDate) return "";

    const date = new Date(inputDate);
    const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Seoul",
    });

    return dateFormatter.format(date);
  };

  const koreanTime = getKoreanTime(videoData && videoData.createdAt);

  const getTimeDifference = (inputDate) => {
    if (!inputDate) return "";

    const current = new Date();
    const posted = new Date(inputDate);
    const differenceInSeconds = (current.getTime() - posted.getTime()) / 1000;

    if (differenceInSeconds < 60) {
      return `${Math.floor(differenceInSeconds)}초 전`;
    } else if (differenceInSeconds < 3600) {
      return `${Math.floor(differenceInSeconds / 60)}분 전`;
    } else if (differenceInSeconds < 86400) {
      return `${Math.floor(differenceInSeconds / 3600)}시간 전`;
    } else {
      return `${Math.floor(differenceInSeconds / 86400)}일 전`;
    }
  };

  const timeDifference = getTimeDifference(videoData && videoData.createdAt);

  useEffect(() => {
    axionInstance
      .get(`/contents/streamVideoData/${videoId}`)
      .then((response) => {
        if (response.data.success) {
          console.log("Streaming videoUrl : ", response.data.video);
          setvideoData(response.data.video);
          setIsLoading(false); // 로딩 상태 업데이트
          // setvideoUrl(response.data.videoUrl);
        } else {
          alert("비디오를 가져오기에 실패했습니다.");
        }
      });

    axionInstance
      .get(`/comments/getCommentData/${videoId}`)
      .then((response) => {
        if (response.data.success) {
          console.log("백엔드 => 댓글 데이터 가져오기", response.data.result);
          setComments(response.data.result);
        } else {
          alert("동영상 댓글 가져오기에 실패하였습니다.");
        }
      });
  }, [videoId]);

  useEffect(() => {
    if (videoData && videoData.url) {
      const hlsPlayer = new Hls();
      const video = videoRef.current;
      console.log("get video url :", videoData.url);

      if (Hls.isSupported()) {
        hlsPlayer.loadSource(videoData.url);
        hlsPlayer.attachMedia(video);
        hlsPlayer.on(Hls.Events.MANIFEST_PARSED, function () {
          video.play();
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoData.url;
        video.play();
      }
      // 정리(Cleanup) 함수
      return () => {
        if (hlsPlayer) {
          hlsPlayer.destroy();
        }
      };
    }
  }, [videoData]);

  const refreshFunction = (newComments) => {
    setComments(Comments.concat(newComments));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        backgroundColor: "#000000",
        width: "100%",
        height: "100%",
        padding: "1rem 1rem",
      }}
    >
      <video ref={videoRef} controls style={{ width: "100%" }}>
        {videoData && <source src={videoData.url} />}
      </video>
      <List.Item>
        <List.Item.Meta
          style={{ color: "#ffffff", fontSize: "25px" }}
          title={videoData.title}
        />
        <div style={{ marginTop: "10px" }}>
          <List.Item.Meta avatar={<Avatar src={videoData.writer.image} />} />
          <div style={{ color: "#ffffff", textAlign: "right " }}>
            <button style={{ color: "#ffffff", textAlign: "right " }}>
              구독
            </button>
          </div>
        </div>
      </List.Item>
      <DescriptionBox
        onClick={toggleDescription}
        descriptionVisible={descriptionVisible}
      >
        <div style={{ textAlign: "left", margin: "5px" }}>{timeDifference}</div>
        <div style={{ textAlign: "left", margin: "5px" }}>
          {/* 내용이 조건부 렌더링됩니다. */}
          {descriptionVisible && (
            <div style={{ whiteSpace: "pre-wrap" }}>
              {videoData.description}
            </div>
          )}
        </div>
        {/* 토글 버튼 추가 */}
        <button
          style={{ textAlign: "left", color: "grey" }}
          onClick={toggleDescription}
        >
          {descriptionVisible ? "간략히" : "펼치기"}
        </button>
      </DescriptionBox>

      <Comment
        refreshFunction={refreshFunction}
        commentLists={Comments}
        postId={videoId}
      />
    </div>
  );
};

export default StreamingPage;
