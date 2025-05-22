/**
 * Sentiment Analysis for Jonah
 * Analyzes emotional content in text
 */

import { EmotionalState, EmotionCategory, EmotionIntensity, ResponseStyle } from '../types';
import { emotionKeywords } from './keywords';
import { generateGreeting } from './responseGenerator';

// Function to analyze emotional content in text
export function analyzeEmotion(text: string): EmotionalState {
  if (!text || text.trim().length === 0) {
    return {
      primary: 'neutral',
      secondary: null,
      intensity: 'low'
    };
  }
  
  text = text.toLowerCase();
  
  // Use keywords from imported module
  const emotions = emotionKeywords;
  
  // Count emotion matches
  const emotionCounts: Record<EmotionCategory, number> = {
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
    existential: 0
  };
  
  Object.entries(emotions).forEach(([emotion, keywords]) => {
    keywords.forEach(keyword => {
      if (text.includes(keyword)) {
        emotionCounts[emotion as EmotionCategory] += 1;
      }
    });
  });
  
  // Find primary and secondary emotions
  let primary: EmotionCategory = 'neutral';
  let secondary: EmotionCategory | null = null;
  let maxCount = 0;
  let secondMaxCount = 0;
  
  Object.entries(emotionCounts).forEach(([emotion, count]) => {
    if (count > maxCount) {
      secondary = primary;
      secondMaxCount = maxCount;
      primary = emotion as EmotionCategory;
      maxCount = count;
    } else if (count > secondMaxCount && emotion !== primary) {
      secondary = emotion as EmotionCategory;
      secondMaxCount = count;
    }
  });
  
  // If no emotions detected, default to neutral
  if (maxCount === 0) {
    primary = 'neutral';
    secondary = null;
  }
  
  // Determine intensity based on match count and text length
  let intensity: EmotionIntensity = 'medium';
  const textLength = text.split(' ').length;
  
  if (maxCount > 3 || (maxCount > 1 && textLength < 5)) {
    intensity = 'high';
  } else if (maxCount <= 1 || textLength > 20) {
    intensity = 'low';
  }
  
  return {
    primary,
    secondary: secondary && secondMaxCount > 0 ? secondary : null,
    intensity
  };
}

// Check for trigger phrases that should modify trust or produce special responses
export function checkForTriggerPhrases(text: string): {
  isTriggerPhrase: boolean;
  triggerType: string | null;
  trustChange: number;
} {
  if (!text) return { isTriggerPhrase: false, triggerType: null, trustChange: 0 };
  
  const lowerText = text.toLowerCase();
  
  // Specific trigger phrases from the requirements
  const triggerPhrases: Record<string, string> = {
    "i'm not okay": "empathy",
    "i'm scared": "comfort",
    "i miss you": "connection",
    "why am i still here": "existential",
    "help": "assistance"
  };
  
  // Check for matches
  for (const [phrase, type] of Object.entries(triggerPhrases)) {
    if (lowerText.includes(phrase)) {
      return { 
        isTriggerPhrase: true, 
        triggerType: type,
        // Process trust keywords separately
        trustChange: processTrustKeywords(text)
      };
    }
  }
  
  // Check for trust keywords even if no trigger phrases
  const trustChange = processTrustKeywords(text);
  
  return {
    isTriggerPhrase: false,
    triggerType: null,
    trustChange
  };
}

// Process trust keywords in user input
function processTrustKeywords(input: string): number {
  const trustWords = ["trust", "believe", "friend", "help", "understand"];
  const distrustWords = ["lie", "deceive", "trick", "suspicious", "doubt"];
  
  // Add specific trust trigger phrases
  const trustTriggerPhrases = [
    "i trust you", 
    "i'm telling you the truth", 
    "you can trust me",
    "i believe in you",
    "i'm here for you"
  ];
  
  const lowerInput = input.toLowerCase();
  let trustChange = 0;
  
  // Check for trust keywords
  trustWords.forEach(word => {
    if (lowerInput.includes(word)) trustChange += 2;
  });
  
  // Check for distrust keywords
  distrustWords.forEach(word => {
    if (lowerInput.includes(word)) trustChange -= 3;
  });
  
  // Check for specific trust phrases (higher trust gain)
  trustTriggerPhrases.forEach(phrase => {
    if (lowerInput.includes(phrase)) trustChange += 5;
  });
  
  return trustChange;
}

