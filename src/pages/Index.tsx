
import React, { useEffect } from "react";
import SpinningCoin from "../components/SpinningCoin";
import HiddenNav from "../components/HiddenNav";

const Index = () => {
  // Add classes to individual characters for staggered animation
  const addSpans = (text: string) => {
    return text.split('').map((char, i) => 
      <span key={i} style={{ animationDelay: `${i * 0.1}s` }}>{char}</span>
    );
  };

  useEffect(() => {
    // Console message for the curious
    console.log("%cThe Gate is watching.", "color: #8B3A40; font-size:14px;");
    
    // Additional console messages with delays for creepier effect
    setTimeout(() => {
      console.log("%cThe Gate is open. But you are not ready.", "color: #8B3A40; font-size:14px;");
    }, Math.random() * 2000 + 1000);
    
    setTimeout(() => {
      console.log("%cTracking signal unstable. Coin spinning beyond threshold.", "color: #8B3A40; font-size:14px;");
    }, Math.random() * 3000 + 2000);
    
    setTimeout(() => {
      console.log("%cLeft was never right. Forward was a lie.", "color: #8B3A40; font-size:14px;");
    }, Math.random() * 4000 + 3000);
    
    // Define help function for console Easter egg
    // @ts-ignore - This is intentionally added to window
    window.help = function() {
      console.log("%cHelp was never coming. You were always the Gatekeeper.", "color: #8B3A40; font-size:16px; font-weight:bold;");
    };
  }, []);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative bg-cover bg-center overflow-hidden" 
      style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&q=80&w=1600&ixlib=rb-4.0.3')" }}
    >
      {/* Hidden comments for inspection */}
      {/* <!-- Phile initiated. Tracking subject... --> */}
      {/* <!-- The coin will fall. --> */}
      {/* <!-- Warning: Surface Integrity Failing. --> */}
      {/* <!-- The Gate watches. --> */}
      {/* <!-- Left was never right. --> */}
      {/* <!-- Coin Toss initiated. --> */}
      
      <div className="phile-container text-center z-10">
        <h1 className="text-4xl md:text-6xl font-serif mb-6 text-phile-light">Jonah's Philes</h1>
        
        <SpinningCoin />
        
        <div className="mt-12 space-y-8">
          <p className="text-xl md:text-2xl text-dust-orange font-typewriter text-reveal">
            {addSpans("Some things you don't find.")}
            <br />
            {addSpans("They find you.")}
          </p>
          
          <p className="text-xl md:text-2xl text-phile-light font-typewriter animate-subtle-flicker">
            The Gate is already open.
          </p>
          
          <p className="text-lg md:text-xl text-dust-blue font-typewriter mt-8">
            Find the Gate before the Gate finds you.
          </p>
        </div>
      </div>
      
      <HiddenNav />
      
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
    </div>
  );
};

export default Index;
