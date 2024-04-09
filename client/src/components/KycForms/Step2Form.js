import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./css/Step2Form.css";

// Replace with your actual Fast2SMS API key
const senderId = 'FSTSMS'; // Default sender ID for Fast2SMS

function Step2Form() {
  const [authType, setAuthType] = useState('Aadhaar Card'); // Pre-select Aadhaar Card
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const history = useNavigate();
  const handleAuthTypeChange = (event) => {
    setAuthType(event.target.value);
  };

  const nextStep = () => {
    history("/kyc-step3");
  };

  const prevStep = () => {
    history("/kyc-step1");
  };
  const proxyServerUrl = 'http://localhost:8000/api/send-otp';

  const handleGenerateOtp = async () => {
    if (!phoneNumber) {
      alert('Please enter your phone number.');
      return;
    }
    const otp1 = Math.floor(100000 + Math.random() * 900000);
    setOtp(otp1);
    const message = `Verify you Aadhar. OTP for verification : ${otp}`;

    setLoading(true);
    try {
      // Replace with actual API call to send OTP
      const response = await axios.get(`http://localhost:8000/api/send-otp?phoneNumber=${phoneNumber}`);
      console.log('OTP sent successfully:', response);
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
    if (!otp) {
      alert('Please enter the received OTP.');
      return;
    }

    setLoading(true); // Simulate API call for OTP verification
    try {
      // Replace with actual API call to verify OTP
      const response = await simulateVerifyOtp(phoneNumber, otp);
      console.log('OTP verified:', response);
      // Handle successful verification (e.g., move to next step)
      nextStep();
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

  const simulateSendOtp = (phoneNumber) => {
    // Replace with actual API call to send OTP to the phone number
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000)); // Simulate delay
  };

  const simulateVerifyOtp = (phoneNumber, otp) => {
    // Replace with actual API call to verify OTP
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1000)); // Simulate delay
  };

  return (
    <div className="step2-form-container"> {/* Main container */}
      <h2>Step 2: Contact Details</h2>
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
          <TextField
            label="Email (as per Aadhaar if seeded)"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {isOtpSent && (
            <>
              <TextField
                label="OTP"
                type="number"
                fullWidth
                margin="normal"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
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
