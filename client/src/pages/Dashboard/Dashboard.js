import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/getUser.js";
import ProgressBar from "../../components/ProgressBar/ProgressBar.js";
import "./css/dashboard.css";
import PoweredBy from "../../components/Poweredby/PoweredBy.js";
import InvestorReviews from "../../components/InvestorReviews/InvestorReviews.jsx";
import { investmentPlansSlidesMobile } from "../../data.js";
import { createWithdrawalApprovalRequest } from "../../Firebase/config.js";
import WithdrawalForm from "../../components/WithdrawalForm/Withdrawalform.js";
import axios from "axios";
import { connectStorageEmulator } from "firebase/storage";

function DashboardScreen() {
    const [userData, setUser] = useState(null);
    const [withdrawalApprovalRequest, setWithdrawalApprovalRequest] = useState(false);
    const history = useNavigate();
    const fetchedUser = localStorage.getItem('userId');
    const [formOpen, setFormOpen] = useState(false);

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

    const handelWithdrawalApprovalRequest = () => {
        if (!userData) {
            // If user data is not available, redirect to login
            history('/login');
            return;
        }
    
        if (!userData.kycDone) {
            // If KYC is not done, show alert message
            alert("Your KYC is not done. Please complete KYC to withdraw money.");
            console.log("withdraw button clicked");
            return;
        }
    
        // Open withdrawal form
        setFormOpen(true);
        console.log("withdraw button clicked");
    };
    

    const handleWithdrawalSubmit = async (amount) => {
        console.log("withdrawal-amount", amount);
        if (!userData.kycDone) {
            alert("Your KYC is not done. Please complete KYC to withdraw money.");
            return;
        } else if (amount < 1000) {
            alert('Minimum withdrawable amount is ₹1000');
            return;
        } else if (amount > userData.withdrawableAmount) {
            alert('Insufficient Withdrawable Amount - Your Withdrawable Amount is ₹' + userData.withdrawableAmount);
            return;
        }

        createWithdrawalApprovalRequest(fetchedUser, userData.name, userData.phone, amount,userData.accountNumber,userData.ifscCode,userData.cardholderName)
        .then((response) => {
             setWithdrawalApprovalRequest(true);
             fetch('/send-email-withdrawal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userData.email,
                    withdrawalAmount: amount,
                    accountNumber: userData.accountNumber,
                    ifscCode: userData.ifscCode,
                    name: userData.name,
                }),
            }).then((res)=>{
                console.log("email-sent succesfully");
            })
            .catch((error)=>{
                console.log("failed sending email",error);
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    };

    const addMoneyOnClick = () => {
        history("/addmoney");
    };

    const completeKYCOnClick = () => {
        history("/kyc-step1");
    };

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
            <WithdrawalForm open={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleWithdrawalSubmit} />
            <h1 className="mt-3 text-center">Hi {userData?.name}, <br /> Welcome to the TATA Invest</h1>
            <div className="dashboard-container">
                <h5 style={{ fontWeight: "bold" }}>Invest and Earn</h5>
                <div className="progress-bar-container">
                    <ProgressBar investedAmount={userData?.investedAmount + userData?.withdrawableAmount} />
                    <h6>Invest More Upto <strong>₹ 300000</strong></h6>
                </div>
                <center className="buttons-container mt-5">
                    <button className="add-money-button btn-1" onClick={addMoneyOnClick}>Add Money</button>
                    <button
                        className="add-money-button btn-2"
                        onClick={handelWithdrawalApprovalRequest}
                    >
                        Withdraw
                    </button>
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
                    <i class="fa-solid fa-forward" onClick={nextSlide}></i>
                </div>
            </center>
            <center>
                <div className="card-referral" >
                    <img src="assets/referralImg.jpg" className="card-img-top" alt="Referral Image" />
                    <div className="card-body">
                        <h5 className="card-title">Referral Scheme !</h5>
                        <p className="card-text"> Earn daily returns by referring friends! Get 0.3% return of the referred friend's investment. Plus, earn 0.2% when they refer someone, and 0.1% from the subsequent referrals. Start investing and referring today to maximize your earnings!
                        </p>
                        <button className="add-money-button btn-2 mt-3" align="left" style={{ margin: "2px" }} onClick={handleReferralClick}>
                            REFER & EARN
                        </button>
                    </div>
                </div>
            </center>
            <div>
                <div className="info-container">
                    <div className="info-card learn-more-card">
                        <h3><i class="fa fa-line-chart" aria-hidden="true"> </i> <br />Complete Your KYC in one minute</h3>
                        {userData?.kycDone ?
                            <button className="btn btn-success shadow" disabled='true'>KYC DONE</button> :
                            <button className="action-button shadow" onClick={completeKYCOnClick}>ACTIVATE NOW</button>}
                    </div>
                    <div className="info-card learn-more-card">
                        <h3><i class="fa fa-usd" aria-hidden="true"> </i> <br />Know Your Earnings</h3>
                        <button className="action-button shadow" onClick={() => { history('/statement') }}>LEARN MORE</button>
                    </div>
                </div>
                <PoweredBy />
                <InvestorReviews />
            </div>
        </div>
    );
}

export default DashboardScreen;
