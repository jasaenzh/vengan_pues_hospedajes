// import axios from "axios";

// const baseURL = process.env.REACT_APP_API

// const instanceAxios = axios.create({
//   baseURL: baseURL,
//   withCredentials: true,
//   secure: true,
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// });

// export default instanceAxios;

import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.REACT_APP_API;

const instanceAxios = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  secure: true,
});

instanceAxios.interceptors.request.use(
  function (config) {
    const token = Cookies.get("token"); // Obtener el token de la cookie
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);

export default instanceAxios;


// import axios from "axios";

// const baseURL = process.env.REACT_APP_API;

// let token = JSON.parse(window.sessionStorage.getItem("token"));

// const instanceAxios = axios.create({
//   baseURL: baseURL,
//   withCredentials: true,
//   secure: true,
//   headers: { Authorization: "Bearer " + token },
// });



// export default instanceAxios;