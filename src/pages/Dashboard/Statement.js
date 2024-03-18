import React, { useState, useEffect } from 'react';
import { auth, db } from "../../Firebase/config.js";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";



const Statement = () => {
    const [user, setUser] = useState(null);
    const [investedAmount, setInvestedAmount] = useState(0);
    const [referralAmount, setReferralAmount] = useState(0);
    const [selectedOption, setSelectedOption] = useState('investments');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                getDoc(userRef)
                    .then((doc) => {
                        if (doc.exists) {
                            setUser(doc.data());
                            setInvestedAmount(doc.data().investedAmount);
                            setReferralAmount(doc.data().referralIncome);
                        } else {
                            console.log('No such document!');
                        }
                    })
                    .catch((error) => {
                        console.log('Error getting document:', error);
                    });
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleToggle = (option) => {
        setSelectedOption(option);
      };

    return (
        <>
            <h1 className='mx-5'>Statement</h1>
            {user ? (
                <div>
                    <p className='mx-2'>  InvestedAmount: {investedAmount}</p>
                    <p className='mx-2'>  Life Time Earning: {referralAmount}</p>
                    <p className='mx-2'>  Referral Income: {referralAmount}</p>
                    <p className='mx-2'>  Total Balance Withdrawable: {investedAmount}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}

            <h1>Transaction Page</h1>
      <div>
        <button className= {selectedOption==='investments'?'btn btn-success mx-3':'btn btn-primary mx-3'} onClick={() => handleToggle('investments')}>Investments</button>
        <button className= {selectedOption==='withdrawals'?'btn btn-success':'btn btn-primary'} onClick={() => handleToggle('withdrawals')}>Withdrawals</button>
      </div>
      <div>
        <h2>{selectedOption === 'investments' ? 'Investments' : 'Withdrawals'}</h2>
        {selectedOption === 'investments' ? (
          <ul>
            {/* Render list of investment transactions */}
            <li>Transaction 1</li>
            <li>Transaction 2</li>
            <li>Transaction 3</li>
          </ul>
        ) : (
          <ul>
            {/* Render list of withdrawal transactions */}
            <li>Transaction A</li>
            <li>Transaction B</li>
            <li>Transaction C</li>
          </ul>
        )}

        </div>



        </>
    );
};

export default Statement;
