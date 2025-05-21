
/**
 * Sentiment Analysis - Analyzer Module
 */

import { emotionKeywords } from './keywords';
import { EmotionCategory, EmotionalState } from '../types';

export function analyze(text: string): EmotionalState {
  if (!text) {
    return {
      primary: 'neutral',
      secondary: null,
      intensity: 'low'
    };
  }

  const lowerText = text.toLowerCase();
  const emotionScores: Record<string, number> = {};
  
  // Score each emotion based on keyword matches
  Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
    emotionScores[emotion] = 0;
    keywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        emotionScores[emotion] += 1;
      }
    });
  });
  
  // Find the primary and secondary emotions
  const emotions = Object.entries(emotionScores)
    .filter(([_, score]) => score > 0)
    .sort((a, b) => b[1] - a[1]);
  
  const primary = emotions.length > 0 ? emotions[0][0] as EmotionCategory : 'neutral';
  const secondary = emotions.length > 1 ? emotions[1][0] as EmotionCategory : null;
  
  // Calculate intensity
  let intensity: 'low' | 'medium' | 'high' = 'medium';
  const primaryScore = emotions.length > 0 ? emotions[0][1] : 0;
  
  if (primaryScore >= 3) {
    intensity = 'high';
  } else if (primaryScore <= 1) {
    intensity = 'low';
  }
  
  return {
    primary,
    secondary,
    intensity
  };
}

// Additional helper to analyze emotional content with more focus on certain emotions
export function analyzeEmotion(text: string): EmotionalState {
  return analyze(text);
}
