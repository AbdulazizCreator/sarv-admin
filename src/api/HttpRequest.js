import axios from "axios";
import { API, TOKEN } from "../const";
import { getCookie } from "../utils/cookies.js";
import { logout } from "../utils/logout";
import { toast } from "react-toastify";

const host = API;

export const HttpRequest = (config = null) => {
  const token = getCookie(TOKEN);
  const headers = {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json; charset=utf-8",
    // Authorization: token ? `${token}` : "",
    Authorization: token && "",
  };

  const axiosInstance = axios.create({
    baseURL: `${host}/`,
    headers,
    timeout: 1000000,
  });

  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response && error.response.data) {
        const errors = error.response.data.errors;

        if (error.response.status !== 200) {
          if (error.response.status === 401) {
            logout();
            toast.error(error.response.data.message);
            return Promise.reject(error);
          }
          if (error.response.status === 403) {
            // logout();
            toast.error(error.response.data.detail);
            return Promise.reject(error);
          }
          if (Array.isArray(errors)) {
            errors.forEach((err, index) => {
              toast.error(err.message);
            });
            return Promise.reject(error);
          } else if (errors) {
            toast.error(errors);
          } else {
            toast.error(error.response.data.message);
            Promise.reject(error);
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance(config);
};
