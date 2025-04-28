
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
  text: string;
  path: string;
}

const HiddenNav: React.FC = () => {
  const [showNav, setShowNav] = useState(false);
  const [revealText, setRevealText] = useState("Learn More");
  
  const navItems: NavItem[] = [
    { text: "About Jonah", path: "/about" },
    { text: "Message The Gatekeeper", path: "/contact" }
  ];
  
  useEffect(() => {
    // Add scroll listener
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center items-center z-10">
      <div className={`transition-opacity duration-700 ${showNav ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-black/20 backdrop-blur-sm p-4 rounded-md">
          <div className="flex flex-col items-center space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className="text-dust-red hover:text-dust-blue transition-colors duration-300"
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-4 left-0 right-0 flex justify-center">
        <p className="text-dust-blue text-xs animate-subtle-flicker">
          {revealText}
        </p>
      </div>
    </div>
  );
};

export default HiddenNav;
