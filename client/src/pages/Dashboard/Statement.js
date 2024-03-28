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
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year}, ${hours}:${minutes}`;
    };


    return (
        <div className="mx-2 mt-3 my-5">
           <h1 className="text-center my-3">Account Summary</h1>
           <div className="summary-box">
    <div className="summary-item">
        <p className="item-label">Invested Amount:</p>
        <p className="item-value">₹ {investedAmount}</p>
    </div>
    <div className="summary-item">
        <p className="item-label">Interest Income:</p>
        <p className="item-value">₹ {userData?.interestAmount}</p>
    </div>
    <div className="summary-item">
        <p className="item-label">Referral Income:</p>
        <p className="item-value">₹ {referralAmount}</p>
    </div>
    <div className="summary-item">
        <p className="item-label">Life Time Earning:</p>
        <p className="item-value">₹ {referralAmount + userData?.interestAmount}</p>
    </div>
    <div className="summary-item">
        <p className="item-label">Balance Withdrawable:</p>
        <p className="item-value">₹ {userData?.withdrawableAmount}</p>
    </div>
</div>

            <h1 className="mt-5 text-center my-3">Recent Transactions</h1>
            <div className="d-flex justify-content-center">
                <button className={selectedOption === 'investments' ? 'btn btn-success mx-3' : 'btn btn-outline-success mx-3'} onClick={() => handleToggle('investments')}>
                    Investments
                </button>
                <button className={selectedOption === 'withdrawals' ? 'btn btn-success mx-3' : 'btn btn-outline-success mx-3'} onClick={() => handleToggle('withdrawals')}>
                    Withdrawals
                </button>
            </div>

            <div className="text-center my-3 box">
                <h1 className="mx-3">{selectedOption === 'investments' ? 'Investments' : 'Withdrawals'}</h1>
                {userData ? (
                    selectedOption === 'investments' ? (
                        userData.investmentTransactions && userData.investmentTransactions.length > 0 ? (
                            <table className="table table-responsive my-3">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr. No.</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Transaction ID</th>
                                        <th scope="col">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.investmentTransactions.map((transaction, index) => {
                                        const date = transaction.date.toDate();
                                        const formattedDate = formatDate(date);

                                        return (
                                            <tr key={index} className="profile-card">
                                                <td>{index + 1}.</td>
                                                <td>₹ {transaction.amount}</td>
                                                <td>{transaction.transactionId.substring(0, transaction.transactionId.length / 2) + ' ' + transaction.transactionId.substring(transaction.transactionId.length / 2)}</td>
                                                <td>{formattedDate}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        ) : (
                            <p className="mx-3">No investment transactions available</p>
                        )
                    ) : (
                        selectedOption === 'withdrawals' ? (
                            userData.withdrawalTransactions && userData.withdrawalTransactions.length > 0 ? (
                                <table className="table my-3">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sr. No.</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Transaction ID</th>
                                            <th scope="col">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userData.withdrawalTransactions.map((transaction, index) => {
                                            const date = transaction.date.toDate();
                                            const formattedDate = formatDate(date);

                                            return (
                                                <tr key={index} className="profile-card">
                                                    <td>{index + 1}</td>
                                                    <td>₹ {transaction.amount}</td>
                                                    <td>{transaction.transactionId.substring(0, transaction.transactionId.length / 2) + '-' + transaction.transactionId.substring(transaction.transactionId.length / 2)}</td>
                                               <td>{formattedDate}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
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
