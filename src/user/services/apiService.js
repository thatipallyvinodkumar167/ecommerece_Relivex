import { useQuery } from '@tanstack/react-query';
import { MOCK_PRODUCTS, MOCK_ORDERS, NOTIFICATIONS } from './mockData';

// Simulated API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            await delay(1000);
            return MOCK_PRODUCTS;
        }
    });
};

export const useOrders = () => {
    return useQuery({
        queryKey: ['userOrders'],
        queryFn: async () => {
            await delay(1200);
            return MOCK_ORDERS;
        }
    });
};

export const useNotifications = () => {
    return useQuery({
        queryKey: ['userNotifications'],
        queryFn: async () => {
            await delay(800);
            return NOTIFICATIONS;
        }
    });
};
