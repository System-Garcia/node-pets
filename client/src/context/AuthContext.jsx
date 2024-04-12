import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { post } from '../helpers/axiosHelper';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const login = async (email, password) => {
    try {
      const data = await post('/auth/login', { email, password });
      if (data.token) {
        setAuth(data);
        localStorage.setItem('token', data.token);
        toast.success('Login successful!');
        return true;
      } else {
        throw new Error('Login failed. No token received.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Registration failed.');
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('token');
    toast.info('Logged out successfully.');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
