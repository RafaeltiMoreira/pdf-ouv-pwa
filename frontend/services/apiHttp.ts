import axios from "axios";

export const apiHttp = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3001",
  withCredentials: true,
  timeout: 30000,
});
