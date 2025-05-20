
/**
 * Shared types for console commands system
 */

// Define type for getRank function to ensure proper typing
export type GetUserRankFunction = () => Promise<{ 
  rank: string; 
  score: number; 
  position: number;
  userHash: string;
}>;

// Define type for trackEvent function
export type TrackEventFunction = (eventName: string) => void;

// Define type for trackCommand function
export type TrackCommandFunction = (commandName: string) => void;

// Define type for user state
import { UserState } from "@/hooks/useTrackingSystem";
export type UserStateType = UserState;

