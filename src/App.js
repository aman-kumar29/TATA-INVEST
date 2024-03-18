import './App.css';
import Home from './pages/Home/Home.js';
import Navbar from './components/Navbar/Navbar.js';
import {Routes, Route } from 'react-router-dom';
import DashboardScreen from './pages/Dashboard/Dashboard.js';
import ForgotPassword from './pages/Auth/ForgotPassword.js';
import SignUp from './pages/Auth/SignUp.js';
import SignIn from './pages/Auth/SignIn.js';
import Profile from './pages/Dashboard/Profile.js';
import UpdateInfo from './pages/Dashboard/UpdateInfo.js';
import Statement from './pages/Dashboard/Statement.js';
import AboutUs from './pages/Dashboard/AboutUs.js';

function App() {
  const isLoggedIn = localStorage.getItem('userId') !== null;

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={isLoggedIn?<DashboardScreen/>:<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/resetpassword" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<DashboardScreen />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/updateinfo" element={<UpdateInfo />} />
      <Route path="/statement" element={<Statement />} />
      <Route path="/aboutus" element={<AboutUs />} />
    </Routes>
    </>
  );
}

export default App;
