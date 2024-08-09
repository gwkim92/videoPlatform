import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../layout/Header/우디이미지.jpeg";
import { Avatar } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

const SideBar = ({ onToggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    onToggleSidebar(!isOpen);
  };

  const iconSize = "1.5rem"; // 기존의 "1.5rem" 값을 변수로 분리

  return (
    <div
      className="relative flex items-center"
      style={{ backgroundColor: "black", height: "3.5rem" }}
    >
      <button
        style={{
          color: "white",
          position: "relative",
          zIndex: 3,
          paddingLeft: "2rem",
        }}
        onClick={toggleSidebar}
      >
        {isOpen ? (
          <MenuOutlined style={{ fontSize: iconSize }} />
        ) : (
          <MenuOutlined style={{ fontSize: iconSize }} />
        )}
      </button>
      <Link
        to="/"
        style={{
          fontSize: "25px",
          paddingLeft: "1rem",
          display: "inline",
          position: "relative",
          zIndex: 3,
        }}
      >
        <Avatar src={logoImage} alt="Woody's PlayList Logo" size={32} />
        {/* "1.5rem" 값을 정수로 변환하여 Avatar의 size 속성에 적용. "1.5rem"은 약 24px이므로 이를 고려하면 좋습니다. */}
      </Link>
      {isOpen && (
        <div
          style={{ backgroundColor: "black", paddingTop: "3.5rem" }}
          className="absolute top-0 left-0 w-80 h-screen z-2"
        >
          <nav>
            <ul className="my-4">
              <li style={{ marginBottom: "2rem" }}>
                <Link
                  to="/"
                  style={{
                    color: "white",
                    margin: "2rem",
                    marginBottom: "4rem",
                    fontSize: "25px",
                  }}
                >
                  Staking
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  style={{
                    color: "white",
                    margin: "2rem",
                    fontSize: "25px",
                  }}
                >
                  링크2
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default SideBar;
