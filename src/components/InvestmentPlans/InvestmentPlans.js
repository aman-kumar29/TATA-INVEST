import { Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { margin } from '@mui/system';

const investmentPlans = [
    {
        amount: 1000,
        interest: '1.2%',
    },
    {
        amount: 2000,
        interest: '1.2%',
    },
    {
        amount: 5000,
        interest: '1.2%',
    },
    {
        amount: 10000,
        interest: '1.2%',
    },
    {
        amount: 20000,
        interest: '1.2%',
    },
    {
        amount: 50000,
        interest: '1.2%',
    },
    {
        amount: 100000,
        interest: '1.2%',
    },
];


const cardStyles = {
  backgroundColor: '#f5f5f5', // Light background for cards
  borderRadius: 30, // Rounded corners
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
  padding: 20,
  margin : 20,
  textAlign: 'center', // Center text alignment within cards
};

export default function InvestmentPlans() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Typography variant="h4" style={{ textAlign: 'center', marginBottom: 20, padding:20,}}>
        Explore our Investment Plans
      </Typography>
      <div style={{ margin: '0 auto', maxWidth: '800px' }}>
        <Slider {...settings}>
          {investmentPlans.map((plan, index) => (
            <div key={index}>
              <Card style={cardStyles}>
                <CardContent>
                  <Typography variant="h6" style={{ fontSize: 18, fontWeight: 600}}>
                    Plan {index + 1}
                  </Typography>
                  <Typography style={{ color: '#333', fontSize: 16 }}>
                    Amount: ${plan.amount}
                  </Typography>
                  <Typography style={{ color: '#333', fontSize: 16 }}>
                    Interest: {plan.interest}
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: 'center' }}>
                  <Button
                    component={Link}
                    to="/#"
                    style={{ color: '#333', fontSize: 10 }}
                  >
                    Invest Now
                  </Button>
                  <Button component={Link} to="/#"
                  style={{ color: '#333', fontSize: 10 }}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
