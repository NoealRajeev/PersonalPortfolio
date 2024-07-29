import axios from 'axios';
import authService from './AuthService';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/global', // Use env variable for baseURL
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        
        // Handle 401 Unauthorized errors
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                await authService.refreshToken();
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Handle refresh token failure (e.g., redirect to login)
                console.error('Refresh token error', refreshError);
                localStorage.setItem("status", false);
                // Optionally redirect to login or show a notification
                window.location.href = '/'; // or any appropriate action
            }
        }

        // Optionally handle other status codes (e.g., 403 Forbidden)
        if (error.response && error.response.status === 403) {
            console.error('Access denied', error);
            // Optionally redirect or show a notification
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
