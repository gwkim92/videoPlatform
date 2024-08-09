import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axionInstance from "../../utils/axios";

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [fileDuration, setFileDuration] = useState("");

  const handleDrop = async (acceptedFiles) => {
    // setFile(acceptedFiles[0]);
    // onUpload(acceptedFiles[0]); // 업로드한 파일을 상위 컴포넌트로 전달합니다.
    /////////////////////////////

    const videoFile = acceptedFiles[0]; // 사용자가 업로드한 동영상 파일
    setFile(videoFile); // 업로드한 동영상 파일 상태를 저장

    // 썸네일 생성 및 정보를 가져옵니다.
    const thumbnailData = await generateThumbnail(videoFile);
    console.log("front thumbnail Data Check : ", thumbnailData);
    // 썸네일 URL 및 동영상 지속 시간을 저장합니다
    setThumbnailUrl(thumbnailData.thumbnail.url);
    setFileDuration(thumbnailData.thumbnail.duration);

    // onUpload 함수를 통해 파일을 상위 컴포넌트로 전달합니다
    onUpload(videoFile, thumbnailData);
  };

  // // Dropzone 옵션 설정
  // const onDrop = useCallback(handleDrop, []);
  // const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // 동영상 파일에서 썸네일 URL 및 지속 시간을 가져오는 함수입니다.
  const generateThumbnail = async (videoFile) => {
    try {
      // 파일을 FormData 형식으로 변환하고 AJAX 요청을 보내여 썸네일 정보를 가져옵니다.
      const formData = new FormData();
      formData.append("video", videoFile);

      const response = await axionInstance.post(
        "/contents/thumbnails",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        return response.data;
      } else {
        alert("썸네일 생성 실패");
      }
    } catch (error) {
      alert("썸네일 생성 실패");
    }
  };

  return (
    <div className="flex gap-4">
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <section className="min-w-[300px] h-[300px] border flex items-center justify-center">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p className="text-3xl" style={{ color: "#ffffff" }}>
                {" "}
                {file?.name ||
                  "동영상을 여기에 놓거나 클릭하여 파일을 선택하세요."}{" "}
              </p>
            </div>
          </section>
        )}
      </Dropzone>
      <div className="flex-grow h-[300px] border flex items-center justify-center overflow-x-scroll overflow-y-hidden">
        {thumbnailUrl && <img src={thumbnailUrl} alt="썸네일" />}
      </div>
    </div>
  );
};

export default FileUpload;
