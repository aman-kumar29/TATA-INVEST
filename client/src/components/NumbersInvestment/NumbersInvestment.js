import React, {useState, useEffect} from 'react';
import investmentImage from '../../assets/numbers.jpg' // Import your image file
import investmentImageMobile from '../../assets/numbers-phone.jpg' // Import your image file

export default function NumbersInvestment() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div>
      <img src={isMobile? investmentImageMobile : investmentImage} alt="Investment" style={{ width: '100%', height: '400px' }} />
    </div>
  );
}
