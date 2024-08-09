// import { Axios } from "axios";
import React, { useEffect, useState } from "react";
import axionInstance from "../../utils/axios";
import { Avatar, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import Title from "antd/es/typography/Title";

const LandingPage = () => {
  const [Video, setVideo] = useState([]);

  useEffect(() => {
    axionInstance.get("/contents/getVideos").then((response) => {
      if (response.data.success) {
        // console.log(response.data);
        setVideo(response.data.videos);
      } else {
        alert("비디오를 가져오기 실패했습니다.");
      }
    });
  }, []);
  console.log("video data check", Video);
  const renderCards = Video.map((video, index) => {
    console.log("render video data check : ", video);
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Col lg={6} md={8} xs={24} key={video._id}>
        <a href={`/streaming/${video._id}`}>
          <div style={{ position: "relative", marginTop: "2rem" }}>
            <img
              style={{
                width: "100%",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
              src={video.thumbnail}
              alt={`${video.title} 썸네일`}
            />
            <div
              className="duration"
              style={{ color: "#ffffff", textAlign: "right" }}
            >
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </div>
        </a>
        <br />
        <Meta avatar={<Avatar src={video.writer.image} />} />
        <span style={{ color: "#ffffff" }}>{video.writer.name}</span>
        <br />
        <span style={{ color: "#ffffff" }}>{video.title}</span>
        <br />
        <div style={{ textAlign: "right", color: "#ffffff" }}>views</div>
      </Col>
    );
  });

  return (
    <div style={{ sidth: "85%", margin: "4rem auto" }}>
      <Title style={{ color: "#ffffff" }} level={2}>
        {" "}
        Play List{" "}
      </Title>
      <hr />
      <Row gutter={[32, 16]}>{renderCards}</Row>
    </div>
  );
};

export default LandingPage;
