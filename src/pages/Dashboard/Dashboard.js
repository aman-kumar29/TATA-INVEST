import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../../utils/getUser.js";
import ProgressBar from "../../components/ProgressBar/ProgressBar.js";
import "./css/dashboard.css";

function DashboardScreen() {
    const [userData, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
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
                    setLoading(false);
                })
                .catch((error) => {
                    console.log('Error fetching user data:', error);
                    setLoading(false);
                });
        } else {
            history('/login');
        }
    }, []);

    const addMoneyOnClick = () => {
        history("/addmoney");
    }

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <div className="progress-bar-container">
                <ProgressBar investedAmount={userData?.investedAmount || 0} />
            </div>
            <button className="add-money-button" onClick={addMoneyOnClick}>Add Money</button> 
            <div className="info-container">
                <div className="info-card">
                    <h3>Complete Your KYC</h3>
                    <p>Some content about completing KYC</p>
                    <Link to="/kyc-step1"> Complete KYC </Link> 
                </div>
                <div className="info-card">
                    <h3>Know More</h3>
                    <p>Some content about different plans</p>
                    <button className="action-button">Learn More</button> 
                </div>
            </div>
        </div>
    );
}

export default DashboardScreen;
