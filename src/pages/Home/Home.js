import { containerStyles } from '../../components/Carousel/carousel.module.js';
import { slides } from '../../data.js';
import ImageSlider from '../../components/ImageSlider/ImageSlider.js';

export default function Home() {
  return (
    <>
    <div style ={containerStyles}>
      <ImageSlider slides={slides}/>
    </div>
    </>
  )
};