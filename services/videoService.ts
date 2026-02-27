import axiosInstance from '@/lib/axios';

const videoService = {
  getVideos: async (params?: any) => {
    const response = await axiosInstance.get('/videos', { params });
    return response.data;
  },
  getVideoById: async (id: string) => {
    const response = await axiosInstance.get(`/videos/${id}`);
    return response.data;
  },
  getVideosByCategory: async (categoryId: string) => {
    const response = await axiosInstance.get(`/videos/category/${categoryId}`);
    return response.data;
  },
  createVideo: async (videoData: any) => {
    const response = await axiosInstance.post('/videos', videoData);
    return response.data;
  },
  updateVideo: async (id: string, videoData: any) => {
    const response = await axiosInstance.put(`/videos/${id}`, videoData);
    return response.data;
  },
  deleteVideo: async (id: string) => {
    const response = await axiosInstance.delete(`/videos/${id}`);
    return response.data;
  }
};

export default videoService;
