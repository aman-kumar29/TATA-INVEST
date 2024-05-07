import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { storage, updateDocumentUrlsAndBankDetails } from '../../Firebase/config.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ToastMessage from '../Toast/Toast.js';

function Step3Form() {
  const history = useNavigate();
  const [aadharCard, setAadharCard] = useState(null);
  const [panCard, setPanCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const currentUser = localStorage.getItem('userId');
  const [showToast, setShowToast] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIFSCCode] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const prevStep = () => {
    history("/dashboard");
  };

  const handleAadharCardUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      setAadharCard(file);
    } else {
      alert('Please upload a valid PDF or JPEG/JPG file for Aadhar card.');
    }
  };

  const handlePanCardUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      setPanCard(file);
    } else {
      alert('Please upload a valid PDF or JPEG/JPG file for PAN card.');
    }
  };

  const handleSaveDocument = async () => {
    setLoading(true);
    try {
      const uploadTasks = [];
      const uploadStorageRefs = [];
      
      // Upload Aadhar card
      if (aadharCard) {
        const aadharStorageRef = ref(storage, `documents/${aadharCard.name}`);
        uploadTasks.push(uploadBytes(aadharStorageRef, aadharCard));
        uploadStorageRefs.push(aadharStorageRef);
      }
      
      // Upload PAN card
      if (panCard) {
        const panStorageRef = ref(storage, `documents/${panCard.name}`);
        uploadTasks.push(uploadBytes(panStorageRef, panCard));
        uploadStorageRefs.push(panStorageRef);
      }
      
      // Wait for all uploads to complete
      await Promise.all(uploadTasks);
      console.log('Documents uploaded successfully');
      
      // Get download URLs for uploaded documents
      const downloadURLs = await Promise.all(uploadStorageRefs.map(ref => getDownloadURL(ref)));

      // Update document URLs and bank details in the database
      await updateDocumentUrlsAndBankDetails(currentUser, downloadURLs[0], downloadURLs[1], accountNumber, ifscCode, cardholderName);
      
      setShowToast(true);
      setLoading(false);
      setAadharCard(null);
      setPanCard(null);
      
      setTimeout(() => {
        history("/dashboard");
      }, 2000);
    } catch (error) {
      console.error('Error uploading documents:', error);
      alert('Failed to upload documents. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="step3-form-container">
      {showToast && (
        <ToastMessage message="KYC Successful" onClose={() => setShowToast(false)} />
      )}
      <center className="mt-3">
        <h2>Step 3: Upload Documents</h2>
      </center>
      <Card>
        <CardContent>
          <div>
            <Typography variant="h6">Upload Aadhar Card</Typography>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg"
              onChange={handleAadharCardUpload}
            />
            {aadharCard && (
              <img src={URL.createObjectURL(aadharCard)} alt="Aadhar Card" height={"200px"} />
            )}
          </div>
          <div>
            <Typography variant="h6">Upload PAN Card</Typography>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg"
              onChange={handlePanCardUpload}
            />
            {panCard && (
              <img src={URL.createObjectURL(panCard)} alt="PAN Card" height={"200px"} />
            )}
          </div>
          <TextField
            label="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            fullWidth
          />
          <TextField
            label="IFSC Code"
            value={ifscCode}
            onChange={(e) => setIFSCCode(e.target.value)}
            fullWidth
          />
          <TextField
            label="Cardholder Name"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            fullWidth
          />
        </CardContent>
      </Card>
      <div className="buttons-container">
        <Button color="error" variant="contained" onClick={prevStep}>
          Cancel
        </Button>
        {(aadharCard || panCard) && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveDocument}
            disabled={loading}
            startIcon={loading ? null : <i className="fa-solid fa-backward"></i>}
          >
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Save'}
          </Button>
        )}
        {showToast && (
          <Button variant="contained" color="success">
            Redirecting to Dashboard...
          </Button>
        )}
      </div>
    </div>
  );
}

export default Step3Form;
