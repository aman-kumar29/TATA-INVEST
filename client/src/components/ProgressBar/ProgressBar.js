import React from "react";
import PropTypes from "prop-types";
import GradientCircleProgressbar from "../../components/GradientCircleProgressbar/GradientCircleProgressbar.js";

const ProgressBar = ({ investedAmount }) => {
  const maxAmount = 300000; // Update the max amount as per your requirement
  const progress = (investedAmount / maxAmount) * 100;

  return (
    <GradientCircleProgressbar
      percentage={progress}
      investedAmount = {investedAmount}
      width={300} // Adjust width as needed
      strokeWidth={10} // Adjust stroke width as needed
      strokeLinecap="rectangle"
      fontSize="25px" // Adjust font size as needed
      fontColor="#333" // Adjust font color as needed
      fontFamily="Arial, sans-serif" // Adjust font family as needed
      primaryColor={["#ff9891", "#8784dc"]} // Adjust primary color gradient as needed
      secondaryColor="#fff"
      fill="transparent"
      hidePercentageText={false} // Hide percentage text
    />
  );
};

ProgressBar.propTypes = {
  investedAmount: PropTypes.number.isRequired,
};

export default ProgressBar;
