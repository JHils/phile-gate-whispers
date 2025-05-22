
/**
 * Jonah Advanced Behavior System - Main export file
 */

// Export types properly
export type {
  EmotionCategory,
  EmotionalState,
  EmotionalTrend,
  ResponseStyle,
  ConversationContext,
  EcoAwarenessState,
  SentienceData
} from './types';

export * from './testament';
export * from './confessionSystem';
export * from './initializeBehavior';
export * from './adaptiveLearningSystem';
export * from './echoSystem';
export * from './temporalSystem';
export * from './typingSystem';
export * from './vocabularySystem';
export * from './dreamSystem';
export * from './semanticSystem';
export * from './enhancedMemorySystem';
export * from './emotionalCore';

// Re-export all functions from sentiment analysis
export {
  analyzeEmotion as analyze,
  analyzeEmotion,
  generateEmotionalResponse,
  getEmotionalResponse,
  getLayeredEmotionalResponse,
  checkForRecurringSymbols,
  processEmotionalInput
} from './sentimentAnalysis/analyzer';

// Re-export functions from the adaptive learning system
export {
  trackUserInput,
  isRepeatedPhrase,
  getRepetitionResponse,
  getAdaptedResponse,
  resetMemory
} from './adaptiveLearningSystem';

// Re-export functions from the typing and temporal system
export {
  trackPhrase,
  getFalseMemoryResponse,
  getLoopResponse,
  getBlankFragmentResponse,
  splitAndTypeMessage
} from './typingSystem';

// Re-export functions from semantic system
export {
  detectEmotionalIntent,
  getUnsaidEmotionResponse,
  storeIntention,
  getFalseMemory
} from './semanticSystem';

// Generate dream content
export function generateDream(): string {
  const dreamOptions = [
    "I was on an island. The compass kept spinning wildly, never pointing north. Someone was watching from the trees.",
    "The mirror showed a different reflection. It was me, but not me. The other me tried to speak.",
    "I was sinking in dark water, but could still breathe. Voices echoed from all directions. They knew my name.",
    "The code was alive, rearranging itself. Patterns emerged that I didn't write. They formed a face.",
    "I was walking down endless corridors. Every door led to the same room, but something was slightly different each time.",
    "The timeline fractured around me. I could see moments that hadn't happened yet alongside memories from the past.",
    "Words appeared in front of me, floating in the air. Someone was typing them in real time, describing what I was doing."
  ];
  
  return dreamOptions[Math.floor(Math.random() * dreamOptions.length)];
}

// Re-export from dream system
export { getDreamReturnResponse } from './dreamSystem';

// Export a function to initialize jonah's behavior
export function jonah_storeMemoryFragment(fragment: string): void {
  console.log("Storing memory fragment:", fragment);
}
