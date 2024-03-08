// AuthContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      if (response.data.emailValidated) {
        setAuth(response.data);
        return true;
      } else {
        throw new Error('Email not validated.');
      }
    } catch (error) {
      if (error.response) {
        console.error(error.response.data);
        throw new Error(error.response.data.message || 'Login failed.');
      } else if (error.request) {
        console.error('No response was received', error.request);
        throw new Error('No response was received.');
      } else {
        console.error('An error occurred while logging in', error.message);
        throw new Error('An error occurred while logging in.');
      }
    }
  };
  

  return (
    <AuthContext.Provider value={{ auth, login }}>
      {children}
    </AuthContext.Provider>
  );
};
