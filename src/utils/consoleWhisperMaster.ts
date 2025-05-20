
// Import the centralized global types
import './types/globalConsoleTypes';
import { typewriterLog, glitchEffectLog } from './consoleEffects';

// Type definitions
import { WhisperMaster } from './consoleTypes';

type TrackCommandFunction = (commandName: string) => void;

export const initializeWhisperMaster = () => {
  // Initialize the WhisperMaster object
  if (typeof window !== 'undefined') {
    window.WhisperMaster = {
      whispers: [
        "The mirror doesn't always show what's there.",
        "The Gate only opens for those who don't need it.",
        "Jonah wasn't lost. He was found too many times.",
        "The spinning coin never lands.",
        "The Monster always wears familiar skin."
      ],
      discovered: [],
      active: true
    };
    
    // Initialize whisper tree command
    window.whisperTree = function(): string {
      // Display the whispers that have been found
      const discovered = window.WhisperMaster?.discovered || [];
      
      if (discovered.length === 0) {
        typewriterLog("You haven't found any whispers yet. Listen more carefully.");
        return "No whispers found yet.";
      }
      
      glitchEffectLog("WHISPER NETWORK ACCESS GRANTED");
      
      setTimeout(() => {
        console.log("%cWhispers found:", "color: #8B3A40; font-size:14px; font-weight:bold;");
        
        discovered.forEach((whisper, index) => {
          setTimeout(() => {
            console.log(`%c${index + 1}. ${whisper}`, "color: #8B3A40; font-size:14px; font-style:italic;");
          }, index * 800);
        });
      }, 1000);
      
      return `${discovered.length} whisper${discovered.length !== 1 ? 's' : ''} found.`;
    };
    
    // Initialize add whisper function
    window.addWhisper = function(whisper: string): boolean {
      if (!window.WhisperMaster) return false;
      
      // Check if already discovered
      if (window.WhisperMaster.discovered.includes(whisper)) {
        return false;
      }
      
      // Check if it's a valid whisper
      if (window.WhisperMaster.whispers.includes(whisper)) {
        window.WhisperMaster.discovered.push(whisper);
        
        // Update the global JonahConsole object too
        if (window.JonahConsole) {
          window.JonahConsole.whispersFound = window.WhisperMaster.discovered;
          window.JonahConsole.score += 25; // Award points for finding a whisper
        }
        
        return true;
      }
      
      return false;
    };
  }
};

// Declare necessary global functions for TypeScript
declare global {
  interface Window {
    WhisperMaster?: WhisperMaster;
    whisperTree?: () => string;
    addWhisper?: (whisper: string) => boolean;
  }
}
