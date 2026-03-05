import React, { createContext, useState, useContext, useEffect } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem('userOrders');
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    useEffect(() => {
        localStorage.setItem('userOrders', JSON.stringify(orders));
    }, [orders]);

    // Simulation: Auto-update order status
    useEffect(() => {
        const timer = setInterval(() => {
            setOrders(prevOrders => {
                let changed = false;
                const newOrders = prevOrders.map(order => {
                    if (order.status === 'Pending') {
                        changed = true;
                        return { ...order, status: 'Confirmed' };
                    }
                    if (order.status === 'Confirmed') {
                        changed = true;
                        return { ...order, status: 'Shipped' };
                    }
                    if (order.status === 'Shipped') {
                        changed = true;
                        return { ...order, status: 'Delivered' };
                    }
                    return order;
                });
                return changed ? newOrders : prevOrders;
            });
        }, 15000); // Update every 15 seconds

        return () => clearInterval(timer);
    }, []);

    const placeOrder = (orderData) => {
        const newOrder = {
            id: `ORD-${Math.floor(Math.random() * 900000) + 100000}`,
            date: new Date().toISOString().split('T')[0],
            status: 'Pending',
            ...orderData
        };
        setOrders(prev => [newOrder, ...prev]);
        return newOrder;
    };

    return (
        <OrderContext.Provider value={{ orders, placeOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => useContext(OrderContext);
