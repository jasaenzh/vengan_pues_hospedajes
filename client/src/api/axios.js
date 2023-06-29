import axios from "axios";

const react_app_server_domain = import.meta.env.VITE_REACT_APP_SERVER_DOMAIN;

console.log("Variable de entorno", react_app_server_domain);

const instanceAxios = axios.create({
  baseURL: react_app_server_domain,
  withCredentials: true,
});

export default instanceAxios;
