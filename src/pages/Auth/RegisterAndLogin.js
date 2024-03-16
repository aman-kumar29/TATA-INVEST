import React, { useState } from "react";
import { auth } from "../../Firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './login.css';
import { createUserDocument } from "../../Firebase/config";
import User from "../../model/UserModel";

function RegisterAndLogin() {
  const [login, setLogin] = useState(false);

  const history = useNavigate();

  const handleSubmit = (e, type) => {
    e.preventDefault();
    console.log(e.target);
      const email = e.target.email.value;
      const password = e.target.password.value;
    if (type === "signup") {
      const parentReferralCode = e.target.parentReferralCode.value ? e.target.parentReferralCode.value : null;
      const user_name = e.target.user_name.value ? e.target.user_name.value : null;
      createUserWithEmailAndPassword(auth, email, password)
        .then((data) => {
          const userModel = User(
            data.user.uid,
            email,
            user_name,
            0,
            data.user.uid,
            parentReferralCode,
            0,
            0,
            [],
            [],
            "yy",
            )
          createUserDocument(userModel);
          console.log(data, "authData");
          history("/dashboard");
        })
        .catch((err) => {
          alert(err.code);
          setLogin(true);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
          console.log(data, "authData");
          history("/dashboard");
        })
        .catch((err) => {
          console.log("aditya");
          alert(err.code);
        });
    }
  };

  const handleReset = ()=>{
    history("/resetpassword");
  }
  return (
    <div className="App">
      {/* Registration and login Screen */}
      <div className="row">
        <div
          className={login === false ? "activeColor" : "pointer"}
          onClick={() => setLogin(false)}
        >
          SignUp
        </div>
        <div
          className={login === true ? "activeColor" : "pointer"}
          onClick={() => setLogin(true)}
        >
          SignIn
        </div>
      </div>
      <h1>{login ? "SignIn" : "SignUp"}</h1>
      <form onSubmit={(e) => handleSubmit(e, login ? "signin" : "signup")}>
        <input name="email" placeholder="Email" />
        <br />
        <input name="password" type="text" placeholder="Password" />
        <br />
        {!login && <input name="user_name" type="text" placeholder="Name" />}
        {!login && <input name="parentReferralCode" type="text" placeholder="Referral Code" />}
        <p onClick={handleReset}>Forgot Password?</p>
        <br/>
        <button>{login ? "SignIn" : "SignUp"}</button>
      </form>
    </div>
  );
}
export default RegisterAndLogin;