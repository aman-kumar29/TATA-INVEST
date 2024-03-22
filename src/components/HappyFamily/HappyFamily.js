import { Button, Typography } from '@mui/material';
import React from 'react';
import './happyFamily.css'; // Import CSS file for component styling
import { Link } from 'react-router-dom';

export default function HappyFamily() {
  return (
    <div className="happy-family-container">
      <div className="happy-family-card">
        <div className="happy-family-content">
          <div className="happy-family-image">
            <img src="/assets/happy_family1.jpg" alt="happy-family1" />
          </div>
          <div className="happy-family-text">
            <Typography variant="h5" gutterBottom className="happy-family-title">
              Easy Investment Plans
            </Typography>
            <Typography variant="subtitle1" gutterBottom className="happy-family-subtitle">
              Enjoy Monthly Returns
            </Typography>
            <Typography variant="body2" color="primary" gutterBottom className="happy-family-paragraph">
              You are eligible for pre-approved offers. Apply now!
            </Typography>
            <Button variant="contained" size="large" color="primary">
              Invest Now
            </Button>
            <div style={{ fontWeight: 600 }}>
              Already Invested?{' '}
              <Link to="/track-application">Track Your Application Today</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
