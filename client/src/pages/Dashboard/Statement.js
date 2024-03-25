import React, { useState, useEffect } from 'react';
import { db } from "../../Firebase/config.js";
import { getDoc, doc } from "firebase/firestore";
import './css/statement.css';

const Statement = () => {
    const [userData, setUser] = useState(null);
    const [investedAmount, setInvestedAmount] = useState(0);
    const [referralAmount, setReferralAmount] = useState(0);
    const [selectedOption, setSelectedOption] = useState('investments');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    throw new Error('User ID not found');
                }

                const userRef = doc(db, 'users', userId);
                const userDoc = await getDoc(userRef);

                if (!userDoc.exists()) {
                    throw new Error('User document not found');
                }

                const userData = userDoc.data();
                setUser(userData);
                setInvestedAmount(userData.investedAmount);
                setReferralAmount(userData.referralAmount);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUser(null);
            }
        };

        fetchUserData();
    }, []);


    const handleToggle = (option) => {
        setSelectedOption(option);
    };


    return (
        <div className="container mt-5 my-5">
            <h5 className="mt-2">Account Summary</h5>
            <div className="account-details shadow profile-card mx-5">
                <div className="summary-items">
                    <div className="summary-item">
                        <p>Invested Amount:</p><p> ₹ {investedAmount}</p>
                    </div>
                    <div className="summary-item">
                        <p>Interest Income:</p><p> ₹ {userData?.interestAmount}</p>
                    </div>
                    <div className="summary-item">
                        <p>Referral Income: </p><p>₹ {referralAmount}</p>
                    </div>
                    <div className="summary-item">
                        <p>Life Time Earning: </p><p>₹ {referralAmount + userData?.interestAmount}</p>
                    </div>
                    <div className="summary-item">
                        <p>Total Balance Withdrawable: </p><p>₹ {userData?.withdrawableAmount}</p>
                    </div>
                </div>
            </div>

            <h1 className="mx-5 mt-5">Transaction Page</h1>
            <div className="d-flex justify-content-center">
                <button className={selectedOption === 'investments' ? 'btn btn-success mx-3' : 'btn btn-primary mx-3'} onClick={() => handleToggle('investments')}>
                    Investments
                </button>
                <button className={selectedOption === 'withdrawals' ? 'btn btn-success mx-3' : 'btn btn-primary mx-3'} onClick={() => handleToggle('withdrawals')}>
                    Withdrawals
                </button>
            </div>

            <div className="card shadow profile-card mx-5 my-3">
                <h2 className="mx-3">{selectedOption === 'investments' ? 'Investments' : 'Withdrawals'}</h2>
                {userData ? (
                    selectedOption === 'investments' ? (
                        userData.investmentTransactions && userData.investmentTransactions.length > 0 ? (

                            <ol className="list-group list-group-numbered mx-3 my-3">
                                {userData.investmentTransactions.map((transaction, index) => {
                                    const date = transaction.date.toDate();
                                    const day = date.getDate().toString().padStart(2, '0');
                                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                    const year = date.getFullYear().toString().slice(-2);
                                    const hours = date.getHours().toString().padStart(2, '0');
                                    const minutes = date.getMinutes().toString().padStart(2, '0');
                                    const formattedDate = `${day}/${month}/${year}, ${hours}:${minutes}`;

                                    return (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-start list-design">
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">Investment Amount: ₹ {transaction.amount}</div>
                                                Transaction ID - {transaction.transactionId}
                                            </div>
                                            <span className="badge bg-primary rounded-pill">Date: {formattedDate}</span>
                                        </li>
                                    );
                                })}
                            </ol>

                        ) : (
                            <p className="mx-3">No investment transactions available</p>
                        )
                    ) : (
                        selectedOption === 'withdrawals' ? (
                            userData.withdrawalTransactions && userData.withdrawalTransactions.length > 0 ? (
                                <ol className="list-group list-group-numbered mx-3 my-3">
                                    {userData.withdrawalTransactions.map((transaction, index) => {
                                        const date = transaction.date.toDate();
                                        const day = date.getDate().toString().padStart(2, '0');
                                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                        const year = date.getFullYear().toString().slice(-2);
                                        const hours = date.getHours().toString().padStart(2, '0');
                                        const minutes = date.getMinutes().toString().padStart(2, '0');
                                        const formattedDate = `${day}/${month}/${year}, ${hours}:${minutes}`;

                                        return (
                                            <li key={index} className="list-group-item d-flex justify-content-between align-items-start list-design">
                                                <div className="ms-2 me-auto">
                                                    <div className="fw-bold">Withdrawal Amount: {transaction.amount}</div>
                                                    Transaction ID - {transaction.transactionId}
                                                </div>
                                                <span className="badge bg-primary rounded-pill">Date: {formattedDate}</span>
                                            </li>
                                        );
                                    })}
                                </ol>

                            ) : (
                                <p className="mx-3">No withdrawal transactions available</p>
                            )
                        ) : null
                    )
                ) : (
                    <p className="mx-3">Loading user data...</p>
                )}
            </div>
        </div>
    );
};

export default Statement;
