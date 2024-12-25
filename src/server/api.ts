import axios from "axios";

const instanceAxios = axios.create({
  url: "http://localhost:3000/",
});

instanceAxios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instanceAxios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instanceAxios;
