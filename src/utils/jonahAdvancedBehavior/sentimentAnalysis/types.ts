
import { EmotionCategory, EmotionIntensity, EmotionalState, EmotionalTrend } from '../types';

// Export specific types for sentiment analysis
export type EmotionKeywords = Record<EmotionCategory, string[]>;

// Structure for emotion responses with intensity levels
export interface EmotionResponsesByIntensity {
  low: string[];
  medium: string[];
  high: string[];
}

export type EmotionResponses = Record<EmotionCategory, EmotionResponsesByIntensity>;

// Add ClarifyingQuestions type that was missing
export type ClarifyingQuestions = Record<EmotionCategory, string[]>;

export interface PatternAnalysis {
  trend: EmotionalTrend;
  dominantEmotion: EmotionCategory;
  oscillation?: boolean;
  emotionHistory?: EmotionCategory[];
}

export interface UnsaidInterpretation {
  interpretation: string;
  confidenceLevel: 'low' | 'medium' | 'high';
  emotion: EmotionCategory;
}
