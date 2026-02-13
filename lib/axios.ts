import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add access token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Check if we are in the browser environment
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error status codes (e.g., 401 for unauthorized)
    if (error.response && error.response.status === 401) {
      // You might want to clear local storage and redirect to login
      // but be careful with loops if the error comes from the login page itself
      if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
          // localStorage.removeItem("accessToken");
          // localStorage.removeItem("user");
          // window.location.href = "/login";
      }
    }
    
    // Return a more user-friendly error message if available
    if (error.response && error.response.data && error.response.data.message) {
        return Promise.reject(new Error(error.response.data.message));
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
