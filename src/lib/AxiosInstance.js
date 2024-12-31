import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL

export const AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
}})