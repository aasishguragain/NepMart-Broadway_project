import axios from "axios";

export const $axios = axios.create({
  baseURL:
    import.meta.env.VITE_ENV === "prod"
      ? import.meta.env.VITE_PROD_API
      : import.meta.env.VITE_LOCAL_API,
  timeout: 5000,
});

$axios.interceptors.request.use(function (config) {
  // extract accesstoken from local storage
  const accesstoken = localStorage.getItem("accesstoken");

  // if token, set it to every request
  if (accesstoken) {
    config.headers.Authorization = `Bearer ${accesstoken}`;
  }

  return config;
});
