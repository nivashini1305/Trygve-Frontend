import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserData.css';

const SignUpSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login-banner">
      <div className="signup-bg-logo" />
      <button className="signup-back-btn" onClick={() => navigate(-1)}>
        &lt;
      </button>
      <div className="login-content">
        <div style={{ margin: '32px 0 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Blue check icon */}
          <svg width="64" height="64" viewBox="0 0 64 64" style={{ marginBottom: 24 }}>
            <circle cx="32" cy="32" r="32" fill="#0456d9" />
            <polyline points="20,34 30,44 46,24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1 className="login-title signup-title" style={{ textAlign: 'center', fontSize: '1.3rem', marginBottom: 12 }}>
            You're Now with Your<br />Trusted Guardian of Life!
          </h1>
          <p className="login-subtitle signup-subtitle" style={{ marginBottom: 32 }}>
            Welcome to the TRYGE Family.<br />
            Your journey to better health starts here.
          </p>
        </div>
        <button
          className="get-started-btn signup-btn"
          onClick={() => navigate('/home')}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default SignUpSuccess;