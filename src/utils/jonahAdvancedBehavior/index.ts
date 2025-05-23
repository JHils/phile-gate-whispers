
/**
 * Jonah Advanced Behavior - Main Index File
 * 
 * This file re-exports the key functionality from the advanced behavior system
 */

// Export the main types
export * from './types';

// Export from each subsystem
export * from './emotionalCore';

// Export from sentiment analysis
export {
  analyzeEmotion,
  checkForTriggerPhrases,
  processEmotionalInput,
  getEmotionalResponse,
  getLayeredEmotionalResponse,
  generateGreeting,
  getFalseMemoryResponse,
  getLoopResponse,
  getBlankFragmentResponse,
  checkForRecurringSymbols
} from './sentimentAnalysis/analyzer';

// Export from echo system
export {
  storeEcho,
  getEchoPhrase,
  checkForEchoMatch,
  getAllEchoes
} from './echoSystem';

// Export from dream system
export {
  getDreamReturnResponse,
  generateDreamFragment,
  isInDreamTime
} from './dreamSystem';

// Export from adaptive learning system
export {
  trackUserInput,
  isRepeatedPhrase,
  getRepetitionResponse,
  getAdaptedResponse,
  resetMemory as resetAdaptiveMemory
} from './adaptiveLearningSystem';

// Export from semantic system
export const detectEmotionalIntent = (input: string) => ({ intent: 'neutral', confidence: 0.5 });
export const getUnsaidEmotionResponse = (emotion: string) => `I sense you might be feeling ${emotion}`;
export const storeIntention = (input: string, details: any = {}) => {};
export const getFalseMemory = () => "I remember we discussed this before...";

// Export from temporal system
export const trackPhrase = (phrase: string) => {};

// Export from typing system
export const splitAndTypeMessage = (message: string, speed: 'slow' | 'medium' | 'fast' = 'medium') => message;

// Export from vocabulary system
export const getResponseTemplate = (category: string) => "This is a response template";
export const generateEmotionalResponse = (emotion: string, intensity?: string) => `This is an emotional response with ${emotion} at ${intensity || 'medium'} intensity`;

// Export initialization function
export { 
  initializeAdvancedBehavior, 
  initializeJonahSystems 
} from './initializeBehavior';

// Export helper functions - remove the duplicate declaration here
export { jonah_storeMemoryFragment } from './initializeBehavior';

