
import React from "react";

const BotStyles: React.FC = () => {
  return (
    <>
      {/* Import CSS for trust animations */}
      <link rel="stylesheet" href="/src/styles/trust-animations.css" />

      {/* CSS for glitch effects */}
      <style>
        {`
        .animate-glitch {
          animation: glitch 0.5s cubic-bezier(.25, .46, .45, .94) both;
        }
        
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
        
        .glitch-icon {
          position: relative;
        }
        
        .glitch-icon::before,
        .glitch-icon::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        
        .glitch-icon::before {
          background: rgba(255, 0, 0, 0.2);
          animation: glitch-animation 1s infinite linear alternate-reverse;
        }
        
        .glitch-icon::after {
          background: rgba(0, 0, 255, 0.2);
          animation: glitch-animation 0.7s infinite linear alternate;
        }
        
        @keyframes glitch-animation {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-1px, 1px);
          }
          40% {
            transform: translate(-1px, -1px);
          }
          60% {
            transform: translate(1px, 1px);
          }
          80% {
            transform: translate(1px, -1px);
          }
          100% {
            transform: translate(0);
          }
        }
        `}
      </style>
    </>
  );
};

export default BotStyles;
