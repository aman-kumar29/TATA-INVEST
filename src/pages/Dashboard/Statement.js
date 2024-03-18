import React, { useState, useEffect } from 'react';
import { auth, db } from "../../Firebase/config.js";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import './css/statement.css';


const Statement = () => {
    const [user, setUser] = useState(null);
    const [investedAmount, setInvestedAmount] = useState(0);
    const [referralAmount, setReferralAmount] = useState(0);
    const [selectedOption, setSelectedOption] = useState('investments');

    useEffect(() => {
        // const unsubscribe = onAuthStateChanged(auth, (user) => {
        //     if (user) {
        //         const userRef = doc(db, 'users', user.uid);
        //         getDoc(userRef)
        //             .then((doc) => {
        //                 if (doc.exists) {
        //                     setUser(doc.data());
        //                     setInvestedAmount(doc.data().investedAmount);
        //                     setReferralAmount(doc.data().referralIncome);
        //                 } else {
        //                     console.log('No such document!');
        //                 }
        //             })
        //             .catch((error) => {
        //                 console.log('Error getting document:', error);
        //             });
        //     } else {
        //         setUser(null);
        //     }
        // });

        // return () => unsubscribe();
        const user = localStorage.getItem('userId');
        if (user) {
            const userRef = doc(db, 'users', user);
            getDoc(userRef)
                .then((doc) => {
                    if (doc.exists) {
                        setUser(doc.data());
                        setInvestedAmount(doc.data().investedAmount);
                        setReferralAmount(doc.data().referralAmount);
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
    }, []);

    const handleToggle = (option) => {
        setSelectedOption(option);
      };

    return (
      <div className="container mt-5 my-5 statement">
      <h1 className="mx-5">Statement</h1>
      <div className="card shadow profile-card mx-5">
          {user ? (
              <div>
                  <p className='mx-2'>Invested Amount: {investedAmount}</p>
                  <p className='mx-2'>Life Time Earning: {referralAmount}</p>
                  <p className='mx-2'>Referral Income: {referralAmount}</p>
                  <p className='mx-2'>Total Balance Withdrawable: {investedAmount}</p>
              </div>
          ) : (
              <p>Loading user data...</p>
          )}
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
          {selectedOption === 'investments' ? (
              <ul className="mx-3">
                  <li>Transaction 1</li>
                  <li>Transaction 2</li>
                  <li>Transaction 3</li>
              </ul>
          ) : (
              <ul className="mx-3">
                  <li>Transaction A</li>
                  <li>Transaction B</li>
                  <li>Transaction C</li>
              </ul>
          )}
      </div>
  </div>
    );
};

export default Statement;
