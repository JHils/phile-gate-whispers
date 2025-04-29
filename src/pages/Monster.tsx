
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Monster = () => {
  useEffect(() => {
    // Console message for those who find the monster
    console.log("%cThe Monster sees you now.", "color: #8B3A40; font-size:20px; font-weight:bold;");
    
    setTimeout(() => {
      console.log("%cYou fed him. You feed him still.", "color: #8B3A40; font-size:18px;");
    }, Math.random() * 2000 + 1000);
    
    setTimeout(() => {
      console.log("%cThere was no rescue plan. Only adaptation.", "color: #8B3A40; font-size:18px;");
    }, Math.random() * 3000 + 2000);
    
    setTimeout(() => {
      console.log("%cRegret is just memory bleeding backwards.", "color: #8B3A40; font-size:18px;");
    }, Math.random() * 4000 + 3000);
    
    document.body.classList.add('monster-active');
    
    return () => {
      document.body.classList.remove('monster-active');
    };
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="static-overlay absolute inset-0 opacity-30 pointer-events-none"></div>
      
      <div className="text-center max-w-md relative z-10 animate-text-shake">
        <h1 className="text-4xl md:text-5xl font-typewriter text-dust-red mb-8">
          You found him.
        </h1>
        
        <p className="text-xl text-phile-light mb-4">You woke him.</p>
        <p className="text-xl text-phile-light mb-4">He is patient.</p>
        <p className="text-xl text-phile-light mb-12">He is you.</p>
        
        <div className="mt-16">
          <Link 
            to="/philes"
            className="text-dust-blue hover:text-dust-red transition-colors text-sm"
          >
            Return to The Philes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Monster;
