import React from 'react';
import './maximizeWealth.css'; // Import the CSS file for styling

export default function MaximizeWealth() {
    return (
        <div className="wealth-container">
            <div className="container inside-container">
                <div className="leftColumn">
                    <h2 className="maximizeWealthText">MAXIMIZE YOUR WEALTH</h2>
                    <div className="line" />
                    <h1 className="industryLeadingText">Grow with industry leading returns</h1>
                    <div className="buttons">
                        <a href="https://play.google.com/store/games?hl=en&gl=US&pli=1" className="appButton">
                            <img
                                src='/assets/playstore.png'
                                alt='playstore'
                            />
                        </a>
                        <a href="https://www.apple.com/in/app-store/" className="appButton">
                            <img
                                src='/assets/appstore.png'
                                alt='appstore'
                            />
                        </a>
                    </div>
                </div>
                <div className="rightColumn">
                    <div className="mobileImageContainer">
                        <a href="#">
                            <img src="/assets/mobile-image-paisa.png" alt="Mobile Investment App" className="mobileImage" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="investment-section">
                <h2 className='perfectPlanText2'>What makes it a great investment?</h2>
                <div className="card-container">
                    <div className="card">
                        <img src="/assets/zero.svg" alt="Card Image" />
                        <h4>Zero joining fee</h4> 
                    </div>
                    <div className="card">
                        <img src="/assets/seamless.svg" alt="Card Image" />
                        <h4>Seamless digital convenience</h4>
                    </div>
                    <div className="card">
                        <img src="/assets/handtrust.svg" alt="Card Image" />
                        <h4>Trusted by millions</h4>
                    </div>
                    <div className="card">
                        <img src="/assets/safe.svg" alt="Card Image" />
                        <h4>Safe, easy and transparent</h4>
                    </div>
                </div>
            </div>
        </div>
    );
}
