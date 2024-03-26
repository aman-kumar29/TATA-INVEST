import React from 'react';
import tataCapitalLogo from '../../assets/Tata-capital.png';

export default function PoweredBy() {
  const containerStyle = {
    background: 'linear-gradient(90deg, rgba(99, 96, 193, 1) 0%, rgba(135, 132, 220, 1) 35%, rgba(178, 160, 254, 1) 100%)',
    padding: "6%",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px", // Adjust the gap between the text and the image
  };

  return (
    <div style={containerStyle}>
      <h5 style={{ margin: 0 }}>Powered By</h5> 
      <img src={tataCapitalLogo} alt="Tata Capital Logo" style={{ width: '180px', height: '80px' }} />
    </div>
  );
}
