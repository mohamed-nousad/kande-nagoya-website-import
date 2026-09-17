import axios from "axios";
import { baseURL } from '@/configs/AppConfig';
import { tokenService } from "./authUtils";

const api = axios.create({
  baseURL,
  timeout: 20000,
});

api.interceptors.request.use(config => {
  const token = tokenService.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
