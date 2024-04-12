import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth, createUserDocument } from "../../Firebase/config.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/store.js";
import axios from 'axios';

function SignUp() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [formData, setFormData] = useState({
    user_name: "",
    parentReferralCode: "",
  });
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [user, setUser] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const fetchedUser = localStorage.getItem('userId');
    if (fetchedUser) {
      history('/dashboard');
    }
    const query = new URLSearchParams(location.search);
    const referralCode = query.get("referralCode");
    if (referralCode) {
      setFormData((prevData) => ({
        ...prevData,
        parentReferralCode: referralCode,
      }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleParentReferralCode = async (childrenId) => {
    const dummyData = await axios.get(`/api/parentReferralUpdate/${childrenId}`);
  };

  const sendOTP = async () => {
    try {
      if (phone === '' || formData.user_name === '') {
        alert("Name and Phone Number required");
        return;
      }
      const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {});
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
      setUser(confirmation);
      setConfirmationResult(confirmation);
      setCaptchaVerified(true);
      setOtpSent(true);
      setTimer(60);
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
        setOtpSent(false);
      }, 60000);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        otp === '' || !confirmationResult
      ) {
        alert("Please enter OTP !");
        return;
      }
      const data = await confirmationResult.confirm(otp);
      if (data.user) {
        createUserDocument(
          data.user,
          formData.user_name,
          formData.parentReferralCode,
          phone,
          "Demo Address"
        ).then(() => {
          if (formData.parentReferralCode !== "") {
            handleParentReferralCode(data.user.uid);
          }
        });
        localStorage.setItem("userId", data?.user.uid);
        dispatch(authActions.login());
        history("/dashboard");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="container-signup">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <input
              name="user_name"
              type="text"
              placeholder="Full Name"
              className="input-field"
              value={formData.user_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              className="input-field"
              onChange={(e) => setPhone("+91" + e.target.value)}
              required
            />
          </div>
          {!otpSent && <div id="recaptcha" className="recaptcha"></div>}
          <div className="form-group">
            <button
              type="button"
              className="btn get-otp-button"
              onClick={sendOTP}
              disabled={otpSent || captchaVerified}
            >
              {otpSent ? `Resend OTP (${timer}s)` : "Get OTP"}
            </button>
          </div>
          {otpSent && (
            <div className="form-group">
              <input
                name="otp"
                type="text"
                placeholder="Enter OTP"
                className="input-field"
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}
          {formData.parentReferralCode === "" && (
            <div className="form-group">
              <input
                name="parentReferralCode"
                type="text"
                placeholder="Referral Code"
                className="input-field"
                value={formData.parentReferralCode}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="form-group">
            <Link to="/login" className="signin-link">
              Already have an account? <span>Sign In</span>
            </Link>
          </div>
          <button type="submit" className="signup-button">
            Verify OTP & Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;