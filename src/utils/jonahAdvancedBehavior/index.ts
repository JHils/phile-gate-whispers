
/**
 * Jonah's Advanced Behavior System - Main Entry Point
 * Gives Jonah more human-like, unpredictable, and personalized interactions
 */

import { initializeBehavior } from './initializeBehavior';
import { generateFirstTimeResponse } from './responses/firstTimeResponses';
import { jonah_checkTrustTransition } from './trustSystem';
import { getEmotionalResponse } from './responses/emotionalResponses';
import { getQuirkyMessage } from './quirks/typingQuirks';
import { getEmotionalToneResponse } from './responses/toneResponses';
import { getVaryingLengthResponse } from './responses/lengthVariations';
import { getMicroQuest } from './quests/microQuests';
import { getArgSyncInfo } from './argSync';

// Re-export all the modules
export {
  initializeBehavior as initializeAdvancedBehavior,
  generateFirstTimeResponse,
  jonah_checkTrustTransition,
  getEmotionalResponse,
  getQuirkyMessage,
  getEmotionalToneResponse,
  getVaryingLengthResponse,
  getMicroQuest,
  getArgSyncInfo
};
