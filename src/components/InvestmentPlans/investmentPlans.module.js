import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  investmentPlansContainer: {
    '.slick-slider': {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridGap: theme.spacing(2), // Use Material-UI spacing for consistency
      gridAutoRows: 'minmax(300px, auto)',
    },
    '.slick-list': {
      overflow: 'visible !important',
    },
    '.slick-dots': {
      display: 'none',
    },
    '.slick-prev, .slick-next': {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
    },
  },
}));

const InvestmentPlansStyles = () => {
  const classes = useStyles();
  return <div className={classes.investmentPlansContainer} />;
};

export default InvestmentPlansStyles;
