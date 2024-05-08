import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Row, Col } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUser } from "../../utils/getUser.js";
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage, createPaymentApprovalRequest } from '../../Firebase/config.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Container, Typography } from '@mui/material'
// import { create } from '@mui/material/styles/createTransitions.js';
// import { createPaymentApprovalRequest } from '../../Firebase/config.js';


const AddMoneyPage = () => {
  const location = useLocation();
  const [amount, setAmount] = useState('');
  const history = useNavigate();
  const [user, setUser] = useState(null);
  const [paymentApprovalRequest, setPaymentApprovalRequest] = useState(false);
  const query = new URLSearchParams(location.search);
  const [utrNumber, setUtrNumber] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };
  const handleScreenshotChange = (event) => {
    setScreenshot(event.target.files[0]);
  };
  const handleSuggestionClick = (value) => {
    setAmount(value);
  };
  const validateFields = () => {
    return !!amount && !!utrNumber && screenshot;
  };

  const fetchedUser = localStorage.getItem('userId');

  useEffect(() => {
    const amount1 = query.get("amount");
    if (amount1) {
      setAmount(amount1);
    }
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

  const handleUpdateInfo = async (investedAmount, transactionId) => {
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
        handleUpdateInfo(amount, response.razorpay_payment_id);
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
    });
    // Open the Razorpay payment modal
    rzp.open();
  }

  // const handleProceedToPay = () => {
  //   initiateRazorpayPayment(amount);
  //   console.log(`Proceeding to pay ${amount}...`);
  // };

  const uploadScreenshot = async (screenshotFile) => {
    try {
      const screenshotFileStorageRef = ref(storage, `paymentRequestProof/${screenshotFile.name}`);
      await uploadBytes(screenshotFileStorageRef, screenshotFile);
      const downloadURL = getDownloadURL(screenshotFileStorageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading screenshot:', error);
      return null;
    }
  };

  const handelPaymentApprovalRequest = async () => {
    if (validateFields()) {
      setLoading(true);
      try {
        const screenshotUrl = await uploadScreenshot(screenshot);
        await createPaymentApprovalRequest(fetchedUser, user.name, user.phone, amount, utrNumber, screenshotUrl);
        setPaymentApprovalRequest(true);
      } catch (error) {
        console.error('Error creating payment approval request:', error);
      }
      setLoading(false);
    } else {
      alert("Please fill all fields !");
    }

  }
  const handleUtrChange = (event) => {
    setUtrNumber(event.target.value);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center each-row">
        <Col md={6} lg={4}>
          <Card className="bg-light shadow-sm rounded-lg p-4">
            <Typography variant="h5" className="text-center mb-4">
              Add Money
            </Typography>
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
              <Form.Group className="mb-3">
                <Form.Label>Enter UTR Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter UTR number"
                  value={utrNumber}
                  onChange={handleUtrChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Upload Screenshot</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshotChange}
                />
                {screenshot && (
                  <div className='mt-3'>
                    <img src={URL.createObjectURL(screenshot)} alt="Proof For Payment" height={"200px"} />
                  </div>
                )}
              </Form.Group>
              <div className="mb-3">
                <p className="mb-1">Suggestions:</p>
                <Button variant="outline-primary" className="me-2" onClick={() => handleSuggestionClick('1000')}>₹ 1000</Button>
                <Button variant="outline-primary" className="me-2" onClick={() => handleSuggestionClick('5000')}>₹ 5000</Button>
                <Button variant="outline-primary" className="me-2" onClick={() => handleSuggestionClick('10000')}>₹ 10000</Button>
                {/* Add more suggestion buttons as needed */}
              </div>
              <div style={{ margin: '5px' }}>
                Use <strong>UPI - mahala.anand@ybl</strong> if you are facing any challenges.
              </div>
              {/* <a href={`upi://pay?pa=mahala.anand@ybl&pn=Tata Invest&cu=INR&am=${amount}`}>
                <Button
                  variant="primary"
                  className="w-100 mt-4 mb-2"
                >
                  Proceed to Pay
                </Button></a> */}

              {
                !paymentApprovalRequest ?
                  <Button className='mt-2' onClick={handelPaymentApprovalRequest}>
                    {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Request Payment Approval'}

                  </Button>
                  : <div className='mt-2'><div style={{ fontWeight: "bold", color: "green" }}>Payment Approval Request Sent Successfully !</div>
                    Please wait your requestd amount will be updated soon,<br /> Don't spam by clicking continuously...</div>
              }
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddMoneyPage;
