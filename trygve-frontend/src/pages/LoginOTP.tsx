import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginOTP.css';

const SignUpOTP: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const navigate = useNavigate();
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, otp.length);
    }, [otp]);

    useEffect(() => {
        const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
        if (storedPhoneNumber) {
            const maskedNumber = `${storedPhoneNumber.substring(0, 1)}*******${storedPhoneNumber.substring(storedPhoneNumber.length - 2)}`;
            setUserPhoneNumber(maskedNumber);
        } else {
            navigate('/login');
        }
    }, [navigate]);

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

    const handleVerifyOTP = () => {
        const enteredOTP = otp.join('');
        const storedOTP = localStorage.getItem('login-otp');

        if (enteredOTP === storedOTP) {
            alert('OTP Verified Successfully!');
            navigate('/login-success'); //verify success
        } else {
            alert('Invalid OTP. Please try again.');
        }
    };

    const handleResendCode = () => {
        const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
        if (storedPhoneNumber) {
            const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
            localStorage.setItem('login-otp', newOtp);
            alert(`A new OTP has been sent to your number.`);
            // Optional: Clear the input fields and focus the first one
            setOtp(new Array(6).fill(''));
            inputRefs.current[0]?.focus();
        }
    };

    const handleNavigateBack = () => {
        navigate(-1);
    };

    return (
        <div className="signup-otp-container">
            <div className="signup-otp-content">
                <div className="title-container">
                    <button onClick={handleNavigateBack} className="back-arrow">‹</button>
                    <h1 className="verify-title"> Verification Code</h1>
                </div>
                <p className="verify-subtitle">
                   We have sent the verification code to your email address
                </p>
                <div className="otp-input-container">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            className="otp-input-box"
                            maxLength={1}
                            value={data}
                            onChange={(e) => handleChange(e.target as HTMLInputElement, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onFocus={(e) => e.target.select()}
                            ref={(el) => (inputRefs.current[index] = el)}
                        />
                    ))}
                </div>
                <p className="resend-prompt">
                    Didn't receive code? <span className="resend-link" onClick={handleResendCode}>Resend</span>
                </p>
            </div>
            <div className="verify-footer">
                <button onClick={handleVerifyOTP} className="verify-btn">Continue</button>
            </div>
        </div>
    );
};
export default SignUpOTP;