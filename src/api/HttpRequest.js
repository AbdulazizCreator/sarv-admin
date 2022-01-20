import { message } from "antd";
import axios from "axios";
import { API, TOKEN } from "../const";
import { getCookie } from "../utils/cookies.js";
import { logout } from "../utils/logout";

const host = API;

export const HttpRequest = () => {
  const token = getCookie(TOKEN);
  const headers = {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json; charset=utf-8",
    Authorization: token ? `Bearer ${token}` : "",
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
            logout()
            message.error(error.response.data.message);
            return Promise.reject(error);
          }
          if (Array.isArray(errors)) {
            errors.forEach((err, index) => {
              message.error(err.message);
            });
            return Promise.reject(error);
          } else if (errors) {
            message.error(errors);
          } else {
            message.error(error.response.data.message);
            Promise.reject(error);
          }
        }
      }
      return Promise.reject(error);
    }
  );
};
