import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://localhost:5001/api/home",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;