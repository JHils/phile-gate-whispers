
/**
 * Console Commands - Main Export File
 */

import { UserState } from "@/hooks/useTrackingSystem";
import { TrackEventFunction, GetUserRankFunction } from "./types";

// Import command modules
import { statusCommand } from "./statusCommand";
import { helperFunctions } from "./helper";

// Export the functions for console command setup
export const setupConsoleCommands = (
  trackEvent: (eventName: string) => void,
  getUserRank: () => Promise<any>,
  userState: UserState
) => {
  // Set up the status command
  statusCommand.setupStatusCommand(trackEvent, getUserRank, userState);
  
  // Set up basic helper commands
  helperFunctions.setupHelperFunctions(trackEvent, userState);
  
  // Other command sets can be initialized here
};

// Export the initialize function
export const initializeConsoleCommands = (
  trackEvent: TrackEventFunction,
  getUserRank: GetUserRankFunction,
  userState: UserState
) => {
  setupConsoleCommands(trackEvent, getUserRank, userState);
};
