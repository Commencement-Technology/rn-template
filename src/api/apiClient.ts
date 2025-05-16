import axios from 'axios';
import { useAuthStore } from '../store';

const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default apiClient;
