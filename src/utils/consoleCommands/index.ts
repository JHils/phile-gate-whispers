
/**
 * Console Commands System - Main export file
 */

// Import type definitions
import { UserState } from "@/hooks/useTrackingSystem";
import { GetUserRankFunction, TrackEventFunction } from './types';

// Import command modules
import { setupStatusCommand } from './statusCommand';
import { setupHelpFunction } from './helper';

// Import from our initialization modules
import { initializeBookCodes } from "../consoleBookCommands";
import { initializeClueSystem } from "../consoleClueSystem";

// Initialize all console commands
export const initializeConsoleCommands = (
  trackEvent: TrackEventFunction,
  getUserRank: GetUserRankFunction,
  userState: UserState
) => {
  // Set up basic commands
  setupHelpFunction(trackEvent);
  setupStatusCommand(getUserRank, trackEvent);
  
  // Initialize clue systems
  initializeClueSystem();
  initializeBookCodes();
  
  // Add user state to window object for debugging
  if (process.env.NODE_ENV !== 'production') {
    (window as any).__userState = userState;
  }
  
  console.log("Console commands initialized");
};
