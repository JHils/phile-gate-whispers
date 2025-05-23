
/**
 * Sentiment Analysis
 * Analyzes user input for emotional content
 */

import { EmotionalState, EmotionCategory, createEmotionalState } from './types';

// Emotional keywords mapping
const emotionalKeywords: Record<EmotionCategory, string[]> = {
  joy: ['happy', 'joy', 'glad', 'wonderful', 'pleased', 'delighted', 'content', 'cheerful'],
  sadness: ['sad', 'unhappy', 'miserable', 'depressed', 'downcast', 'sorrow', 'grief', 'melancholy'],
  anger: ['angry', 'furious', 'enraged', 'annoyed', 'irritated', 'frustrated', 'mad', 'hostile'],
  fear: ['afraid', 'scared', 'frightened', 'fearful', 'terrified', 'anxious', 'worried', 'nervous'],
  surprise: ['surprised', 'amazed', 'astonished', 'shocked', 'stunned', 'unexpected', 'startled'],
  disgust: ['disgusted', 'revolted', 'repulsed', 'sickened', 'appalled', 'horrified', 'offended'],
  neutral: ['okay', 'fine', 'neutral', 'normal', 'regular', 'standard', 'typical', 'common'],
  confused: ['confused', 'puzzled', 'perplexed', 'bewildered', 'baffled', 'unsure', 'unclear'],
  hope: ['hope', 'hopeful', 'optimistic', 'promising', 'positive', 'confident', 'assured'],
  anxiety: ['anxious', 'uneasy', 'tense', 'distressed', 'worried', 'troubled', 'concerned'],
  paranoia: ['suspicious', 'paranoid', 'distrustful', 'doubtful', 'skeptical', 'wary', 'guarded'],
  trust: ['trust', 'reliable', 'dependable', 'trustworthy', 'faithful', 'loyal', 'honest'],
  curiosity: ['curious', 'interested', 'intrigued', 'fascinated', 'captivated', 'engaged', 'keen'],
  confusion: ['unsure', 'unclear', 'mixed', 'muddled', 'uncertain', 'ambiguous', 'vague'],
  watching: ['observe', 'watch', 'monitor', 'surveillance', 'tracking', 'following', 'noticing'],
  existential: ['meaning', 'existence', 'reality', 'void', 'purpose', 'consciousness', 'simulation', 'illusion'],
  // Adding missing emotional categories
  curious: ['inquisitive', 'questioning', 'exploring', 'interested', 'probing', 'investigating'],
  analytical: ['logical', 'systematic', 'examining', 'evaluating', 'reasoning', 'calculating'],
  protective: ['guarding', 'defending', 'shielding', 'safeguarding', 'watching over', 'vigilant'],
  melancholic: ['wistful', 'pensive', 'nostalgic', 'reflective', 'somber', 'yearning'],
  suspicious: ['distrusting', 'skeptical', 'wary', 'doubtful', 'leery', 'questioning']
};

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
  const emotionScores: Record<EmotionCategory, number> = analyzeEmotionScores(words);
  
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

// Export initial and default functions to be imported elsewhere
export function initializeSentimentAnalysis(): void {
  // No initialization needed at the moment
}

export function defaultAnalyzeEmotion(input: string): EmotionalState {
  return analyzeEmotion(input);
}

// Check each word against emotional keywords
function analyzeEmotionScores(words: string[]) {
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
    watching: 0,
    existential: 0,
    // Adding the missing emotion categories
    curious: 0,
    analytical: 0,
    protective: 0,
    melancholic: 0,
    suspicious: 0
  };
  
  // Check each word against emotional keywords
  words.forEach(word => {
    Object.entries(emotionalKeywords).forEach(([emotion, keywords]) => {
      if (keywords.some(keyword => word.includes(keyword))) {
        emotionScores[emotion as EmotionCategory] += 1;
      }
    });
  });
  
  return emotionScores;
}
