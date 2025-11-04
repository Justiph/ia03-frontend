import axios, { AxiosError } from 'axios';

// Token management
let accessToken: string | null = null;
export const getRefreshToken = () => localStorage.getItem('refreshToken');
const setRefreshToken = (token: string) => localStorage.setItem('refreshToken', token);
export const clearTokens = () => {
  accessToken = null;
  localStorage.removeItem('refreshToken');
};

// Create API instance
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

// Add access token to requests
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 responses and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    const url = (originalRequest?.url || '').toString();
    
    // If error is 401 and we haven't tried refreshing yet
    // Skip refresh flow for public/auth endpoints to avoid redirect/reload on login/register errors
    const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/refresh') || url.includes('/user/register');

    if (error.response?.status === 401 && originalRequest && !originalRequest.headers['x-retry'] && !isAuthEndpoint) {
      const refreshToken = getRefreshToken();
      
      if (!refreshToken) {
        clearTokens();
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
        accessToken = newAccessToken;
        setRefreshToken(newRefreshToken);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers['x-retry'] = 'true';
        return api(originalRequest);
      } catch (refreshError) {
        clearTokens();
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Authentication methods
export const setAuthTokens = (newAccessToken: string, newRefreshToken: string) => {
  accessToken = newAccessToken;
  setRefreshToken(newRefreshToken);
};

export const isAuthenticated = () => Boolean(accessToken && getRefreshToken());

// Allow setting access token alone (used after refresh bootstrap)
export const setAccessToken = (newAccessToken: string | null) => {
  accessToken = newAccessToken;
};
