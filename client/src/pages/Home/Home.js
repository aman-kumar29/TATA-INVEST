import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mobileSlides, desktopSlides } from '../../data.js';
import ImageSlider from '../../components/ImageSlider/ImageSlider.js';
import InvestmentPlans from '../../components/InvestmentPlans/InvestmentPlans.jsx';
import HappyFamily from '../../components/HappyFamily/HappyFamily.js';
import PoweredBy from "../../components/Poweredby/PoweredBy.js";
import NumbersInvestment from "../../components/NumbersInvestment/NumbersInvestment.js";
import GreatInvestment from "../../components/GreatInvestment/GreatInvestment.js";

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
      <InvestmentPlans/>
      <HappyFamily />
      <GreatInvestment/>
      <ImageSlider slides={isMobile ? mobileSlides : desktopSlides} />
      <NumbersInvestment/>
      <PoweredBy/>
    </>
  );
}
