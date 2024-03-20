import React, {useState} from 'react';
import { Card, CardContent, Typography, Button, Grid, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './css/Step1Form.css'; // Import the CSS file

function Step1Form({ formData, handleChange, nextStep, prevStep }) {
  const documentsRequired = [
    { name: "Aadhaar Card", description: "This is your Aadhaar card" },
    { name: "PAN Card", description: "This is your PAN card" },
    { name: "Address Proof", description: "This is your address proof" },
    { name: "Identity Proof", description: "This is your identity proof" },
  ];
  const history = useNavigate();

  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const handleNext = () => {
    if (!isTermsAccepted) {
      alert('Please accept the Terms & Conditions to proceed.');
      return;
    }
    history("/kyc-step2");
  };

  return (
    <div className="step1-form-container"> {/* Main container */}
      <h2>Step 1: Documents Required</h2>
      <Grid container spacing={2} justifyContent="center" className="container-card"> {/* Center-aligned grid */}
        {documentsRequired.map((document, index) => (
          <Grid key={index} item xs={12} md={6} > {/* Responsive layout */}
            <Card className="document-card"> {/* Document card */}
              {/* Image */}
              <CardContent>
                <img src={`/${document.name}.png`} alt={document.name} />
              </CardContent>
              {/* Document Name */}
              <CardContent className="document-card-content">
                <Typography variant="h6">{document.name}</Typography>
              </CardContent>
              {/* Document Description */}
              <CardContent className="document-card-content">
                <Typography variant="body2" color="textSecondary">
                  {document.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div className="terms-container">
        <FormControlLabel
          control={<Checkbox checked={isTermsAccepted} onChange={(e) => setIsTermsAccepted(e.target.checked)} />}
          label={
            <span>
              I understand and agree to the required{" "}
              <a href="/terms-and-conditions">Terms & Conditions</a> to complete this KYC process.
            </span>
          }
        />
      </div>
      <div className="buttons-container"> {/* Buttons container */}
        <Button variant="contained" onClick={prevStep}>
          I don't have these documents
        </Button>
        <Button variant="contained" color="primary" disabled={!isTermsAccepted} onClick={handleNext}>
          I have these documents. Proceed.
        </Button>
      </div>
    </div>
  );
}

export default Step1Form;
