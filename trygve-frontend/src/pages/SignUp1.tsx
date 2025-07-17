import React, { useState } from 'react';
import '../styles/LoginPageStyle.css';
import '../styles/SignUp1.css';
import { useNavigate } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [countryCode] = useState('+91');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only digits and spaces
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
      setError('');
    } else if (!/^\d*$/.test(value)) {
      setError('Only numbers are allowed');
    } else if (value.length > 10) {
      setError('Only 10 digits are allowed');
    }
    // Add your OTP logic here
  };
   const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.replace(/ /g, '').length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    // Add your OTP logic here
  };

  return (
    <div className="login-banner">
      {/* Faded background logo */}
      <div className="signup-bg-logo" />
      {/* Back button at top left */}
      <button className="signup-back-btn" onClick={() => navigate(-1)}>
        &lt;
      </button>
      <h1 className="login-title signup-title">
          Can you input your number?
      </h1>
      <div className="login-content">
        <p className="login-subtitle signup-subtitle">
          You will be sent a code on this number to verify if you are the owner of the number.
        </p>
        <form onSubmit={handleSendCode} className="signup-form">
          <div className="signup-form-row">
            <div className="country-code-box">
              <img
                src="/assets/india flag.jpg"  // <-- Use your actual flag image path
                alt="IN"
                className="country-flag-img"
              />
              <input
                type="text"
                value={countryCode}
                readOnly
                className="country-code-input"
              />
            </div>
            <input
              type="text"
              placeholder="12345 67890"
              value={phone}
              onChange={handlePhoneChange}
              className="phone-input"
              required
              inputMode="numeric"
            />
          </div>
          <div style={{ color: '#d32f2f', marginBottom: '12px', textAlign: 'center' }}>
              {error}
            </div>
          <button className="get-started-btn signup-btn" type="submit">
            Send Code
          </button>
        </form>
        <div className="signup-login-link">
          <span style={{ color: '#555' }}>Already have an account? </span>
          <span
            style={{ color: '#0456d9', cursor: 'pointer', fontWeight: 500 }}
            onClick={() => navigate('/home')}
          >
            Log in
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;