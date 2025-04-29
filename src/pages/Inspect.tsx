
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import HiddenLink from "../components/HiddenLink";

const Inspect = () => {
  useEffect(() => {
    // Console message for the inspector
    console.log("%cYou're getting closer. Keep looking.", "color: #475B74; font-size:16px;");
    
    setTimeout(() => {
      console.log("%cMonitor activated. Surveillance node awake.", "color: #475B74; font-size:14px;");
    }, Math.random() * 2000 + 1000);
    
    setTimeout(() => {
      console.log("%cError 7G: Hidden path found. /philes", "color: #475B74; font-size:14px;");
    }, Math.random() * 3000 + 2000);
    
    setTimeout(() => {
      console.log("%cLegacy sleeps behind broken images.", "color: #475B74; font-size:14px;");
    }, Math.random() * 4000 + 3000);
  }, []);

  return (
    <div className="min-h-screen bg-phile-dark flex flex-col items-center justify-center px-4">
      {/* Hidden comments for inspection */}
      {/* <!-- Hidden path: /philes --> */}
      {/* <!-- Time is not your ally. --> */}
      {/* <!-- Surveillance node activated. --> */}
      {/* <!-- Monster Mode dormant. --> */}

      <div className="text-center">
        <div className="mb-8 p-8 border border-dashed border-dust-blue/30 inline-block">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="120" 
            height="120" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-dust-red/70"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <path d="M3.29 7 12 12l8.71-5"></path>
            <line x1="12" y1="22" x2="12" y2="12"></line>
          </svg>
          <p className="text-sm text-silver mt-2">Image failed to load.</p>
        </div>

        <h1 className="text-3xl md:text-4xl font-typewriter text-dust-orange mb-6">
          Inspect the Coin
        </h1>

        <p className="text-lg text-phile-light animate-subtle-flicker">
          Something's missing. But not for those who look deeper.
        </p>

        <div className="mt-12">
          <Link 
            to="/"
            className="text-dust-blue hover:text-dust-red transition-colors text-sm"
          >
            Return to The Gate
          </Link>
        </div>
        
        {/* Hidden link to legacy page */}
        <div className="mt-16 opacity-5 text-phile-dark">
          <HiddenLink
            text="Legacy Hidden."
            password="IAMJOSEPH"
            redirectPath="/legacy"
            className="text-xs"
          />
        </div>
      </div>
    </div>
  );
};

export default Inspect;
