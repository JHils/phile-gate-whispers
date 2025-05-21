
/**
 * Console Commands - Main file
 * This file is kept for backward compatibility and now imports from the modularized system
 */

import { UserState } from "@/hooks/useTrackingSystem";
import { statusCommand } from "./statusCommand";
import { helperFunctions } from "./helper";
import { initializeBookCodes } from "../consoleBookCommands";

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
