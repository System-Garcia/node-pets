import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  
});

export const post = async (path, data, config = {}) => {
    try {
      const response = await axiosInstance.post(path, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export default axiosInstance;