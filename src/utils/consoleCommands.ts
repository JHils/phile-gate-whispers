
/**
 * Console Commands - Main file
 * This file is kept for backward compatibility and now imports from the modularized system
 */

import { UserState } from "@/hooks/useTrackingSystem";
import { initializeConsoleCommands as initializeModularConsoleCommands } from "./consoleCommands/index";

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
  // Call the modular implementation
  initializeModularConsoleCommands(trackEvent, getUserRank, userState);
};
