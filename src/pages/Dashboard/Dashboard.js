import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, getSingleUser } from "../../Firebase/config"; 
import Cookies from "js-cookie";
import ProgressBar from "../../components/ProgressBar/ProgressBar.js";
import "./css/dashboard.css";

function DashboardScreen() {
    const [userData, setUserData] = useState({});
    const history = useNavigate();

    useEffect(() => {
        const checkLoggedIn = async () => {
          const isLoggedIn = Cookies.get("LoggedIn");
          if (!isLoggedIn) {
            history("/login");
          }
        };
    
        checkLoggedIn();
    }, [history]);

    useEffect(() => {
        const fetchUserData = async () => {
            while (!auth.currentUser) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            try {
                const data = await getSingleUser(localStorage.getItem('userId'));
                // const data = await getSingleUser(auth.currentUser.uid);
                setUserData(data);
            } catch (error) {
                console.error('Error getting user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const addMoneyOnClick = () => {
    }

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <div className="progress-bar-container">
                <ProgressBar investedAmount={userData?.investedAmount} />
            </div>
            <button className="add-money-button" onClick={addMoneyOnClick}>Add Money</button> 
            <div className="info-container">
                <div className="info-card">
                    <h3>Complete Your KYC</h3>
                    <p>Some content about completing KYC</p>
                    <button className="action-button">Complete KYC</button> 
                </div>
                <div className="info-card"> {/* Corrected closing tag */}
                    <h3>Know More</h3>
                    <p>Some content about different plans</p>
                    <button className="action-button">Learn More</button> 
                </div>
            </div>
        </div>
    );
}

export default DashboardScreen;