import React from 'react';
import { Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram, YouTube } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f8f9fa', padding: '50px 0' }}>
      <Container>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>About Us</Typography>
            <Typography variant="body2" color="textSecondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Quick Links</Typography>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li><Link href="#">Home</Link></li>
              <li><Link href="#">About</Link></li>
              <li><Link href="#">Services</Link></li>
              <li><Link href="#">Investment Plans</Link></li>
              <li><Link href="#">Contact Us</Link></li>
            </ul>
          </Grid>
          {/* Footer Section 3: Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Contact Info</Typography>
            <Typography variant="body2" color="textSecondary">
              123 Investment Street<br />
              New York, NY 10001<br />
              Phone: +1 (123) 456-7890<br />
              Email: info@example.com
            </Typography>
          </Grid>
          {/* Footer Section 4: Social Media Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Follow Us</Typography>
            <div>
              <IconButton><Facebook /></IconButton>
              <IconButton><Twitter /></IconButton>
              <IconButton><LinkedIn /></IconButton>
              <IconButton><Instagram /></IconButton>
              <IconButton><YouTube /></IconButton>
            </div>
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '20px' }}>
          &copy; {new Date().getFullYear()} Investment Website. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
