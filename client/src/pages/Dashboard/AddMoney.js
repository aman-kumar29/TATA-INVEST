import React, { useState,useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUser } from "../../utils/getUser.js";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase/config.js';

const AddMoneyPage = () => {
  const [amount, setAmount] = useState('');
  const history = useNavigate();
  const [user, setUser] = useState(null);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSuggestionClick = (value) => {
    setAmount(value);
  };

  const fetchedUser = localStorage.getItem('userId');

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
});

const handleUpdateInfo = async (investedAmount,transactionId) => {
    try {
      const userRef = doc(db, 'users', fetchedUser);
      await updateDoc(userRef, { 
        investedAmount: user.investedAmount + Number(investedAmount),
        investmentTransactions: [...user.investmentTransactions,
          {
            transactionId: transactionId,
            amount: Number(investedAmount),
            date: new Date(),
          }
        ]
       });
      console.log('User info updated successfully!');
      history('/profile');
    } catch (error) {
      console.error('Error updating user name:', error);
    }
  };

  function initiateRazorpayPayment(amount) {
    // Create a new instance of Razorpay
    var options = {
      key: 'rzp_test_vMheAsnIBAvWHf', // Replace with your Razorpay API key
      amount: amount * 100, // Amount in paise (100 paise = 1 rupee)
      currency: 'INR', // Currency code
      name: 'TATA Invest', // Name of your company or website
      description: 'Payment for adding money', // Description of the payment
      image: 'https://firebasestorage.googleapis.com/v0/b/tatainvest-71bd6.appspot.com/o/logo.png?alt=media&token=47531390-01cb-40a6-9ab0-bca7f18cfec0', // URL of your company logo
      handler: function (response) {
        handleUpdateInfo(amount,response.razorpay_payment_id);
        console.log(response);
        history('/dashboard');
        // Handle successful payment
      },
      setTimeout: 300, // Timeout in seconds
    };
  
    // Create the Razorpay payment instance
    var rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      alert(response.error.code);
      // alert(response.error.description);
      // alert(response.error.source);
      // alert(response.error.step);
      // alert(response.error.reason);
      // alert(response.error.metadata.order_id);
      // alert(response.error.metadata.payment_id);
    });
    // Open the Razorpay payment modal
    rzp.open();
  }
  

  const handleProceedToPay = () => {
    initiateRazorpayPayment(amount);
    console.log(`Proceeding to pay ${amount}...`);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Add Money</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Enter Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                </Form.Group>
                <div className="mb-3">
                  <p className="mb-1">Suggestions:</p>
                  <Button variant="outline-primary" className="me-2" onClick={() => handleSuggestionClick('1000')}>₹ 1000</Button>
                  <Button variant="outline-primary" className="me-2" onClick={() => handleSuggestionClick('5000')}>₹ 5000</Button>
                  <Button variant="outline-primary" className="me-2" onClick={() => handleSuggestionClick('10000')}>₹ 10000</Button>
                  {/* Add more suggestion buttons as needed */}
                </div>
                <Button variant="primary" onClick={handleProceedToPay}>Proceed to Pay</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMoneyPage;
