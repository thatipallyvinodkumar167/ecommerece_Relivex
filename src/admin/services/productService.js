import api from '../api/axiosConfig';

const productService = {
    getAllProducts: async () => {
        const response = await api.get('/products');
        return response.data;
    },

    getProductById: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    addProduct: async (productData) => {
        const response = await api.post('/products', productData);
        return response.data;
    },

    updateProduct: async (id, productData) => {
        const response = await api.put(`/products/${id}`, productData);
        return response.data;
    },

    deleteProduct: async (id) => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    },

    toggleProductStatus: async (id, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
        const response = await api.patch(`/products/${id}`, { status: newStatus });
        return response.data;
    }
};

export default productService;
