import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InvestmentPlans from '../../components/InvestmentPlans/InvestmentPlans.jsx';
import HappyFamily from '../../components/HappyFamily/HappyFamily.js';
import PoweredBy from "../../components/Poweredby/PoweredBy.js";
import NumbersInvestment from "../../components/NumbersInvestment/NumbersInvestment.js";
import GreatInvestment from "../../components/GreatInvestment/GreatInvestment.js";

export default function Home() {
  const history = useNavigate();
  const [user,setUser] = useState('');
  useEffect(() => {
    const checkLoggedIn = () => {
        setUser(localStorage.getItem('userId'));
        if (user) {
          history("/dashboard");
        }
    };

    checkLoggedIn();
  }, [history,user]);

  return (
    <>
      <InvestmentPlans/>
      <HappyFamily />
      <GreatInvestment/>
      <PoweredBy/>
      <NumbersInvestment/>
    </>
  );
}
