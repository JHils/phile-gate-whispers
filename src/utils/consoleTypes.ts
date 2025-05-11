
// Define types and interfaces for console functionality

// Interface for the global JonahConsole object
declare global {
  interface Window {
    JonahConsole: {
      usedCommands: string[];
      score: number;
      failCount: number;
      rank: string;
      lastCommand?: string;
      sessionStartTime: number;
      whispersFound: string[];
      jokesDisplayed?: string[];
    };
    
    WhisperMaster?: {
      map: Record<number, string>;
      audioFiles: string[];
      unlock: (index: number, playerName?: string) => void;
      playSound: (index: number) => void;
      updateLeaderboard: (name: string) => void;
      showMap: () => void;
      showLeaderboard: () => void;
    };
    
    // Function declarations will be in their respective files
    displayRandomJoke: () => void;
    griffProtocol: () => void;
    relocate: () => void;
    loopGesture: () => void;
    sixEleven: () => void;
  }
}

// Export a dummy object to satisfy module requirements
export const consoleTypes = {};
