
import React from 'react';

const BotStyles: React.FC = () => {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Bot container styles */
        .jonah-bot-container {
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease-in-out;
        }

        /* Bot icon animation */
        .jonah-bot-icon {
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        
        .jonah-bot-icon:hover {
          transform: scale(1.05);
        }
        
        /* Glitch animation */
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
          100% {
            transform: translate(0);
          }
        }
        
        .glitch-effect {
          animation: glitch 0.5s infinite;
        }
        
        /* Chat bubble animation */
        .message-bubble {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Typing indicator animation */
        .typing-indicator span {
          animation: blink 1.4s infinite both;
        }
        
        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes blink {
          0% {
            opacity: 0.1;
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0.1;
          }
        }
        
        /* Dream mode styles */
        .jonah-dream-mode {
          filter: hue-rotate(30deg) saturate(1.5);
        }
      `
    }} />
  );
};

export default BotStyles;
