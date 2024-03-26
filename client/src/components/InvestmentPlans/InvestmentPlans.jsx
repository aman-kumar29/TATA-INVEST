import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { investmentPlansSlidesDesktop, investmentPlansSlidesMobile } from "../../data.js";

const slideStyles = {
  width: "100%",
  height: "80vh",
  backgroundSize: "cover",
  backgroundPosition: "top",
  position: "relative", // Add position relative for button positioning
};

const rightArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  right: "16px",
  fontSize: "40px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
  transition: "opacity 0.3s ease",
};

const leftArrowStyles = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  left: "16px",
  fontSize: "40px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
  transition: "opacity 0.3s ease",
};

const sliderStyles = {
  position: "relative",
  height: "100%",
  overflow: "hidden",
};

const dotsContainerStyles = {
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
  marginBottom: "0",
};

const dotStyle = {
  margin: "0 5px",
  cursor: "pointer",
  fontSize: "20px",
  color: "#ccc",
  transition: "transform 0.3s ease",
};

const activeDotStyle = {
  ...dotStyle,
  transform: "scale(1.2)",
  color: "#000",
};

const buttonStyles = {
  position: "absolute",
  bottom: "8%",
  right: "30%",
  backgroundColor: "#fff",
  color: "rgba(145, 92, 220, 1)",
  fontWeight:'bold',
  fontSize:'22px',
  padding: "15px 30px",
  borderRadius: "5px",
  cursor: "pointer",
};

const InvestmentPlans = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const history = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const slides = isMobile ? investmentPlansSlidesMobile : investmentPlansSlidesDesktop;

  useEffect(() => {
    const intervalId = setInterval(() => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [currentIndex, slides]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const handleInvestClick = () => {
    history('/login');
  };

  const slideStylesWidthBackground = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  return (
    <div style={sliderStyles}>
      <div>
        <div onClick={goToPrevious} style={leftArrowStyles}>
          ❰
        </div>
        <div onClick={goToNext} style={rightArrowStyles}>
          ❱
        </div>
      </div>
      <div style={slideStylesWidthBackground} onClick={handleInvestClick}>
        {!isMobile && (
          <button style={buttonStyles}>Invest Now</button>
        )}
      </div>
      <div style={dotsContainerStyles}>
        {slides.map((slide, slideIndex) => (
          <div
            style={slideIndex === currentIndex ? activeDotStyle : dotStyle}
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          >
            ●
          </div>
        ))}
      </div>
      {isMobile && (
        <button style={{ ...buttonStyles,padding:"10px 30px", bottom: "7%", left: "50%", transform: "translateX(-50%)", width:"fit-content",}}>Invest</button>
      )}
    </div>
  );
};

export default InvestmentPlans;
