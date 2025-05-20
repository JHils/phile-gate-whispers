
/**
 * Type definitions for Jonah Advanced Behavior System
 */

// Define interfaces for better type checking
export interface StoryFlag {
  id: string;
  value: boolean | string | number;
  timestamp: number;
}

export interface BookCode {
  id: string;
  code: string;
  discovered: boolean;
  timestamp: number;
}

export interface SentienceData {
  interactionsCount: number;
  deepModeUnlocked: boolean;
  dreamModeTriggered: boolean;
  lastInteraction: number;
  memoryFragments?: string[];
  rememberedName?: string;
  sessionData?: {
    messagesReceived?: number;
    messagesSent?: number;
  };
  realityFabric?: {
    currentMood?: string;
    moodChangeTime?: number;
    moodHistory?: Array<{mood: string, timestamp: number}>;
    anomalyCount?: number;
    journal?: Array<{entryId: number, timestamp: number, content: string}>;
    dreamParables?: string[];
    usedDreamParables?: string[];
  };
}

// Export as namespace to avoid TS errors
export {};
