import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mobileContainerStyles, desktopContainerStyles } from '../../components/Carousel/carousel.module.js';
import { mobileSlides, desktopSlides } from '../../data.js';
import ImageSlider from '../../components/ImageSlider/ImageSlider.js';
import InvestmentPlans from '../../components/InvestmentPlans/InvestmentPlans.jsx';
import HappyFamily from '../../components/HappyFamily/HappyFamily.js';

export default function Home() {
  const history = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [user,setUser] = useState('');
  useEffect(() => {
    const checkLoggedIn = () => {
        setUser(localStorage.getItem('userId'));
        if (user) {
          history("/dashboard");
        }
    };

    checkLoggedIn();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [history,user]);

  return (
    <>
      <div style={isMobile ? mobileContainerStyles : desktopContainerStyles}>
        <ImageSlider slides={isMobile ? mobileSlides : desktopSlides} />
      </div>
      <HappyFamily />
      <InvestmentPlans />
    </>
  );
}
