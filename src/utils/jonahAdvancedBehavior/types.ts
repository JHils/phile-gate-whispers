
// Emotional state types
export type EmotionCategory = 
  'joy' | 
  'sadness' | 
  'anger' | 
  'fear' | 
  'surprise' | 
  'disgust' | 
  'neutral' | 
  'confused' | 
  'hope' | 
  'anxiety' | 
  'paranoia' | 
  'trust' | 
  'curiosity' | 
  'confusion';

export type EmotionIntensity = 'low' | 'medium' | 'high';

export interface EmotionalState {
  primary: EmotionCategory;
  secondary?: EmotionCategory | null;
  intensity: EmotionIntensity;
}

// Create an emotional state helper
export function createEmotionalState(
  primary: EmotionCategory, 
  secondary: EmotionCategory | null, 
  intensity: EmotionIntensity
): EmotionalState {
  return { primary, secondary, intensity };
}

// Emotional trend for tracking changes
export type EmotionalTrend = 'improving' | 'deteriorating' | 'fluctuating' | 'stable';

// Response style type
export type ResponseStyle = 'concise' | 'elaborate' | 'cryptic' | 'poetic' | 'analytical';

// Confession entry type
export interface ConfessionEntry {
  id: string;
  content: string;
  timestamp: number;
  emotionalContext: EmotionCategory | string;
  isCorrupted: boolean;
  recursive: boolean;
  originalId?: string;
  version: string;
  revealed: boolean;
  category: string;
}

// Testament entry type
export interface TestamentEntry {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  unlockPhrase?: string;
  revealed: boolean;
  requiresTrust?: number;
}

// Sentience data type
export interface SentienceData {
  lastInteraction?: number;
  interactionsCount?: number;
  sessionData?: {
    startTime: number;
    messageCount: number;
    userEmotions: Record<EmotionCategory, number>;
    messagesSent?: number;
    messagesReceived?: number;
  };
  realityFabric?: {
    moodChangeTime: number;
    currentMood: EmotionCategory;
    stability: number;
    anomalyCount?: number;
    moodHistory?: Array<{mood: EmotionCategory, timestamp: number}>;
    journal?: string[];
  };
  dreams?: string[];
  ecoAwareness?: {
    biomeResponses: Record<string, string[]>;
    currentBiome: string;
    lastUpdate: number;
    awareness: number;
    ecoThoughts: string[];
  };
  newsAwareness?: {
    lastFetch: number;
    currentEvents: string[];
    weatherData: any;
    mentionedEvents: string[];
  };
  microQuests?: {
    active: any[];
    completed: any[];
    available: any[];
  };
  deepModeUnlocked?: boolean;
}

// BookCode type
export interface BookCode {
  code: string;
  timestamp: number;
  name: string;
  pageNumber: number;
  unlocked: boolean;
}

// Story flag type
export interface StoryFlag {
  id: string;
  name: string;
  discovered: boolean;
  description: string;
}

// Conversation context
export interface ConversationContext {
  recentMessages: string[];
  emotionalJourney: EmotionCategory[];
  topicFocus: string | null;
  depth: number;
}
