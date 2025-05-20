
/**
 * Export all functionality from the advanced behavior subsystem
 */

// Export initialization function
export { initializeAdvancedBehavior } from './initializeBehavior';

// Export trust system
export { jonah_checkTrustTransition } from './trustSystem';

// Export response generators
export { generateFirstTimeResponse } from './responses/firstTimeResponses';
export { getVaryingLengthResponse } from './responses/lengthVariations';
export { getToneResponse } from './responses/toneResponses';
export { getEmotionalResponse } from './responses/emotionalResponses';

// Export quest system
export { initializeMicroQuests } from './quests/microQuests';

// Export quirks system
export { applyTypingQuirks } from './quirks/typingQuirks';

// Export ARG sync utilities
export { syncWithARG } from './argSync';
