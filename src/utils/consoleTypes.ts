
// Define the console state interface
export interface JonahConsoleState {
  usedCommands: string[];
  score: number;
  failCount: number;
  rank: string;
  lastCommand?: string;
  sessionStartTime: number;
  whispersFound: string[];
  bookCodes?: {
    codes: string[];
    unlockedPages: number[];
  };
  simba?: {
    encountered: boolean;
    awarenessLevel: number;
    interactions: any[];
    lastInteraction: number;
  };
}

// Global window interface
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
    showStatus: () => Promise<void>;
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
    // New commands
    bookCode: (code?: string) => void;
    bookStatus: () => void;
    readBetweenLines: () => void;
    mirrorCheck: () => void;
    storyFlags: () => void;
    findAnomaly: (text?: string) => void;
    timeCheck: () => void;
    traceSimba: () => void;
    simbaStatus: () => void;
    decodeSimba: (code?: string) => void;
    // Bird and new commands
    avianBlessing: () => void;
    blessMe: () => void;
    initiateBirdProtocol: () => void;
    fleetSeenYou: () => void;
    messageYourself: () => void;
    bullsBalls: () => void;
    gav007: () => void;
    louisBarton: () => void;
    bridgeWhisperer: () => void;
    // Whisper functionality
    displayRandomJoke: () => void;
    griffProtocol: () => void;
    loopGesture: () => void;
    sixEleven: () => void;
  }
}
