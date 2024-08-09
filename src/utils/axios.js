import axios from "axios";

const axionInstance = axios.create({
  baseURL: import.meta.env.PROD ? "" : "http://localhost:4000",
});

axionInstance.interceptors.request.use(
  function (config) {
    console.log("axios interceptor test", config);
    config.headers.Authorization =
      "Bearer " + localStorage.getItem("accessToken");

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axionInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.data === "jwt expired") {
      window.location.reload();
    }
    return Promise.reject(error);
  }
);
export default axionInstance;
