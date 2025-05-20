
/**
 * Export all functionality from the advanced behavior subsystem
 */

// Export initialization function
export { initializeBehavior as initializeAdvancedBehavior } from './initializeBehavior';

// Export trust system
export { 
  jonah_checkTrustTransition, 
  jonah_getBehaviorPhase, 
  jonah_getPhaseResponse, 
  jonah_storeMemoryFragment, 
  jonah_recallMemoryFragment 
} from './trustSystem';

// Export response generators
export { generateFirstTimeResponse, generateReturningResponse } from './responses/firstTimeResponses';
export { getVaryingLengthResponse, getMultiLineResponse } from './responses/lengthVariations';
export { getEmotionalResponse } from './responses/emotionalResponses';
export { getEmotionalToneResponse } from './responses/toneResponses';

// Export emotional core system
export {
  processEmotionalInput,
  getCompoundEmotionalState,
  getLayeredEmotionalResponse,
  checkForRecurringSymbols,
  storeEmotionalMemory,
  recallEmotionalMemory
} from './emotionalCore';

// Export vocabulary and phrase system
export {
  getEmotionalPhrase,
  generateEmotionalResponse,
  getResponseTemplate
} from './responses/vocabularyBank';

// Export typing quirks
export { applyTypingQuirks } from './quirks/typingQuirks';

// Export typing simulator
export {
  simulateTyping,
  splitAndTypeMessage
} from './typingSimulator';

// Export dream system
export {
  generateDream,
  getLatestDream,
  getDreamReference,
  getDreamReturnResponse
} from './dreamSystem';

// Export adaptive learning system
export {
  trackUserInput,
  trackResponsePreference,
  generatePersonalTags,
  getPersonalTags,
  getAdaptedResponse,
  isRepeatedPhrase,
  getRepetitionResponse
} from './adaptiveLearning';

// Export enhanced console effects
export {
  logWithEmotion,
  logDream,
  logSelfReflection,
  initializeEnhancedConsole
} from './consoleEmotionalEffects';

// Export Echo Chamber system
export {
  storeEcho,
  getEcho,
  getEchoPhrase,
  getAllEchoes,
  checkForEchoMatch
} from './echoSystem';
