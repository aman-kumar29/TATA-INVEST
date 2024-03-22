import ImageSlider from "../ImageSlider/ImageSlider.js";
import React from 'react';

const Carousel = () => {
  const slides = [
    { url: "/assets/image-1.jpg", title: "beach" },
    { url: "/assets/image-2.jpg", title: "boat" },
    { url: "/assets/image-3.jpg", title: "forest" },
    { url: "/assets/image-4.jpg", title: "city" },
    { url: "/assets/image-5.jpg", title: "italy" },
  ];

  const containerStyles = {
    width: "100%", // Responsive full width
    height: "400px", // Set a fixed height
    margin: "0 auto", // Center horizontally
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px", // Border radius for the container
  };

  return (
    <div style={containerStyles}>
      <ImageSlider slides={slides} />
    </div>
  );
};

export default Carousel;
