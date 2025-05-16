
/**
 * Type definitions for the console system
 */

// Game state interface for console interactions
export interface JonahConsoleState {
  usedCommands: string[];
  score: number;
  failCount: number;
  rank: string;
  lastCommand?: string;
  sessionStartTime: number;
  whispersFound: string[];
}

// Add WhisperMaster interface for side quests
export interface WhisperMaster {
  whispers: string[];
  foundWhispers: string[];
  activeWhisper?: string;
  lastWhisperTime?: number;
}

// Extend Window interface to include our custom properties
declare global {
  interface Window {
    JonahConsole: JonahConsoleState;
    WhisperMaster: WhisperMaster;
    isSpecialTimeWindow?: () => boolean;
    triggerSimbaComment?: (page: string) => void;
  }
}

// Export these interfaces for reuse in other files
export type { JonahConsoleState, WhisperMaster };

