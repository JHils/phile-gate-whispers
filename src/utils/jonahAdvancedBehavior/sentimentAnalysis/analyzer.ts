
/**
 * Sentiment Analysis - Core Analyzer
 * Analyzes text for emotional content
 */

import { EmotionCategory, EmotionalState, EmotionIntensity } from '../types';

// Define emotion keywords for sentiment detection
export const emotionalKeywords: Record<EmotionCategory, string[]> = {
  joy: ['happy', 'joy', 'glad', 'excited', 'wonderful'],
  sadness: ['sad', 'unhappy', 'miserable', 'depressed', 'grief'],
  anger: ['angry', 'mad', 'furious', 'annoyed', 'irritated'],
  fear: ['afraid', 'scared', 'fearful', 'terrified', 'worried'],
  surprise: ['surprised', 'shocked', 'astonished', 'amazed', 'unexpected'],
  disgust: ['disgusted', 'gross', 'revolting', 'repulsed', 'appalled'],
  neutral: ['okay', 'fine', 'normal', 'average', 'standard'],
  confused: ['confused', 'puzzled', 'perplexed', 'bewildered', 'unclear'],
  hope: ['hope', 'optimistic', 'promising', 'positive', 'confident'],
  anxiety: ['anxious', 'nervous', 'tense', 'uneasy', 'apprehensive'],
  paranoia: ['paranoid', 'suspicious', 'distrustful', 'doubting', 'wary'],
  trust: ['trust', 'reliable', 'dependable', 'trustworthy', 'faithful'],
  curiosity: ['curious', 'interested', 'intrigued', 'fascinated', 'captivated'],
  confusion: ['unsure', 'unclear', 'mixed', 'muddled', 'uncertain']
};

// Initialize emotion scores
export const createEmotionScores = (): Record<EmotionCategory, number> => ({
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
  confusion: 0
});

// Analyze text for emotional content
export function analyzeText(text: string): EmotionalState {
  const lowercaseText = text.toLowerCase();
  const words = lowercaseText.split(/\s+/);
  
  // Initialize scores
  const scores = createEmotionScores();
  
  // Process each word
  words.forEach(word => {
    // Check against keywords for each emotion
    Object.entries(emotionalKeywords).forEach(([emotion, keywords]) => {
      if (keywords.some(keyword => word.includes(keyword))) {
        scores[emotion as EmotionCategory]++;
      }
    });
  });
  
  // Find primary emotion (highest score)
  let primary: EmotionCategory = 'neutral';
  let maxScore = 0;
  
  Object.entries(scores).forEach(([emotion, score]) => {
    if (score > maxScore) {
      maxScore = score;
      primary = emotion as EmotionCategory;
    }
  });
  
  // Default to neutral if no emotions detected
  if (maxScore === 0) {
    primary = 'neutral';
  }
  
  // Find secondary emotion (second highest score)
  let secondary: EmotionCategory | null = null;
  let secondScore = 0;
  
  Object.entries(scores).forEach(([emotion, score]) => {
    if (emotion !== primary && score > secondScore) {
      secondScore = score;
      secondary = emotion as EmotionCategory;
    }
  });
  
  // Only set secondary if it has a meaningful score
  if (secondScore === 0) {
    secondary = null;
  }
  
  // Calculate intensity
  const intensity = calculateIntensity(text, maxScore);
  
  return { primary, secondary, intensity };
}

// Calculate emotional intensity
function calculateIntensity(text: string, score: number): EmotionIntensity {
  // Check text features
  const exclamationCount = (text.match(/!/g) || []).length;
  const questionCount = (text.match(/\?/g) || []).length;
  const upperCaseCount = (text.match(/[A-Z]/g) || []).length;
  const totalChars = text.length;
  
  // Calculate raw intensity score
  let intensityValue = score;
  intensityValue += exclamationCount * 1.5;
  intensityValue += questionCount * 0.5;
  intensityValue += (upperCaseCount / totalChars) * 10;
  
  // Map to intensity levels
  if (intensityValue >= 4) return 'high';
  if (intensityValue >= 2) return 'medium';
  return 'low';
}

// Export for use in other modules
export { analyzeText as analyze };
