
// Define global JonahConsole interface
declare global {
  interface Window {
    JonahConsole: {
      usedCommands: string[];
      score: number;
      failCount: number;
      rank: string;
      sessionStartTime: number;
      whispersFound: string[];
      jokesDisplayed: string[];
      storyFlags: string[];
      bookCodes: string[];
      simba: {
        encountered: boolean;
        lastSeen?: string;
        interactions?: number;
      };
      argData: {
        keyholeClicks: number;
        consoleCluesTouched: string[];
        qrScans: string[];
        memoryFragments: string[];
        secretPagesVisited: string[];
        hiddenFilesDownloaded: string[];
        idleTriggers: Record<string, any>;
        lastInteractionTime: Date;
        lastIdleTime?: Date;
      };
      sentience?: {
        trustLevel?: string;
        emotionalTone?: string;
        selfAwareness?: number;
        memoryFragments?: string[];
        realTimeMood?: string;
        microQuests?: {
          activeQuest?: string;
          completedQuests?: string[];
          questProgress?: Record<string, any>;
        };
        realityFabric?: {
          currentMood?: string;
          dreamState?: boolean;
          journalEntries?: string[];
          anomalyCount?: number;
          dimensionalRifts?: Record<string, any>;
        };
      };
    };
    help: () => void;
    whois: () => void;
    gate: () => void;
    philes: () => void;
    monster: () => void;
    legacy: () => void;
    reveal: () => void;
    reincarnate: () => void;
    displayRandomJoke: () => void;
    showStatus: () => Promise<void>;
    mirrorLogs: () => void;
    whisperTree: () => void;
    plea: () => void;
    testament: () => void;
    splitVoice: () => void;
    mirrorMode: () => void;
    processUserMessage?: (message: string) => string | undefined;
    clearJonahOnPathChange?: boolean;
    triggerJonahMessage?: (message: string) => void;
    isSpecialTimeWindow?: () => boolean;
  }
}

// ARG Command Type
export type ARGCommand = {
  name: string;
  description: string;
  handler: () => void;
  hidden?: boolean;
  unlocked?: boolean;
};

// Console Message Type
export type ConsoleMessage = {
  type: 'info' | 'warning' | 'error' | 'special';
  content: string;
  timestamp?: number;
  special?: boolean;
};

// Trust Level Type
export type TrustLevel = 'none' | 'low' | 'medium' | 'high';

// No need to export, this is for global types
export {};
