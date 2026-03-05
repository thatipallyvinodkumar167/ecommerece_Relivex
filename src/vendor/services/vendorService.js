import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const vendorService = {
    login: async (email, password) => {
        const response = await axios.get(`${API_URL}/users?email=${email}&password=${password}&role=Vendor`);
        if (response.data.length > 0) {
            return response.data[0];
        }
        throw new Error('Invalid vendor credentials');
    },
    register: async (vendorData) => {
        const response = await axios.post(`${API_URL}/users`, {
            ...vendorData,
            role: 'Vendor'
        });
        return response.data;
    }
};

export const vendorOrderService = {
    getOrders: async (vendorName) => {
        const response = await axios.get(`${API_URL}/orders?vendor=${vendorName}`);
        return response.data;
    },
    updateStatus: async (orderId, status) => {
        const response = await axios.patch(`${API_URL}/orders/${orderId}`, { status });
        return response.data;
    }
};
