import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import videoService from '@/services/videoService';

export interface Video {
  _id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  duration: number;
  category: any;
  tags: string[];
  uploadedBy: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  watchedPercent?: number; // Added from tracking
}

interface VideoState {
  videos: Video[];
  video: Video | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  totalPages: number;
  currentPage: number;
}

const initialState: VideoState = {
  videos: [],
  video: null,
  isLoading: false,
  error: null,
  isSuccess: false,
  totalPages: 1,
  currentPage: 1,
};

// Fetch All Videos
export const fetchVideos = createAsyncThunk(
  'videos/fetchAll',
  async (params: any, thunkAPI) => {
    try {
      return await videoService.getVideos(params);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Failed to fetch videos";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Fetch Single Video
export const fetchVideoById = createAsyncThunk(
  'videos/fetchOne',
  async (id: string, thunkAPI) => {
    try {
      return await videoService.getVideoById(id);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Failed to fetch video";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create Video
export const createVideo = createAsyncThunk(
  'videos/create',
  async (videoData: any, thunkAPI) => {
    try {
      return await videoService.createVideo(videoData);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Failed to create video";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update Video
export const updateVideo = createAsyncThunk(
  'videos/update',
  async ({ id, videoData }: { id: string; videoData: any }, thunkAPI) => {
    try {
      return await videoService.updateVideo(id, videoData);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Failed to update video";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Video
export const deleteVideo = createAsyncThunk(
  'videos/delete',
  async (id: string, thunkAPI) => {
    try {
      await videoService.deleteVideo(id);
      return id;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Failed to delete video";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const videoSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    resetVideoState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
    },
    clearVideo: (state) => {
      state.video = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchVideos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.videos = action.payload.data;
        state.totalPages = action.payload.totalPages || 1;
        state.currentPage = action.payload.currentPage || 1;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch One
      .addCase(fetchVideoById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVideoById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.video = action.payload.data;
      })
      .addCase(fetchVideoById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createVideo.fulfilled, (state, action) => {
        state.videos.push(action.payload.data);
        state.isSuccess = true;
      })
      // Update
      .addCase(updateVideo.fulfilled, (state, action) => {
        const index = state.videos.findIndex(v => v._id === action.payload.data._id);
        if (index !== -1) {
          state.videos[index] = action.payload.data;
        }
        state.video = action.payload.data;
        state.isSuccess = true;
      })
      // Delete
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.videos = state.videos.filter(v => v._id !== action.payload);
        state.isSuccess = true;
      });
  },
});

export const { resetVideoState, clearVideo } = videoSlice.actions;
export default videoSlice.reducer;
