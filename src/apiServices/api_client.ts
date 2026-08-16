import axios, { type AxiosRequestConfig } from "axios";
import { getToken } from "./cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  // withCredentials: true, // important to send cookies
});

axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  console.log("TOKEN:", token);
  console.log("REQUEST:", config.method, config.baseURL, config.url);
  if (token) {
    // config.headers["Authorization"] = `Bearer ${token}`;
     config.headers.Authorization = `Bearer ${token}`;
  } 
  return config;
});

class ApiClient<TResponse, TRequest=unknown> {
  endpoint: string;
  baseURL: any;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll(config?: AxiosRequestConfig) :Promise<TResponse> {
    const res = await axiosInstance.get<TResponse>(
      this.endpoint, config);
    return res.data;
  }



  async get(id: string | number, config?: AxiosRequestConfig) :Promise<TResponse> {
    const res = await axiosInstance.get<TResponse>(
      `${this.endpoint}/${id}`,
      config 
    );

    return res.data;
  }
  async post(data: TRequest) :  Promise<TResponse>{
    const res = await axiosInstance.post<TResponse>(
      this.endpoint, data);
    return res.data;
  }

  update = async (id: string | number, data: Partial<TRequest>) : Promise<TResponse> => {
    const res = await axiosInstance.put<TResponse>(
      `${this.endpoint}/${id}`, data);
    return res.data;
  }


  delete = async (id: string | number) : Promise<TResponse> => {
    const res = await axiosInstance.delete<TResponse>(
      `${this.endpoint}/${id}`);
    return res.data;
  }
async patch(path: string | number, data: Partial<TRequest>) : Promise<TResponse> {
  const res = await axiosInstance.patch<TResponse>(
    `${this.endpoint}/${path}`,
    data
  );

  return res.data;
}
  


}

export default ApiClient;
