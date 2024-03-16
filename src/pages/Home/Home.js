import { containerStyles } from '../../components/Carousel/carousel.module.js';
import { slides } from '../../data.js';
import ImageSlider from '../../components/ImageSlider/ImageSlider.js';
import InvestmentPlans from '../../components/InvestmentPlans/InvestmentPlans.js';
import HappyFamily from '../../components/HappyFamily/HappyFamily.js';
import Footer from '../../components/Footer/Footer.js';

export default function Home() {
  return (
    <>
    <div style ={containerStyles}>
      <ImageSlider slides={slides}/>
    </div>
    <HappyFamily/>
    <InvestmentPlans/>
    <Footer/>
    </>
  )
};