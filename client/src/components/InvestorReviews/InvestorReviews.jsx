import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './InvestorReviews.css'; // Import CSS for styling

const InvestorReviews = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="investor-reviews-container">
      <h2 className="reviews-heading">Reviews & experiences of our investors</h2>
      <Slider {...settings}>
        <div className="review-card">
          <p className="review-text">“ Great investment platform! I've been using it for a year now and the returns are excellent. ”</p>
          <div className="reviewer-info">
            <span className="reviewer-name"> - Sarah Miller</span>
          </div>
        </div>
        <div className="review-card">
          <p className="review-text">“ Easy to use and trustworthy. Highly recommended for anyone looking to invest. ”</p>
          <div className="reviewer-info">
            <span className="reviewer-name"> - John Doe</span>
          </div>
        </div>
        <div className="review-card">
          <p className="review-text">“ I've tried several investment platforms, but this one stands out for its simplicity and great returns. ”</p>
          <div className="reviewer-info">
            <span className="reviewer-name"> - Jane Smith</span>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default InvestorReviews;
