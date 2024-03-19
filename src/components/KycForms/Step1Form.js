import React, { useState } from 'react';

function Step1Form({ formData, handleChange, nextStep }) {
  const [showPrompt, setShowPrompt] = useState(false);

  const handleNext = () => {
    if (formData.email && formData.panNumber) {
      nextStep();
    } else {
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

export default Step1Form;
