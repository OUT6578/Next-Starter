import axiosInstance from '@/lib/axios';

const trackingService = {
  updateTracking: async (trackingData: any) => {
    const response = await axiosInstance.post('/tracking/update', trackingData);
    return response.data;
  },
  getUserVideoTracking: async (userId: string, videoId: string) => {
    const response = await axiosInstance.get(`/tracking/user/${userId}/video/${videoId}`);
    return response.data;
  },
  getOverviewStats: async () => {
    const response = await axiosInstance.get('/tracking/stats/overview');
    return response.data;
  },
  getLeaderboard: async () => {
    const response = await axiosInstance.get('/tracking/stats/leaderboard');
    return response.data;
  },
  getVideoStats: async (videoId: string) => {
    const response = await axiosInstance.get(`/tracking/stats/video/${videoId}`);
    return response.data;
  },
  getUserTracking: async (userId: string) => {
    const response = await axiosInstance.get(`/tracking/user/${userId}`);
    return response.data;
  }
};

export default trackingService;
