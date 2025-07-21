import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    // useEffect(() => {
    //     const storedUserDetailsString = localStorage.getItem('userDetails');
    //     if (storedUserDetailsString) {
    //         const userDetails = JSON.parse(storedUserDetailsString);
    //         setEmail(userDetails.email || '');
    //         setPhoneNumber(userDetails.primaryPhoneNumber || '');
    //     } else {
    //         // If no user details are found, redirect to sign up
    //         alert('No user account found. Please sign up first.');
    //         navigate('/signup');
    //     }
    // }, [navigate]);

    const handleContinue = () => {
        if (!email.trim() || phoneNumber.trim().length !== 10) {
            alert('Please enter a valid email and 10-digit phone number.');
            return;
        }
         const storedUserDetailsString = localStorage.getItem('userDetails');
        if (storedUserDetailsString) {
            const storedUserDetails = JSON.parse(storedUserDetailsString);

            // Step 3: Validate the user's input against the stored details
            if (
                storedUserDetails.email.toLowerCase() === email.toLowerCase() &&
                storedUserDetails.primaryPhoneNumber === phoneNumber
            ) {
                // If validation succeeds, generate OTP and proceed
                const otp = Math.floor(100000 + Math.random() * 900000).toString();
                localStorage.setItem('login-otp', otp);
                localStorage.setItem('userPhoneNumber', phoneNumber);
                
                alert(`An OTP has been sent to +91 ${phoneNumber}.`);
                navigate('/login-otp');
            } else {
                // If validation fails, show an error
                alert('Invalid credentials. The email or phone number does not match our records.');
            }
        } else {
            // If no account exists at all
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
                        />
                        <span className="edit-icon">✎</span>
                    </div>
                </div>

                <div className="input-wrapper">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="input-field-container">
                        <input
                            id="phone"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Enter your phone number"
                            maxLength={10}
                        />
                    </div>
                </div>
            </div>
            <div className="login-footer">
                <button onClick={handleContinue} className="continue-btn">Continue</button>
            </div>
        </div>
    );
};

export default LoginPage;