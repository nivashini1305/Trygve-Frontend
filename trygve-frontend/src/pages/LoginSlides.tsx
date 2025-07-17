import React, { useState } from 'react';
import '../styles/LoginPageStyle.css';
const loginSlides = [
    {
        logo :'/assets/TrygveLogo.png',
        welcome: 'Welcome to ',
        title: 'trygve',
        subtitle: 'Your trusted partner for personalized healthcare, right at your dooorstep.',
        showButtons: true,
    },
];
const LoginSlides: React.FC = () => {
    const [current] = useState(0);

    const slide = loginSlides[current];

    return (
        <div className="login-banner">
            <div className="login-content">
                <div className="login-logo-bg" />
                {slide.welcome && <h2 className="login-welcome">{slide.welcome}</h2>}
                <h1 className="login-title">{slide.title}</h1>
                <p className="login-subtitle">{slide.subtitle}</p>
                {slide.showButtons && (
                    <div className="login-buttons">
                        <button className="get-started-btn">Sign up</button>
                        <button className="login-btn">Login</button>
                    </div>
                )}
                
            </div>
        </div>
    );
};
export default LoginSlides;