import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./signIn.css"; // Assume SignIn.css is the CSS file for styling
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/store.js";

function Login() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        Cookies.set("LoggedIn", JSON.stringify(data),{expires : 7});
        localStorage.setItem("userId", data?.user.uid);
        dispatch(authActions.login());
        history("/dashboard");
      })
      .catch((err) => {
        alert(err.code);
      });
  };

  const handleReset = () => {
    history("/resetpassword");
  };

  return (
    <div className="container">
      <div className="signin-container">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className="signin-form">
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
          <div className="forgot-password">
            <p onClick={handleReset}>Forgot Password?</p>
          </div>
          <div className="signup-link">
            <Link to="/signup" className="signup-link-text">
              Don't have an account? Sign Up
            </Link>
          </div>
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
