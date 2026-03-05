import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'Admin'
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Auth persistence disabled - always uses mock user
        setLoading(false);
    }, []);

    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);

        if (userData.role === 'User') {
            navigate('/');
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
        } else {
            navigate('/admin/login');
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
