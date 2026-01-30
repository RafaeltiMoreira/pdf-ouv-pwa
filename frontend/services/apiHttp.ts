import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3001/api/v1",
  withCredentials: true,
  timeout: 30000,
});
