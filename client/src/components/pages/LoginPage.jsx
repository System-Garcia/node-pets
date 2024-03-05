import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/home');
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <section>
      <img src="path-to-your-logo.png" alt="Your Brand Logo" />
      <h1>PIS</h1>
      <h2>Admin Login</h2>
      <p>Welcome back. Enter your credentials to access your account</p>
      <h3>Email Address</h3>
      <input
        type="email"
        placeholder='email'
        value={email}
        onChange={handleEmailChange}
      />
      <button onClick={handleLogin}>Continue</button>
    </section>
  );
};

export default LoginPage;
