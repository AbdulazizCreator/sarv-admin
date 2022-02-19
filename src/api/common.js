import { HttpRequest } from "./HttpRequest";
// const query = {
//   region: 4,
//   district: 9,
//   search: "Samarqand",
// };

export const getQuery = (url, query) => {
  const query_str = Object.entries(query)
    .reduce((p, c) => p + c[0] + "=" + c[1] + "&", "?")
    .slice(0, -1);
  const config = {
    method: "GET",
    url: url + query_str,
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

export const deleteData = (url) => {
  const config = {
    method: "DELETE",
    url,
  };
  return HttpRequest(config);
};
