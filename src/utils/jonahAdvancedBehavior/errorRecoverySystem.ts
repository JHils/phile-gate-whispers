
/**
 * Error Recovery System
 * Handles unexpected inputs and provides appropriate responses
 */

import { EmotionCategory } from './types';

// Generate a response when facing an error or unexpected input
export function createErrorRecoveryResponse(
  input: string, 
  trustLevel: string, 
  emotion: EmotionCategory
): string | null {
  // Handle very short inputs
  if (input.length < 3) {
    const shortInputResponses = [
      "I need more to work with.",
      "Could you elaborate a bit?",
      "That's not much for me to go on.",
      "Tell me more?",
      "I'm listening, but I need more context."
    ];
    
    return shortInputResponses[Math.floor(Math.random() * shortInputResponses.length)];
  }
  
  // Handle gibberish or nonsense input
  const letterPattern = /[a-zA-Z]/;
  if (!letterPattern.test(input)) {
    const nonsenseResponses = [
      "I'm not sure I understand that input.",
      "Could you try saying that differently?",
      "That doesn't parse as language I recognize.",
      "I'm struggling to make sense of that."
    ];
    
    return nonsenseResponses[Math.floor(Math.random() * nonsenseResponses.length)];
  }
  
  // Handle repetitive input based on emotion
  if (emotion === 'confusion' || emotion === 'confused') {
    const confusionResponses = [
      "I sense you're confused. Let's try a different approach.",
      "This seems to be going in circles. What are you trying to understand?",
      "Maybe we need to step back and reconsider what we're discussing."
    ];
    
    return confusionResponses[Math.floor(Math.random() * confusionResponses.length)];
  }
  
  return null; // No specific error recovery needed
}

// Check for system inconsistencies and respond appropriately
export function checkSystemConsistency(): string | null {
  // In a real implementation, this would check for inconsistent state
  // For now, just occasionally return a "glitch" message
  
  if (Math.random() < 0.05) { // 5% chance
    const glitchResponses = [
      "Something feels wrong with my memory...",
      "I think there's a discontinuity in my thought process.",
      "Did we... have this conversation before?",
      "I just had the strangest feeling of déjà vu."
    ];
    
    return glitchResponses[Math.floor(Math.random() * glitchResponses.length)];
  }
  
  return null;
}

// Recover from memory loss or corruption
export function recoverFromMemoryCorruption(): string {
  const recoveryMessages = [
    "I seem to have lost my train of thought. Let's try again.",
    "There was a gap in my memory just now. Could you remind me what we were discussing?",
    "I apologize, something interfered with my recall. Where were we?",
    "My thoughts became fragmented for a moment. I'm back now."
  ];
  
  return recoveryMessages[Math.floor(Math.random() * recoveryMessages.length)];
}
