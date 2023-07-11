import axios from "axios";

const baseURL = process.env.REACT_APP_API

const instanceAxios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  secure: true,
});

export default instanceAxios;