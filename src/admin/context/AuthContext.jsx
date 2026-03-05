import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for saved user in localStorage on mount
        const savedUser = localStorage.getItem('adminUser');
        const token = localStorage.getItem('token');

        if (savedUser && token) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem('adminUser', JSON.stringify(userData));
        localStorage.setItem('token', token);
        navigate('/dashboard');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('adminUser');
        localStorage.removeItem('token');
        navigate('/login');
    };

    const register = (userData) => {
        // In a real app, this would call an API. For now, we'll just mock it.
        console.log('Registering user:', userData);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
