import React from 'react';
import { Container, Accordion, Card, Button } from 'react-bootstrap';

const FAQs = () => {

  
  const faqs = [
    {
      title: "1.	Details on TATA Invest: ",
      content: `TATA Invest is a technology-based application that offers you the opportunity to earn a return of up to 1.2%/day on amounts you invest by deploying them with NBFC-peer to peer platforms ("P2P NBFC Partners"). Please note that TATA Invest merely acts as a sourcing and technology partner to these regulated entities and does not guarantee return on your investment.`,
      id: "One"
    },
    {
      title: `2.Who are the NBFC partners and/or P2P NBFC Partner on the TATA Invest?`,
      content:`TATA Invest partners with various P2P NBFC Partners and NBFC partners for providing these services. The investment amounts are placed with RBI regulated P2P NBFC, Innofin Solutions Private Limited ("LenDenClub") and NDX P2P Private Limited ("Liquiloans").`,
      id: "Two"
    },
    {
      title: `3.How to create an account on TATA Invest?`,
      content:` You can create your account by entering your name, phone number, otp and KYC details on your TATA Invest. Once your account is created, click on add money to start earning 1.2%/day returns on your investment (based on deployment to borrowers and repayments by borrowers through the P2P NBFC Partner)`,
      id: "Three"
    },
    {
      title: "4.	 Investing with TATA Invest: a.How to add money in TATA Invest account?",
      content: `You can add money using UPI, Debit Card or Net Banking. There are no charges to adding money to your TATA Invest Account.
      `,
      id: "Four"
    },
    {
      title: `5.When is return earned on investment in TATA Invest and how do I get a return up to 1.2%/day on my investment?`,
      content:` The investment starts earning interest as soon as the money is deployed with the registered borrowers of P2P NBFC partner platform, The deployment usually takes upto 4 days. The return is on deployment with registered borrowers through the P2P NBFC Partner. The return is in form of interest paid by the borrowers to whom the money is lent through P2P NBFC Partners.
     `,
      id: "Five"
    },
    {
      title: `6. How much money can I lend?
      `,
      content:`Exposure of a single lender to the same borrower, across all P2Ps, Can exceed Rs 50,000. Aggregate exposure of a lender to all borrower at any point of time, across all P2Ps, shall be subject to a cap of ₹ 10,00,000. However, you can lend up to ₹ 50,00,000 on submitting a certified net worth certificate of ₹ 50,00,000.
     `,
      id: "Six"
    },
    {
      title: `7. What is the risk and how to mitigate it?`,
      content:`
      
      Our P2P NBFC Partner tries to minimize risks by undertaking stringent verification and credit underwriting process. These investments which are in the form of lending through our P2P NBFC Partner are subject to risk on account of the borrower defaulting on the payment. In case of any default, we do regular follow-up and soft recovery with the borrower.
      
      We act as a sourcing agent and tech support for P2P NBFC Partners to provide our customers a unique experience on our TATA Invest. Please note that our P2P NBFC Partners may have affiliations with third parties who independently offer different programmes and offers on their platform.
      
      `,
      id: "Seven"
    },
    {
      title: "8.	Money withdrawal from TATA Invest: Are there any withdrawal charges?",
      content: `
      No! There are no withdrawal charges.`,
      id: "Eight"
    },
    {
      title: `9.  Can you withdraw your invested amount or Can the invested amount be withdrawn partially?
      `,
      content:`
      The P2P NBFC Platform partners have an active secondary market and the lender can avail liquidity through the secondary market feature of the platforms. However, having a secondary market does not ensure that you will get the liquidity through it. Your invested amount will regularly give you an return of up to 1.2%/day till one year of the investment date and the user will not be able to withdraw the principle amount.
     `,
      id: "Nine"
    },
    {
      title: `10.What are the parameters for dealing with a withdrawal when there are various lenders wanting to withdraw the invested money at the same time that has already been disbursed?
     `,
      content:` 
      Our P2P NBFC Partners have a secondary market and there is no guarantee of liquidation by the TATA Invest. If there is a run on the platform the worst that can happen is the money will come in a staggered way depending on the underlying tenure of the loan (which is average tenure of 6 months). A run on the platform does not mean the underlying loans are bad, it just means the lender has to wait longer to get their money back.
      `,
      id: "Ten"
    },
    {
      title: `11. How long does it take for the withdrawal amount to be settled to my bank account?
     `,
      content:`  
      Subject to the transactions getting fulfilled on secondary market of the platform, withdrawals requests are generally processed within 2 business day from the date of request of withdrawal. However, in rare cases, there might be a delay at any of the intermediary bank's end. If you are facing any issue beyond the aforementioned time, please feel free to chat with us or contact our customer support team. 
      `,
      id: "Eleven"
    },
    {
      title: `12.Where will money withdrawn from the TATA Invest get credited?
      `,
      content:`
      Withdrawn money will be credited to your registered bank account.
      `,
      id: "Twelve"
    },
    {
      title: `13. What is the minimum amount that a user can withdraw? `,
      content:`A user can withdraw a minimum amount of INR 1000.`,
      id: "Thirteen"
    },
  ];


  return (
    <div className='my-5 mx-3'>
     <div className="text-center mb-4">
          <img src="https://firebasestorage.googleapis.com/v0/b/tatainvest-71bd6.appspot.com/o/logo.png?alt=media&token=47531390-01cb-40a6-9ab0-bca7f18cfec0" alt="Logo" className="img-fluid" />
        </div>
        
       <h2 className="text-center mt-5 mb-4">Frequently Asked Questions</h2>

        {
          faqs.map((item, index) => {
            return (

              <div className="accordion" id="accordionTerms">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${item.id}`}
                      aria-expanded="false"
                      aria-controls={item.id}
                    >
                      {item.title}
                    </button>
                  </h2>
                  <div
                    id={item.id}
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionTerms"
                  >

                    <div className="accordion-body">
                      {item.content}
                    </div>
                  </div>
                </div>
             </div>
            );
          })
        }
    </div>
  );
};

export default FAQs;
