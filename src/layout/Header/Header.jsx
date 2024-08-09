import React from "react";
import { Link } from "react-router-dom";
import NavItem from "../../Sections/NavItem";
import logoImage from "./우디이미지.jpeg";
import SideBar from "../../Sections/SideBar";

const Header = ({ onToggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 z-10 w-full h-14 text-white bg-black">
      <div className="flex items-center justify-between h-full mx-5 sm:mx-10 lg:mx-10 px-5">
        <div className="absolute top-0 left-0 z-20">
          <SideBar onToggleSidebar={onToggleSidebar} />
        </div>
        {/* <div className="flex items-center text-exl absolute left-12 sm:left-16">
          <Link to="/" style={{ fontSize: "25px", paddingLeft: "1rem" }}>
            <Avatar src={logoImage} alt="Woody's PlayList Logo" />
            Woody's PlayList
          </Link> */}
        {/* </div> */}
        <div className="flex items-center text-exl absolute right-0 sm:right-5">
          <NavItem />
        </div>
      </div>
    </header>
  );
};

export default Header;
