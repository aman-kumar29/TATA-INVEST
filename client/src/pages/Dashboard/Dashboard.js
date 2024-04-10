import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/getUser.js";
import ProgressBar from "../../components/ProgressBar/ProgressBar.js";
import "./css/dashboard.css";
import PoweredBy from "../../components/Poweredby/PoweredBy.js";
import InvestorReviews from "../../components/InvestorReviews/InvestorReviews.jsx";
import { investmentPlansSlidesMobile } from "../../data.js";

function DashboardScreen() {
    const [userData, setUser] = useState(null);
    const history = useNavigate();

    useEffect(() => {
        const fetchedUser = localStorage.getItem('userId');
        if (fetchedUser) {
            getUser(fetchedUser)
                .then((userData) => {
                    if (userData) {
                        setUser(userData);
                    } else {
                        console.log('User not found');
                    }
                })
                .catch((error) => {
                    console.log('Error fetching user data:', error);
                });
        } else {
            history('/login');
        }
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = investmentPlansSlidesMobile;
    const slidesmoney = [1000,5000,2000,10000,20000,200000,100000];
    const nextSlide = () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        setCurrentIndex(nextIndex);
    };

    const prevSlide = () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        setCurrentIndex(prevIndex);
    };

    const addMoneyOnClick = () => {
        history("/addmoney");
    }
    const completeKYCOnClick = () => {
        history("/kyc-step1");
    }
    const handleWhatsAppClick = () => {
        // Replace the phone number and message with your desired values
        const phoneNumber = '917976189199';
        const message = 'Hello! I would like to withdraw my earnings. Please help me with the process.';

        // Construct the WhatsApp URL
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.location.href = whatsappUrl;
    };
    const handleReferralClick = () => {
        // Replace the phone number and message with your desired values
        const message = `Get daily 1.2% returns on investments at Tatainvest! 💰 Invest now for hassle-free earnings. Click on this link - https://tatainvest.org/signup?referralCode=${userData.referralCode}`;
        // Construct the WhatsApp URL
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.location.href = whatsappUrl;
    };


    return (
        <div className="container">
            <h1 className="mt-3 text-center">Hi {userData?.name}, <br /> Welcome to the TATA Invest</h1>
            <div className="dashboard-container">
                <h5 style={{ fontWeight: "bold" }}>Invest and Earn</h5>
                <div className="progress-bar-container">
                    <ProgressBar investedAmount={userData?.investedAmount || 0} />
                    <h6>Invest More Upto <strong>₹ 300000</strong></h6>
                </div>
                <div style={{ margin: '0 auto' }}>
                    <button className="add-money-button btn-1" onClick={addMoneyOnClick}>Add Money</button>
                    <button className="add-money-button btn-2" onClick={handleWhatsAppClick}>Withdraw</button>
                </div>
            </div>
            <center className="slides-container leftColumnInvestment">

                <div className="controls">
                    <i class="fa-solid fa-backward" onClick={prevSlide}></i>
                </div>

                <div className="slide">
                    <img src={slides[currentIndex].url} alt="Slide" className="slide-image" onClick={()=>{
                        history(`/addmoney?amount=${slidesmoney[currentIndex]}`);
                    }} />
                </div>
                <div className="controls">
                    <i class="fa-solid fa-forward" onClick={nextSlide}></i>                </div>
            </center>

            <div class="info-box">
                <i class="fas fa-info-circle"></i>
                <div>
                    Earn daily returns by referring friends! Get 0.3% return of the referred friend's investment. Plus, earn 0.2% when they refer someone, and 0.1% from the subsequent referrals. Start investing and referring today to maximize your earnings!
                    <center>
                        <button className="add-money-button btn-2 mt-3" align="left" style={{ margin: "2px" }} onClick={handleReferralClick}>
                            REFER & EARN
                        </button>
                    </center>
                </div>
            </div>
            <div>
                <div className="info-container">
                    <div className="info-card learn-more-card">
                        <h3><i class="fa fa-line-chart" aria-hidden="true"> </i> <br />Complete Your KYC in one minute</h3>
                        {/* <p>and start withdrawing money effortlessly</p> */}
                        <button className="action-button" onClick={completeKYCOnClick}>ACTIVATE NOW</button>
                    </div>
                    <div className="info-card learn-more-card">
                        <h3><i class="fa fa-usd" aria-hidden="true"> </i> <br />Know Your Earnings</h3>
                        <button className="action-button" onClick={() => { history('/statement') }}>LEARN MORE</button>
                    </div>
                </div>
                <PoweredBy />
                <InvestorReviews />
            </div>
        </div>
    );
}

export default DashboardScreen;
