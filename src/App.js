import './App.css';
import Home from './pages/Home/Home.js';
import Signup from './pages/Auth/Signup.js';
import Login from './pages/Auth/Login.js';
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
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
  </Routes>
    </>
  );
}

export default App;
