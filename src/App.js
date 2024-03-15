import './App.css'; 
import { containerStyles } from './components/Carousel/carousel.module.js';
import { slides } from './data.js';
import ImageSlider from './components/ImageSlider/ImageSlider.js';
import Navbar from './components/Navbar/Navbar.js';

function App() {
  return (
    <>
    <Navbar/>
    <div style ={containerStyles}>
      <ImageSlider slides={slides}/>
    </div>
    </>
  );
}

export default App;
