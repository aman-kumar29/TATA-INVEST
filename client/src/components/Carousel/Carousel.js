import ImageSlider from "../ImageSlider/ImageSlider.js";
import React from 'react';

const Carousel = () => {
  const desktopSlides = [
    { url: "/assets/image-1.jpg", title: "beach" },
    { url: "/assets/image-2.jpg", title: "boat" },
    { url: "/assets/image-3.jpg", title: "forest" },
  ];

  const mobileSlides = [
    { url: "/assets/mobile-1.jpg", title: "beac" },
    { url: "/assets/mobile-2.jpg", title: "boat" },
    { url: "/assets/mobile-3.jpg", title: "forest" },
  ];

  const isMobile = window.innerWidth <= 768; // Define the breakpoint for mobile

  const slides = isMobile ? mobileSlides : desktopSlides;


  const containerStyles = {
    width: "100%", // Responsive full width
    height: "400px", // Set a fixed height
    margin: "0 auto", // Center horizontally
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50px", // Border radius for the container
  };

  return (
    <div style={containerStyles}>
      <ImageSlider slides={slides} />
    </div>
  );
};

export default Carousel;
