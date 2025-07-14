import React, { useEffect, useState } from 'react';
import '../styles/LandingPageStyle.css';

const slides = [
  {
    image: '/assets/1.png',
    title: 'Trygve',
    subtitle: '"Trusted Guardian of Life"',
  },
  {
    image: '/assets/2.png',
    title: '"Your Health, Our Priority"',
    subtitle: '"Trusted doctors and care at your doorstep."',
  },
  {
    image: '/assets/3.png',
    title: '"Seamless Care, Delivered"',
    subtitle: '"Consult, treat, and heal—hassle-free."',
  },
  {
    image: '/assets/4.png',
    title: '"Affordable Healthcare For Everyone"',
    subtitle: '"Quality care for every budget."',
  },
];

const LandingPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasViewedIntro, setHasViewedIntro] = useState(false); // ✅ block re-entry to slide 0

  // ⏱ Auto-advance after 3 seconds on first slide
  useEffect(() => {
    if (currentSlide === 0 && !hasViewedIntro) {
      const timer = setTimeout(() => {
        setCurrentSlide(1);
        setHasViewedIntro(true); // ✅ mark intro as viewed
      }, 3000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [currentSlide, hasViewedIntro]);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleSkip = () => {
    // Go back only if we're not on the second slide after viewing intro
    if (currentSlide > 1 || !hasViewedIntro) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const current = slides[currentSlide];

  return (
  <div className="landing-banner">
    <img src={current.image} alt="Banner" className="landing-img" />
    <div className="overlay" />

    {/* Centered content: title, subtitle, Get Started (only on last slide) */}
    <div className="landing-text">
      <h1 className="heading-text">{current.title}</h1>
      <p className="subheading-text">{current.subtitle}</p>

      {/* ⬇️ DOT NAVIGATION (visible on 2nd, 3rd, 4th slides) */}
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

      {/* ✅ Get Started button only on the last slide */}
      {currentSlide === slides.length - 1 && (
        <button className="get-started-btn">Get Started</button>
      )}
    </div>

    {/* Slide controls (Next + Back) for intermediate slides */}
    {currentSlide < slides.length - 1 && currentSlide !== 0 && (
      <div className="landing-controls-bottom">
        {currentSlide > 1 && (
          <button onClick={handleSkip} className="skip-btn">← Back</button>
        )}
        <button onClick={handleNext} className="next-btn">Next →</button>
      </div>
    )}

    {/* Back button at bottom-left for the LAST slide */}
    {currentSlide === slides.length - 1 && (
      <div className="landing-controls-bottom">
        <button onClick={handleSkip} className="skip-btn">← Back</button>
      </div>
    )}
  </div>
);

};

export default LandingPage;
