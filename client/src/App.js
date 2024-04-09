import './App.css';
import Home from './pages/Home/Home.js';
import Navbar from './components/Navbar/Navbar.js';
import { Routes, Route, useLocation } from 'react-router-dom';
import DashboardScreen from './pages/Dashboard/Dashboard.js';
import ForgotPassword from './pages/Auth/ForgotPassword.js';
import SignUp from './pages/Auth/SignUp.js';
import SignIn from './pages/Auth/SignIn.js';
import Profile from './pages/Dashboard/Profile.js';
import UpdateInfo from './pages/Dashboard/UpdateInfo.js';
import Statement from './pages/Dashboard/Statement.js';
import AboutUs from './pages/Dashboard/AboutUs.js';
import Step2Form from './components/KycForms/Step2Form.js';
import Step1Form from './components/KycForms/Step1Form.js';
import Step3Form from './components/KycForms/Step3Form.js';
import ConfirmationStep from './components/KycForms/ConfirmationStep.js';
import Kyc from './pages/KYC/Kyc.js';
import AddMoneyPage from './pages/Dashboard/AddMoney.js';
import Footer from './components/Footer/Footer.js';
import HowToUsePage from './pages/Dashboard/HowToUse.js';
import TnC from './pages/Dashboard/TnC.js';
import FAQs from './pages/Dashboard/FAQs.js';
import PrivacyPolicyPage from './pages/Dashboard/PrivacyPolicy.js';
import AdminDashboard from './pages/Admin/AdminDashboard.js';
import NavbarBeforeLogin from './components/NavbarBeforeLogin/NavbarBeforeLogin.jsx';
import { useEffect, useState } from 'react';
import PhoneAuth from './pages/Auth/PhoneAuth.js';

function App() {
  // Check if user is authenticated
  const location = useLocation();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const userId = localStorage.getItem('userId');
      setAuthenticated(!!userId);
    };

    checkAuthentication();
  }, [location]);

  return (
    <>
      {authenticated ? <Navbar /> : <NavbarBeforeLogin />}
      <Routes>
        <Route path="/" element=<Home /> />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/resetpassword" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateinfo" element={<UpdateInfo />} />
        <Route path="/statement" element={<Statement />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path='/kyc' element={<Kyc />} />
        <Route path="/kyc-step1" element={<Step1Form />} />
        <Route path="/kyc-step2" element={<Step2Form />} />
        <Route path="/kyc-step3" element={<Step3Form />} />
        <Route path="/kyc-confirmation" element={<ConfirmationStep />} />
        <Route path="/addmoney" element={<AddMoneyPage />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/tnc" element={<TnC />} />
        <Route path="/howtouse" element={<HowToUsePage />} />
        <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/phoneauth" element={<PhoneAuth />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
