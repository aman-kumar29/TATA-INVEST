import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./signUp.css"; // Assume SignUp.css is the CSS file for styling
import { createUserDocument } from "../../Firebase/config";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/store.js";

function SignUp() {
  const history = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const parentReferralCode = e.target.parentReferralCode.value || null;
    const user_name = e.target.user_name.value || null;

    createUserWithEmailAndPassword(auth, email, password)
      .then((data) => {
        createUserDocument(data.user, user_name, parentReferralCode);
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
          <input name="email" placeholder="Email" className="input-field" />
        </div>
        <div className="form-group">
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input-field"
          />
        </div>
        <div className="form-group">
          <input
            name="user_name"
            type="text"
            placeholder="Name"
            className="input-field"
          />
        </div>
        <div className="form-group">
          <input
            name="parentReferralCode"
            type="text"
            placeholder="Referral Code"
            className="input-field"
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
