import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import trackingService from '@/services/trackingService';

interface TrackingState {
  currentTracking: any | null;
  userTracking: any[];
  stats: any | null;
  leaderboard: any[];
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

const initialState: TrackingState = {
  currentTracking: null,
  userTracking: [],
  stats: null,
  leaderboard: [],
  isLoading: false,
  error: null,
  isSuccess: false,
};

// Update Tracking
export const updateTracking = createAsyncThunk(
  'tracking/update',
  async (trackingData: any, thunkAPI) => {
    try {
      return await trackingService.updateTracking(trackingData);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Failed to update tracking";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get User Video Tracking
export const fetchUserVideoTracking = createAsyncThunk(
  'tracking/fetchUserVideo',
  async ({ userId, videoId }: { userId: string; videoId: string }, thunkAPI) => {
    try {
      return await trackingService.getUserVideoTracking(userId, videoId);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Failed to fetch tracking";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Overview Stats
export const fetchOverviewStats = createAsyncThunk(
  'tracking/fetchOverview',
  async (_, thunkAPI) => {
    try {
      return await trackingService.getOverviewStats();
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Failed to fetch stats";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Leaderboard
export const fetchLeaderboard = createAsyncThunk(
  'tracking/fetchLeaderboard',
  async (_, thunkAPI) => {
    try {
      return await trackingService.getLeaderboard();
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Failed to fetch leaderboard";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const trackingSlice = createSlice({
  name: 'tracking',
  initialState,
  reducers: {
    resetTrackingState: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateTracking.fulfilled, (state, action) => {
        state.currentTracking = action.payload.data;
        state.isSuccess = true;
      })
      .addCase(fetchUserVideoTracking.fulfilled, (state, action) => {
        state.currentTracking = action.payload.data;
      })
      .addCase(fetchOverviewStats.fulfilled, (state, action) => {
        state.stats = action.payload.data;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.leaderboard = action.payload.data;
      });
  },
});

export const { resetTrackingState } = trackingSlice.actions;
export default trackingSlice.reducer;
