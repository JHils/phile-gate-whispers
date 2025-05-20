
import React from 'react';

const BotStyles: React.FC = () => {
  return (
    <style jsx global>{`
      /* Bot container animations */
      @keyframes botEnter {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes botExit {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(20px); }
      }
      
      @keyframes botMinimize {
        from { height: var(--full-height); }
        to { height: 42px; }
      }
      
      @keyframes botMaximize {
        from { height: 42px; }
        to { height: var(--full-height); }
      }
      
      /* Message typing animation */
      @keyframes typingAnimation {
        0% { opacity: 0.3; }
        50% { opacity: 1; }
        100% { opacity: 0.3; }
      }
      
      .typing-dot {
        animation: typingAnimation 1.5s infinite ease-in-out;
      }
      
      .typing-dot:nth-child(1) { animation-delay: 0s; }
      .typing-dot:nth-child(2) { animation-delay: 0.5s; }
      .typing-dot:nth-child(3) { animation-delay: 1s; }
      
      /* Glitch effects */
      @keyframes glitch {
        0% {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          transform: translate(0);
        }
        20% {
          clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%);
          transform: translate(-5px, 5px);
        }
        30% {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          transform: translate(0);
        }
        50% {
          clip-path: polygon(0 60%, 100% 60%, 100% 61%, 0 61%);
          transform: translate(5px, 0);
        }
        52% {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          transform: translate(0);
        }
        70% {
          clip-path: polygon(0 85%, 100% 85%, 100% 86%, 0 86%);
          transform: translate(-3px, 0);
        }
        72% {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          transform: translate(0);
        }
        100% {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          transform: translate(0);
        }
      }
      
      .animate-glitch {
        animation: glitch 2s ease-in-out infinite;
      }
      
      /* Dream mode styles */
      .jonah-dream-mode .bot-message {
        font-style: italic;
        text-shadow: 0 0 8px rgba(255,0,0,0.5);
      }
      
      /* Ghost text effect */
      @keyframes ghostFadeIn {
        0% { opacity: 0; filter: blur(10px); }
        100% { opacity: 0.7; filter: blur(1px); }
      }
      
      .ghost-text {
        animation: ghostFadeIn 2s ease-out forwards;
        pointer-events: none;
      }
      
      /* Console hint animation */
      @keyframes consoleBlink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      
      .console-hint {
        animation: consoleBlink 1.5s infinite ease-in-out;
      }
    `}</style>
  );
};

export default BotStyles;
