import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifySignUpOTP } from '../firebase/auth';
import '../styles/SignUpOTP.css';

const SignUpOTP: React.FC = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Get phone number from navigation state or localStorage
        const phone = location.state?.phoneNumber || localStorage.getItem('userPhoneNumber');
        if (phone) {
            setPhoneNumber(phone);
        } else {
            // If no phone number, redirect back to signup
            navigate('/signup');
        }
    }, [location, navigate]);

    const handleOtpChange = (index: number, value: string) => {
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus next input
            if (value && index < 5) {
                const nextInput = document.getElementById(`otp-input-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-input-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleVerifyOTP = async () => {
        const otpCode = otp.join('');
        
        if (otpCode.length !== 6) {
            alert('Please enter the complete 6-digit OTP');
            return;
        }

        setIsLoading(true);

        try {
            const result = await verifySignUpOTP(otpCode);
            
            alert('Phone number verified successfully!');
            
            // Navigate to create account page
            navigate('/create-account');
            
        } catch (error: any) {
            alert(`Verification failed: ${error.message}`);
            // Clear OTP inputs on error
            setOtp(['', '', '', '', '', '']);
            const firstInput = document.getElementById('otp-input-0');
            firstInput?.focus();
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = () => {
        // Navigate back to signup page to resend
        navigate('/signup');
    };

    const handleNavigateBack = () => {
        navigate('/signup');
    };

    const maskedPhoneNumber = phoneNumber ? 
        `+91 ${phoneNumber.slice(0, 2)}****${phoneNumber.slice(-2)}` : 
        '';

    return (
        <div className="signup-otp-container">
            <div className="signup-otp-content">
                <div className="title-container">
                    <button onClick={handleNavigateBack} className="back-arrow">‹</button>
                    <h1 className="verify-title">Verify Phone Number</h1>
                </div>
                
                <p className="verify-subtitle">
                    Enter the 6-digit code sent to {maskedPhoneNumber}
                </p>

                <div className="otp-input-container">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-input-${index}`}
                            type="text"
                            className="otp-input-box"
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            maxLength={1}
                            disabled={isLoading}
                        />
                    ))}
                </div>

                <div className="resend-prompt">
                    <span>Didn't receive the code? </span>
                    <span className="resend-link" onClick={handleResendOTP}>
                        Resend OTP
                    </span>
                </div>
            </div>

            <div className="verify-footer">
                <button 
                    className="verify-btn" 
                    onClick={handleVerifyOTP}
                    disabled={isLoading || otp.join('').length !== 6}
                >
                    {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>
            </div>
        </div>
    );
};

export default SignUpOTP;