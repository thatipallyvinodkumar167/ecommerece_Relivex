import api from '../api/axiosConfig';

const customerService = {
    getAllCustomers: async () => {
        const response = await api.get('/customers');
        return response.data;
    },

    getCustomerById: async (id) => {
        const response = await api.get(`/customers/${id}`);
        return response.data;
    },

    blockCustomer: async (id) => {
        const response = await api.patch(`/customers/${id}`, { status: 'Blocked' });
        return response.data;
    },

    unblockCustomer: async (id) => {
        const response = await api.patch(`/customers/${id}`, { status: 'Active' });
        return response.data;
    },

    deleteCustomer: async (id) => {
        const response = await api.delete(`/customers/${id}`);
        return response.data;
    },

    getCustomerOrders: async (id) => {
        const response = await api.get(`/orders?customerId=${id}`);
        return response.data;
    }
};

export default customerService;
