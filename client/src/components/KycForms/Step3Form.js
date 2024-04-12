import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {storage, updateDocumentUrl} from '../../Firebase/config.js';
import { ref, uploadBytes, getDownloadURL  } from 'firebase/storage';
import ToastMessage from '../Toast/Toast.js';

function Step3Form() {
  const history = useNavigate();
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const currentUser = localStorage.getItem('userId');
  const [showToast, setShowToast] = useState(false);

  const prevStep = () => {
    history("/dashboard");
  };
  const handleDocumentUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      setSelectedDocument(file);
    } else {
      alert('Please upload a valid PDF or JPEG/JPG file.');
    }
  };

  
const handleSaveDocument = async () => {
  setLoading(true);
  const storageRef = ref(storage, `documents/${selectedDocument.name}`);
  try {
    await uploadBytes(storageRef, selectedDocument);
    console.log('Document uploaded successfully');
    const downloadURL = await getDownloadURL(storageRef);
    await updateDocumentUrl(currentUser, downloadURL);
    setShowToast(true); 
    setLoading(false); // Upload complete, stop loading process
    setSelectedDocument(null); // Clear the selected document after upload
    setTimeout(() => {
      history("/dashboard"); // Redirect after 5 seconds
    }, 2000); // Redirect to dashboard after upload
    return true; // Return true to indicate successful upload
  } catch (error) {
    console.error('Error uploading document:', error);
    alert('Failed to upload document. Please try again.');
    setLoading(false); // Stop loading process on error
    return false; // Return false to indicate upload failure
  }
};

  return (
    <div className="step3-form-container">
    {showToast && (
        <ToastMessage 
          message="KYC Successful" 
          onClose={() => setShowToast(false)} 
        />
      )}
      <center className='mt-3'><h2>Step 3: Upload Documents</h2></center>
      <Card>
      <CardContent>
        <label htmlFor="document-upload" className="custom-file-upload">
          <input
            id="document-upload"
            type="file"
            accept=".pdf,.jpg,.jpeg"
            onChange={handleDocumentUpload}
          />
          <i className="fa-solid fa-upload"></i> Upload Document
        </label>
        {selectedDocument && (
          <div className="selected-document-container">
            <Typography variant="subtitle1">Selected Document:</Typography>
            {selectedDocument.type === 'application/pdf' ? (
              <Button variant="outlined" color="primary" href={URL.createObjectURL(selectedDocument)} download>
                Download PDF
              </Button>) : (
             <center>
             <img src={URL.createObjectURL(selectedDocument)} alt="Selected Document" height={"200px"} />
             </center>
             )}

          </div>
        )}
      </CardContent>
      </Card>
      <div className="buttons-container">
        <Button color='error' variant="contained" onClick={prevStep}>
         Cancel
        </Button>
        {selectedDocument && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveDocument}
            disabled={loading}
            startIcon={loading ? null : <i className='fa-solid fa-backward'></i>}
          >
            {loading ? <i className='fa-solid fa-spinner fa-spin'></i> : 'Save'}
          </Button>
        )}
        {
          showToast && ( <Button
            variant="contained"
            color="success">
            Redirecting to Dashboard...
            </Button>
          )
        }
        {/* <button onClick={()=>{
          setShowToast(!showToast);
        }}> TOAST </button> */}
      </div>
    </div>
  );
}

export default Step3Form;
