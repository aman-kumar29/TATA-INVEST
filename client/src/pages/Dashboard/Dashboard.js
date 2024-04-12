import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/getUser.js";
import ProgressBar from "../../components/ProgressBar/ProgressBar.js";
import "./css/dashboard.css";
import PoweredBy from "../../components/Poweredby/PoweredBy.js";
import InvestorReviews from "../../components/InvestorReviews/InvestorReviews.jsx";
import { investmentPlansSlidesMobile } from "../../data.js";
import { createWithdrawalApprovalRequest } from "../../Firebase/config.js";

function DashboardScreen() {
    const [userData, setUser] = useState(null);
    const [withdrawalApprovalRequest, setWithdrawalApprovalRequest] = useState(false);
    const history = useNavigate();
    const fetchedUser = localStorage.getItem('userId');

    useEffect(() => {
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
    }, [fetchedUser, history]);

    const handelWithdrawalApprovalRequest = async () => {
        createWithdrawalApprovalRequest(fetchedUser, userData.name, userData.phone, userData.withdrawableAmount)
            .then((response) => {
                setWithdrawalApprovalRequest(true);
            });
    }

    const addMoneyOnClick = () => {
        history("/addmoney");
    }

    const completeKYCOnClick = () => {
        history("/kyc-step1");
    }

    const handleReferralClick = () => {
        const message = `Get daily 1.2% returns on investments at Tatainvest! 💰 Invest now for hassle-free earnings. Click on this link - https://tatainvest.org/signup?referralCode=${userData.referralCode}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.location.href = whatsappUrl;
    };

    const nextSlide = () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        setCurrentIndex(nextIndex);
    };

    const prevSlide = () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        setCurrentIndex(prevIndex);
    };

    const slides = investmentPlansSlidesMobile;
    const slidesmoney = [1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000];
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className="container">
            <h1 className="mt-3 text-center">Hi {userData?.name}, <br /> Welcome to the TATA Invest</h1>
            <div className="dashboard-container">
                <h5 style={{ fontWeight: "bold" }}>Invest and Earn</h5>
                <div className="progress-bar-container">
                    <ProgressBar investedAmount={userData?.investedAmount || 0} />
                    <h6>Invest More Upto <strong>₹ 300000</strong></h6>
                </div>
                <center className="buttons-container">
                    <button className="add-money-button btn-1" onClick={addMoneyOnClick}>Add Money</button>
                    {
                !withdrawalApprovalRequest ?
              (<button className="add-money-button btn-2" onClick={handelWithdrawalApprovalRequest}>Withdraw</button>)
              :(<p>Withdrawal Request Sent Successfully !</p>)
              }
                </center>
            </div>
            <center className="slides-container leftColumnInvestment">

                <div className="controls">
                    <i class="fa-solid fa-backward" onClick={prevSlide}></i>
                </div>

                <div className="slide slide-img">
                    <img src={slides[currentIndex].url} alt="Slide" className="slide-image" onClick={() => {
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
