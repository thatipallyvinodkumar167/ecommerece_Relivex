import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // Points to our json-server
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for attaching JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling token expiry
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Auto logout if unauthorized (token expired or invalid)
            localStorage.removeItem('adminUser');
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
