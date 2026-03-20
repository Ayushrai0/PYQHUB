import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const decodeToken = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [student, setStudent] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem('studentToken');
        if (savedToken) {
            const decoded = decodeToken(savedToken);
            if (decoded && decoded.exp * 1000 > Date.now()) {
                setToken(savedToken);
                setStudent({ id: decoded.id, name: decoded.name, email: decoded.email });
                axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
            } else {
                localStorage.removeItem('studentToken');
            }
        }
        setLoading(false);
    }, []);

    const login = (newToken) => {
        localStorage.setItem('studentToken', newToken);
        const decoded = decodeToken(newToken);
        setToken(newToken);
        setStudent({ id: decoded.id, name: decoded.name, email: decoded.email });
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    };

    const logout = () => {
        localStorage.removeItem('studentToken');
        setToken(null);
        setStudent(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ student, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
