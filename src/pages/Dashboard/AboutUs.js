import React from 'react';

function AboutUs() {

  const termsAndConditions = [
    {
      title: "1. Eligibility",
      content: "•	You must be at least 18 years old and capable of entering into legally binding contracts to use our Services.\n•	By using our Services, you represent and warrant that you meet the eligibility criteria.",
      id:"One"
    },
    {
      title: "2. Account Registration:",
      content: "•	To access certain features of our Services, you may need to register for an account.\n•	You agree to provide accurate, current, and complete information during the registration process.\n•	Upload Documents and Verify your identity.\n•	You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
      id:"Two"
    },
    // {
    //   title: "3.Investment Terms",
    //   content: "•	We offer investment services that allow you to invest in various financial products.\n•	You are responsible for conducting your own research and due diligence before making any investment decisions.\n•	We do not provide investment advice or recommendations.",
    //   id:"Three"
    // },
    // {
    //   title: "4. Referral Program:",
    //   content: "•	We offer a referral program that allows you to earn rewards for referring new users to our platform.\n•	You agree to comply with the terms and conditions of our referral program.\n•	We reserve the right to modify or terminate the referral program at any time.",
    //   id:"Four"
    // },
    // {
    //   title: "5. Prohibited Activities:",
    //   content: "•	You agree not to engage in any of the following prohibited activities:\n•	Violating any applicable laws or regulations.\n•	Using our Services for any illegal or unauthorized purpose.\n•	Engaging in any activity that interferes with or disrupts our Services.",
    //   id:"Five"
    // },
    // {
    //   title: "6. Termination:",
    //   content: "•	We reserve the right to terminate or suspend your account at any time for any reason.\n•	You may terminate your account by contacting us at",
    //   id:"Six"
    // },
    // {
    //   title: "7. Disclaimer:",
    //   content: "•	Our Services are provided on an 'as is' and 'as available' basis.\n•	We do not make any warranties or representations regarding the accuracy or completeness of the information provided on our platform.",
    //   id:"Seven"
    // },
    // {
    //   title: "8. Limitation of Liability:",
    //   content: "•	We will not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our Services.\n•	Our total liability to you for any claims arising out of or in connection with these Terms will not exceed the amount you paid to us in the preceding 12 months.",
    //   id:"Eight"
    // },
    // {
    //   title: "9. Governing Law:",
    //   content: "•	These Terms are governed by the laws of the State of California.\n•	Any disputes arising out of or in connection with these Terms will be subject to the exclusive jurisdiction of the state and federal courts located in California.",
    //   id:"Nine"
    // },
    // {
    //   title: "10. Contact Us:",
    //   content: "•	If you have any questions or concerns about these Terms, please contact us at",
    //   id:"Ten"}
  ];



  return (
    <>
<div className="container mt-5">
      {/* Logo */}
      <div className="text-center mb-4">
        <img src="https://firebasestorage.googleapis.com/v0/b/tatainvest-71bd6.appspot.com/o/logo.png?alt=media&token=47531390-01cb-40a6-9ab0-bca7f18cfec0" alt="Logo" className="img-fluid" />
      </div>

      {/* About Us Title */}
      <h2 className="text-center mb-4">About Us</h2>

      {/* About Us Content */}
      <div className="card shadow">
        <div className="card-body">
          <p>
          Welcome to our TATA Invest platform! These Terms and Conditions ("Terms") govern your access to and use of our product and services, including but not limited to investment services, referral programs, and any related features or functionalities (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. Please read them carefully before using our platform.
           </p>
        </div>
      </div>
                 
      {/* Terms and Conditions Title */}
      <h2 className="text-center mt-5 mb-4">Terms and Conditions</h2>

      {/* Terms and Conditions Accordion */}

      {
        termsAndConditions.map((item, index) => {
          return(
            
      <div className="accordion" id="accordionTerms">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${item.id}`}
              aria-expanded="true"
              aria-controls={item.id}
            >
             { item.title}
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
        {/* Add more accordion items as needed */}
      </div>
          );
        })
      }


      {/* Footer */}
      <footer className="footer mt-5 py-3 text-center">
        <div className="container">
          <span className="text-muted">
            &copy; 2023 TATA Invest. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
    </>
    
  );
}

export default AboutUs;
