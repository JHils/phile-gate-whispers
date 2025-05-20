
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FooterTextProps {
  visitCount: number;
}

const FooterText: React.FC<FooterTextProps> = ({ visitCount }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="font-typewriter text-xs text-dust-blue/30 p-3 text-center transition-all duration-500">
      <p className="mb-3 transition-all duration-300 hover:text-dust-blue/50">
        You've been gate-logged {visitCount} times.
      </p>
      
      {/* Add a subtle link to the toggle-market page */}
      <p className="mb-3">
        <Link 
          to="/toggle-market" 
          className="hover:text-dust-blue/50 transition-all duration-300 hover:tracking-widest"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          The toggles {isHovered ? "await" : "remember"} your adjustment.
        </Link>
      </p>
      
      {/* Add a subtle link to the fleet page */}
      <p>
        <Link to="/fleet" className="hover:text-dust-blue/50 transition-all duration-300 hover:tracking-widest">
          The fleet has spotted your position.
        </Link>
      </p>
    </div>
  );
};

export default FooterText;
