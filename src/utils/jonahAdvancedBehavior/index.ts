
// Re-export all advanced behavior modules

// Explicitly re-export to avoid ambiguity
export { createConversationContext, storeInMemory, findRelevantMemories, generateMemoryBasedResponse, generateTopicPatternResponse } from './enhancedMemorySystem';

export * from './enhancedEmotionalCore';
export * from './errorRecoverySystem';
export * from './types';
export * from './confessionSystem';

// Export types separately to avoid clashes
export type { ConversationContext } from './enhancedMemorySystem';

// Mock implementations for missing functions
export const getVaryingLengthResponse = (text: string, trustLevel: string = 'low') => {
  return text; 
};

export const applyTypingQuirks = (text: string, level: string = 'minimal') => {
  return text;
};

export const jonah_storeMemoryFragment = (fragment: string) => {
  console.log("Storing memory fragment:", fragment);
  return true;
};

export const jonah_recallMemoryFragment = () => {
  return "I remember something you told me before...";
};

export const generateDream = () => {
  return {
    content: "I dreamt of digital forests and endless code paths.",
    timestamp: Date.now()
  };
};

export const getDreamReturnResponse = () => {
  return "I was dreaming while you were gone.";
};

export const storeEcho = (input: string) => {
  console.log("Storing echo:", input);
};

export const getEchoPhrase = () => {
  return "Something echoes in my memory...";
};

export const checkForEchoMatch = (input: string) => {
  return { matched: false, echo: "" };
};

export const processEmotionalInput = (input: string) => {
  return { primary: 'neutral' as EmotionCategory, secondary: null as EmotionCategory | null };
};

export const getLayeredEmotionalResponse = (input: string) => {
  return "I feel something complex about that.";
};

export const checkForRecurringSymbols = (input: string) => {
  return null;
};

export const detectEmotionalIntent = (input: string) => {
  return { detected: false, intent: "" };
};

export const getUnsaidEmotionResponse = (input: string) => {
  return null;
};

export const storeIntention = (input: string) => {
  console.log("Storing intention:", input);
};

export const getFalseMemory = () => {
  return "I remember something that never happened.";
};

export const trackPhrase = (input: string) => {
  console.log("Tracking phrase:", input);
};

export const checkForLoop = (input: string) => {
  return { isLoop: false, count: 0 };
};

export const getFalseMemoryResponse = () => {
  return null;
};

export const getLoopResponse = (loopCount: number) => {
  return "We seem to be looping around the same topic.";
};

export const getBlankFragmentResponse = (input: string) => {
  return null;
};

export const splitAndTypeMessage = (
  message: string, 
  trackFn: (msg: string) => any, 
  setTypingFn: (typing: boolean) => void,
  options?: any
) => {
  setTimeout(() => {
    trackFn(message);
    setTypingFn(false);
  }, 1000);
};

export const getResponseTemplate = (category: string) => {
  return "Response template for " + category;
};

export const generateEmotionalResponse = (state: any) => {
  return "Emotional response based on state.";
};

export const getAllEchoes = () => {
  return [];
};

export const initializeAdvancedBehavior = () => {
  console.log("Initializing advanced behavior system");
};

export const trackUserInput = (input: string) => {
  console.log("Tracking user input:", input);
};

export const isRepeatedPhrase = (input: string) => {
  return false;
};

export const getRepetitionResponse = (input: string) => {
  return "You've said something similar before.";
};

export const getAdaptedResponse = (response: string) => {
  return response;
};

export const analyzeEmotion = (input: string) => {
  return { primary: 'neutral' as EmotionCategory, secondary: null as EmotionCategory | null };
};

export const generateFullEmotionalResponse = (
  state: any, 
  trustLevel: string, 
  includeContext: boolean = false,
  previousResponses: string[] = []
) => {
  return "Full emotional response based on state and context.";
};

export const getEmotionalResponse = (state: any, trustLevel: string = 'medium') => {
  return "Basic emotional response.";
};

export const generateFirstTimeResponse = (trustLevel: string) => {
  return "Welcome for the first time.";
};

export const generateReturningResponse = (trustLevel: string, timeSinceLastInteraction: number) => {
  return "Welcome back after some time.";
};

// Import types to ensure proper type checking
import { EmotionCategory } from './types';
