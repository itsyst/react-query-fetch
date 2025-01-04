import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 1000,
    headers: {
        "Accept": "application/json", // Default headers
    },
});

class ApiClient<T> {
    endpoint: string;
    config?: AxiosRequestConfig;
    constructor (endpoint: string, config?: AxiosRequestConfig) {
        this.endpoint = endpoint;
        this.config = config;
    }

    async getAllWithMeta(params?: Record<string, unknown>): Promise<AxiosResponse<T, unknown>> {
        return await axiosInstance
            .get<T>(this.endpoint, { ...this.config, params })
            .then((res) => res);

    }

    async getAll(params?: Record<string, unknown>) {
        return await axiosInstance
            .get<T>(this.endpoint, { ...this.config, params })
            .then((res) => res.data);
    }

    async post(data: T): Promise<T> {
        return axiosInstance
            .post<T>(this.endpoint, data)
            .then((res) => res.data);
    }
}

export default ApiClient;