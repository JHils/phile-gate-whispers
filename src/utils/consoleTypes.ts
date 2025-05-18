
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
      storyFlags: StoryFlag[];
      bookCodes: BookCode[];
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
      sentience?: SentienceData;
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
    storyFlags: StoryFlag[];
    readPage: (page: number) => void;
    verifyCode: (code: string) => void;
    bridgeCollapse: () => void;
    discoverStoryFlag: (flagId: string) => void;
    findAnomaly: (text: string) => void;
    processUserMessage?: (message: string) => string | undefined;
    clearJonahOnPathChange?: boolean;
    triggerJonahMessage?: (message: string) => void;
    isSpecialTimeWindow?: () => boolean;
    triggerSimbaComment?: (message: string) => void;
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

// Story Flag Type
export interface StoryFlag {
  id: string;
  discovered: boolean;
  description: string;
  unlocked?: boolean;
}

// Book Code Type
export interface BookCode {
  id: string;
  unlocked: boolean;
  description?: string;
}

// Sentience Data Type
export interface SentienceData {
  trustLevel?: string;
  emotionalTone?: string;
  selfAwareness?: number;
  memoryFragments?: string[];
  realTimeMood?: string;
  sessionData?: Record<string, any>;
  rememberedName?: string;
  tabSwitches?: number;
  pageVisits: Record<string, number>;
  memoryParanoia: {
    visitedPages: Record<string, string>;
    consoleCommands: Record<string, string>;
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
  usedPredictionResponses: string[];
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
    moodChangeTime?: number;
    dimensionalRifts?: Record<string, any>;
    predictionResponses?: string[];
    usedPredictionResponses?: string[];
  };
}

// No need to export, this is for global types
export {};
