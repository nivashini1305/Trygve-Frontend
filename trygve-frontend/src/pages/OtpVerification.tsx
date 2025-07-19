import React, { useState, useEffect } from 'react';
import '../styles/LoginPageStyle.css';
import '../styles/SignUp1.css';
import '../styles/OtpVerify.css';
import { useNavigate, useLocation } from 'react-router-dom';

const OtpVerification: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || '';
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [defaultOtp, setDefaultOtp] = useState('');

  useEffect(() => {
    const generatedOtp = '000000'; // You can randomize if needed
    localStorage.setItem('defaultOtp', generatedOtp);
    setDefaultOtp(generatedOtp);
  }, []);

  const handleChange = (value: string, idx: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    if (value && idx < 5) {
      const nextInput = document.getElementById(`otp-input-${idx + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    const storedOtp = localStorage.getItem('defaultOtp');
    if (enteredOtp === storedOtp) {
      setError('');
      navigate('/user-data', { state: { phone } });
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleResend = () => {
    const newOtp = '123456'; // You can randomize if needed
    localStorage.setItem('defaultOtp', newOtp);
    setDefaultOtp(newOtp);
    setOtp(['', '', '', '', '', '']);
    setError('');
  };
    function maskPhone(phone: string) {
      
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10) return phone;
    // Show first digit, mask middle, show last 2 digits
    return `+91 ${digits[2]}${'*'.repeat(7)}${digits.slice(-2)}`;
    }

    // In your JSX:
    <p className="login-subtitle signup-subtitle">
      Enter the verification code we just sent to your number <b>{maskPhone(phone)}</b>.
    </p>

  return (
    <div className="login-banner">
      <div className="signup-bg-logo" />
      <button className="signup-back-btn" onClick={() => navigate(-1)}>
        &lt;
      </button>
      <h1 className="login-title signup-title">OTP Verification</h1>
      <div className="login-content">
        <p className="login-subtitle signup-subtitle">
          Enter the verification code we just sent to your number <b>{phone}</b>.
        </p>
        <form onSubmit={handleSubmit} className="signup-form otp-form">
          <div className="otp-input-row">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(e.target.value, idx)}
                className="otp-input"
                autoComplete="off"
              />
            ))}
          </div>
          <div className="otp-error">{error}</div>
          <div className="otp-resend">
            Didn’t receive code?{' '}
            <span
              className="otp-resend-link"
              onClick={handleResend}
            >
              Resend
            </span>
          </div>
          <button className="get-started-btn otp-btn" type="submit">
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;