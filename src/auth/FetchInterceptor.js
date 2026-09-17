import axios from 'axios';
import { baseURL } from '@/configs/AppConfig';
import { tokenService } from '@/services/authUtils';
import { showToast } from '@/utils/toast';
import store from '@/store';
import { signOutSuccess } from '@/store/slices/authSlice';

const UNAUTHORIZED_CODES = [400, 401, 403];

const fetch = axios.create({
  baseURL,
  timeout: 60000,
});

fetch.interceptors.request.use(config => {
  const token = tokenService.getAccessToken();
  if (token) {
    config.headers['authorization'] = token;
  }
  return config;
}, error => {
  showToast('Request Error');
  return Promise.reject(error);
});

fetch.interceptors.response.use(response => response.data, error => {
  const { status } = error.response || {};
  if (UNAUTHORIZED_CODES.includes(status)) {
    tokenService.removeAccessToken();
    tokenService.removeRefreshToken();
    store.dispatch(signOutSuccess());
    showToast('Authentication Failed. Please login again');
  } else if (status === 404) {
    showToast('Not Found');
  } else if (status === 500) {
    showToast('Internal Server Error');
  } else if (status === 508) {
    showToast('Timeout');
  }
  return Promise.reject(error);
});

export default fetch;