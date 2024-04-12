import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./css/Step2Form.css";
import ToastMessage from '../Toast/Toast.js';

function Step2Form() {
  const [authType, setAuthType] = useState('Aadhaar Card'); // Pre-select Aadhaar Card
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const history = useNavigate();
  const handleAuthTypeChange = (event) => {
    setAuthType(event.target.value);
  };
  useEffect(() => {
    generateOTP();
}, []);
  const nextStep = () => {
    history("/kyc-step3");
  };

  const prevStep = () => {
    history("/dashboard");
  };
  const generateOTP = () => {
    // Generate random 6-digit OTP
    const randomOTP = Math.floor(100000 + Math.random() * 900000);
    setOtp1(randomOTP.toString());
};
  const handleGenerateOtp = async () => {
    if (!phoneNumber || !aadhaarNumber) {
      alert('Please enter your phone number and Aadhaar number.');
      return;
    }
  
    if (phoneNumber.length !== 10) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }
  
    if (aadhaarNumber.length !== 12) {
      alert('Please enter a valid 12-digit Aadhaar number.');
      return;
    }
    setLoading(true);
    fetch('')
    try {
      // Replace with actual API call to send OTP
      // generateOTP();
      const number = phoneNumber+otp1;
      // console.log('OTP1:', otp1, 'OTP2:', otp2);
      const response = await axios.get(`/api/sendotp/${number}`);
      setToastMessage('OTP sent successfully');
      setShowToast(true);
      // console.log('Response Data: ', response.data);
      setIsOtpSent(true);
      setOtpTimer(60); // Start 60-second timer for resend OTP
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp2) {
      alert('Please enter the received OTP.');
      return;
    }

    setLoading(true); // Simulate API call for OTP verification
    try {
      // console.log('OTP1:', otp1, 'OTP2:', otp2);
      if (otp2 !== otp1) {
        alert('Incorrect OTP. Please try again.');
        setOtp2('');
        return;
      }else{
        setShowToast(true);
        setToastMessage('OTP verified successfully');
        setTimeout(() => {
          nextStep();
        }, 3000);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      if (otpTimer > 0) {
        setOtpTimer(otpTimer - 1);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [otpTimer]);

  return (
    <div className="step2-form-container"> {/* Main container */}
      <h2>Step 2: Contact Details</h2>
      {showToast && (
        <ToastMessage 
          message={toastMessage}
          onClose={() => setShowToast(false)} 
        />
      )}
      <Card className="contact-card">
        <CardContent className="card-content">
          <FormControl fullWidth>
            <InputLabel id="auth-type-label" sx={{ position: 'absolute', top: -5, left: 10, backgroundColor: '#f5f5f5', padding: '5px' }}>
              Authentication Type
            </InputLabel>
            <Select
              labelId="auth-type-label"
              id="auth-type"
              value={authType}
              onChange={handleAuthTypeChange}
            >
              <MenuItem value="Aadhaar Card">Aadhaar Card</MenuItem>
              <MenuItem value="VID">VID</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Aadhaar Number/VID"
            type="number"
            fullWidth
            margin="normal" // Add margin for spacing
            value={aadhaarNumber}
            onChange={(event) => setAadhaarNumber(event.target.value)}
            required
          />
          <TextField
            label="Mobile Number (as per Aadhaar)"
            type="number"
            fullWidth
            margin="normal"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            required
          />
          {isOtpSent && (
            <>
              <TextField
                label="OTP"
                type="number"
                fullWidth
                margin="normal"
                value={otp2}
                onChange={(event) => setOtp2(event.target.value)}
                required
              />
              <Button variant="contained" color="primary" onClick={handleVerifyOtp} disabled={loading}>
                {loading ? 'Verifying OTP...' : 'Verify OTP'}
              </Button>
              {otpTimer > 0 && (
                <Typography variant="body2" color="textSecondary">
                  OTP resent in {otpTimer} seconds
                </Typography>
              )}
              {otpTimer === 0 && (
                <a href="/#" onClick={handleGenerateOtp} className="resend-otp">
                  Resend OTP
                </a>
              )}
            </>
          )}
          {!isOtpSent && (
            <Button variant="contained" color="primary" onClick={handleGenerateOtp} disabled={loading}>
              {loading ? 'Generating OTP...' : 'Generate OTP'}
            </Button>
          )}
        </CardContent>
      </Card>
      <div className="buttons-container">
      <Button color='error' variant='contained' onClick={prevStep}>
          Cancel KYC
        </Button>
      </div>
    </div>
  );
}

export default Step2Form;
