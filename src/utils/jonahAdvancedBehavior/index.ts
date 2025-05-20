
/**
 * Export all functionality from the advanced behavior subsystem
 */

// Export initialization function
export { initializeBehavior as initializeAdvancedBehavior } from './initializeBehavior';

// Export trust system
export { jonah_checkTrustTransition } from './trustSystem';

// Export response generators
export { generateFirstTimeResponse } from './responses/firstTimeResponses';
export { getVaryingLengthResponse } from './responses/lengthVariations';

// Export other functions as they become available
// Uncomment these as they're implemented
// export { getToneResponse } from './responses/toneResponses';
// export { getEmotionalResponse } from './responses/emotionalResponses';
// export { initializeMicroQuests } from './quests/microQuests';
// export { applyTypingQuirks } from './quirks/typingQuirks';
// export { syncWithARG } from './argSync';
