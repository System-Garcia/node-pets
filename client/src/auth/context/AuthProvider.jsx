import { useReducer, useState, useEffect  } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { authReducer } from './authReducer';
import { AuthContext } from './AuthContext';
import { http } from '../../helpers';
import { types } from '../types/types';

const init = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  

  return {
    logged: !!token,
    user,
    token
  };
};

export const AuthProvider = ({ children }) => {

  const [authState, dispatch] = useReducer(authReducer, {}, init);

  const login = async (email, password) => {
    try {
      const { data } = await http.post('/auth/login', { email, password });
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        dispatch({
          type: types.login,
          payload: data
        });

        return {
          success: true
        };
      }
    } catch (error) {
    
      return {
        success: false,
        error: error.response?.data?.error || 'Unkonwn error ocurred.',
        status: error.response?.status || 500,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    dispatch({
      type: types.logout
    });
  };

  const checkSession = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await http.post('/auth/check-session', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        dispatch({
          type: types.login,
          payload: { user: response.data.user, token }
        });
      }
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    checkSession();
  }, []);


  return (
    <AuthContext.Provider
      value={{
        ...authState,

        // Methods
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
