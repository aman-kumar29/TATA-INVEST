import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/getUser.js";
import ProgressBar from "../../components/ProgressBar/ProgressBar.js";
import "./css/dashboard.css";
import PoweredBy from "../../components/Poweredby/PoweredBy.js";
import InvestorReviews from "../../components/InvestorReviews/InvestorReviews.jsx";

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

    const addMoneyOnClick = () => {
        history("/addmoney");
    }
    // const withdrawMoneyOnClick = () => {
    //     history("/withdrawmoney");
    // }

    const completeKYCOnClick = () => {
        history("/kyc-step1");
    }
    const handleWhatsAppClick = () => {
        // Replace the phone number and message with your desired values
        const phoneNumber = '919057725694';
        const message = 'Hello! I would like to withdraw my earnings. Please help me with the process.';

        // Construct the WhatsApp URL
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.location.href = whatsappUrl;
    };


    return (
        <div className="container">
            <h1 className="mt-3 text-center">Hi {userData?.name}, <br /> Welcome to the TATA Invest</h1>
            <div className="dashboard-container">
                <h5 style={{ fontWeight: "bold" }}>Invest and Earn</h5>
                <div className="progress-bar-container">
                    <ProgressBar investedAmount={userData?.investedAmount || 0} />
                    <h6>Invest More Upto <strong>₹ 100000</strong></h6>
                </div>
                <div style={{ margin: '0 auto' }}>
                    <button className="add-money-button btn-1" onClick={addMoneyOnClick}>Add Money</button>
                    <button className="add-money-button btn-2" onClick={handleWhatsAppClick}>Withdraw</button>
                </div>
            </div>
            <div class="info-box">
                <i class="fas fa-info-circle"></i>
                <div>
                    Earn daily returns by referring friends! Get 0.3% return of the referred friend's investment. Plus, earn 0.2% when they refer someone, and 0.1% from the subsequent referrals. Start investing and referring today to maximize your earnings!
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
                        <button className="action-button">LEARN MORE</button>
                    </div>
                </div>
                <PoweredBy />
                <InvestorReviews />
            </div>
        </div>
    );
}

export default DashboardScreen;
