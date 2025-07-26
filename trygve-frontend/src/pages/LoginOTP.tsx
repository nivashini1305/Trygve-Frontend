import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyLoginOTP } from '../firebase/auth';
import '../styles/LoginOTP.css';

const LoginOTP: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const [isLoading, setIsLoading] = useState(false);
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, otp.length);
    }, [otp]);

    useEffect(() => {
        const phone = location.state?.phoneNumber || localStorage.getItem('loginPhoneNumber');
        if (phone) {
            const maskedNumber = `${phone.substring(0, 1)}*******${phone.substring(phone.length - 2)}`;
            setUserPhoneNumber(maskedNumber);
        } else {
            navigate('/login');
        }
    }, [location, navigate]);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);
        if (element.value !== '' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyLoginOTP = async () => {
        const otpCode = otp.join('');
        if (otpCode.length !== 6) {
            alert('Please enter the complete 6-digit OTP');
            return;
        }

        setIsLoading(true);
        try {
            await verifyLoginOTP(otpCode);
            alert('Login successful!');
            navigate('/dashboard');
        } catch (error: any) {
            alert(`Login verification failed: ${error.message}`);
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setIsLoading(false);
        }
    };

    const handleNavigateBack = () => {
        navigate('/login');
    };

    return (
        <div className="login-otp-container">
            <div className="login-otp-content">
                <div className="title-container">
                    <button onClick={handleNavigateBack} className="back-arrow">‹</button>
                    <h1 className="verify-title">Verify Login</h1>
                </div>
                <p className="verify-subtitle">
                    Enter the 6-digit code sent to {userPhoneNumber}
                </p>
                <div className="otp-input-container">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            id={`login-otp-input-${index}`}
                            type="text"
                            className="otp-input-box"
                            maxLength={1}
                            value={data}
                            onChange={(e) => handleChange(e.target as HTMLInputElement, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onFocus={(e) => e.target.select()}
                            ref={(el) => (inputRefs.current[index] = el)}
                            disabled={isLoading}
                        />
                    ))}
                </div>
                <div className="resend-prompt">
                    <span>Didn't receive the code? </span>
                    <span className="resend-link" onClick={() => navigate('/login')}>
                        Resend OTP
                    </span>
                </div>
            </div>
            <div className="verify-footer">
                <button
                    className="verify-btn"
                    onClick={handleVerifyLoginOTP}
                    disabled={isLoading || otp.join('').length !== 6}
                >
                    {isLoading ? 'Verifying...' : 'Verify & Login'}
                </button>
            </div>
        </div>
    );
};

export default LoginOTP;