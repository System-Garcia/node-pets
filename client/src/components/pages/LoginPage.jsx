import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import "../../styles/pages/loginS.css"
import logo from '/img/amuleto.png';
import corgi from '/img/corgi.png';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';


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
            <div className="input-icon-container">
              <FaEnvelope className="input-icon" />
              <input
                id="email"
                type="email"
                placeholder="john.doe@gmail.com"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
          </div>
          <div className="input-group">
            <div>
            <label htmlFor="password">Password</label>
            <Link to="/forgot-password" className="forgot-password">Forgot Password</Link>
            </div>
            <div className="input-icon-container">
              <FaLock className="input-icon" />
              <input
                id="password"
                className="input"
                type="password"
                placeholder="123456"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
          </div>
          <div className="keep-signed">
            <input type="checkbox" id="keep-signed-in" />
            <label htmlFor="keep-signed-in">Keep me signed in</label>
          </div>
          <div className="actions">
            <button type="submit" className="continue-button">Continue</button>
          </div>
        </form>
        <div className="login-footer">
          <span>Don't have an Account? <a href="/signup">Sign up here</a></span>
          <img src={corgi} alt="Cute corgi" />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
