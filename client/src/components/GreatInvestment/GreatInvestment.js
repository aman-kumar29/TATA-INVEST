import React from 'react';
import { Card, Typography, Grid, CardContent, Box } from '@mui/material';
import './GreatInvestment.css'

export default function GreatInvestment() {

  return (
    <div style={{ margin: '0 auto', maxWidth: '1200px', padding: '20px' }}>
      <Typography variant='h6' style={{ fontWeight: 'bold', textAlign: 'center', margin: '20px 0', color: '#983EB2' }}>
        What makes it a great investment?
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {/* Card 1 */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className='card'>
            <CardContent className='cardContent'>
              <Box className='cardHeading'>
                <i className="fas fa-usd icon" aria-hidden="true"></i>
                <Typography variant="h6" component="h2">
                  High ROI
                </Typography>
              </Box>
              <Typography variant="body2" component="p">
                Earn a significant return on your investment.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Card 2 */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className='card'>
            <CardContent className='cardContent'>
              <Box className='cardHeading'>
                <i className="fas fa-chart-line icon" aria-hidden="true"></i>
                <Typography variant="h6" component="h2">
                  Growth Potential
                </Typography>
              </Box>
              <Typography variant="body2" component="p">
                Experience exponential growth in your investment.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Card 3 */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className='card'>
            <CardContent className='cardContent'>
              <Box className='cardHeading'>
                <i className="fas fa-box-open icon" aria-hidden="true" ></i>
                <Typography variant="h6" component="h2">
                  Diverse Opportunities
                </Typography>
              </Box>
              <Typography variant="body2" component="p">
                Explore various investment options to diversify your portfolio.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Card 4 */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className='card'>
            <CardContent className='cardContent'>
              <Box className='cardHeading'>
                <i className="fas fa-chart-bar icon" aria-hidden="true"></i>
                <Typography variant="h6" component="h2">
                  Data-Driven Insights
                </Typography>
              </Box>
              <Typography variant="body2" component="p">
                Make informed decisions based on detailed analytics.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
