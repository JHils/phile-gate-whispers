
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NavLinksProps {
  trustLevel: string;
  isSpecialTime: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ trustLevel, isSpecialTime }) => {
  return (
    <div className="mt-8 flex flex-wrap gap-4 justify-center mobile-flex-wrap">
      <Link to="/campfire">
        <Button 
          variant="ghost" 
          className="text-dust-orange hover:text-dust-red hover:bg-black/20 border border-transparent hover:border-dust-red/30 transition-all duration-300 hover:scale-105"
        >
          Join the Campfire
        </Button>
      </Link>
      
      <Link to="/summerhouse">
        <Button 
          variant="ghost" 
          className="text-dust-blue hover:text-dust-red hover:bg-black/20 border border-transparent hover:border-dust-red/30 transition-all duration-300 hover:scale-105"
        >
          Visit Summerhouse
        </Button>
      </Link>
      
      <Link to="/webfail">
        <Button 
          variant="ghost" 
          className="text-silver hover:text-dust-blue hover:bg-black/20 border border-transparent hover:border-dust-blue/30 transition-all duration-300 hover:scale-105"
        >
          Web Failure
        </Button>
      </Link>
      
      {/* Hidden link to Toggle Market with very low opacity */}
      <Link to="/toggle-market" aria-label="Hidden Toggle Market">
        <Button 
          variant="ghost" 
          className="text-dust-red/10 hover:text-dust-red/60 hover:bg-black/20 border border-transparent hover:border-dust-red/30 text-xs transition-all duration-300 hover:opacity-60"
          style={{ opacity: 0.1 }}
        >
          Toggle Market
        </Button>
      </Link>
      
      {/* Ultra-hidden link to Journal - only visible to high trust or special time */}
      {(trustLevel === 'high' || (typeof window.isSpecialTimeWindow === 'function' && window.isSpecialTimeWindow())) && (
        <Link to="/i-see-you" aria-label="Journal">
          <Button 
            variant="ghost" 
            className="text-dust-red/5 hover:text-dust-red/30 hover:bg-black/20 border border-transparent hover:border-dust-red/20 text-[0.6rem] transition-all duration-300 hover:opacity-40"
            style={{ opacity: 0.05 }}
          >
            I See You
          </Button>
        </Link>
      )}
      
      {/* Hidden link to Split Voice page */}
      <Link to="/split-voice" aria-label="Split Voice">
        <Button 
          variant="ghost" 
          className="text-dust-red/3 hover:text-dust-red/40 hover:bg-black/20 border border-transparent hover:border-dust-red/20 text-[0.5rem] transition-all duration-300 hover:opacity-40"
          style={{ opacity: 0.03 }}
        >
          Split Voice
        </Button>
      </Link>
    </div>
  );
};

export default NavLinks;
