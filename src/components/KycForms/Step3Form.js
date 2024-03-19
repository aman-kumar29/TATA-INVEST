import React, { useState } from 'react';

function Step3Form({ formData, handleChange, nextStep, prevStep, setLoading }) {
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [otp, setOtp] = useState('');

  const generateOTP = () => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOtp);
    setOtpGenerated(true);
  };
  const submitKycData = async (formData, otp) => {
    // Implement KYC submission logic here
    return { success: true }; // Simulated success response
  };

  const handleSubmit = async () => {
    if (!validateForm(formData) || !otp) {
      return;
    }

    setLoading(true);
    try {
      // Simulate API call to submit KYC data and verify OTP
      const response = await submitKycData(formData, otp);
      if (response.success) {
        console.log('KYC submitted successfully!');
        nextStep();
      } else {
        console.error('KYC submission failed:', response.error);
      }
    } catch (error) {
      console.error('Error submitting KYC data:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (data) => {
    return true;
  };

  return (
    <div>
      <h2>Step 3: Aadhar Verification</h2>
      <form>
        <label htmlFor="authType">Aadhar Authentication Type:</label>
        <select
          id="authType"
          name="authType"
          value={formData.authType}
          onChange={handleChange}
          required
        >
          <option value="">Select Authentication Type</option>
          <option value="OTP">OTP</option>
          <option value="Biometric">Biometric</option>
          {/* Add more authentication types as needed */}
        </select>

        <label htmlFor="aadharNumber">Aadhaar Number:</label>
        <input
          type="text"
          id="aadharNumber"
          name="aadharNumber"
          value={formData.aadharNumber}
          onChange={handleChange}
          required
        />

        {formData.authType === 'OTP' && otpGenerated && (
          <>
            <label htmlFor="otp">Enter OTP:</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </>
        )}

        <button type="button" onClick={prevStep}>Previous</button>
        {formData.authType === 'OTP' && !otpGenerated && (
          <button type="button" onClick={generateOTP}>Generate OTP</button>
        )}
        <button type="button" onClick={handleSubmit}>Submit KYC</button>
      </form>
    </div>
  );
}

export default Step3Form;
