import axios from "axios";


const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/global', // Use env variable for baseURL
    withCredentials: true,
});

const authService = {
    register: async (userData) => {
        try {
            const response = await axiosInstance.post('/register', userData);
            return response.data;
        } catch (error) {
            handleError(error);
            throw error;  // Re-throw the error after handling
        }
    },
    
    login: async (credentials) => {
        try {
            const response = await axiosInstance.post('/authenticate', credentials);
            return response.data;
        } catch (error) {
            handleError(error);
            throw error;
        }
    },
    
    refreshToken: async () => {
        try {
            const response = await axiosInstance.post('/refresh-token');
            return response.data;
        } catch (error) {
            handleError(error);
            throw error;
        }
    },
    
    forgotPassword: async (email) => {
        try {
            const response = await axiosInstance.post('/forgot-password', { email });
            return response.data;
        } catch (error) {
            handleError(error);
            throw error;
        }
    },
    
    resetPassword: async (token, newPassword) => {
        try {
            const response = await axiosInstance.post('/reset-passwd', { token, newPassword });
            return response.data;
        } catch (error) {
            handleError(error);
            throw error;
        }
    },
    
    logout: async () => {
        try {
            const response = await axiosInstance.post('/logout');
            return response.data;
        } catch (error) {
            handleError(error);
            throw error;
        }
    }
};

// Error handling function
const handleError = (error) => {
    // Log the error (you can also log this to an external logging service)
    console.error('API call failed:', error);

    // Display a user-friendly message (optional, based on your needs)
    alert('An error occurred. Please try again later.');

    // Additional error handling logic can be added here
    // For example, you could check the error response status and show specific messages
    // if (error.response) {
    //     switch (error.response.status) {
    //         case 401:
    //             alert('Unauthorized. Please login again.');
    //             break;
    //         case 500:
    //             alert('Server error. Please try again later.');
    //             break;
    //         // Handle other status codes as needed
    //     }
    // }
};

export default authService;
