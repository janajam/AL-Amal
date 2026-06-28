import axios, { type AxiosRequestConfig } from "axios";
import { getToken } from "./cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, // important to send cookies
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

class ApiClient<TResponse, TRequest> {
  endpoint: string;
  baseURL: any;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll(config?: AxiosRequestConfig) {
    const res = await axiosInstance.get<TRequest>(this.endpoint, config);
    return res.data;
  }


  async get(id: string | number, config?: AxiosRequestConfig) {
    const res = await axiosInstance.get<TRequest>(
      `${this.endpoint}/${id}`,
      config
    );

    return res.data;
  }
  async post(data: TRequest) {
    const res = await axiosInstance.post<TResponse>(this.endpoint, data);
    return res.data;
  }

  update = async (id: string | number, data: Partial<TRequest>) => {
    const res = await axiosInstance.put<TResponse>(`${this.endpoint}/${id}`, data);
    return res.data;
  }


  delete = async (id: string | number) => {
    const res = await axiosInstance.delete(`${this.endpoint}/${id}`);
    return res.data;
  }

  async patch(id: string | number, data: Partial<TRequest>) {
    const res = await axiosInstance.patch<TResponse>(`${this.endpoint}/${id}`, data);
    return res.data;
  }


}

export default ApiClient;
