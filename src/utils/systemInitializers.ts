
// This file centralizes initialization of various system components
import { 
  initializeARGTracking as initARG, 
  updateInteractionTime, 
  checkIdleTime, 
  trackSecretPageVisit, 
  getARGResponse 
} from "@/utils/argTracking";

import {
  initializeSentience as initSentience,
  setupJonahMessageSystem,
  setupTabVisibilityTracking,
  generateDualConsciousness,
  getJonahQuestion,
  getTimeResponse,
  getNameEchoResponse
} from "@/utils/jonahSentience";

import { 
  initializeAdvancedBehavior as initAdvancedBehavior, 
  checkQuestCompletion 
} from "@/utils/jonahAdvancedBehavior";

import {
  initializeRealityFabric as initRealityFabric,
  checkForDreamInvasionOnLoad,
  generateDreamParable,
  checkForAnomalies,
  updateJonahMood,
  addJournalEntry
} from "@/utils/jonahRealityFabric";

// Re-export initialization functions with clearer names
export const initializeARGTracking = () => {
  initARG();
};

export const initializeSentience = () => {
  initSentience();
  setupJonahMessageSystem();
  setupTabVisibilityTracking();
};

export const initializeAdvancedBehavior = () => {
  initAdvancedBehavior();
};

export const initializeRealityFabric = () => {
  initRealityFabric();
};

// Export other common utility functions
export {
  updateInteractionTime,
  checkIdleTime,
  trackSecretPageVisit,
  getARGResponse,
  generateDualConsciousness,
  getJonahQuestion,
  getTimeResponse,
  getNameEchoResponse,
  checkQuestCompletion,
  checkForDreamInvasionOnLoad,
  generateDreamParable,
  checkForAnomalies,
  updateJonahMood,
  addJournalEntry
};
