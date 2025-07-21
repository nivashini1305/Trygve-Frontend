import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateAccount.css';

const CreateAccountPage: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [secondaryPhone, setSecondaryPhone] = useState('');
    const navigate = useNavigate();

    const handleCreateAccount = () => {
        if (!fullName || !email) {
            alert('Please fill in your full name and email address.');
            return;
        }
         const primaryPhoneNumber = localStorage.getItem('userPhoneNumber');

        const userDetails = {
            primaryPhoneNumber,
            fullName,
            email,
            location,
            secondaryPhone,
        };

        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        alert('Account created successfully!');
        navigate('/account-created');
    };

    const handleNavigateBack = () => {
        navigate(-1);
    };

    return (
        <div className="create-account-container">
            <div className="create-account-header">
                <button onClick={handleNavigateBack} className="back-arrow">‹</button>
            </div>
            <div className="create-account-content">
                <h1 className="create-account-title">Almost Done!</h1>
                <p className="create-account-subtitle">
                    Please enter your details in the following section.
                </p>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Enter Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Enter your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="location-input-container">
                        <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <span className="location-icon"></span>
                    </div>
                    <input
                        type="tel"
                        placeholder="Enter Secondary Phone Number"
                        value={secondaryPhone}
                        onChange={(e) => setSecondaryPhone(e.target.value)}
                    />
                </div>
            </div>
            <div className="create-account-footer">
                <button onClick={handleCreateAccount} className="create-account-btn">Create Account</button>
            </div>
        </div>
    );
};

export default CreateAccountPage;