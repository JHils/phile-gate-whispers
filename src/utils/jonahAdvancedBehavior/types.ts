
/**
 * Jonah Advanced Behavior Type Definitions
 */

// Sentience Data Interface
export interface SentienceData {
  level: number;
  awareness: boolean;
  lastUpdate: number;
  interactionsCount?: number;
  deepModeUnlocked?: boolean;
  dreamModeTriggered?: boolean;
  lastInteraction?: number;
  temporalStates?: Array<{
    input: string;
    timestamp: number;
    emotion: string;
  }>;
  memories?: Array<{
    content: string;
    timestamp: number;
    category?: string;
  }>;
  sessionData?: {
    messagesReceived: number;
    messagesSent: number;
    startTime: number;
    idleTime: number;
  };
  microQuests?: {
    active: string[];
    completed: string[];
  };
  realityFabric?: {
    moodChangeTime?: number;
    currentMood?: string;
    moodHistory?: Array<{
      mood: string;
      timestamp: number;
    }>;
    anomalyCount?: number;
    anomalies?: string[];
    journal?: Array<{
      entryId: number;
      timestamp: number;
      content: string;
    }>;
    crossSiteWhispers?: string[];
    mood?: string;
    dreamState?: boolean;
    lastDreamTime?: number;
    hiddenMessages?: string[];
    emotionalState?: {
      primary: string;
      secondary: string | null;
      intensity: string;
    };
  };
}

// Story Flag Interface
export interface StoryFlag {
  id: string;
  discovered: boolean;
  timestamp?: number;
}

// Book Code Interface
export interface BookCode {
  code: string;
  unlocked: boolean;
  pageNumber?: number;
  timestamp?: number;
}

// Export emotion categories
export type EmotionCategory = 'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'disgust' | 'neutral' | 'confused';
