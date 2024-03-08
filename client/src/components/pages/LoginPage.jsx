import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import "../../styles/loginS.css"
import logo from '../../img/amuleto.png';
import corgi from '../../img/corgi.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const success = await login(email, password);
      if (success) {
        navigate('/main-menu');
      }
    } catch (error) {
      alert(error.message || 'Login failed. Please try again.');
    }
  };
  
  

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <section className="login-container">
      <div className="login-logo">
        <img src={logo} alt="PIS Logo" />
        <h1>PIS</h1>
      </div>
      <div className="login-form">
        <h2>Admin Login</h2>
        <p>Welcome back. Enter your credentials to access your account</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div className="actions">
            <button type="submit" className="continue-button">Continue</button>
            <a href="#" className="forgot-password">Forgot Password</a>
          </div>
          <label className="keep-signed">
            <input type="checkbox" /> Keep me signed in
          </label>
        </form>
        <div className="login-footer">
          <img src={corgi} alt="Cute corgi" />
          <span>Don't have an Account? <a href="#">Sign up here</a></span>
        </div>
      </div>
    </section>
  );
};


export default LoginPage;
