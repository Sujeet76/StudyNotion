import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_LINK,
});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
