import axiosInstance from '@/lib/axios';

const authService = {
  register: async (userData: any) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  },
  login: async (userData: any) => {
    const response = await axiosInstance.post('/auth/login', userData);
    return response.data;
  },
  logout: async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  },
  getMe: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  }
};

export default authService;
