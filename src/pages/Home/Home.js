import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/config";
import { containerStyles } from '../../components/Carousel/carousel.module.js';
import { slides } from '../../data.js';
import ImageSlider from '../../components/ImageSlider/ImageSlider.js';
import InvestmentPlans from '../../components/InvestmentPlans/InvestmentPlans.js';
import HappyFamily from '../../components/HappyFamily/HappyFamily.js';
import Footer from '../../components/Footer/Footer.js';

export default function Home() {
  const history = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const checkLoggedIn = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          // Redirect to dashboard if user is logged in
          history("/dashboard");
        }
      });
    };

    checkLoggedIn();
  }, [history]);

  return (
    <>
    <div style ={containerStyles}>
      <ImageSlider slides={slides}/>
    </div>
    <HappyFamily/>
    <InvestmentPlans/>
    <Footer/>
    </>
  );
}
