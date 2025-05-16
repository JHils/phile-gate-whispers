
// Define common types for console commands
export interface JonahConsoleState {
  usedCommands: string[];
  score: number;
  failCount: number;
  rank: string;
  lastCommand?: string;
  sessionStartTime: number;
  whispersFound: string[];
  jokesDisplayed?: string[];
  bookCodes?: any[];
  storyFlags?: any[];
  simba?: any;
}

// Add console commands to the global window interface
declare global {
  interface Window {
    JonahConsole: JonahConsoleState;
    help: () => void;
    reveal: () => void;
    reincarnate: () => void;
    whois: () => void;
    gate: () => void;
    philes: () => void;
    monster: () => void;
    legacy: () => void;
    hint: () => void;
    flipcoin: () => void;
    glitch: () => void;
    whisper: () => void;
    scream: () => void;
    burn: (command?: string) => void;
    decrypt: (code?: string) => void;
    echo: () => void;
    coinToss: () => void;
    relocate: () => void;
    bridgeCollapse?: () => void;
    WhisperMaster?: any;
    bookCode?: (code?: string) => void;
    bookStatus?: () => void;
    readBetweenLines?: () => void;
    mirrorCheck?: () => void;
    traceSimba?: () => void;
  }
}
