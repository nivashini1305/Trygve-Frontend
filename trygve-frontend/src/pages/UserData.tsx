import React, { useState } from 'react';
import '../styles/UserData.css';
import { useNavigate } from 'react-router-dom';

const UserData: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [secondaryPhone, setSecondaryPhone] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      fullName,
      email,
      location,
      secondaryPhone,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    navigate('/signup-success');
    // Optionally, navigate or reset form here
  };

  return (
    <div className="login-banner">
      <div className="signup-bg-logo" />
      <button className="signup-back-btn" onClick={() => window.history.back()}>
        &lt;
      </button>
      <div className="login-content">
        <h1 className="login-title signup-title">Almost Done!</h1>
        <p className="login-subtitle signup-subtitle">
          Please enter your details in the following section.
        </p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            className="signup-input"
            type="text"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
          />
          <input
            className="signup-input"
            type="email"
            placeholder="Enter Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <div className="location-input-wrapper">
            <input
              type="text"
              placeholder="Arasur, Coimbatore"
              value={location}
              onChange={e => setLocation(e.target.value)}
              required
              className="location-input"
            />
            <span className="location-icon" role="img" aria-label="location">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" fill="#0456d9"/>
              </svg>
            </span>
          </div>
          <input
            className="signup-input"
            type="text"
            placeholder="Enter Secondary Phone Number"
            value={secondaryPhone}
            onChange={e => setSecondaryPhone(e.target.value)}
          />
          <button className="get-started-btn signup-btn" type="submit">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserData;