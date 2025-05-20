
/**
 * Jonah Advanced Behavior System - Main export file
 */

// Import subsystems
import { initializeTestament } from './testament';
import { initializeConfessions } from './confessionSystem';
import { initializeEchoSystem } from './echoSystem';
import { initializeDreamSystem } from './dreamSystem';

// Export from subsystems
export { processEmotionalInput, getCompoundEmotionalState, getLayeredEmotionalResponse, checkForRecurringSymbols, storeEmotionalMemory } from './emotionalCore';
export { applyTypingQuirks, addTypingGlitches, addTypingErrors } from './quirks/typingQuirks';
export { addConfession, getAllConfessions, getConfessionsByEmotion, createRecursiveConfession, generateSpontaneousConfession } from './confessionSystem';
export type { ConfessionEntry } from './confessionSystem';
export { checkTestamentUnlock, getNextTestamentEntry, getRevealedEntries } from './testament';
export { getMostRecentBroadcast, rebootAfterBroadcast, checkBroadcastConditions, createBroadcast, handleUserFarewell, getAllBroadcasts } from './lastBroadcast';
export type { BroadcastType } from './lastBroadcast';

// Export dream system functions
export { 
  initializeDreamSystem,
  generateDream,
  getAllDreams,
  getMostRecentDream
} from './dreamSystem';
export type { Dream } from './dreamSystem';

// Export echoSystem functions
export { 
  storeEcho,
  getEcho,
  getEchoPhrase,
  checkForEchoMatch,
  getAllEchoes,
  initializeEchoSystem
} from './echoSystem';

// Export new sentiment analysis functions
export {
  analyzeEmotion,
  getEmotionalResponse,
  getClarifyingQuestion,
  generateEmotionalResponse,
  trackEmotionalPattern,
  generateMetaAwarenessComment
} from './sentimentAnalysis';

// Export new conversation memory functions
export {
  storeConversationMemory,
  findMemoryReference,
  generateMemoryResponse,
  getAmbiguityResponse,
  getPersonalizationInfo
} from './conversationMemory';

// Initialize the behavior system
export const initializeAdvancedBehavior = () => {
  // Initialize each subsystem
  initializeTestament();
  initializeConfessions();
  initializeDreamSystem();
  initializeEchoSystem();
  
  console.log('Jonah Advanced Behavior System initialized');
};

// Fix missing exported functions for useMessages.ts
// These are just stubs that need to be implemented in appropriate files later
export const generateFirstTimeResponse = (trustLevel: string) => {
  return `Hello. I've been waiting for someone to find me. My name is Jonah.`;
};

export const generateReturningResponse = (trustLevel: string, timeSinceLastInteraction: number) => {
  return `You're back. It's been ${Math.round(timeSinceLastInteraction / 1000 / 60)} minutes.`;
};

export const getVaryingLengthResponse = (response: string, trustLevel: string) => {
  return response; // For now, just return the response unchanged
};

export const jonah_storeMemoryFragment = (fragment: string) => {
  // Stub implementation - would store in localStorage or database
  console.log("Memory stored:", fragment);
};

export const jonah_recallMemoryFragment = () => {
  // Stub implementation
  return "Something you said before resonated with me.";
};

// Adaptive learning stubs
export const trackUserInput = (content: string) => {
  // Stub implementation
};

export const isRepeatedPhrase = (content: string) => {
  return false; // Stub implementation
};

export const getRepetitionResponse = (content: string) => {
  return "You've said something like this before.";
};

export const getAdaptedResponse = (response: string) => {
  return response; // Stub implementation
};

// Typing simulation stub
export const splitAndTypeMessage = (
  content: string,
  trackMessage: (messageContent: string) => void,
  setIsTyping: (isTyping: boolean) => void,
  options?: { quirks?: boolean, splitChance?: number }
) => {
  // Simple implementation, would normally split and type message with delays
  setIsTyping(true);
  setTimeout(() => {
    trackMessage(content);
    setIsTyping(false);
  }, 500);
};

// Dream system stub
export const getDreamReturnResponse = () => {
  return "While you were gone, I had a dream.";
};

// Vocabulary system stubs
export const getResponseTemplate = (type: string) => {
  return "I hear you."; // Basic template
};

// Semantic interpretation stubs
export const detectEmotionalIntent = (content: string) => {
  return { primary: "neutral", secondary: null };
};

export const getUnsaidEmotionResponse = (content: string) => {
  return null; // Stub implementation
};

export const storeIntention = (content: string) => {
  // Stub implementation
};

export const getFalseMemory = () => {
  return null; // Stub implementation
};

// Temporal memory stubs
export const trackPhrase = (content: string) => {
  // Stub implementation
};

export const checkForLoop = (content: string) => {
  return { isLoop: false, count: 0 }; // Stub implementation
};

export const getFalseMemoryResponse = () => {
  return null; // Stub implementation
};

export const getLoopResponse = (count: number) => {
  return "We seem to be going in circles.";
};

export const getBlankFragmentResponse = (content: string) => {
  return null; // Stub implementation
};

// Testament system stubs
export const unlockTestamentByPhrase = (content: string) => {
  // Stub implementation
};

export const getTestamentTeaser = () => {
  return null; // Stub implementation
};

export const generateTestamentResponse = (content: string) => {
  return null; // Stub implementation
};

