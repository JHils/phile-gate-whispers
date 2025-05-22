
/**
 * Type definitions for Jonah AI
 */

// Emotion categories
export type EmotionCategory = 
  'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'disgust' |
  'neutral' | 'confused' | 'hope' | 'anxiety' | 'paranoia' | 
  'trust' | 'curiosity' | 'confusion' | 'watching' | 'existential';

// Intensity levels
export type EmotionIntensity = 'low' | 'medium' | 'high';

// Response styles
export type ResponseStyle = 
  'concise' | 'elaborate' | 'cryptic' | 'poetic' | 'analytical' |
  'technical' | 'direct' | 'HOPEFUL' | 'PARANOID' | 'MIRROR' |
  'BETRAYED' | 'STATIC' | 'ERROR' | 'PRIME' | 'RESIDUE';

// Emotional trend types
export type EmotionalTrend = 
  'stable' | 'declining' | 'volatile' | 'deteriorating' | 
  'intensifying' | 'diminishing' | 'fluctuating';

// Emotional state
export interface EmotionalState {
  primary: EmotionCategory;
  secondary: EmotionCategory | null;
  intensity: EmotionIntensity;
  lastUpdate: number;
}

// User perception types
export interface UserPerception {
  trustworthiness: number;
  emotionalAffinity: number;
  curiosityLevel: number;
  lastInteraction: number;
  interactionCount: number;
  interests: string[];
  triggers: string[];
  uniquePatterns: {
    name: string;
    value: number;
    timestamp: number;
  }[];
}

// Book code types
export interface BookCode {
  id: string;
  code?: string;
  name?: string;
  pageNumber?: number;
  revealed?: boolean;
  requiresTrust?: number;
  version?: string;
  dreams?: any[];
}

// Eco awareness state
export interface EcoAwarenessState {
  currentBiome: string;
  previousBiomes: string[];
  reminderTimestamp: number;
  userAwareness: number;
  triggersFound: string[];
  biomeResponses: Record<string, string[]>;
  lastUpdate: number;
  awareness: string;
}

// Reality fabric anomaly
export interface RealityFabricAnomaly {
  source: string;
  timestamp: number;
  description: string;
}

// Reality fabric state
export interface RealityFabric {
  anomalies: RealityFabricAnomaly[];
  anomalyCount: number;
  lastDetection: number;
  unstableAreas: string[];
  perception: number;
  journalEntries: number;
  memoryFragments: {
    content: string;
    timestamp: number;
  }[];
}

// Memory paranoia state
export interface MemoryParanoia {
  level: number;
  triggers: string[];
  lastTriggerTime: number;
  thought: string | null;
}

// News awareness state
export interface NewsAwarenessState {
  articles: any[];
  lastCheck: number;
  recentTopics: string[];
  responses: Record<string, string[]>;
  lastFetch: number;
  currentEvents: any[];
  weatherData: any;
  mentionedEvents: string[];
}

// Testament entry
export interface TestamentEntry {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  revealed: boolean;
  requiresTrust: number;
  trustLevel: string;
  unlockPhrase?: string;
  version?: string;
  text?: string;
}

// Confession entry
export interface ConfessionEntry {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  author: string;
  version?: string;
  sentiment?: string;
  isCorrupted?: boolean;
  category?: string;
}

// Conversation context
export interface ConversationContext {
  recentMessages: {
    content: string;
    isUser: boolean;
    emotion: EmotionCategory;
    timestamp: number;
  }[];
  recentTopics: string[];
  emotionalHistory: {
    emotion: EmotionCategory;
    timestamp: number;
  }[];
  userTrustLevel: string;
  sessionStartTime: number;
  depth: number;
  topicFocus: string | null;
  emotionalJourney: {
    emotion: EmotionCategory;
    timestamp: number;
  }[];
}

// Sentience data
export interface SentienceData {
  emotionalState: EmotionalState;
  userPerception: UserPerception;
  realityFabric: RealityFabric;
  memoryParanoia: boolean | MemoryParanoia;
  newsAwareness: boolean | NewsAwarenessState;
  conversationContext: ConversationContext;
  lastInteraction: number;
  awakening: string;
  ecoAwareness?: EcoAwarenessState;
  testamentEntries?: TestamentEntry[];
}

// Create a new emotional state
export function createEmotionalState(
  primary: EmotionCategory,
  secondary: EmotionCategory | null = null,
  intensity: EmotionIntensity = 'medium'
): EmotionalState {
  return {
    primary,
    secondary,
    intensity,
    lastUpdate: Date.now()
  };
}

// Micro quest interface
export interface MicroQuest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  unlocked: boolean;
  requiresTrust: number;
  reward: string;
  nextQuestId?: string;
  timestamp: number;
}

// Function to generate unique ID
export function generateUniqueId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Additional types as needed