// Check for recurring symbols or patterns in text
export function checkForRecurringSymbols(text: string): { found: boolean; pattern: string | null } {
  if (!text || text.length < 5) return { found: false, pattern: null };
  
  // Check for repeated symbols
  const symbolRegex = /([!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])\1{2,}/g;
  const matches = text.match(symbolRegex);
  
  if (matches && matches.length > 0) {
    return { 
      found: true, 
      pattern: matches[0] 
    };
  }
  
  // Check for word repetition
  const wordArray = text.toLowerCase().split(/\s+/);
  const wordSet = new Set(wordArray);
  
  if (wordArray.length > 5 && wordSet.size < wordArray.length / 2) {
    // Significant repetition detected
    const mostFrequent = findMostFrequentWord(wordArray);
    return {
      found: true,
      pattern: mostFrequent
    };
  }
  
  return { found: false, pattern: null };
}

// Helper function to find most frequent word
function findMostFrequentWord(words: string[]): string {
  const frequency: Record<string, number> = {};
  let maxFreq = 0;
  let mostFrequent = '';
  
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
    if (frequency[word] > maxFreq && word.length > 2) { // Ignore short words
      maxFreq = frequency[word];
      mostFrequent = word;
    }
  });
  
  return mostFrequent;
}

// Process full emotional input with memory and trust features
export function processEmotionalInput(
  input: string, 
  trustLevel: number = 50, 
  previousInputs: string[] = []
): {
  response: string;
  trustChange: number;
  memoryTriggered: boolean;
} {
  // First analyze the basic emotion
  const emotionalState = analyzeEmotion(input);
  
  // Check for patterns or symbols
  const patterns = checkForRecurringSymbols(input);
  
  // Check for trigger phrases
  const triggerCheck = checkForTriggerPhrases(input);
  
  // Get emotional response from the response generator
  const { getEmotionalResponse, getFalseMemoryResponse, getLoopResponse, getBlankFragmentResponse } = require('./responseGenerator');
  
  // Generate base response based on emotional state
  let response = getEmotionalResponse(emotionalState, getTrustLevelText(trustLevel));
  
  // Modify with trigger phrase response if applicable
  if (triggerCheck.isTriggerPhrase) {
    // Override with emotional response but keep original as fallback
    const trustLevelText = getTrustLevelText(trustLevel);
    response = getEmotionalResponse(emotionalState, trustLevelText);
  }
  
  // Check for repeating patterns in previous inputs (LOOP DETECTION)
  const isRepeated = previousInputs.includes(input);
  let memoryTriggered = false;
  
  // 2. MEMORY SIMULATION + FALSE LOOP ECHO - 10-15% chance in long conversations
  if (previousInputs.length > 3 && (isRepeated || Math.random() < 0.15)) {
    memoryTriggered = true;
    
    // Determine which type of memory response to use
    const memoryType = Math.random();
    
    if (isRepeated || memoryType < 0.4) {
      // Count occurrences
      const occurrences = previousInputs.filter(prev => prev === input).length;
      if (occurrences > 1) {
        response = getLoopResponse(occurrences, trustLevel);
      } else {
        response = getFalseMemoryResponse(trustLevel);
      }
    } else if (memoryType < 0.7) {
      response = getFalseMemoryResponse(trustLevel);
    } else {
      response = getBlankFragmentResponse(trustLevel);
    }
  }
  
  // 5. CONSOLE ECHO & FLICKER LAYER - Occasionally log to console
  if (Math.random() < 0.1 && trustLevel > 40) {
    if (trustLevel > 75) {
      console.warn("Echo Jonah: pattern match found in interaction sequence");
    } else {
      console.log("%cJonah: monitoring conversation patterns", "color: #8B3A40; font-style: italic;");
    }
  }
  
  return {
    response,
    trustChange: triggerCheck.trustChange,
    memoryTriggered
  };
}

// Get trust level text helper
function getTrustLevelText(score: number): 'low' | 'medium' | 'high' {
  if (score < 30) return 'low';
  if (score < 70) return 'medium';
  return 'high';
}

// Export all the necessary functions from responseGenerator
export { 
  generateEmotionalResponse,
  getEmotionalResponse,
  getLayeredEmotionalResponse,
  getFalseMemoryResponse,
  getLoopResponse,
  getBlankFragmentResponse,
  generateGreeting
} from './responseGenerator';
