// frontend/src/config/axios.js
import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

apiClient.interceptors.request.use(async (config) => {
  try {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // No active session — send request without token
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const session = await fetchAuthSession({ forceRefresh: true });
        const newToken = session.tokens?.idToken?.toString();

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        window.location.href = "/coming-soon";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
