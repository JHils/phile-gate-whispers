
import { EmotionalState, EmotionCategory, EmotionIntensity } from '../types';
import { emotionKeywords, intensifiers } from './keywords';

/**
 * Analyze text for emotional content
 * @param text User input text
 * @returns Emotional state assessment
 */
export function analyzeEmotion(text: string): EmotionalState {
  // Default to neutral if no text
  if (!text || text.trim().length === 0) {
    return {
      primary: 'neutral',
      secondary: null,
      intensity: 'low',
      timestamp: Date.now()
    };
  }

  // Convert to lowercase for matching
  const lowercaseText = text.toLowerCase();
  const words = lowercaseText.split(/\s+/);
  
  // Count emotions
  const emotionScores: Record<EmotionCategory, number> = {
    fear: 0, sadness: 0, anger: 0, joy: 0, 
    confusion: 0, curiosity: 0, hope: 0, 
    anxiety: 0, paranoia: 0, trust: 0, neutral: 0
  };
  
  // Track intensifiers
  let intensifierCount = 0;
  
  // Process each word
  words.forEach(word => {
    // Check if word is an intensifier
    if (intensifiers.includes(word)) {
      intensifierCount++;
      return;
    }
    
    // Check each emotion category
    Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
      if (keywords.some(keyword => word.includes(keyword))) {
        emotionScores[emotion as EmotionCategory] += 1;
      }
    });
  });
  
  // Find primary and secondary emotions
  let primary: EmotionCategory = 'neutral';
  let secondary: EmotionCategory | null = null;
  let highestScore = 0;
  let secondHighestScore = 0;
  
  Object.entries(emotionScores).forEach(([emotion, score]) => {
    if (score > highestScore) {
      secondary = primary;
      secondHighestScore = highestScore;
      primary = emotion as EmotionCategory;
      highestScore = score;
    } else if (score > secondHighestScore) {
      secondary = emotion as EmotionCategory;
      secondHighestScore = score;
    }
  });
  
  // If no emotion detected, default to neutral
  if (highestScore === 0) {
    primary = 'neutral';
    secondary = null;
  }
  
  // If secondary is same as primary or very low score, set to null
  if (secondary === primary || secondHighestScore < 1) {
    secondary = null;
  }
  
  // Determine intensity based on emotion keywords and intensifiers
  let intensity: EmotionIntensity = 'low';
  
  // Simple formula: base on keyword repetition and intensifiers
  const emotionStrength = highestScore + (intensifierCount * 0.5);
  
  if (emotionStrength >= 3) {
    intensity = 'high';
  } else if (emotionStrength >= 1.5) {
    intensity = 'medium';
  }
  
  return {
    primary,
    secondary,
    intensity,
    timestamp: Date.now()
  };
}
