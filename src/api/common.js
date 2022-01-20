import { PGNTN_LIMIT } from "../const";
import { HttpRequest } from "./HttpRequest";

export const getAllDataWithPagination = (url, page, sort, keyword) => {
  const config = {
    method: "GET",
    url: `${url}?page=${page}&size=${PGNTN_LIMIT}${
      sort ? `&sort=${sort}` : ""
    }${keyword ? `&keyword=${keyword}` : ""}`,
  };
  return HttpRequest(config);
};

export const getData = (name) => {
  const config = {
    method: "GET",
    url: `${name}`,
  };
  return HttpRequest(config);
};

export const getById = (name, id) => {
  const config = {
    method: "GET",
    url: `${name}/${id}`,
  };
  return HttpRequest(config);
};

export const postData = (url, data) => {
  const config = {
    method: "POST",
    url,
    data,
  };
  return HttpRequest(config);
};
