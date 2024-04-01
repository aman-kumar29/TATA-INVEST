import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css'; // Import CSS for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-logo">
                    <img src="https://firebasestorage.googleapis.com/v0/b/tatainvest-71bd6.appspot.com/o/logo.png?alt=media&token=47531390-01cb-40a6-9ab0-bca7f18cfec0" alt="Logo" className="logo" />
                </div>
                <div className="footer-links">
                    <ul>
                        <li><Link to="/aboutus">Contact Us</Link></li>
                        <li><Link to="/faqs">FAQs</Link></li>
                        <li><Link to="/privacypolicy">Privacy Policy</Link></li>
                        <li><Link to="/tnc">Terms of Services</Link></li>
                    </ul>
                </div>
                <div className="social-links">
                    <ul>
                        <li><a href="/#"><i className="fab fa-facebook"></i></a></li>
                        <li><a href="/#"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="/#"><i className="fab fa-instagram"></i></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;