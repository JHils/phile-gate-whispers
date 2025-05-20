
/**
 * Helper functions for the console commands system
 */
import { TrackEventFunction, TrackCommandFunction } from "./types";

// Track a command execution and add to used commands
export const createCommandTracker = (
  trackEvent: TrackEventFunction
): TrackCommandFunction => {
  return (commandName: string) => {
    if (window.JonahConsole) {
      // Add to used commands if not already there
      if (!window.JonahConsole.usedCommands.includes(commandName)) {
        window.JonahConsole.usedCommands.push(commandName);
      }
      
      // Record the last command used
      window.JonahConsole.lastCommand = commandName;
      
      // Save to localStorage
      localStorage.setItem('jonahUsedCommands', JSON.stringify(window.JonahConsole.usedCommands));
    }
    
    // Track event
    trackEvent(`console_${commandName}_called`);
  };
};

// Record a fail attempt
export const createFailAttemptRecorder = () => {
  return () => {
    if (window.JonahConsole) {
      window.JonahConsole.failCount++;
      
      if (window.JonahConsole.failCount >= 3 && !window.JonahConsole.usedCommands.includes("reveal")) {
        console.log("%cYou're circling. Try reveal().", "color: #475B74; font-size:14px; font-style:italic;");
      }
    }
  };
};
