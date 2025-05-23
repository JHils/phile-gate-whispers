
/**
 * Sentiment Analysis - Basic Analyzer
 */

import { EmotionCategory } from '../types';
import { emotionKeywords } from './keywords';

// Check for trigger phrases that affect trust
export function checkForTriggerPhrases(input: string): { trustChange: number; triggered: boolean; } {
  const lowerInput = input.toLowerCase();
  
  // Trust increasing phrases
  const trustIncreasingPhrases = [
    'trust you', 
    'believe you',
    'you are right',
    'thank you',
    'appreciate your help',
    'good job'
  ];
  
  // Trust decreasing phrases
  const trustDecreasingPhrases = [
    'don\'t trust you',
    'cannot trust you',
    'you are wrong',
    'lying to me',
    'not helpful'
  ];
  
  // Check for trust increasing phrases
  for (const phrase of trustIncreasingPhrases) {
    if (lowerInput.includes(phrase)) {
      return { trustChange: 5, triggered: true };
    }
  }
  
  // Check for trust decreasing phrases
  for (const phrase of trustDecreasingPhrases) {
    if (lowerInput.includes(phrase)) {
      return { trustChange: -5, triggered: true };
    }
  }
  
  // Default - no trust change
  return { trustChange: 0, triggered: false };
}

// Process emotional input to generate a response
export function processEmotionalInput(
  input: string,
  trustScore: number = 50,
  sessionMemory: string[] = []
): { response: string; trustChange: number; memoryTriggered: boolean } {
  const lowerInput = input.toLowerCase();
  
  // Detect emotion from input
  const emotion = detectPrimaryEmotion(lowerInput);
  
  // Generate appropriate response based on emotion
  let response = "I understand what you're saying.";
  
  switch (emotion) {
    case 'joy':
    case 'hope':
      response = "I'm glad to hear that. It's good to have positive moments.";
      break;
    case 'sadness':
    case 'melancholic':
      response = "I'm sorry to hear that. It can be difficult sometimes.";
      break;
    case 'anger':
      response = "I understand you're frustrated. Would it help to talk about it?";
      break;
    case 'fear':
    case 'anxiety':
      response = "That sounds concerning. What specifically worries you about this?";
      break;
    case 'curious':
    case 'curiosity':
      response = "That's an interesting question. I'm curious about that too.";
      break;
    default:
      response = "I see what you mean. Please tell me more.";
      break;
  }
  
  // Check for trigger phrases
  const { trustChange } = checkForTriggerPhrases(input);
  
  // Check if this triggers any memory
  const memoryTriggered = checkMemoryTriggers(input, sessionMemory);
  
  return { response, trustChange, memoryTriggered };
}

// Detect primary emotion from input
function detectPrimaryEmotion(input: string): EmotionCategory {
  const lowerInput = input.toLowerCase();
  
  // Count matches for each emotion category
  const matchCounts: Record<EmotionCategory, number> = Object.entries(emotionKeywords)
    .reduce((counts, [category, keywords]) => {
      counts[category as EmotionCategory] = keywords
        .filter(keyword => lowerInput.includes(keyword))
        .length;
      return counts;
    }, {} as Record<EmotionCategory, number>);
  
  // Find emotion with most keyword matches
  let maxCount = 0;
  let primaryEmotion: EmotionCategory = 'neutral';
  
  for (const [emotion, count] of Object.entries(matchCounts)) {
    if (count > maxCount) {
      maxCount = count;
      primaryEmotion = emotion as EmotionCategory;
    }
  }
  
  // Default to neutral if no strong emotion detected
  return maxCount > 0 ? primaryEmotion : 'neutral';
}

// Check if input triggers any memory from session history
function checkMemoryTriggers(input: string, sessionMemory: string[]): boolean {
  if (sessionMemory.length < 3) return false;
  
  // Check for repeated phrases or questions
  for (let i = 0; i < sessionMemory.length - 1; i++) {
    if (input.toLowerCase() === sessionMemory[i].toLowerCase()) {
      return true;
    }
  }
  
  return false;
}

// Generate greeting based on context
export function generateGreeting(
  trustScore: number,
  lastDate: Date | null,
  currentMood: EmotionCategory
): string {
  // Delegate to the enhanced emotional core
  return import('../enhancedEmotionalCore').then(({ generateGreeting }) => {
    return generateGreeting(trustScore, lastDate, currentMood);
  }).catch(() => {
    // Fallback if import fails
    return "Hello. How can I assist you today?";
  });
}
