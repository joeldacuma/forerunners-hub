import axios from "axios";

const isServer = typeof window === 'undefined';

export const axiosInstance = axios.create({
  baseURL: isServer ? process.env.STRAPI_API_URL : window.ENV.API_URL,
  timeout: 10000,
  headers: { "X-Custom-Header": "Forerunners HUB" },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add authentication headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors here (e.g., redirect to login on 401)
    return Promise.reject(error);
  }
);