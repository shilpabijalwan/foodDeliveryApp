import axios from "axios";
import { BASE_URL } from "../../ipData";
const token = JSON.parse(localStorage.getItem("token")) || null;

export const apiAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const multipartApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
export const axiosToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
