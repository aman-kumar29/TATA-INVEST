import React from 'react';
import { Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram, YouTube, Phone, Mail } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer style={{ padding: '70px 0' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between">
          {/* About Us Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>About Us</Typography>
            <Typography variant="body2" color="textSecondary">
              At Tata Invest, we are dedicated to helping you achieve your financial goals. With our expert team and innovative investment strategies, we strive to provide you with the best investment experience possible.
            </Typography>
          </Grid>
          {/* Quick Links Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Quick Links</Typography>
            <ul style={{ listStyleType: 'none', padding: 0, color:"black"}}>
              <li><Link href="/" style={{color:"black"}}>Home</Link></li>
              <li><Link href="/aboutus"  style={{color:"black"}}>About</Link></li>
              <li><Link href="#"  style={{color:"black"}}>Services</Link></li>
              <li><Link href="#"  style={{color:"black"}}>Investment Plans</Link></li>
              <li><Link href="/aboutus"  style={{color:"black"}}>Contact Us</Link></li>
            </ul>
          </Grid>
          {/* Contact Info Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>Contact Info</Typography>
            <Typography variant="body2" color="textSecondary">
              <Phone /> +1 (123) 456-7890<br />
              <Mail /> info@tatainvest.com<br />
              123 Financial Street, New York, NY 10001
            </Typography>
          </Grid>
          {/* Follow Us Section */}
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
        <Divider style={{ margin: '30px 0' }} />
        <Typography variant="body2" color="textSecondary" align="center">
          &copy; {new Date().getFullYear()} Tata Invest. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
