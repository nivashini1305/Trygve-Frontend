import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendSignUpOTP, resetRecaptcha } from '../firebase/auth';
import '../styles/SignUpPage.css';

const SignUpPage: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Clean up reCAPTCHA on component mount
    useEffect(() => {
        resetRecaptcha();
        
        // Cleanup on unmount
        return () => {
            resetRecaptcha();
        };
    }, []);

    const handleSendCode = async () => {
        if (phoneNumber.length !== 10) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        setIsLoading(true);
        
        try {
            await sendSignUpOTP(phoneNumber);
            
            // Store phone number for OTP page
            localStorage.setItem('userPhoneNumber', phoneNumber);
            
            alert(`OTP sent to +91${phoneNumber}`);
            navigate('/verify-otp', { state: { phoneNumber } });
            
        } catch (error: any) {
            alert(`Failed to send OTP: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNavigateBack = () => {
        navigate('/'); // Go back to the welcome page
    };

    return (
        <div className="signup-container">
            <div className="signup-header">
                <button onClick={handleNavigateBack} className="back-arrow">‹</button>
            </div>
            <div className="signup-content">
                <div>
                    <h1 className="signup-title">Can you input your number?</h1>
                    <p className="signup-subtitle">
                        You will be sent a code on this number to verify if you are the owner of the number.
                    </p>
                    <div className="input-group">
                        <div className="country-code">
                            <img src="/assets/india flag.jpg" alt="IN" className="flag-icon"/>
                            <span>+91</span>
                        </div>
                        <input
                            type="tel"
                            className="phone-input"
                            placeholder="1234567890"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            maxLength={10}
                            disabled={isLoading}
                        />
                    </div>
                </div>
                <div className="signup-footer">
                    <button 
                        className="send-code-btn" 
                        onClick={handleSendCode}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Sending...' : 'Send Code'}
                    </button>

                    <p className="login-prompt">
                        Already have an account? 
                        <span onClick={() => navigate('/login')} className="login-link"> Log in</span>
                    </p>
                </div>
            </div>
            
            {/* This container is REQUIRED for the invisible reCAPTCHA */}
            <div id="recaptcha-container"></div>
        </div>
    );
};

export default SignUpPage;
