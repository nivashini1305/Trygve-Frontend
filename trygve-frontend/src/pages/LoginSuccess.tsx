import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginSuccess.css';

const AccountCreatedPage: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigateBack = () => {
        navigate('/loginOTP'); // Go back to the create account page
    };
    const handleContinue = () => {
        navigate('/dashboard'); // Navigate to the dashboard or any other page
    };

    return (
        <div className="account-created-container">
            <div className="account-created-header">
                <button onClick={handleNavigateBack} className="back-arrow">‹</button>
            </div>
            <div className="account-created-content">
                <img src="/assets/Image.png" alt="Success" className="checkmark-icon" />
                <h1 className="confirmation-title">
                    Welcome Back to TRYGVE!
                </h1>
                <p className="confirmation-subtitle">
                   "Your trusted guradian of life is ready to serve you."
                </p>
            </div>
            <div className="account-created-footer">
                <button  className="login-btn" onClick={handleContinue}>Continue</button>
            </div>
        </div>
    );
};

export default AccountCreatedPage;