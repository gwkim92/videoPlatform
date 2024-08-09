import React, { useState } from "react";
import axionInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "./FileUpload";
import { useForm } from "react-hook-form";
// import { uplaoadVideo } from "../../store/thunkFunctions";

// import { Typegraphy, Button, Form, message, Input, Icon } from "antd";

const UploadPage = () => {
  // const { reset } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user?.userData);
  // const dispatch = useDispatch();
  console.log("userData : ", userData.id);

  const [content, setContent] = useState({
    title: "",
    description: "",
    videos: [],
    writer: userData.id || null,
    thumbnailData: [],
  });

  console.log("content Data : ", content);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpload = (videoFile, thumbnailData) => {
    setContent((prevState) => ({
      ...prevState,
      videos: [videoFile],
      thumbnailData,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!content.videos.length) {
      alert("동영상 파일을 추가해주세요.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", content.title);
      formData.append("description", content.description);
      formData.append("writer", content.writer);
      formData.append("thumbnailUrl", content.thumbnailData.thumbnail.url);
      formData.append(
        "videoDuration",
        content.thumbnailData.thumbnail.duration
      );
      content.videos.forEach((video) => formData.append("video", video));

      const response = await axionInstance.post("/contents/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        console.log("Upload Data Check Handle Submit", response.data);

        let variable = {
          videoId: response.data.contents[0]._id,
          url: response.data.contents[0].url,
          fileName: response.data.contents[0].title,
          thumbnail: response.data.contents[0].thumbnail,
          duration: response.data.contents[0].duration,
        };
        console.log("variable check", variable);
        alert("업로드가 성공적으로 처리되었습니다.");
        navigate("/");
      } else {
        alert("업로드에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error(error);
      alert("업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <section>
      <div
        className="text-center m-7"
        style={{ color: "#ffffff", fontSize: "40px" }}
      >
        <h1> video upload </h1>
      </div>
      <form className="mt-6" onSubmit={handleSubmit}>
        <FileUpload onUpload={handleUpload} />
        <div className="mt-4">
          <label htmlFor="title" style={{ color: "#ffffff", fontSize: "28px" }}>
            제목
          </label>
          <input
            className="w-full px-4 py-2 bg-white border rounded-md"
            name="title"
            id="title"
            onChange={handleChange}
            value={content.title}
          />
        </div>

        <div className="mt-10">
          <label
            htmlFor="description"
            style={{ color: "#ffffff", fontSize: "28px" }}
          >
            설명
          </label>
          <textarea
            className="w-full px-4 py-40 bg-white border rounded-md"
            style={{
              paddingLeft: "4px",
              paddingTop: "4px",
              fontSize: "16px",
              whiteSpace: "pre-wrap",
              overflowX: "auto",
              resize: "vertical",
            }}
            name="description"
            id="description"
            onChange={handleChange}
            value={content.description}
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full px-4 text-black bg-white hover:bg-yellow-300 py-2 border rounded-md"
          >
            업로드
          </button>
        </div>
      </form>
    </section>
  );
};

export default UploadPage;
