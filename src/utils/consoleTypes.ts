
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
      lastCommand?: string; // Add missing lastCommand property
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
    // Console command definitions
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
    storyFlags: () => void; // Changed from StoryFlag[] to function
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
    // Missing console commands
    mirrorCheck: () => void;
    timeCheck: () => void;
    traceCat: () => void;
    feedSimba: () => void;
    WhisperMaster?: any;
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

// WhisperMaster Type
export interface WhisperMaster {
  whispers: string[];
  discovered: string[];
  active: boolean;
}

// Extended BehaviorPhase Type
export interface BehaviorPhase {
  currentPhase: string;
  transitionPoints: {
    curious: number;
    confessional: number;
    unstable: number;
  };
  phaseResponses: {
    cold: string[];
    curious: string[];
    confessional: string[];
    unstable: string[];
  };
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
    quests?: any[]; // Add missing quests property
    lastQuestTime?: number; // Add missing lastQuestTime property
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
    dreamMessages?: string[]; // Add missing dreamMessages property
    usedDreamMessages?: string[]; // Add missing usedDreamMessages property
    lastVisitTime?: number; // Add missing lastVisitTime property
  };
  typingQuirks?: {
    // Add missing typingQuirks property
    glitchProbability: number;
    sentenceFragments: boolean;
    capitalization: 'normal' | 'all-caps' | 'no-caps';
    punctuation: 'normal' | 'excessive' | 'minimal';
  };
  replyStyles?: {
    // Add missing replyStyles property
    cryptic: boolean;
    verbose: boolean;
    emotional: string;
    references: string[];
  };
  emotionalTriggers?: {
    // Add missing emotionalTriggers property
    keywords: string[];
    phrases: string[];
    reactions: Record<string, string>;
  };
  argSync?: {
    // Add missing argSync property
    connected: boolean;
    syncPoints: string[];
    lastSync?: number;
  };
}

// No need to export, this is for global types
export {};
