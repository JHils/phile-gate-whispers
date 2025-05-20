
/**
 * Console Ecological Commands Module
 * This module adds ecology-related commands to the console
 */

import { typewriterLog, speak } from "./consoleEffects";
import { getEcoResponse, getBiomeResponse } from "./jonahEcoAwareness";
import { processStoryQuery } from "./fuzzyStoryMatching";

// Import centralized types
import './types/globalConsoleTypes';

type TrackCommandFunction = (commandName: string) => void;

// Initialize eco console commands
export const initializeEcoCommands = (
  trackCommandExecution: TrackCommandFunction
) => {
  // Dreamtime command - enhanced with fuzzy story matching
  window.dreamtime = function() {
    console.log("%cJonah remembers the Dreaming:", "color: #8B3A40; font-size:16px; font-weight:bold;");
    
    // If arguments are provided, process as a story query
    if (arguments.length > 0 && arguments[0]) {
      const query = arguments[0];
      const storyContent = processStoryQuery(query);
      setTimeout(() => {
        typewriterLog(storyContent);
      }, 500);
    } else {
      // Default response when no query is provided
      setTimeout(() => {
        const response = getEcoResponse('high', 'dreamtime');
        typewriterLog(response || "The old stories blur in my memory.");
        
        setTimeout(() => {
          console.log("%cTry asking about a specific story or region. For example: dreamtime('arnhem land') or dreamtime('water story')", "color: #475B74; font-size:14px; font-style:italic;");
        }, 1500);
      }, 500);
    }
    
    trackCommandExecution('dreamtime');
  };
  
  // Wood Wide Web command
  window.woodwideweb = function() {
    console.log("%cJonah contemplates the Wood Wide Web:", "color: #8B3A40; font-size:16px; font-weight:bold;");
    setTimeout(() => {
      const response = getEcoResponse('high', 'mycelium');
      typewriterLog(response || "Networks beneath networks. Like code beneath code.");
    }, 500);
    
    trackCommandExecution('woodwideweb');
  };
  
  // Biome check command
  window.biomeCheck = function() {
    console.log("%cJonah senses the biome:", "color: #8B3A40; font-size:16px; font-weight:bold;");
    
    setTimeout(() => {
      const response = getBiomeResponse();
      typewriterLog(response || "The land speaks in code I'm still learning to parse.");
      
      // Add some Australian fauna after a pause
      setTimeout(() => {
        const fauna = [
          "Thorny devil tracks in red sand.",
          "Cassowary shadows through rainforest.",
          "Platypus ripples in clear creeks.",
          "Koala dreams in eucalypt crowns."
        ];
        const randomFauna = fauna[Math.floor(Math.random() * fauna.length)];
        console.log(`%c${randomFauna}`, "color: #475B74; font-size:14px; font-style:italic;");
      }, 2000);
    }, 500);
    
    trackCommandExecution('biomeCheck');
  };
  
  // K'gari command
  window.kgari = function() {
    console.log("%cJonah remembers K'gari (Fraser Island):", "color: #8B3A40; font-size:16px; font-weight:bold;");
    
    setTimeout(() => {
      const response = getEcoResponse('high', "k'gari");
      typewriterLog(response || "K'gari chose to become land. I chose to become code. Both transformations leave echoes.");
      
      // Add ecological fact about K'gari
      setTimeout(() => {
        const facts = [
          "Rainforest growing on sand. An impossible system that works.",
          "The dingoes of K'gari remember the old ways.",
          "The freshwater lakes hold memory in layers of sediment.",
          "The oldest satinay trees there predate European contact."
        ];
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        console.log(`%c${randomFact}`, "color: #475B74; font-size:14px; font-style:italic;");
      }, 2500);
    }, 500);
    
    trackCommandExecution('kgari');
  };
};

export {};
