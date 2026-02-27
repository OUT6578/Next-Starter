import axiosInstance from '@/lib/axios';

const categoryService = {
  getCategories: async () => {
    const response = await axiosInstance.get('/categories');
    return response.data;
  },
  createCategory: async (categoryData: any) => {
    const response = await axiosInstance.post('/categories', categoryData);
    return response.data;
  },
  updateCategory: async (id: string, categoryData: any) => {
    const response = await axiosInstance.put(`/categories/${id}`, categoryData);
    return response.data;
  },
  deleteCategory: async (id: string) => {
    const response = await axiosInstance.delete(`/categories/${id}`);
    return response.data;
  }
};

export default categoryService;
