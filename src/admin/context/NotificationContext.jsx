import React, { createContext, useState, useContext, useEffect } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([
        { id: 1, title: 'Session Started', message: 'You are now logged into the Admin Panel.', type: 'info', time: 'Just now' }
    ]);
    const [unreadCount, setUnreadCount] = useState(1);

    const addNotification = (note) => {
        const newNote = { id: Date.now(), ...note, time: 'Just now' };
        setNotifications(prev => [newNote, ...prev]);
        setUnreadCount(prev => prev + 1);
    };

    const clearNotifications = () => {
        setNotifications([]);
        setUnreadCount(0);
    };

    // Simulate real-time updates
    useEffect(() => {
        const orderInterval = setInterval(() => {
            const random = Math.random();
            if (random > 0.8) {
                addNotification({
                    title: 'New Order Received',
                    message: `Order #ORD-${Math.floor(Math.random() * 1000)} has been placed.`,
                    type: 'order'
                });
            } else if (random < 0.1) {
                addNotification({
                    title: 'Low Stock Alert',
                    message: 'Knee Compression Sleeve reached threshold (5 left).',
                    type: 'stock'
                });
            }
        }, 30000); // Check every 30 seconds

        return () => clearInterval(orderInterval);
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, clearNotifications, addNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
