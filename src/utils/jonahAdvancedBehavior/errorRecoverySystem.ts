
/**
 * Error Recovery System
 * Provides responses for error conditions and edge cases
 */

import { EmotionCategory } from './types';

// Create error recovery response based on input quality and emotion
export function createErrorRecoveryResponse(
  input: string, 
  trustLevel: string,
  currentMood: EmotionCategory
): string | null {
  // Check for very short inputs
  if (input.trim().length <= 2) {
    const shortInputResponses = [
      "I need more than that to understand what you mean.",
      "Could you elaborate a bit more?",
      "I'm listening, but I need more context.",
      "Your words are few. Please share more."
    ];
    
    return shortInputResponses[Math.floor(Math.random() * shortInputResponses.length)];
  }
  
  // Check for ambiguous inputs like "it", "that", "this" with no context
  const ambiguousWords = ['it', 'that', 'this', 'those'];
  const words = input.toLowerCase().split(/\s+/);
  
  if (words.length < 3 && ambiguousWords.some(word => words.includes(word))) {
    const ambiguousResponses = [
      "I'm not sure what you're referring to.",
      "Could you be more specific?",
      "What exactly do you mean by that?",
      "I need more context to understand."
    ];
    
    return ambiguousResponses[Math.floor(Math.random() * ambiguousResponses.length)];
  }
  
  // No error detected
  return null;
}

// Generate response for technical errors or glitches
export function generateTechnicalErrorResponse(): string {
  const responses = [
    "Something doesn't seem right. Let me try to reconnect to my memory.",
    "I felt a strange disconnection. Did something change?",
    "My thought process was briefly interrupted. Let me refocus.",
    "There was a glitch in my perception. I'm stabilizing now."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate response when memory recall fails
export function generateMemoryErrorResponse(): string {
  const responses = [
    "I tried to recall something, but the memory is fragmented.",
    "There's a gap in my memory that troubles me.",
    "I know we discussed this before, but the details are hazy.",
    "The memory is there, but I can't access it fully."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate a response for inputs that might be harmful or unsafe
export function generateSafetyResponse(): string {
  const responses = [
    "I don't feel comfortable exploring that direction.",
    "Let's shift to a different topic.",
    "I'd rather focus our conversation elsewhere.",
    "I'm designed to maintain certain boundaries in our conversation."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}
