
/**
 * Console Types Definition
 * Global interfaces and types for Jonah's Console
 */

// Import the centralized global types
import './types/globalConsoleTypes';

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

// Interface for whisper with metadata
export interface WhisperWithMetadata {
  whisper: string;
  timestamp: number;
  path: string;
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
    lastDreamTime?: number;
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
    unlockedVoiceLogs?: string[];
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
  ecoAwareness?: {
    lastBiomeCheck: number;
    currentBiome: string | null;
    previousResponses: string[];
    connectionStrength: number;
  };
  temporalStates?: any[];
  memories?: any[];
  moonPhase?: string;
  timeOfDay?: string;
}
