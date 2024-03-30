import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InvestmentPlans from '../../components/InvestmentPlans/InvestmentPlans.jsx';
import PoweredBy from "../../components/Poweredby/PoweredBy.js";
import MaximizeWealth from "../../components/MaximizeWealth/MaximizeWealth.jsx";
import PerfectPlan from "../../components/PerfectPlan/PerfectPlan.jsx";
import InvestorReviews from "../../components/InvestorReviews/InvestorReviews.jsx";
import HiddenImageComponent from "../../components/HiddenImageComponent/HiddenImageComponent.js";

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
      <MaximizeWealth/>
      <PerfectPlan/>
      <InvestorReviews/>
      <InvestmentPlans/>
      <HiddenImageComponent/>
      <PoweredBy/>
    </>
  );
}
