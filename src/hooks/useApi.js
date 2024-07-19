// import axios from "axios";
// import util from "../util/util";
// import cookie from "../util/cookie";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const api = {
//   post,
//   get,
//   put,
//   remove,
//   head,
// };
// // const baseURL = process.env.REACT_APP_BO_API_URL
// const instance = axios.create();
// instance.defaults.withCredentials = true;
// instance.interceptors.request.use(
//   async (config) => {
//     config.withCredentials = true;

//     let accessToken = cookie.get("accessToken");
//     if (!accessToken) {
//       try {
//         const { data } = await axios.get(
//           `/api/member/access-token?refreshToken=${cookie.get("refreshToken")}`
//         );
//         cookie.set("accessToken", data);
//         accessToken = data;
//       } catch (error) {}
//     }
//     config.headers.Authorization = accessToken;
//     return config;
//   },
//   (error) => {
//     alert("error 발생");
//   }
// );

// function post(url, data = {}) {
//   return instance.post(url, data).then((response) => response.data);
// }

// function get(url, data = {}, config = {}) {
//   return instance
//     .get(`${url}${util.makeSearchParam(data)}`, config)
//     .then((response) => response.data);
// }

// function put(url, data = {}) {
//   return instance.put(url, data).then((response) => response.data);
// }

// function remove(url, data = {}) {
//   return instance
//     .delete(`${url}${util.makeSearchParam(data)}`)
//     .then((response) => response.data);
// }

// function head(url, data = {}) {
//   return instance.head(url, data).then((response) => response.data);
// }

// const useApi = ({ api, onSuccess, onError, onComplete }) => {
//   const [data, setData] = useState();
//   const navigate = useNavigate();

//   const callApi = (params) =>
//     api(params)
//       .then((res) => {
//         setData(res);
//         if (onSuccess) onSuccess(res, params);
//         return res;
//       })
//       .catch((err) => {
//         if (err.response?.status === 401) {
//           navigate("/");
//           // dispatch(logout())
//         }
//         if (onError) onError(err);
//       })
//       .finally(() => {
//         if (onComplete) onComplete();
//       });

//   return {
//     callApi,
//     data,
//   };
// };

// export default useApi;
