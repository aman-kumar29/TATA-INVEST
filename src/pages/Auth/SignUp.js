import React,{ useState } from "react";
import { Link } from "react-router-dom";
import { auth,createUserDocument } from "../../Firebase/config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./signUp.css"; // Assume SignUp.css is the CSS file for styling
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/store.js";
import axios from "axios";

function SignUp() {
  const history = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    user_name: '',
    phone: '',
    address: '',
    parentReferralCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

 const handleParentReferralCode = async (childrenId) => {
    const dummyData = await axios.get(`http://localhost:8000/api/parentReferralUpdate/${childrenId}`);
    console.log(dummyData, "dummyData");

  }




  const handleSubmit = (e) => {
    e.preventDefault();
     if (!formData.email || !formData.password || !formData.user_name || !formData.phone || !formData.address) {
      alert('All fields are compulsory');
      return;
    }
    // Perform form submission
    console.log('Form submitted:', formData);

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((data) => {
        createUserDocument(data.user, formData.user_name, formData.parentReferralCode, formData.phone, formData.address)
        .then(() => {
          if(formData.parentReferralCode!==''){
            console.log("Entering handleParentReferralCode");
            handleParentReferralCode(data.user.uid);
          }
        });
        
          // handleParentReferralCode(docRef.id);
        console.log(data.user, "authData");
        
        // console.log(data?.user.uid, "UID");
        localStorage.setItem("userId", data?.user.uid);
        dispatch(authActions.login());
        history("/dashboard");
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  return (
<div className="container">
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
              placeholder="Name"
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
          <div className="form-group">
            <input
              name="address"
              type="text"
              placeholder="Address"
              className="input-field"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="form-group">
            <Link to="/signin" className="signin-link">
              Already have an account? Sign In
            </Link>
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
);
}

export default SignUp;
