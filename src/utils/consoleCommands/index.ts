
/**
 * Console Commands - Main file
 * This file is kept for backward compatibility and now imports from the modularized system
 */

import { UserState } from "@/hooks/useTrackingSystem";
import { statusCommand } from "./statusCommand";
import { helperFunctions } from "./helper";

// Create a simple book codes initializer function
function initializeBookCodes() {
  // Check if book codes already exist in localStorage
  const existingCodes = localStorage.getItem('bookCodes');
  if (!existingCodes) {
    // Initialize with empty array if none exist
    localStorage.setItem('bookCodes', JSON.stringify([]));
  }
  console.log("Book codes initialized");
}

// Define type for getRank function to ensure proper typing
type GetUserRankFunction = () => Promise<{ 
  rank: string; 
  score: number; 
  position: number;
  userHash: string;
}>;

// Define type for trackEvent function
type TrackEventFunction = (eventName: string) => void;

// Initialize console functions on the window object - Direct pass-through to modular system
export const initializeConsoleCommands = (
  trackEvent: TrackEventFunction,
  getUserRank: GetUserRankFunction,
  userState: UserState
) => {
  // Initialize book codes
  initializeBookCodes();

  // Set up status command
  statusCommand.setupStatusCommand(trackEvent, getUserRank, userState);

  // Setup helper functions
  helperFunctions.setupHelperFunctions(trackEvent, userState);
  
  console.log("Console commands initialized");
};

// Export the command types
export * from "./types";
