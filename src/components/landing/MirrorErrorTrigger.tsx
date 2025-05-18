
import React from 'react';

const MirrorErrorTrigger: React.FC = () => {
  const triggerMirrorError = () => {
    // Apply glitch effect
    const body = document.body;
    body.classList.add('white-flash');
    
    // Log to console
    console.log("%c> mirror://error|soul.trace.incomplete", "color: #ea384c;");
    
    // Add special command to JonahConsole
    if (window.JonahConsole) {
      window.JonahConsole.usedCommands.push("mirror_error");
    }
    
    // Reset glitch after a short delay
    setTimeout(() => {
      body.classList.remove('white-flash');
      
      // 30% chance to redirect to split-voice
      if (Math.random() < 0.3) {
        window.location.href = "/split-voice";
      }
    }, 1000);
  };

  return (
    <div 
      className="absolute right-8 bottom-20 cursor-pointer"
      onClick={triggerMirrorError}
    >
      <div className="relative">
        <span className="text-3xl text-[#212121]">⨂</span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#ea384c] rounded-full opacity-60"></div>
          <div className="absolute w-10 h-0.5 bg-[#ea384c] rotate-45 opacity-60 transform -translate-x-0 -translate-y-0"></div>
        </div>
      </div>
    </div>
  );
};

export default MirrorErrorTrigger;
