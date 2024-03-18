import React from 'react';

function AboutUs() {
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, libero ut fermentum
            lobortis, est enim accumsan mauris, vitae vestibulum ligula risus eget nisi. Vivamus semper
            ultrices lacus, id malesuada lectus eleifend nec. Fusce elementum, purus et rhoncus placerat,
            neque mauris volutpat justo, at consequat nisi lorem eu odio. Duis id felis neque. Proin
            hendrerit eros non eros tempor, id egestas enim dictum.
          </p>
        </div>
      </div>
                 
      {/* Terms and Conditions Title */}
      <h2 className="text-center mt-5 mb-4">Terms and Conditions</h2>

      {/* Terms and Conditions Accordion */}
      <div className="accordion" id="accordionTerms">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Section 1
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionTerms"
          >
          
            <div className="accordion-body">
              Terms and conditions content for Section 1.
            </div>
          </div>
        </div>
        {/* Add more accordion items as needed */}
      </div>

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
