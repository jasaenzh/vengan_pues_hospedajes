import axios from "axios";

const baseURL = window.location.origin;

const instanceAxios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default instanceAxios;