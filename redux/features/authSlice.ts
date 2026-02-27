import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService from '@/services/authService';

// Define user interface
interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isSuccess: false,
};

// Register User Thunk
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: any, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Registration failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login User Thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData: any, thunkAPI) => {
    try {
      const data = await authService.login(userData);
      if (data.token) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', data.token);
        }
      }
      return data;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout User Thunk
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
             await authService.logout();
        } catch (error) {
            console.error(error);
        }
        if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
        }
    }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.error = null;
      state.isSuccess = false;
    },
    setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
    },
    logout: (state) => {
        state.user = null;
        state.token = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
        }
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user; // Assuming register returns user
        state.token = action.payload.token; // Assuming register returns token
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
          state.user = null;
          state.token = null;
      })
  },
});

export const { reset, setCredentials } = authSlice.actions;
export default authSlice.reducer;
