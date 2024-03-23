import { Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './investmentPlans.css'
 
const investmentPlans = [
    {
        amount: 1000,
        interest: '1.2%',
        interestAmount:12,
    },
    {
        amount: 2000,
        interest: '1.2%',
        interestAmount:24,
    },
    {
        amount: 5000,
        interest: '1.2%',
        interestAmount:60,
    },
    {
        amount: 10000,
        interest: '1.2%',
        interestAmount:120,
    },
    {
        amount: 20000,
        interest: '1.2%',
        interestAmount:240,
    },
    {
        amount: 50000,
        interest: '1.2%',
        interestAmount:600,
    },
    {
        amount: 100000,
        interest: '1.2%',
        interestAmount:1200,
    },
];
const cardStyles = {
  background: 'linear-gradient(90deg, rgba(79,96,193,1) 0%, rgba(135,132,220,1) 35%, rgba(178,160,254,1) 100%)',
  borderRadius: 30,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  padding: 20,
  margin: 20,
  textAlign: 'center',
  color:'#fff',
  transition: 'transform 0.3s, box-shadow 0.3s, cursor 0.3s', // Add transition for movement and cursor change
  '&:hover': {
    transform: 'translateY(-5px)', // Move the card slightly up on hover
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add a shadow on hover
    cursor: 'pointer', // Change cursor to pointer on hover
  },
};

export default function InvestmentPlans() {
  const history = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 556,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const handleInvestClick = () => {
    history('/login')
  };

  return (
    <div style={{maxWidth: '100%', margin: '0 auto'}}>
      <Typography variant="h4" style={{ textAlign: 'center', marginBottom: 20, padding: 20, fontWeight: 600 }}>
        Explore our Investment Plans
      </Typography>
      <div >
      <div className='slider-container'> {/* Set maxWidth to 100% and hide overflow */}
        <Slider {...settings}>
          {investmentPlans.map((plan, index) => (
            <div key={index}>
            <Card style={cardStyles} key={index}>
              <CardContent>
                <div style={{ justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                  <i className="material-icons" style={{ color: 'purple', fontSize: 24, marginRight: 10 }}></i>
                  <Typography variant="h6" style={{ fontSize: 22, fontWeight: 600 }}>
                    Invest Rs {plan.amount}
                  </Typography>
                </div>
                <Typography variant="body2" color="#f2f2f2" style={{ fontSize: 16, marginTop: 5 }}>
                  and Get Rs {plan.interestAmount} per day!!!{/* Add a short description related to the investment */}
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
                <Button
                  onClick={handleInvestClick}
                  to="/login"
                  style={{ backgroundColor: 'white', color: 'blue', fontSize: 12, padding: '10px 20px', borderRadius:'20px' }}
                >
                  Invest Now
                </Button>
                <Button
                  component={Link}
                  to="/aboutus"
                  style={{ backgroundColor: 'white', color: 'green', fontSize: 12, padding: '10px 20px', borderRadius:'20px' }}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>

            </div>
          ))}
        </Slider>
      </div>

      </div>
    </div>
  );
}