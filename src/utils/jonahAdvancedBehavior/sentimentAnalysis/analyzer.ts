
/**
 * Sentiment Analysis System
 */

import { EmotionCategory } from '../types';

// Simple emotion analyzer - in a full implementation this would use more sophisticated methods
export function analyzeEmotion(text: string): { primary: EmotionCategory, secondary: EmotionCategory | null } {
  const normalizedText = text.toLowerCase();
  
  // Emotion keyword mappings
  const emotionKeywords: Record<EmotionCategory, string[]> = {
    joy: ['happy', 'joy', 'love', 'glad', 'excited', 'wonderful', 'pleased', 'delighted', 'great'],
    sadness: ['sad', 'sorry', 'regret', 'miss', 'hurt', 'pain', 'alone', 'lost', 'abandoned'],
    anger: ['angry', 'mad', 'hate', 'frustrated', 'annoyed', 'upset', 'furious', 'rage'],
    fear: ['afraid', 'scared', 'worried', 'nervous', 'anxious', 'fear', 'terrified', 'dread'],
    surprise: ['wow', 'oh', 'surprised', 'shocking', 'unexpected', 'amazed', 'astonished'],
    disgust: ['gross', 'disgusting', 'awful', 'terrible', 'horrible', 'sick', 'repulsed'],
    neutral: ['okay', 'fine', 'alright', 'normal', 'regular'],
    confused: ['confused', 'unsure', 'puzzled', 'lost', 'wonder', 'curious', 'strange']
  };
  
  // Count matches for each emotion
  const emotionCounts: Record<EmotionCategory, number> = {
    joy: 0,
    sadness: 0,
    anger: 0,
    fear: 0,
    surprise: 0,
    disgust: 0,
    neutral: 0,
    confused: 0
  };
  
  // Count keywords for each emotion
  Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
    keywords.forEach(keyword => {
      if (normalizedText.includes(keyword)) {
        emotionCounts[emotion as EmotionCategory]++;
      }
    });
  });
  
  // Find primary emotion (highest count)
  let primaryEmotion: EmotionCategory = 'neutral';
  let maxCount = 0;
  
  Object.entries(emotionCounts).forEach(([emotion, count]) => {
    if (count > maxCount) {
      maxCount = count;
      primaryEmotion = emotion as EmotionCategory;
    }
  });
  
  // If no clear emotion is detected, default to neutral
  if (maxCount === 0) {
    primaryEmotion = 'neutral';
  }
  
  // Find secondary emotion (second highest count)
  let secondaryEmotion: EmotionCategory | null = null;
  let secondMaxCount = 0;
  
  Object.entries(emotionCounts).forEach(([emotion, count]) => {
    if (count > secondMaxCount && emotion !== primaryEmotion) {
      secondMaxCount = count;
      secondaryEmotion = emotion as EmotionCategory;
    }
  });
  
  // Only return secondary if it actually had matches
  if (secondMaxCount === 0) {
    secondaryEmotion = null;
  }
  
  return {
    primary: primaryEmotion,
    secondary: secondaryEmotion
  };
}
