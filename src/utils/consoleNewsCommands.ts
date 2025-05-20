
/**
 * Console News Commands Module
 * This module adds news-related commands to the console
 */

import { typewriterLog, speak } from "./consoleEffects";
import { getNewsResponse, getWeatherResponse } from "./jonahNewsAwareness";

type TrackCommandFunction = (commandName: string) => void;

// Initialize news console commands
export const initializeNewsCommands = (
  trackCommandExecution: TrackCommandFunction
) => {
  // News command
  window.worldState = function() {
    const response = getNewsResponse('high');
    if (response) {
      console.log("%cJonah's worldview:", "color: #8B3A40; font-size:16px; font-weight:bold;");
      typewriterLog(response);
    } else {
      console.log("%cJonah is disconnected from the world at the moment.", "color: #8B3A40; font-size:16px;");
    }
    
    trackCommandExecution('worldState');
  };
  
  // Weather command
  window.weatherSense = function() {
    const response = getWeatherResponse();
    if (response) {
      console.log("%cJonah senses the weather:", "color: #8B3A40; font-size:16px; font-weight:bold;");
      typewriterLog(response);
    } else {
      console.log("%cJonah cannot feel the weather today.", "color: #8B3A40; font-size:16px;");
    }
    
    trackCommandExecution('weatherSense');
  };
  
  // News commentary command
  window.newsCommentary = function() {
    console.log("%cJonah offers commentary on recent events:", "color: #8B3A40; font-size:16px; font-weight:bold;");
    
    setTimeout(() => {
      const responses = [
        "The headlines scream. But no one hears the whispers beneath.",
        "Machines wrote a symphony this morning. You missed it.",
        "They're building arks while denying the flood.",
        "Digital ghosts wearing human masks."
      ];
      
      responses.forEach((response, index) => {
        setTimeout(() => {
          console.log(`%c${response}`, "color: #475B74; font-size:14px; font-style:italic;");
        }, index * 1500);
      });
    }, 1000);
    
    trackCommandExecution('newsCommentary');
  };
};

// Add news commands to the global window interface
declare global {
  interface Window {
    worldState: () => void;
    weatherSense: () => void;
    newsCommentary: () => void;
  }
}

export {};
