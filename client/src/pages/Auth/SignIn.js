import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase/config.js";
import { RecaptchaVerifier, signInWithPhoneNumber, signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import "./signIn.css"; // CSS file 
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/store.js";
import { Skeleton } from "@mui/material";
import { checkUserExists } from "../../Firebase/config.js";

function Login() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchedUser = localStorage.getItem('userId');
    if (fetchedUser) {
      history('/dashboard');
    }
  });


  const sendOTP = async () => {
    try {
        if (phone === '') {
            alert("Phone Number is required");
            return;
        }
        const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {});
        const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
        console.log("confirmation", confirmation);
        setUser(confirmation);
    } catch (error) {
        console.log("Error", error);
    }
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp === '') {
      alert("OTP is required");
      return;
    }
    
    // Check if the user with the given phone number exists
    // Assuming you have a function called 'checkUserExists' to check if the user exists
    checkUserExists(phone)
      .then((userExists) => {
        if (userExists) {
          // If the user exists, log them in
          user.confirm(otp)
            .then((data) => {
              localStorage.setItem("userId", data?.user.uid);
              dispatch(authActions.login());
              if (phone === "+911111111111" && otp === '123456') {
                history('/admin');
              } else {
                history('/dashboard');
              }
            })
            .catch((err) => {
              console.log("Error", err);
            });
        } else {
          // If the user does not exist, redirect them to the signup page
          history('/signup');
        }
      })
      .catch((error) => {
        console.error('Error checking user existence:', error);
      });
  };
 

  // Simulate a delay before showing the actual sign-in form
  setTimeout(() => {
    setLoading(false);
  }, 500); // Adjust the delay time as needed (in milliseconds)

  return (
    <div className="container-signin">
      <div className="signin-container">
        <h1>Sign In</h1>
        {loading ? (
          <>
            <Skeleton variant="text" width={200} height={50} />
            <Skeleton variant="text" width={300} height={50} />
            <Skeleton variant="text" width={300} height={50} />
          </>
        ) : (
          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
            <input
                    name="phoneNumber"
                    type="tel"
                    placeholder="Phone Number"
                    className="input-field"
                    onChange={(e) => setPhone("+91" + e.target.value)}
                />
            </div>
            <div id="recaptcha"></div>
            
            <div className="btn" onClick={sendOTP}>Send OTP</div>
            
            <div className="form-group">
            <input
                    name="otp"
                    type="text"
                    placeholder="OTP"
                    className="input-field"
                    onChange={(e) => setOtp(e.target.value)}
                />
            </div>
            {/* <div className="forgot-password">
              <p onClick={handleReset}>Forgot Password?</p>
            </div> */}
            <div className="signup-link">
              <Link to="/signup" className="signup-link-text" style={{ color: '#fff', fontSize:'16px'}}>
                Don't have an account? <span style={{color:'blue',textDecoration:'underline'}}> Sign Up</span>
              </Link>
            </div>
            <button type="submit" className="signin-button">
              Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
