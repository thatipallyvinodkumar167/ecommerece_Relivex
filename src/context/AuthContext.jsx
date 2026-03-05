import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        } else {
            setUser(null);
        }
        setLoading(false);
    }, []);

    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);

        if (userData.role === 'User') {
            navigate('/');
        } else if (userData.role === 'Vendor') {
            navigate('/vendor/dashboard');
        } else {
            navigate('/admin/dashboard');
        }
    };

    const logout = () => {
        const role = user?.role;
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        if (role === 'User') {
            navigate('/login');
        } else if (role === 'Vendor') {
            navigate('/vendor/login');
        } else {
            navigate('/login');
        }
    };

    const register = (userData) => {
        console.log('Registering user:', userData);
        // Mock registration: redirect to login
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
