import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/getUser.js";
import ProgressBar from "../../components/ProgressBar/ProgressBar.js";
import "./css/dashboard.css";

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

    const completeKYCOnClick = () => {
        history("/kyc-step1");
    }

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Dashboard</h1>
            <div className="progress-bar-container">
                <ProgressBar investedAmount={userData?.investedAmount || 0} />
            </div>
            <button className="add-money-button" onClick={addMoneyOnClick}>Add Money</button> 
            <div className="info-container">
                <div className="info-card learn-more-card">
                    <h3>Complete Your KYC</h3>
                    <p>Unlock full benefits by completing KYC</p>
                    <button className="action-button" onClick={completeKYCOnClick}>Complete KYC</button> 
                </div>
                <div className="info-card learn-more-card">
                    <h3>Know More</h3>
                    <p>Explore our investment plans</p>
                    <button className="action-button">Learn More</button> 
                </div>
            </div>
        </div>
    );
}

export default DashboardScreen;
                   