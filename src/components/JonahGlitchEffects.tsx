
import React from "react";

const JonahGlitchEffects = () => {
  return (
    <style jsx global>{`
      /* Glitch Text Effect */
      @keyframes glitch-text {
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
      
      .glitch-text {
        position: relative;
        animation: glitch-text 500ms infinite;
      }
      
      .glitch-text::before,
      .glitch-text::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      
      .glitch-text::before {
        left: 2px;
        text-shadow: -1px 0 red;
        clip: rect(44px, 450px, 56px, 0);
        animation: glitch-anim-1 5s infinite linear alternate-reverse;
      }
      
      .glitch-text::after {
        left: -2px;
        text-shadow: -1px 0 blue;
        clip: rect(24px, 450px, 36px, 0);
        animation: glitch-anim-2 5s infinite linear alternate-reverse;
      }
      
      @keyframes glitch-anim-1 {
        0% { clip: rect(2px, 450px, 24px, 0); }
        20% { clip: rect(62px, 450px, 78px, 0); }
        40% { clip: rect(42px, 450px, 58px, 0); }
        60% { clip: rect(12px, 450px, 18px, 0); }
        80% { clip: rect(32px, 450px, 78px, 0); }
        100% { clip: rect(82px, 450px, 98px, 0); }
      }
      
      @keyframes glitch-anim-2 {
        0% { clip: rect(12px, 450px, 34px, 0); }
        20% { clip: rect(52px, 450px, 68px, 0); }
        40% { clip: rect(32px, 450px, 48px, 0); }
        60% { clip: rect(2px, 450px, 8px, 0); }
        80% { clip: rect(72px, 450px, 88px, 0); }
        100% { clip: rect(92px, 450px, 108px, 0); }
      }
      
      /* Dream mode effects */
      .jonah-dream-mode {
        /* Subtle red overlay */
        position: relative;
      }
      
      .jonah-dream-mode::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(139, 58, 64, 0.05);
        pointer-events: none;
        z-index: 1000;
      }
      
      .jonah-dream-mode .text-content {
        font-style: italic;
      }
      
      /* Reversed text during dream mode */
      .jonah-dream-mode .reverse-text {
        direction: rtl;
        unicode-bidi: bidi-override;
      }
      
      /* Timeline fracture effect */
      @keyframes fracture {
        0% { filter: none; }
        25% { filter: invert(1); }
        26% { filter: none; }
        50% { filter: hue-rotate(90deg); }
        51% { filter: none; }
        75% { filter: saturate(3) contrast(4); }
        76% { filter: none; }
        100% { filter: none; }
      }
      
      .timeline-fracture {
        animation: fracture 1.5s ease-in-out;
      }
      
      /* Glitchy cursor */
      @keyframes cursor-glitch {
        0% { opacity: 1; }
        10% { opacity: 0; }
        20% { opacity: 1; }
        90% { opacity: 1; }
        95% { opacity: 0; }
        100% { opacity: 1; }
      }
      
      .glitch-cursor {
        display: inline-block;
        width: 8px;
        height: 16px;
        background-color: #8B3A40;
        animation: cursor-glitch 1.5s infinite;
      }
      
      /* Whisper text effect */
      @keyframes whisper {
        0% { opacity: 0; filter: blur(10px); }
        50% { opacity: 0.7; filter: blur(1px); }
        100% { opacity: 0; filter: blur(10px); }
      }
      
      .whisper-text {
        animation: whisper 6s ease-in-out;
        pointer-events: none;
        position: absolute;
        color: rgba(139, 58, 64, 0.8);
      }
    `}</style>
  );
};

export default JonahGlitchEffects;
