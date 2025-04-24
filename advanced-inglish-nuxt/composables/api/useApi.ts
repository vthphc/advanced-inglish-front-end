import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { useRuntimeConfig } from "#app";

export const useApi = () => {
    const config = useRuntimeConfig();
    const baseURL = config.public.apiBase;

    const api = axios.create({
        baseURL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Optional: Add token for authenticated requests
    api.interceptors.request.use((config) => {
        //const token = useCookie("accessToken")?.value; // Assuming token is stored in a cookie
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return {
        get: async <T = unknown>(
            endpoint: string,
            config?: AxiosRequestConfig
        ) => api.get<T>(endpoint, config).then((res) => res.data as T),

        post: async <T = unknown, D = unknown>(
            endpoint: string,
            data: D,
            config?: AxiosRequestConfig
        ) => api.post<T>(endpoint, data, config).then((res) => res.data as T),

        put: async <T = unknown, D = unknown>(
            endpoint: string,
            data: D,
            config?: AxiosRequestConfig
        ) => api.put<T>(endpoint, data, config).then((res) => res.data as T),

        delete: async <T = unknown>(
            endpoint: string,
            config?: AxiosRequestConfig
        ) => api.delete<T>(endpoint, config).then((res) => res.data as T),
    };
};
