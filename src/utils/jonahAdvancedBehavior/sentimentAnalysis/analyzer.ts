
/**
 * Sentiment Analysis - Analyzer Module
 */

import { EmotionCategory, EmotionalState, createEmotionalState } from '../types';
import { emotionKeywords } from './keywords';

// Topic-based emotional triggers
const emotionalTopics: Record<string, EmotionCategory> = {
  'death': 'fear',
  'love': 'joy',
  'war': 'anger',
  'loss': 'sadness',
  'mystery': 'curiosity',
  'betrayal': 'paranoia',
  'friendship': 'trust',
  'uncertainty': 'anxiety',
  'future': 'hope',
  'paradox': 'confusion',
  'miracle': 'surprise',
  'corruption': 'disgust'
};

// Analyze input for emotional content
export function analyzeEmotion(input: string): EmotionalState {
  const lowercaseInput = input.toLowerCase();
  const words = lowercaseInput.split(/\s+/);
  
  // Count emotional keyword matches
  const emotionScores: Record<EmotionCategory, number> = {
    joy: 0,
    sadness: 0,
    anger: 0,
    fear: 0,
    surprise: 0,
    disgust: 0,
    neutral: 0,
    confused: 0,
    hope: 0,
    anxiety: 0,
    paranoia: 0,
    trust: 0,
    curiosity: 0,
    confusion: 0,
    watching: 0
  };
  
  // Check each word against emotional keywords
  words.forEach(word => {
    Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
      if (keywords && Array.isArray(keywords) && keywords.some(keyword => word.includes(keyword))) {
        emotionScores[emotion as EmotionCategory] += 1;
      }
    });
  });
  
  // Check for topic-based emotions
  Object.entries(emotionalTopics).forEach(([topic, emotion]) => {
    if (lowercaseInput.includes(topic)) {
      emotionScores[emotion] += 0.5;
    }
  });
  
  // Determine primary emotion (highest score)
  let primaryEmotion: EmotionCategory = 'neutral';
  let primaryScore = 0;
  
  Object.entries(emotionScores).forEach(([emotion, score]) => {
    if (score > primaryScore) {
      primaryScore = score;
      primaryEmotion = emotion as EmotionCategory;
    }
  });
  
  // Default to neutral if no strong emotions detected
  if (primaryScore === 0) {
    primaryEmotion = 'neutral';
  }
  
  // Determine secondary emotion (second-highest score, if significant)
  let secondaryEmotion: EmotionCategory | null = null;
  let secondaryScore = 0;
  
  Object.entries(emotionScores).forEach(([emotion, score]) => {
    if (emotion !== primaryEmotion && score > secondaryScore) {
      secondaryScore = score;
      secondaryEmotion = emotion as EmotionCategory;
    }
  });
  
  // Only include secondary if it has a meaningful score
  if (secondaryScore === 0) {
    secondaryEmotion = null;
  }
  
  // Determine intensity based on score and input characteristics
  let intensity: 'low' | 'medium' | 'high' = 'medium';
  
  if (primaryScore >= 3 || input.includes('!') || input.toUpperCase() === input) {
    intensity = 'high';
  } else if (primaryScore <= 1 && !input.includes('?')) {
    intensity = 'low';
  }
  
  return createEmotionalState(primaryEmotion, secondaryEmotion, intensity);
}

// Alias analyze to match what's expected by imports
export const analyze = analyzeEmotion;
