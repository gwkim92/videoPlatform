import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import UploadPage from "./components/UploadPage/UploadPage";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./components/Login/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { authUser } from "./store/thunkFunctions";
import ProtectedPage from "./components/ProtectedPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotAuthRoutes from "./components/NotAuthRoutes";
import StreamingPage from "./components/StreamingPage.js/StreamingPage";
import Sider from "antd/es/layout/Sider";
import SideBar from "./Sections/SideBar";

function Layout() {
  const location = useLocation();
  // 전체 화면을 사용해야 하는 경우 true, 그렇지 않은 경우 false로 설정합니다.
  const isFullScreen = location.pathname === "/streaming/:videoId";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = (isOpen) => {
    setIsSidebarOpen(isOpen);
  };
  return (
    <div className="flex flex-col h-screen justify-between">
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
      <Header onToggleSidebar={handleToggleSidebar} />
      <main
        className={`w-10/12 max-w-4xl mx-auto mb-auto relative transition-padding duration-300 ${
          isSidebarOpen ? "pl-64" : ""
        }`}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user?.isAuth);
  const { pathname } = useLocation();

  useEffect(() => {
    console.log("isAuth Data", isAuth);
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index el element={<LandingPage />} />
        {/* 로그인 한 사람만 갈 수 있는 경로 */}
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path="/protected" element={<ProtectedPage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Route>

        {/* 로그인 한 사람만 할수있는 경로로 이동*/}
        <Route path="/streaming/:videoId" element={<StreamingPage />} />

        {/* 로그인 안한 사람만 갈 수 있는 경로 */}
        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
