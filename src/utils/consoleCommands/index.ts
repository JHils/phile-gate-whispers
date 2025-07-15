/**
 * Console Commands - Main File
 * This file exports all console commands
 */

import { UserState } from "@/hooks/useTrackingSystem";
import { statusCommand } from "./statusCommand";
import { helperFunctions } from "./helper";
import { initializeCommunityCommands } from './communityCommands';

// Type for getRank function
type GetUserRankFunction = () => Promise<{ 
  rank: string; 
  score: number; 
  position: number;
  userHash: string;
}>;

// Type for trackEvent function
type TrackEventFunction = (eventName: string) => void;

// Initialize console commands
export const initializeConsoleCommands = (
  trackEvent: TrackEventFunction,
  getUserRank: GetUserRankFunction,
  userState: UserState
) => {
  // Setup helper commands
  if (!window.help) {
    window.help = helperFunctions.help;
  }
  
  if (!window.echo_me) {
    window.echo_me = helperFunctions.echo_me;
  }
  
  // Setup status command
  if (!window.showStatus) {
    window.showStatus = statusCommand.showStatus;
  }

  // Initialize community commands
  initializeCommunityCommands();

  console.log("Console commands initialized");
};
