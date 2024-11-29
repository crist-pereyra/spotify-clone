import { useAuthStore } from '@/store/auth.store';
import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5000/api',
  baseURL:
    import.meta.env.MODE === 'development'
      ? 'http://localhost:5000/api'
      : '/api',
});
axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
export { axiosInstance };
