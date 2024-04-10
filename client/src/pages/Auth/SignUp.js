import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth, createUserDocument } from "../../Firebase/config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
    email: "",
    password: "",
    user_name: "",
    phone: "",
    address: "",
    parentReferralCode: "",
  });

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
      console.log(formData.parentReferralCode);
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
    // console.log(dummyData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.email ||
      !formData.password ||
      !formData.user_name ||
      !formData.phone
    ) {
      alert("All fields are compulsory");
      return;
    }

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((data) => {
        createUserDocument(
          data.user,
          formData.user_name,
          formData.parentReferralCode,
          formData.phone,
          "Demo Address"
        ).then(() => {
          if (formData.parentReferralCode !== "") {
            handleParentReferralCode(data.user.uid);
          }
        });

        localStorage.setItem("userId", data?.user.uid);
        dispatch(authActions.login());
        history("/dashboard");
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  return (
    <div className="container-signup">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="input-field"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input-field"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
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
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
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
            <Link to="/login" className="signin-link" style={{ color: "white", fontSize:'16px'}}>
              Already have an account? <span style={{color:'blue',textDecoration:'underline'}}> Sign In</span>
            </Link>
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          {/* <button>
            <Link to="/phoneauth">Phone Auth</Link>
          </button> */}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
