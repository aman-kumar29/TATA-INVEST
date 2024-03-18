import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase/config';
import './navbar.css';
import { removeCookie } from '../../utils/cookies';
function Navbar() {
  const [authenticated, setAuthenticated] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        setAuthenticated(false);
        removeCookie("loggedIn");
        history('/');
      })
      .catch(error => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <>
      <div className="container mt-3 custom-bg-color">
        <nav className="navbar navbar-expand-lg " data-bs-theme="dark" >
          <div className="container-fluid ">
            <img src="https://firebasestorage.googleapis.com/v0/b/tatainvest-71bd6.appspot.com/o/logo.png?alt=media&token=47531390-01cb-40a6-9ab0-bca7f18cfec0" alt="TataInvest" height="50" width="70" />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button> 
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/"><p className="nav-link active mx-2" aria-current="page" >Home</p></Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">Contact</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Investment</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#"><i className="fas fa-download"></i> Download App</a>
                </li>
              </ul>
              {authenticated ? (
                <>
                  <button className="btn btn-success mx-2" onClick={handleSignOut}>Sign Out</button>
                  <Link to="/dashboard"><button className="btn btn-primary">Profile</button></Link>
                </>
              ) : (
                <>
                  <Link to="/signup"><button className="btn btn-success mx-2">SignUp</button></Link>
                  <Link to="/login"><button className="btn btn-warning">Login</button></Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
