import './App.css';
import Home from './pages/Home/Home.js';
import Navbar from './components/Navbar/Navbar.js';
import {Routes, Route } from 'react-router-dom';
import RegisterAndLogin from './pages/Auth/RegisterAndLogin.js';
import DashboardScreen from './pages/Dashboard/Dashboard.js';
import ForgotPassword from './pages/Auth/ForgotPassword.js';

function App() {
  return (
    <>
    <Navbar />
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/registerandlogin" element={<RegisterAndLogin/>} />
    <Route path="/dashboard" element={<DashboardScreen />} />
    <Route path="/resetpassword" element={<ForgotPassword />} />
  </Routes>
    </>
  );
}

export default App;
