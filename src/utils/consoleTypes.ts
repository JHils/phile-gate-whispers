
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
  argData: {
    keyholeClicks: number;
    consoleCluesTouched: string[];
    qrScans: string[];
    memoryFragments: string[];
    secretPagesVisited: string[];
    hiddenFilesDownloaded: string[];
    idleTriggers: {[page: string]: boolean};
    lastInteractionTime: Date | null;
    lastIdleTime?: number;
  };
  sentience?: SentienceData;
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

// Define ARG items and tracking
export interface ARGItem {
  id: string;
  name: string;
  discovered: boolean;
  linkedClues: string[];
  description: string;
}

// Define console command response based on trust level
export interface TrustLeveledResponse {
  low: string;
  medium: string;
  high: string;
}

// New type for Jonah's advanced sentience features
export interface SentienceData {
  memoryParanoia: {
    visitedPages: {[page: string]: string};
    consoleCommands: {[command: string]: string};
    pageDuration: {
      shortStay: string;
      longStay: string;
    };
  };
  predictionResponses: {
    onClickAfterHover: string[];
    repeatVisit: string[];
    lateClick: string[];
  };
  dualConsciousness: string[];
  jonahQuestions: string[];
  timeOfDayResponses: {
    "03:00": string;
    "04:00": string;
    Weekend: string;
    TabSwitch: string;
    ReturnAfterIdle: string;
  };
  nameEchoResponses: string[];
  personalDiaryTemplates: string[];
  
  // Tracking state
  rememberedName?: string;
  lastQuestion?: string;
  lastQuestionTime?: number;
  lastDualConsciousness?: number;
  tabSwitches: number;
  pageVisits: {[page: string]: number};
  usedPredictionResponses: string[];
  usedDualConsciousness: string[];
  usedQuestions: string[];
}

// Declare global types to be available throughout the application
declare global {
  interface Window {
    JonahConsole: JonahConsoleState;
    WhisperMaster?: WhisperMaster;
    isSpecialTimeWindow: () => boolean;
    triggerSimbaComment: (pageId: string) => boolean;
    triggerJonahMessage: (message: string) => void; // New function to trigger Jonah messages
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
    testament: () => void;
    // New ARG commands
    mirrorLogs: () => void;
    whisperTree: () => void;
    plea: () => void;
    // Story flag functions
    discoverStoryFlag: (flagId: string) => boolean;
    storyFlags: () => void;
    mirrorCheck: () => void;
    findAnomaly: (text?: string) => void;
    // Other commands
    displayRandomJoke: () => void;
  }
}
