import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, TextField, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Step3Form() {
  const [documentFile, setDocumentFile] = useState(null);
  const [inputValues, setInputValues] = useState({
    input1: '',
    input2: '',
  });
  const history = useNavigate();
  const nextStep = () => {
    history("/dashboard");
  };

  const prevStep = () => {
    history("/kyc-step2");
  };

  const handleDocumentUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === 'application/pdf' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      setDocumentFile(file);
    } else {
      alert('Please upload a valid PDF or JPEG/JPG file.');
    }
  };

  const handleInputChange = (event, inputKey) => {
    setInputValues({ ...inputValues, [inputKey]: event.target.value });
  };

  return (
    <div className="step3-form-container">
      <h2>Step 3: Upload Document and Input Data</h2>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Upload Document:
          </Typography>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg"
            onChange={handleDocumentUpload}
          />
          <Typography variant="h6" gutterBottom>
            Input Data:
          </Typography>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Input 1"
              value={inputValues.input1}
              onChange={(event) => handleInputChange(event, 'input1')}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Input 2"
              value={inputValues.input2}
              onChange={(event) => handleInputChange(event, 'input2')}
            />
          </FormControl>
        </CardContent>
      </Card>
      <div className="buttons-container">
        <Button variant="contained" onClick={prevStep}>
          Go back
        </Button>
        <Button variant="contained" color="primary" onClick={nextStep}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default Step3Form;
