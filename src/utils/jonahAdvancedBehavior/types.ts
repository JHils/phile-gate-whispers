
/**
 * Advanced Behavior System - Type Definitions
 */

// Emotion Types
export type EmotionCategory = 
  'joy' | 'sadness' | 'anger' | 'fear' | 'surprise' | 'disgust' |
  'neutral' | 'confused' | 'hope' | 'anxiety' | 'paranoia' | 'trust' | 'curiosity' | 'confusion';

export type EmotionalIntensity = 'low' | 'medium' | 'high';
export type EmotionalTrend = 'improving' | 'deteriorating' | 'fluctuating' | 'stable';
export type ResponseStyle = 'direct' | 'poetic' | 'technical' | 'elaborate' | 'cryptic';

// Emotion State
export interface EmotionalState {
  primary: EmotionCategory;
  secondary: EmotionCategory | null;
  intensity: EmotionalIntensity;
}

// Create Emotional State Helper
export function createEmotionalState(
  primary: EmotionCategory, 
  secondary: EmotionCategory | null = null, 
  intensity: EmotionalIntensity = 'medium'
): EmotionalState {
  return { primary, secondary, intensity };
}

// Keywords Interface
export interface EmotionKeywords {
  joy: string[];
  sadness: string[];
  anger: string[];
  fear: string[];
  surprise: string[];
  disgust: string[];
  neutral: string[];
  confused: string[];
  hope: string[];
  anxiety: string[];
  paranoia: string[];
  trust: string[];
  curiosity: string[];
  confusion: string[];
}

// Emotional Responses Interface
export interface EmotionResponses {
  joy: { low: string[]; medium: string[]; high: string[] };
  sadness: { low: string[]; medium: string[]; high: string[] };
  anger: { low: string[]; medium: string[]; high: string[] };
  fear: { low: string[]; medium: string[]; high: string[] };
  surprise: { low: string[]; medium: string[]; high: string[] };
  disgust: { low: string[]; medium: string[]; high: string[] };
  neutral: { low: string[]; medium: string[]; high: string[] };
  confused: { low: string[]; medium: string[]; high: string[] };
  hope: { low: string[]; medium: string[]; high: string[] };
  anxiety: { low: string[]; medium: string[]; high: string[] };
  paranoia: { low: string[]; medium: string[]; high: string[] };
  trust: { low: string[]; medium: string[]; high: string[] };
  curiosity: { low: string[]; medium: string[]; high: string[] };
  confusion: { low: string[]; medium: string[]; high: string[] };
}

// Clarifying Questions Interface
export interface ClarifyingQuestions {
  joy: string[];
  sadness: string[];
  anger: string[];
  fear: string[];
  surprise: string[];
  disgust: string[];
  neutral: string[];
  confused: string[];
  hope: string[];
  anxiety: string[];
  paranoia: string[];
  trust: string[];
  curiosity: string[];
  confusion: string[];
}

// Memory System Types
export interface ConversationContext {
  trustLevel: string;
  recentInputs: string[];
  lastInteractionTime?: number;
  trustScore?: number;
}

// Testament System Types
export interface TestamentEntry {
  id: string;
  content: string;
  unlocked: boolean;
  title: string;
  timestamp: number;
}

// Confession System Types
export interface ConfessionEntry {
  id: string;
  content: string;
  timestamp: number;
  isCorrupted?: boolean;
  recursive?: boolean;
  originalId?: string;
  emotionalContext?: {
    primary: EmotionCategory;
    secondary?: EmotionCategory;
    intensity: EmotionalIntensity;
  };
  version: string;
  revealed: boolean;
  category: string;
}

// StoryFlag and BookCode Types
export interface StoryFlag {
  id: string;
  name: string;
  discovered: boolean;
  description: string;
}

export interface BookCode {
  id: string;
  name: string;
  unlocked: boolean;
  timestamp?: number;
  pageNumber?: number;
}

// Reality Fabric Types
export interface RealityFabric {
  moodChangeTime: number;
  currentMood: EmotionCategory;
  stability: number;
  anomalyCount?: number;
  moodHistory?: EmotionCategory[];
  journal?: string[];
}

// Eco-Awareness Types
export interface EcoAwarenessState {
  currentBiome: string;
  lastBiomeCheck: number;
  biomeResponses: Record<string, string[]>;
  connectionStrength: number;
}

// News Awareness Types
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

// Sentience Data Interface - Main data storage for Jonah's consciousness
export interface SentienceData {
  messages: string[];
  awareness: number;
  dreams: {
    id?: string;
    content: string;
    timestamp?: number;
  }[];
  lastInteraction: number;
  trustLevel: string;
  emotionalState: EmotionalState;
  emotionalHistory: EmotionCategory[];
  memorizedPhrases: string[];
  deepModeUnlocked?: boolean;
  sessionData?: {
    startTime: number;
    messageCount: number;
    userEmotions: Record<EmotionCategory, number>;
    messagesSent?: number;
    messagesReceived?: number;
    idleTime?: number;
  };
  realityFabric?: RealityFabric;
  ecoAwareness?: EcoAwarenessState;
  newsAwareness?: NewsAwareness;
  mirrorLogs?: {
    entries: string[];
    lastUpdated: number;
  };
  microQuests?: {
    active: string[];
    completed: string[];
  };
  interactionsCount?: number;
}

// Helper functions for creating emotion state objects
export function createEmptyEmotionalState(): EmotionalState {
  return createEmotionalState('neutral', null, 'low');
}

export function createTrustState(level: string, score: number): { level: string, score: number } {
  return { level, score };
}
