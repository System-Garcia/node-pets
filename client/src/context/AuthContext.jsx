import { createContext, useState } from 'react';
import axios from 'axios';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      const { token } = response.data;
      if (token) {
        setAuth({ ...response.data });
        localStorage.setItem('token', token);
        return true;
      } else {
        throw new Error('Login failed. No token received.');
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error);
      toast.error('Registration failed.');
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
