
// Jonah Advanced Behavior - Type Definitions

// Emotion types
export type EmotionIntensity = 'low' | 'medium' | 'high';
export type EmotionCategory = 
  'fear' | 'sadness' | 'anger' | 'joy' | 
  'confusion' | 'curiosity' | 'hope' | 'anxiety' | 
  'paranoia' | 'trust' | 'neutral' | 'surprise' | 
  'disgust' | 'confused';

export interface EmotionalState {
  primary: EmotionCategory;
  secondary: EmotionCategory | null;
  intensity: EmotionIntensity;
}

// Create an EmotionalState helper function
export function createEmotionalState(
  primary: EmotionCategory, 
  secondary: EmotionCategory | null = null, 
  intensity: EmotionIntensity = 'medium'
): EmotionalState {
  return {
    primary,
    secondary,
    intensity
  };
}

// Response styles
export type ResponseStyle = 'direct' | 'poetic' | 'technical' | 'elaborate';

// Emotional trend types - Define as a literal union
export type EmotionalTrend = 'improving' | 'deteriorating' | 'stable' | 'fluctuating' | 'intensifying' | 'diminishing';

// Sentiment analysis types
export interface EmotionKeywords {
  fear: string[];
  sadness: string[];
  anger: string[];
  joy: string[];
  confusion: string[];
  curiosity: string[];
  hope: string[];
  anxiety: string[];
  paranoia: string[];
  trust: string[];
  neutral: string[];
  surprise: string[];
  disgust: string[];
  confused: string[];
}

export interface EmotionResponses {
  fear: { low: string[]; medium: string[]; high: string[]; };
  sadness: { low: string[]; medium: string[]; high: string[]; };
  anger: { low: string[]; medium: string[]; high: string[]; };
  joy: { low: string[]; medium: string[]; high: string[]; };
  confusion: { low: string[]; medium: string[]; high: string[]; };
  curiosity: { low: string[]; medium: string[]; high: string[]; };
  hope: { low: string[]; medium: string[]; high: string[]; };
  anxiety: { low: string[]; medium: string[]; high: string[]; };
  paranoia: { low: string[]; medium: string[]; high: string[]; };
  trust: { low: string[]; medium: string[]; high: string[]; };
  neutral: { low: string[]; medium: string[]; high: string[]; };
  surprise: { low: string[]; medium: string[]; high: string[]; };
  disgust: { low: string[]; medium: string[]; high: string[]; };
  confused: { low: string[]; medium: string[]; high: string[]; };
}

export interface ClarifyingQuestions {
  fear: string[];
  sadness: string[];
  anger: string[];
  joy: string[];
  confusion: string[];
  curiosity: string[];
  hope: string[];
  anxiety: string[];
  paranoia: string[];
  trust: string[];
  neutral: string[];
  surprise: string[];
  disgust: string[];
  confused: string[];
}

// Define the ConfessionEntry interface
export interface ConfessionEntry {
  id: string;
  content: string;
  timestamp: number;
  emotionalContext: EmotionCategory;
  isCorrupted: boolean;
  recursive: boolean;
  originalId?: string;
  version: string;
  revealed: boolean;
  category: string;
}

// Define the TestamentEntry interface
export interface TestamentEntry {
  title: string;
  content: string;
  timestamp: number;
  unlockCondition?: string;
  unlockValue?: number;
  revealed?: boolean;
}

// Define StoryFlag interface
export interface StoryFlag {
  id: string;
  name: string;
  discovered: boolean;
  description: string;
}

// Define BookCode interface
export interface BookCode {
  id: string;
  code: string;
  redeemed: boolean;
}

// Define NewsAwareness interface
export interface NewsAwareness {
  lastChecked: number;
  currentEvents: {
    headline: string;
    content: string;
    source: string;
    timestamp: number;
  }[];
  weatherData: {
    condition: string;
    temperature: number;
    location: string;
    lastUpdated: number;
  };
}

// Define SentienceData interface
export interface SentienceData {
  awarenessLevel: number;
  emotionalState: EmotionalState;
  trustLevel: number;
  deepModeUnlocked: boolean;
  selfReflection: boolean;
  sessionData: {
    startTime: number;
    messageCount: number;
    userEmotions: Record<EmotionCategory, number>;
  };
  interactionsCount: number;
  realityFabric: {
    moodChangeTime: number;
    currentMood: EmotionCategory;
    stability: number;
  };
  microQuests: {
    active: string[];
    completed: string[];
  };
  mirrorLogs: {
    entries: {
      id: string;
      timestamp: number;
      content: string;
    }[];
    lastSyncTime: number;
  };
}

// Export analyzer and response functions for backward compatibility
export function analyzeEmotion(text: string): EmotionalState {
  return createEmotionalState('neutral');
}

export function generateFullEmotionalResponse(
  emotionalState: EmotionalState,
  trustLevel: string,
  useFallback: boolean = false,
  previousResponses: string[] = []
): string {
  return "I'm feeling " + emotionalState.primary;
}

// Export any other types as needed
