import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUpPage.css';


const SignUpPage: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();

    const handleSendCode = () => {
        if(phoneNumber.trim().length){
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            localStorage.setItem('userPhoneNumber', phoneNumber);
            localStorage.setItem('generatedOtp', otp);
            console.log(`Code sent to +91 ${phoneNumber}`);
            navigate('/verify-otp');
        }else{
            alert('Please enter the valid 10-digit phone number.')
        }
    };

    const handleNavigateBack = () =>
    {
         navigate('/welcome'); // Go back to the welcome page
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
                        <img src ="/assets/india flag.jpg" alt="IN" className="flag-icon"/>
                        <span>+91</span>
                    </div>
                    <input
                    type="tel"
                    className="phone-input"
                    placeholder="1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    maxLength={10}
                    />
                </div>
            </div>
            <div className="signup-footer">
                <button className="send-code-btn" onClick={handleSendCode}> Send Code</button>

                <p className="login-prompt">
                    Already have an account? <span onClick={() => navigate('/login')} className="login-link">Log in</span>
                </p>
                </div>
            </div>
        </div>
    );
};
    export default SignUpPage;
