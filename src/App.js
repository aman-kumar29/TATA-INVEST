import './App.css';
import Home from './pages/Home/Home.js';
import Navbar from './components/Navbar/Navbar.js';
import {Routes, Route } from 'react-router-dom';
import DashboardScreen from './pages/Dashboard/Dashboard.js';
import ForgotPassword from './pages/Auth/ForgotPassword.js';
import SignUp from './pages/Auth/SignUp.js';
import SignIn from './pages/Auth/SignIn.js';


function App() {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/resetpassword" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<DashboardScreen />} />
    </Routes>
    </>
  );
}

export default App;
