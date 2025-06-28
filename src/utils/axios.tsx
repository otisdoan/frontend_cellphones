import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});
axiosInstance.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});
export default axiosInstance;
