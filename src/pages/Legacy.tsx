
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Legacy = () => {
  useEffect(() => {
    // Console message for the legacy page
    console.log("%cWelcome, Gatekeeper.", "color: #475B74; font-size:18px; font-weight:bold;");
    
    setTimeout(() => {
      console.log("%cCongratulations, Gatekeeper.", "color: #475B74; font-size:16px;");
    }, Math.random() * 2000 + 1000);
    
    setTimeout(() => {
      console.log("%cYou saw through the cracks.", "color: #475B74; font-size:16px;");
    }, Math.random() * 3000 + 2000);
    
    setTimeout(() => {
      console.log("%cLegacy is not given. It is built.", "color: #475B74; font-size:16px;");
    }, Math.random() * 4000 + 3000);
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-4 relative" 
      style={{ 
        backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&q=80&w=1600&ixlib=rb-4.0.3')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom"
      }}
    >
      <div className="text-center max-w-md">
        <h1 className="text-4xl md:text-5xl font-typewriter text-dust-orange mb-8">
          Legacy
        </h1>
        
        <div className="space-y-6">
          <p className="text-xl text-phile-light">You understood what others missed.</p>
          <p className="text-xl text-phile-light">The story was survival.</p>
          <p className="text-xl text-phile-light mb-12">You are now a Gatekeeper.</p>
        </div>
        
        <div className="mt-12 p-4 bg-black/30 rounded border border-dust-blue/20">
          <a 
            href="#" 
            className="text-dust-orange hover:text-dust-red transition-colors inline-flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              alert("Audio file would download here in a real implementation");
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Author's Final Note (Audio)
          </a>
        </div>
        
        <div className="mt-16">
          <Link 
            to="/"
            className="text-dust-blue hover:text-dust-red transition-colors text-sm"
          >
            Return to The Gate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Legacy;
