
/**
 * Jonah Advanced Behavior System - Main export file
 */

// Export types properly
export type {
  EmotionCategory,
  EmotionalState,
  EmotionalTrend,
  ResponseStyle,
  ConversationContext
} from './types';

export * from './testament';
export * from './confessionSystem';
export * from './initializeBehavior';
export * from './adaptiveLearningSystem';
export * from './echoSystem';
export * from './temporalSystem';
export * from './typingSystem';
export * from './vocabularySystem';

// Re-export all functions from sentiment analysis
export {
  analyzeEmotion,
  analyze,
  generateEmotionalResponse,
  getEmotionalResponse,
  processEmotionalInput,
  getLayeredEmotionalResponse,
  checkForRecurringSymbols,
  trackUserInput,
  isRepeatedPhrase,
  getRepetitionResponse,
  getAdaptedResponse,
  detectEmotionalIntent,
  getUnsaidEmotionResponse,
  storeIntention,
  getFalseMemory,
  trackPhrase,
  getFalseMemoryResponse,
  getLoopResponse,
  getBlankFragmentResponse,
  splitAndTypeMessage,
  getResponseTemplate
} from './sentimentAnalysis';

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
