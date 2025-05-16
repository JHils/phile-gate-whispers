
// Define a central file for all console-related types to prevent duplications

// Game state interface for console interactions
export interface JonahConsoleState {
  usedCommands: string[];
  score: number;
  failCount: number;
  rank: string;
  lastCommand?: string;
  sessionStartTime: number;
  whispersFound: string[];
  jokesDisplayed: string[];
  storyFlags: StoryFlag[];
  bookCodes: BookCode[];
  simba: {
    encountered: boolean;
    lastSeen?: string;
  };
}

// Define StoryFlag interface
export interface StoryFlag {
  id: string;
  discovered: boolean;
  description: string;
}

// Define BookCode interface
export interface BookCode {
  id: string;
  unlocked: boolean;
}

// Define the WhisperMaster interface for TypeScript
export interface WhisperMaster {
  map: {[key: number]: string};
  audioFiles: string[];
  unlock: (index: number, playerName?: string) => void;
  playSound: (index: number) => void;
  updateLeaderboard: (name: string) => void;
  showMap: () => void;
  showLeaderboard: () => void;
}

// Declare global types to be available throughout the application
declare global {
  interface Window {
    JonahConsole: JonahConsoleState;
    WhisperMaster?: WhisperMaster;
    isSpecialTimeWindow: () => boolean;
    triggerSimbaComment: (pageId: string) => boolean;
    bridgeCollapse: () => void;
    
    // Console system commands
    timeCheck: () => void;
    traceCat: () => void;
    feedSimba: () => void;
    
    // Book commands
    readPage: (page: number) => void;
    verifyCode: (code: string) => void;
    
    // Add other global console-related functions here
    // Console basics
    help: () => void;
    whois: () => void;
    gate: () => void;
    philes: () => void;
    monster: () => void;
    legacy: () => void;
    reveal: () => void;
    reincarnate: () => void;
    showStatus: () => Promise<void>;
    // Story commands
    flipcoin: () => void;
    glitch: () => void;
    whisper: () => void;
    scream: () => void;
    burn: (command?: string) => void;
    decrypt: (code?: string) => void;
    echo: () => void;
    coinToss: () => void;
    griffProtocol: () => void;
    relocate: () => void;
    loopGesture: () => void;
    sixEleven: () => void;
    // Story flag functions
    discoverStoryFlag: (flagId: string) => boolean;
    storyFlags: () => void;
    mirrorCheck: () => void;
    findAnomaly: (text?: string) => void;
    // Other commands
    displayRandomJoke: () => void;
  }
}
