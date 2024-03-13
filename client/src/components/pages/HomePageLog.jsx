import React from 'react';
import "../../styles/pages/homepageL.css"
import { useNavigate } from 'react-router-dom';

const HomePageLog = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <>
      <header>
        <a className="brand" href="/">PIS</a>
        <nav>
            <a href="/">Community</a>
            <a href="/">Events</a>
            <a href="/">Shop</a>
        </nav>
        <button className="sign" onClick={handleSignInClick}>Sign in</button>
        <button className="sign" onClick={handleSignUpClick}>Sign up</button>
      </header>
    </>
  );
};

export default HomePageLog; 
