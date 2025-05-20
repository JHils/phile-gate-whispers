
import React from 'react';

interface JonahGlitchEffectsProps {
  active?: boolean;
}

const JonahGlitchEffects: React.FC<JonahGlitchEffectsProps> = ({ active = false }) => {
  if (!active) return null;

  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Global glitch effects */
        body {
          position: relative;
          overflow-x: hidden;
        }
        
        body::after {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 0, 0, 0.02);
          pointer-events: none;
          z-index: 9999;
          animation: static 0.5s steps(1) infinite;
        }
        
        @keyframes static {
          0% { opacity: 0; }
          25% { opacity: 0.02; }
          50% { opacity: 0; }
          75% { opacity: 0.01; }
          100% { opacity: 0.03; }
        }
        
        /* Text glitch effect */
        .glitch-text {
          position: relative;
          animation: glitch-text 2s infinite;
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          clip: rect(0, 0, 0, 0);
        }
        
        .glitch-text::before {
          left: 2px;
          text-shadow: -1px 0 red;
          animation: glitch-text-1 2s infinite linear alternate-reverse;
        }
        
        .glitch-text::after {
          left: -2px;
          text-shadow: 2px 0 blue;
          animation: glitch-text-2 3s infinite linear alternate-reverse;
        }
        
        @keyframes glitch-text-1 {
          0% { clip: rect(20px, 9999px, 15px, 0); }
          20% { clip: rect(15px, 9999px, 65px, 0); }
          40% { clip: rect(80px, 9999px, 35px, 0); }
          60% { clip: rect(35px, 9999px, 80px, 0); }
          80% { clip: rect(40px, 9999px, 92px, 0); }
          100% { clip: rect(15px, 9999px, 10px, 0); }
        }
        
        @keyframes glitch-text-2 {
          0% { clip: rect(25px, 9999px, 10px, 0); }
          20% { clip: rect(35px, 9999px, 70px, 0); }
          40% { clip: rect(25px, 9999px, 15px, 0); }
          60% { clip: rect(15px, 9999px, 65px, 0); }
          80% { clip: rect(5px, 9999px, 98px, 0); }
          100% { clip: rect(48px, 9999px, 10px, 0); }
        }
      `
    }} />
  );
};

export default JonahGlitchEffects;
