import axios from "axios";
import { getCookie } from "./Cookie";
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

instance.interceptors.request.use(
  (config) => {
    const access_token = getCookie("access_token");
    const refresh_token = getCookie("refresh_token");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    if (refresh_token) {
      config.headers["X-Refresh-Token"] = `Bearer ${refresh_token}`;
    }
    // config.headers['Content-Type'] = 'application/json';
    // config.headers['Cache-Control'] = 'no-store';
    // config.headers.Expires = "0";
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
