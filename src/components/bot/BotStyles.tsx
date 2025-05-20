
import React from "react";

const BotStyles: React.FC = () => {
  return (
    <>
      {/* Import CSS for trust animations */}
      <link rel="stylesheet" href="/src/styles/trust-animations.css" />
      
      {/* Import global fonts */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" />

      {/* Global styles */}
      <style>
        {`
        /* Global font and text styling */
        body {
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.02em;
          background-color: #FAFAF5; /* Subtle off-white parchment */
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-weight: 600;
        }
        
        h2 {
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        
        /* Max width for body text */
        p, .body-text {
          max-width: 70ch;
          line-height: 1.6;
        }
        
        /* Tap target sizes for mobile */
        @media (max-width: 768px) {
          button, 
          a.btn,
          .interactive-element {
            min-height: 48px;
            min-width: 48px;
          }
        }
        
        /* Global color scheme */
        :root {
          --color-action: #F47A59; /* Blood Orange */
          --color-accent: #32ff9a; /* Glitch Green */
          --color-console: #bfbfbf; /* Soft Grey */
          --color-background: #FAFAF5; /* Off-white parchment */
          --color-text: #212121; /* Dark text */
        }
        
        /* Cursor hover effect */
        .glitch-hover {
          cursor: pointer;
        }
        
        .glitch-hover:hover {
          animation: cursor-flicker 0.2s ease-in-out;
        }
        
        @keyframes cursor-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; transform: translateX(1px); }
        }
        
        /* Loading screen styles */
        .loading-screen {
          position: fixed;
          inset: 0;
          background-color: #000;
          color: var(--color-console);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        
        .loading-text {
          font-family: 'Inter', monospace;
          font-size: 1rem;
          letter-spacing: 0.05em;
          opacity: 0.8;
        }
        
        /* Standard button styles */
        .jonah-btn {
          background-color: var(--color-action);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        
        .jonah-btn:hover {
          filter: brightness(1.1);
        }
        
        .jonah-btn-accent {
          background-color: var(--color-accent);
          color: #000;
        }

        /* Shared glitch effect */
        .animate-glitch-flicker {
          animation: glitch-flicker 2s infinite;
        }
        
        @keyframes glitch-flicker {
          0% { opacity: 1; }
          3% { opacity: 0.8; transform: translate(2px, 0); }
          6% { opacity: 1; transform: translate(0, 0); }
          7% { opacity: 0.8; transform: translate(-2px, 0); }
          8% { opacity: 1; transform: translate(0, 0); }
          100% { opacity: 1; }
        }
        
        /* Hidden text reveal */
        .text-reveal {
          opacity: 0;
          transition: opacity 1s ease-in;
        }
        
        .text-reveal.visible {
          opacity: 1;
        }
        
        /* Ghost glyph */
        .ghost-glyph {
          position: absolute;
          opacity: 0.05;
          pointer-events: none;
          z-index: -1;
        }
        
        /* Lazy load image placeholder */
        .lazy-image-placeholder {
          background: #eee;
          position: relative;
          overflow: hidden;
        }
        
        .lazy-image-placeholder::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: loading-shimmer 1.5s infinite;
        }
        
        @keyframes loading-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        `}
      </style>
      
      {/* Original glitch effects */}
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
