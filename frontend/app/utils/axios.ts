import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.STRAPI_API_URL,
  timeout: 5000,
  headers: { "X-Custom-Header": "Forerunners HUB" },
});
