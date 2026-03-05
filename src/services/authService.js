import axios from 'axios';

const API_URL = 'http://localhost:5000';

const authService = {
    login: async (email, password) => {
        const response = await axios.get(`${API_URL}/users`);
        const users = response.data;

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_token_' + Math.random();
            return { user, token };
        }

        throw new Error('Invalid email or password');
    },

    register: async (userData) => {
        const response = await axios.post(`${API_URL}/users`, {
            ...userData,
            role: userData.role || 'User'
        });
        return response.data;
    }
};

export default authService;
