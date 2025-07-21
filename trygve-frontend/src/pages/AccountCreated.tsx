import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AccountCreated.css';

const AccountCreatedPage: React.FC = () => {
    const navigate = useNavigate();

    const handleBackToLogin = () => {
        navigate('/login');
    };

    const handleNavigateBack = () => {
        console.log('Back button clicked'); 
        navigate('/create-account'); // Go back to the create account page
    };

    return (
        <div className="account-created-container">
            <div className="account-created-header">
                <button onClick={handleNavigateBack} className="back-arrow">‹</button>
            </div>
            <div className="account-created-content">
                <img src="/assets/Image.png" alt="Success" className="checkmark-icon" />
                <h1 className="confirmation-title">
                    You're Now with Your Trusted Guardian of Life!
                </h1>
                <p className="confirmation-subtitle">
                    Welcome to the TRYGVE Family! Your journey to better health starts here.
                </p>
            </div>
            <div className="account-created-footer">
                <button onClick={handleBackToLogin} className="login-btn">Back to Login</button>
            </div>
        </div>
    );
};

export default AccountCreatedPage;