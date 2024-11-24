// // axiosInstance.js
// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3100', // Backend base URL
// });

// // Request Interceptor
// // axiosInstance.interceptors.request.use(
// //   (config) => {
// //     // Add any authentication token if required
// //     const token = localStorage.getItem('authToken');
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // Response Interceptor
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('Axios Error:', error.response);
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3100/api', // Matches the backend route
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios Error:', error.response);
    return Promise.reject(error);
  }
);

export default axiosInstance;
