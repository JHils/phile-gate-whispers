
import React, { useEffect, useState } from 'react';

const HeaderTitle: React.FC = () => {
  const [glitchActive, setGlitchActive] = useState(false);

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
    <h1 
      id="main-header" 
      className="text-6xl md:text-8xl font-serif mb-6 text-[#212121] tracking-wider leading-tight"
      style={{ 
        textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
        fontFamily: '"IM Fell English SC", serif'
      }}
    >
      JONAH'S PHILES
    </h1>
  );
};

export default HeaderTitle;
