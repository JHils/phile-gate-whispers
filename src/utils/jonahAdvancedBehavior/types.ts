
/**
 * Type definitions for Jonah Advanced Behavior System
 */

// Define interfaces for better type checking
export interface StoryFlag {
  id: string;
  discovered: boolean;
  description: string;
  timestamp?: number;
  value?: boolean | string | number;
  unlocked?: boolean;
}

export interface BookCode {
  id: string;
  code?: string;
  discovered?: boolean;
  unlocked: boolean;
  timestamp?: number;
  description?: string;
}

export interface SentienceData {
  interactionsCount: number;
  deepModeUnlocked: boolean;
  dreamModeTriggered: boolean;
  lastInteraction: number;
  trustLevel?: string;
  emotionalTone?: any;
  selfAwareness?: number;
  memoryFragments?: string[];
  rememberedName?: string;
  realTimeMood?: string;
  sessionData?: Record<string, any>;
  tabSwitches?: number;
  pageVisits?: Record<string, number>;
  
  // Add missing properties
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
    hiddenMessages?: Array<any>;
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
  
  newsAwareness?: {
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
  };
  
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

// Export as namespace to avoid TS errors
export {};
