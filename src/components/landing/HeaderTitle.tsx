
import React, { useEffect, useState } from 'react';
import { useIsMobile } from "../../hooks/use-mobile";
import JonahLogo from '../JonahLogo';

const HeaderTitle: React.FC = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  const isMobile = useIsMobile();

  // Trigger second visit behavior - show Joseph Hilson name briefly
  useEffect(() => {
    const visitCount = parseInt(localStorage.getItem('visitCount') || '0', 10);
    if (visitCount > 1) {
      setTimeout(() => {
        const headerElement = document.getElementById('main-header');
        if (headerElement) {
          headerElement.classList.add('white-flash');
          setTimeout(() => {
            headerElement.textContent = "JOSEPH HILSON";
            setTimeout(() => {
              headerElement.classList.remove('white-flash');
              headerElement.textContent = "JONAH'S PHILES";
            }, 300);
          }, 100);
        }
      }, 5000);
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <JonahLogo 
        variant="glyph"
        size="lg"
        className="mb-4"
      />
      <h1 
        id="main-header" 
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-serif mb-4 md:mb-6 text-[#212121] tracking-wider leading-tight"
        style={{ 
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
          fontFamily: '"IM Fell English SC", serif',
        }}
      >
        JONAH'S PHILES
      </h1>
    </div>
  );
};

export default HeaderTitle;
