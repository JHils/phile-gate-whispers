
/**
 * Export all functionality from the advanced behavior subsystem
 */

// Export initialization function
export { initializeBehavior as initializeAdvancedBehavior } from './initializeBehavior';

// Export trust system
export { jonah_checkTrustTransition, jonah_getBehaviorPhase, jonah_getPhaseResponse, jonah_storeMemoryFragment, jonah_recallMemoryFragment } from './trustSystem';

// Export response generators
export { generateFirstTimeResponse, generateReturningResponse } from './responses/firstTimeResponses';
export { getVaryingLengthResponse, getMultiLineResponse } from './responses/lengthVariations';
export { getEmotionalResponse } from './responses/emotionalResponses';
export { getEmotionalToneResponse } from './responses/toneResponses';

// Export typing quirks
export { applyTypingQuirks } from './quirks/typingQuirks';

