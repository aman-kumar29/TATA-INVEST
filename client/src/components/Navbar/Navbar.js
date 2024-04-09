import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from "../../utils/getUser.js";
import { auth } from '../../Firebase/config.js';
import './navbar.css';
import { Button, Drawer, List, ListItem } from '@mui/material';

function Navbar() {
  const history = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userData, setUser] = useState(null);

    useEffect(() => {
        const fetchedUser = localStorage.getItem('userId');
        if (fetchedUser) {
            getUser(fetchedUser)
                .then((userData) => {
                    if (userData) {
                        setUser(userData);
                    } else {
                        console.log('User not found');
                    }
                })
                .catch((error) => {
                    console.log('Error fetching user data:', error);
                });
        } else {
            history('/login');
        }
    });

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        localStorage.removeItem('userId');
        history('/');
      })
      .catch(error => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <div className="container custom-bg-color mt-0 mb-0" style={{ maxWidth: '100%' }}>
      <nav className="navbar navbar-expand-lg " data-bs-theme="dark">
        <div className="container-fluid ">
          <img src="https://firebasestorage.googleapis.com/v0/b/tatainvest-71bd6.appspot.com/o/logo.png?alt=media&token=47531390-01cb-40a6-9ab0-bca7f18cfec0" alt="TataInvest" height="50" width="70" />
          <button className="navbar-toggler d-lg-none" type="button" onClick={toggleDrawer}>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </button>
          <Drawer anchor="right"
            open={isDrawerOpen}
            onClose={toggleDrawer}
            className="full-screen-drawer">
            <div className="drawer-content" onClick={toggleDrawer}>
            <div>
            Hi {userData?.name}, <br /> Welcome to the TATA Invest
            </div>
              <List>
                <ListItem>
                  <Link to="/dashboard">Home</Link>
                </ListItem>
                <ListItem>
                  <Link to="/profile">Profile</Link>
                </ListItem>
                <ListItem>
                  <Link to="/statement">Statement</Link>
                </ListItem>
                <ListItem>
                  <Link to="/aboutus">About Us</Link>
                </ListItem>
                <ListItem>
                  <a href="/download">Download App</a>
                </ListItem>
                <ListItem onClick={handleSignOut}>
                  Log Out
                </ListItem>
              </List>
            </div>
          </Drawer>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-none d-lg-flex">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link active" aria-current="page">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link active" aria-current="page">Profile</Link>
              </li>
              <li className="nav-item">
                <Link to="/statement" className="nav-link active" aria-current="page">Statement</Link>
              </li>
              <li className="nav-item">
                <Link to="/aboutus" className="nav-link active" aria-current="page">About Us</Link>
              </li>
              <li className="nav-item">
                <a href="/download" className="nav-link active"><i className="fas fa-download"></i> Download App</a>
              </li>
            </ul>
            <Button onClick={handleSignOut} style={{ backgroundColor: 'white', color: 'blue', fontSize: 12, padding: '10px 20px', borderRadius: '20px', margin: '5px' }}>Log Out</Button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
