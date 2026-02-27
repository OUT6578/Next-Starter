import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '@/services/categoryService';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  isActive: boolean;
}

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

const initialState: CategoryState = {
  categories: [],
  isLoading: false,
  error: null,
  isSuccess: false,
};

// Fetch Categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, thunkAPI) => {
    try {
      return await categoryService.getCategories();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
    }
  }
);

// Create Category
export const createCategory = createAsyncThunk(
  'categories/create',
  async (categoryData: any, thunkAPI) => {
    try {
      return await categoryService.createCategory(categoryData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create category");
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload.data);
      });
  },
});

export default categorySlice.reducer;
