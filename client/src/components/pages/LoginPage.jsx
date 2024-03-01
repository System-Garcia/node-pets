import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/home');
  };

  return (
    <div>
      <h1>Login</h1>
      {}
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};

export default LoginPage;
