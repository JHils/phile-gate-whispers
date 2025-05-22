
/**
 * Types for Sentiment Analysis System
 */

import { EmotionCategory, EmotionIntensity } from '../types';

// Type for emotion responses mapped by emotion category and intensity
export interface EmotionResponses {
  [key in EmotionCategory]: {
    [intensity in EmotionIntensity]: string[]
  }
}

// Type for clarifying questions mapped by emotion category
export interface ClarifyingQuestions {
  [key in EmotionCategory]: string[]
}

// Type for emotional response generation configuration
export interface ResponseConfig {
  showEmotion: boolean;
  style: 'direct' | 'cryptic' | 'analytical' | 'poetic';
  includePreviousContext: boolean;
  depth: 'shallow' | 'medium' | 'deep';
}

// Sentiment analysis result type
export interface SentimentResult {
  primary: EmotionCategory;
  secondary: EmotionCategory | null;
  intensity: EmotionIntensity;
  confidence: number;
  keywords: string[];
}

// Type for tracked emotional patterns over time
export interface EmotionalPattern {
  dominant: EmotionCategory;
  frequency: Record<EmotionCategory, number>;
  trend: 'increasing' | 'decreasing' | 'stable' | 'fluctuating';
  period: 'session' | 'day' | 'week';
}

// Type for emotion detection configuration
export interface EmotionDetectionConfig {
  sensitivityLevel: number; // 0-1 where higher means more sensitive
  contextAware: boolean;
  includeSecondaryEmotions: boolean;
  minimumConfidence: number;
}
