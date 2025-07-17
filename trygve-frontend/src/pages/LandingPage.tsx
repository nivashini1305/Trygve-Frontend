import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPageStyle.css';


const slides = [
  {
    image: '/assets/1.png',
    title: 'Trygve',
    subtitle: 'Trusted Guardian of Life',
  },
  {
    image: '/assets/2.png',
    title: 'Your Health, Our Priority',
    subtitle: 'Trusted doctors and care at your doorstep.',
  },
  {
    image: '/assets/3.png',
    title: 'Seamless Care, Delivered',
    subtitle: 'Consult, treat, and heal—hassle-free.',
  },
  {
    image: '/assets/4.png',
    title: 'Affordable Healthcare For Everyone',
    subtitle: 'Quality care for every budget.',
  },
];

const LandingPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasViewedIntro, setHasViewedIntro] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentSlide === 0 && !hasViewedIntro) {
      const timer = setTimeout(() => {
        setCurrentSlide(1);
        setHasViewedIntro(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, hasViewedIntro]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleSkip = () => {
      setCurrentSlide(slides.length - 1);
  };

  const handleGetStarted = () => {
      navigate('/home');  
  };
  const current = slides[currentSlide];



  return (
    
    <div className="landing-banner">
      <img src={current.image} alt="Banner" className="landing-img" />
      <div className="overlay" />

      <div className="landing-text">
        <h1 className="heading-text">{current.title}</h1>
        <p className="subheading-text">{current.subtitle}</p>

        {/* Dot navigation for slide 2, 3, 4 */}
        {currentSlide > 0 && currentSlide < slides.length && (
          <div className="dot-container">
            {[1, 2, 3].map((dotIndex) => (
              <span
                key={dotIndex}
                className={`dot ${currentSlide === dotIndex ? 'active' : ''}`}
                onClick={() => setCurrentSlide(dotIndex)}
              />
            ))}
          </div>
        )}

        {/* Show Get Started on last slide */}
        {currentSlide === slides.length - 1 && (
          <button className="get-started-btn" onClick={handleGetStarted}>Get Started</button>
        )}
      </div>

      {/* Controls for slides 2 & 3 */}
      {currentSlide !== slides.length - 1 && currentSlide !== 0 && (
        <div className="landing-controls-bottom">
          {currentSlide >= 1 && (
            <button onClick={handleSkip} className="skip-btn">Skip</button>
          )}
          <button onClick={handleNext} className="next-btn">Next →</button>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
