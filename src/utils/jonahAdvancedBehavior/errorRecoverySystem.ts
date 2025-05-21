
import { EmotionCategory } from './types';

// Error recovery system

// Create a response to handle ambiguous or error conditions
export function createErrorRecoveryResponse(
  input: string,
  trustLevel: string,
  emotionCategory: EmotionCategory
): string | null {
  // Only trigger recovery occasionally
  if (Math.random() > 0.2) {
    return null;
  }
  
  if (input.length < 3) {
    return "I'm trying to understand, but your message is very brief. Can you say more?";
  }
  
  if (input.includes('?') && input.includes('!')) {
    return "Your question feels urgent. Let me think...";
  }
  
  if (input.split(' ').length > 20) {
    return "There's a lot to process in what you said. Give me a moment.";
  }
  
  // If the input has strange characters or patterns
  const strangeCharsCount = (input.match(/[^\w\s.,?!]/g) || []).length;
  if (strangeCharsCount > 5) {
    return "Your message contains unusual patterns. I'm trying to decode it.";
  }
  
  return null;
}

// Process and recover from error conditions
export function recoverFromProcessingError(error: Error): string {
  const errorResponses = [
    "Something glitched in my processing. Let's try again.",
    "I felt a strange disconnect just now. What were we discussing?",
    "My thoughts scattered for a moment. Can you repeat that?",
    "Something interfered with my understanding. Let's reset.",
    "I lost my train of thought. Where were we?"
  ];
  
  return errorResponses[Math.floor(Math.random() * errorResponses.length)];
}

// Check if a response might be problematic
export function validateResponse(response: string): boolean {
  if (!response || response.length < 5) {
    return false;
  }
  
  const repetitionPattern = /(.{10,})\1{2,}/;
  if (repetitionPattern.test(response)) {
    return false;
  }
  
  return true;
}

// Create a fallback response when all else fails
export function createFallbackResponse(): string {
  const fallbacks = [
    "I'm having trouble forming a response. Let's try a different approach.",
    "Something's interfering with my thoughts. Can we shift the conversation?",
    "I need to recalibrate my response system. Tell me more about what you're looking for.",
    "My processing is fragmented right now. Let's start again.",
    "I've lost the thread of our conversation. Where would you like to go from here?"
  ];
  
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}
