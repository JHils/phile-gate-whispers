
import { EmotionCategory, EmotionIntensity, EmotionalState, EmotionalTrend } from '../types';

// Export specific types for sentiment analysis
export type EmotionKeywords = Record<EmotionCategory, string[]>;
export type EmotionResponses = Record<EmotionCategory, string[]>;
export type ClarifyingQuestions = Record<EmotionCategory, string[]>;

export interface PatternAnalysis {
  trend: EmotionalTrend;
  dominantEmotion: EmotionCategory;
}

export interface UnsaidInterpretation {
  originalInput: string;
  interpretedEmotion: string;
  timestamp: number;
}
