
import React from 'react';
import { Link } from 'react-router-dom';

interface FooterTextProps {
  visitCount: number;
}

const FooterText: React.FC<FooterTextProps> = ({ visitCount }) => {
  return (
    <div className="font-typewriter text-xs text-dust-blue/30 p-3 text-center">
      <p className="mb-3">You've been gate-logged {visitCount} times.</p>
      {/* Add a subtle link to the toggle-market page */}
      <p className="mb-3">
        <Link to="/toggle-market" className="hover:text-dust-blue/50 transition-colors">
          The toggles remember your adjustment.
        </Link>
      </p>
      {/* Add a subtle link to the fleet page */}
      <p>
        <Link to="/fleet" className="hover:text-dust-blue/50 transition-colors">
          The fleet has spotted your position.
        </Link>
      </p>
    </div>
  );
};

export default FooterText;
