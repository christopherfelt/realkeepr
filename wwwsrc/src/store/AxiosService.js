import Axios from "axios";

let baseUrl = location.host.includes("localhost")
  ? "https://localhost:5001/"
  : "/";

export const api = Axios.create({
  baseURL: baseUrl + "api/",
  timeout: 5000,
  withCredentials: true,
});

export const setBearer = function(bearer) {
  api.defaults.headers.authorization = bearer;
};

export const resetBearer = function() {
  api.defaults.headers.authorization = "";
};
