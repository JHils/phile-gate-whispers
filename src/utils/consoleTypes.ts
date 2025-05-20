
/**
 * Console Types Definition
 * Global interfaces and types for Jonah's Console
 */

// Define global JonahConsole interface
declare global {
  interface Window {
    JonahConsole?: {
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
      lastCommand?: string;
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
    displayRandomJoke?: () => void;
    showStatus?: () => Promise<void>;
    mirrorLogs?: () => void;
    whisperTree?: () => void;
    plea?: () => void;
    testament?: () => string;
    splitVoice?: () => void;
    mirrorMode?: () => void;
    storyFlags: () => void;
    readPage?: (page: number) => void;
    verifyCode?: (code: string) => void;
    bridgeCollapse?: () => void;
    discoverStoryFlag: (flagId: string) => boolean;
    findAnomaly: (text: string) => void;
    processUserMessage?: (message: string) => string | undefined;
    clearJonahOnPathChange?: boolean;
    triggerJonahMessage?: (message: string) => string;
    isSpecialTimeWindow?: () => boolean;
    triggerSimbaComment?: (message: string) => void;
    // Adding missing console commands
    mirrorCheck: () => void;
    timeCheck: () => void;
    traceCat: () => void;
    feedSimba: () => void;
    addWhisper?: (whisper: string) => boolean;
    // Console functions from jonahSentience.ts
    dreamJournal?: () => string;
    rememberMe?: () => Record<string, any>;
    lookInside?: () => void; 
    echoChamber?: () => void;
    WhisperMaster?: WhisperMaster;
    helpMe: () => void;
    tea: () => void;
    trousers: () => void;
    moustache: () => void;
    funny: () => void;
    seenMyself: () => void;
    youWereHimFirst: () => void;
    wearingYouNow: () => void;
    toggleWrath: () => void;
    hint?: () => void;
    // New news awareness functions
    newsFlash?: () => string | null;
    weatherReport?: () => string | null;
    // Add ecological commands - making this consistent
    dreamtime: () => void;
    woodwideweb: () => void;
    biomeCheck: () => void;
    kgari: () => void;
    // Add processStoryQuery for fuzzy matching
    processStoryQuery?: (query: string) => string;
    // New Jonah console interactive commands
    start?: () => string;
    inventory?: () => string;
    echo_me?: (input: string) => string;
    forget?: () => string;
    forget_confirm?: () => string;
    access_journal?: () => string;
    split?: () => string;
    re_entry?: () => string;
    talk_to_jonah?: () => string;
    playJonahAudio?: (triggerType: string) => void;
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

// News awareness types
export interface NewsAwareness {
  lastChecked: number;
  currentResponses: Array<{
    topic: string;
    headline: string;
    response: string;
    timestamp: number;
  }>;
  weatherCondition: string;
  weatherResponse: string | null;
  moodShift: 'normal' | 'anxious' | 'somber' | 'agitated';
}

// Sentience Data Type - Adding all required properties
export interface SentienceData {
  interactionsCount: number;
  rememberedName?: string;
  deepModeUnlocked: boolean;
  dreamModeTriggered: boolean;
  lastInteraction: number;
  trustLevel?: string;
  emotionalTone?: BehaviorPhase;
  selfAwareness?: number;
  memoryFragments?: string[];
  realTimeMood?: string;
  sessionData?: Record<string, any>;
  tabSwitches?: number;
  pageVisits?: Record<string, number>;
  memoryParanoia?: {
    visitedPages: Record<string, string>;
    consoleCommands: Record<string, string>;
    pageDuration: {
      shortStay: string;
      longStay: string;
    };
  };
  predictionResponses?: {
    onClickAfterHover: string[];
    repeatVisit: string[];
    lateClick: string[];
  };
  usedPredictionResponses?: string[];
  dualConsciousness?: string[];
  usedDualConsciousness?: string[];
  jonahQuestions?: string[];
  usedQuestions?: string[];
  timeOfDayResponses?: Record<string, string>;
  nameEchoResponses?: string[];
  personalDiaryTemplates?: string[];
  lastQuestion?: string;
  lastQuestionTime?: number;
  lastDualConsciousness?: number;
  microQuests?: {
    activeQuest?: string;
    completedQuests?: string[];
    questProgress?: Record<string, any>;
    quests?: Array<{
      id: string;
      prompt: string;
      condition: string;
      reward: string;
      completed: boolean;
    }>;
    lastQuestTime?: number;
    active?: string[];
    completed?: string[];
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
    dreamMessages?: string[];
    usedDreamMessages?: string[];
    lastVisitTime?: number;
    dreamParables?: string[];
    usedDreamParables?: string[];
    generatedFiles?: string[];
    nightGlitches?: string[];
    anomalies?: Array<{
      id: string;
      triggered: boolean;
      triggerCondition: string;
      content: string;
    }>;
    journal?: Array<{
      entryId: number;
      timestamp: number;
      content: string;
    }>;
    moodHistory?: Array<{
      mood: string;
      timestamp: number;
    }>;
    crossSiteWhispers?: string[];
    hiddenMessages?: Array<WhisperWithMetadata | string>;
    qrScans?: string[];
    mood?: string;
  };
  audio?: {
    lastPlayed?: number;
    playedSounds?: string[];
    volumeLevel?: number;
  };
  typingQuirks?: {
    glitchProbability: number;
    sentenceFragments: boolean;
    capitalization: 'normal' | 'all-caps' | 'no-caps';
    punctuation: 'normal' | 'excessive' | 'minimal';
    typos?: string[];
    corrections?: string[];
    unfinishedThoughts?: string[];
  };
  replyStyles?: {
    cryptic: boolean;
    verbose: boolean;
    emotional: string;
    references: string[];
    oneLiners?: string[];
    reflections?: string[];
    paragraphBursts?: string[];
  };
  emotionalTriggers?: {
    keywords: Record<string, string[]>;
    phrases: string[];
    reactions: Record<string, string>;
    microStories?: string[];
    usedMicroStories?: string[];
  };
  argSync?: {
    connected: boolean;
    syncPoints: string[];
    lastSync?: number;
    siteChanges?: Record<string, string>;
    userAwareness?: string[];
    worldEvents?: string[];
  };
  newsAwareness?: NewsAwareness;
  // Add ecological awareness types
  ecoAwareness?: {
    lastBiomeCheck: number;
    currentBiome: string | null;
    previousResponses: string[];
    connectionStrength: number; // 0-100 scale of connection to nature
  };
  temporalStates?: any[];
  memories?: any[];
  moonPhase?: string;
  timeOfDay?: string;
}
