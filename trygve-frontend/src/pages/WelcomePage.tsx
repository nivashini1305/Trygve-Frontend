import React from 'react';
import { useNavigate } from 'react-router-dom';
import  '../styles/WelcomePage.css'; 

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };
  const handleLogin =() => {
    navigate('/login');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <p className="welcome-title">Welcome to </p>
        <h1 className="welcome-logo-text">Trygve</h1>
        <p className="welcome-subtitle">Your trusted partner for personalized health,right at your doorstep."</p>
        <div className="welcome-buttons">
          <button className="btn-welcome signup-btn" onClick={handleSignUp}>Sign Up</button>
            <button className="btn-welcome login-btn" onClick={handleLogin}>Login</button>
          </div>
       </div>
    </div>
  );
}
export default WelcomePage;