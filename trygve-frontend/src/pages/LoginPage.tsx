import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendLoginOTP, resetRecaptcha } from '../firebase/auth'; // Import Firebase functions
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const navigate = useNavigate();

    // Add useEffect to manage reCAPTCHA
    useEffect(() => {
        resetRecaptcha();
        return () => {
            resetRecaptcha();
        };
    }, []);

    const handleContinue = async () => {
        if (!email.trim() || phoneNumber.trim().length !== 10) {
            alert('Please enter a valid email and 10-digit phone number.');
            return;
        }

        const storedUserDetailsString = localStorage.getItem('userDetails');
        if (storedUserDetailsString) {
            const storedUserDetails = JSON.parse(storedUserDetailsString);

            // Step 1: Validate credentials
            if (
                storedUserDetails.email.toLowerCase() === email.toLowerCase() &&
                storedUserDetails.primaryPhoneNumber === phoneNumber
            ) {
                // Step 2: If valid, send OTP via Firebase
                setIsLoading(true);
                try {
                    await sendLoginOTP(phoneNumber);
                    // Store phone number for the OTP page to use
                    localStorage.setItem('loginPhoneNumber', phoneNumber);
                    alert(`Login OTP sent to +91${phoneNumber}`);
                    navigate('/login-otp', { state: { phoneNumber } });
                } catch (error: any) {
                    alert(`Failed to send login OTP: ${error.message}`);
                } finally {
                    setIsLoading(false);
                }
            } else {
                alert('Invalid credentials. The email or phone number does not match our records.');
            }
        } else {
            alert('No user account found. Please sign up first.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-content">
                <img src="/assets/Image.png" alt="Security" className="login-illustration" />
                <h1 className="login-title">OTP Verification</h1>
                <p className="login-subtitle">
                    Enter email and phone number to send one time Password
                </p>

                <div className="input-wrapper">
                    <label htmlFor="email">Email Id</label>
                    <div className="input-field-container">
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            disabled={isLoading}
                        />
                        <span className="edit-icon">✎</span>
                    </div>
                </div>

                <div className="input-wrapper">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="phone-input-group">
                        <span className="country-code-text">+91</span>
                        <input
                            id="phone"
                            type="tel"
                            className="phone-input-field"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="1234567890"
                            maxLength={10}
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>
            <div className="login-footer">
                <button 
                    onClick={handleContinue} 
                    className="continue-btn"
                    disabled={isLoading}
                >
                    {isLoading ? 'Sending...' : 'Continue'}
                </button>
            </div>
            {/* This container is REQUIRED for the invisible reCAPTCHA */}
            <div id="recaptcha-container"></div>
        </div>
    );
};

export default LoginPage;