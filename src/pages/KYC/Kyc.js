import React, { useState } from 'react';

export default function Kyc() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    aadharNumber: '',
    panNumber: '',
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateForm = (data) => {
    return true;
  };

  const submitKycData = async (data) => {
    return new Promise((resolve) => setTimeout(() => resolve({ success: true }), 1500));
  };

  return (
    <div>
      <h1>KYC Process</h1>
      {loading && <p>Loading...</p>}
      {step === 1 && (
        <Step1Form
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
          setLoading={setLoading}
        />
      )}
      {step === 2 && (
        <Step2Form
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <Step3Form
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
          prevStep={prevStep}
          setLoading={setLoading}
          submitKycData={submitKycData}
        />
      )}
      {step === 4 && (
        <ConfirmationStep formData={formData} />
      )}
    </div>
  );
}

// Step 1 Form Component (same as before)
function Step1Form({ formData, handleChange, nextStep }) {
    const [showPrompt, setShowPrompt] = useState(false);
  
    const handleNext = () => {
      // Check if email and PAN card fields are filled
      if (formData.email && formData.panNumber) {
        // Proceed to the next step
        nextStep();
      } else {
        // Show prompt if any of the fields are empty
        setShowPrompt(true);
      }
    };
  
    return (
      <div>
        <h2>Step 1: Personal Information</h2>
        <form>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="panNumber">PAN Number:</label>
          <input
            type="text"
            id="panNumber"
            name="panNumber"
            value={formData.panNumber}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={handleNext}>Next</button>
        </form>
        {showPrompt && (
          <div className="prompt">
            <p>Your KYC is not done. Kindly complete your KYC by clicking on the OK button.</p>
            <button onClick={() => setShowPrompt(false)}>OK</button>
          </div>
        )}
      </div>
    );
  }
  function Step2Form({ nextStep, prevStep }) {
    const documentsRequired = [
      "Aadhaar Card",
      "PAN Card",
      "Address Proof",
      "Identity Proof"
      // Add more required documents as needed
    ];
  
    return (
      <div>
        <h2>Step 2: Documents Required</h2>
        <div className="documents-container">
          {documentsRequired.map((document, index) => (
            <div key={index} className="document-card">
              <h3>{document}</h3>
              {/* You can add additional information about each document if needed */}
            </div>
          ))}
        </div>
        <div className="buttons-container">
          <button onClick={prevStep}>I don't have these documents</button>
          <button onClick={nextStep}>I have these documents. Proceed.</button>
        </div>
      </div>
    );
  }
// Step 2 Form Component
function Step3Form({ formData, handleChange, nextStep, prevStep, setLoading, submitKycData }) {
    const [otpGenerated, setOtpGenerated] = useState(false);
    const [otp, setOtp] = useState('');
    
    const generateOTP = () => {
      // Simulate OTP generation
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setOtp(generatedOtp);
      setOtpGenerated(true);
    };
    
    const handleSubmit = async () => {
      // Implement form validation and error handling here
      if (!validateForm(formData) || !otp) {
        return; // Show validation errors
      }
  
      setLoading(true);
      try {
        // Simulate API call to submit KYC data and verify OTP
        const response = await submitKycData(formData, otp);
        if (response.success) {
          console.log('KYC submitted successfully!');
          // Handle successful submission (e.g., display confirmation message)
          nextStep(); // Move to confirmation step
        } else {
          console.error('KYC submission failed:', response.error);
          // Handle submission error (e.g., display error message)
        }
      } catch (error) {
        console.error('Error submitting KYC data:', error);
        // Handle unexpected errors
      } finally {
        setLoading(false);
      }
    };
  
    const validateForm = (data) => {
      // Implement form validation logic here
      // Check for empty fields, valid formats, etc.
      return true; // Replace with actual validation
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
  
function ConfirmationStep({ formData }) {
  return (
    <div>
      <h2>KYC Confirmation</h2>
      <p>Thank you for completing the KYC process!</p>
      <p>Here's a summary of your submitted information:</p>
      <ul>
        <li>Name: {formData.name}</li>
        <li>Date of Birth: {formData.dob}</li>
        <li>Aadhaar Number: {formData.aadharNumber}</li>
        <li>PAN Number: {formData.panNumber}</li>
      </ul>
      <p>
      </p>
    </div>
  );
}
