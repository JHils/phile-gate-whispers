
/**
 * Export all functionality from the advanced behavior subsystem
 */

// Export initialization function
export { initializeBehavior as initializeAdvancedBehavior } from './initializeBehavior';

// Export trust system
export { jonah_checkTrustTransition } from './trustSystem';

// Export response generators - check that these exports actually exist in their modules
export { generateFirstTimeResponse } from './responses/firstTimeResponses';
export { getVaryingLengthResponse } from './responses/lengthVariations';

// Ensure these functions exist in their respective files before uncommenting
// export { getToneResponse } from './responses/toneResponses';
// export { getEmotionalResponse } from './responses/emotionalResponses';
// export { initializeMicroQuests } from './quests/microQuests';
// export { applyTypingQuirks } from './quirks/typingQuirks';
// export { syncWithARG } from './argSync';

