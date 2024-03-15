import ImageSlider from "../ImageSlider/ImageSlider.js";
const Carousel = () => {
  const slides = [
    { url: "/assets/image-1.jpg", title: "beach" },
    { url: "/assets/image-1.jpg", title: "boat" },
    { url: "/assets/image-1.jpg", title: "forest" },
    { url: "/assets/image-1.jpg", title: "city" },
    { url: "/assets/image-1.jpg", title: "italy" },
  ];
  const containerStyles = {
    width: "500px",
    height: "280px",
    margin: "0 auto",
  };
  return (
    <div>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
};

export default Carousel;