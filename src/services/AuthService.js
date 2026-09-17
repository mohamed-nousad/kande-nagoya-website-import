import fetch from '@/auth/FetchInterceptor';
import api from './api';

const authService = {
  login: (data)  => fetch({ url: '/api/WebUser/Login',  method: 'post', data }),
  register: (data)  => fetch({ url: '/api/WebUser/Create', method: 'post', data }),
  loginWithGoogle: (data) => fetch({ url: '/api/WebUser/GoogleLogin', method: 'post', data }),
  loginWithApple: (data) => fetch({ url: '/api/WebUser/AppleLogin',  method: 'post', data }),
  logout: ()  => Promise.resolve(),
  refreshToken: (token) => api.post('/api/WebUser/refreshToken', { refreshToken: token }),
};

export default authService;