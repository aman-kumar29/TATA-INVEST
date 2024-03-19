import React from 'react';

function Step2Form({ formData, handleChange, nextStep, prevStep }) {
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

export default Step2Form;
