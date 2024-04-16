import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,  
});

export const http = {
  post: (path, data, config) => axiosInstance.post(path, data, config),
  get: (path, config) => axiosInstance.get(path, config),
  put: (path, data, config) => axiosInstance.put(path, data, config),
  delete: (path, config) => axiosInstance.delete(path, config),
};
