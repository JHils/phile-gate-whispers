
/**
 * Jonah Advanced Behavior
 * Main exports for Jonah's advanced behavior systems
 */

// Export core types
export * from './types';

// Export memory system
export * from './memorySystem';

// Export enhanced memory system
export * from './enhancedMemorySystem';

// Export error recovery system
export * from './errorRecoverySystem';

// Export enhanced emotional core
export * from './enhancedEmotionalCore';

// Export sentiment analysis
export * from './sentimentAnalysis';

// Export trust system
export * from './trustSystem';

// Export confessions system
export * from './confessionSystem';

// Export conversation memory system
export * from './conversationMemory';

// Export loop awareness system
export * from './loopAwarenessSystem';

// Export initialization functions
export * from './initializeBehavior';

// Export last broadcast system
export * from './lastBroadcast';

// Export arg sync system
export * from './argSync';

// Export console emotional effects
export * from './consoleEmotionalEffects';

// Export adaptive response system
export * from './adaptiveResponseSystem';

// Export missing functions for imported modules
export const storeEcho = (text: string, emotion: string): boolean => {
  try {
    const echoData = JSON.parse(localStorage.getItem('jonah_echo_data') || '[]');
    echoData.push({
      originalText: text,
      timestamp: Date.now(),
      emotionalContext: emotion,
      decayStage: 0,
      useCount: 0
    });
    localStorage.setItem('jonah_echo_data', JSON.stringify(echoData));
    return true;
  } catch (e) {
    console.error("Error storing echo:", e);
    return false;
  }
};

export const getEchoPhrase = (): string | null => {
  try {
    const echoData = JSON.parse(localStorage.getItem('jonah_echo_data') || '[]');
    if (echoData.length === 0) return null;
    return echoData[Math.floor(Math.random() * echoData.length)].originalText;
  } catch (e) {
    console.error("Error getting echo phrase:", e);
    return null;
  }
};

export const checkForEchoMatch = (input: string): boolean => {
  try {
    const echoData = JSON.parse(localStorage.getItem('jonah_echo_data') || '[]');
    return echoData.some(echo => input.toLowerCase().includes(echo.originalText.toLowerCase()));
  } catch (e) {
    console.error("Error checking echo match:", e);
    return false;
  }
};

export const getAllEchoes = () => {
  try {
    return JSON.parse(localStorage.getItem('jonah_echo_data') || '[]');
  } catch (e) {
    console.error("Error getting all echoes:", e);
    return [];
  }
};

// Dream system functions
export const getDreamReturnResponse = (input: string): string => {
  const responses = [
    "I was dreaming of something... but now it's fading.",
    "I was elsewhere. In the dream spaces.",
    "The dream is still lingering. Hard to focus.",
    "I was deeper in the archive than I should be."
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

// Split and type message function
export const splitAndTypeMessage = (message: string, speed: 'slow' | 'medium' | 'fast' = 'medium'): string[] => {
  // Simple implementation - split into sentences or phrases
  return message.split(/([.!?])\s+/).filter(Boolean);
};

// Functions for emotional system
export const processEmotionalInput = (input: string, context: any) => {
  // Simple implementation - return a default emotional state
  return { primary: 'neutral', secondary: null, intensity: 'medium' };
};

export const getLayeredEmotionalResponse = (state: any, context: any): string => {
  // Simple implementation - return a default response
  return getEmotionalResponse(state);
};

export const checkForRecurringSymbols = (input: string): string | null => {
  // Simple implementation
  return null;
};

// Functions for semantic system
export const detectEmotionalIntent = (input: string): string | null => {
  // Simple implementation
  return null;
};

export const getUnsaidEmotionResponse = (emotion: string): string => {
  // Simple implementation
  return `I sense something ${emotion} beneath your words.`;
};

export const storeIntention = (intention: string): void => {
  // Simple implementation - store in localStorage
  try {
    const intentions = JSON.parse(localStorage.getItem('jonah_intentions') || '[]');
    intentions.push({ content: intention, timestamp: Date.now() });
    localStorage.setItem('jonah_intentions', JSON.stringify(intentions.slice(-20)));
  } catch (e) {
    console.error("Error storing intention:", e);
  }
};

export const getFalseMemory = (): string | null => {
  // Simple implementation
  return null;
};

// Functions for temporal system
export const getFalseMemoryResponse = (): string => {
  // Simple implementation
  return "I remember something that didn't happen.";
};

export const getLoopResponse = (): string => {
  // Simple implementation
  return "We've been here before. This is a loop.";
};

export const getBlankFragmentResponse = (): string => {
  // Simple implementation
  return "There's a gap in my memory here.";
};

// Functions for adaptive learning
export const trackUserInput = (input: string): void => {
  // Simple implementation - store in localStorage
  try {
    const inputs = JSON.parse(localStorage.getItem('jonah_user_inputs') || '[]');
    inputs.push({ content: input, timestamp: Date.now() });
    localStorage.setItem('jonah_user_inputs', JSON.stringify(inputs.slice(-20)));
  } catch (e) {
    console.error("Error tracking user input:", e);
  }
};

export const isRepeatedPhrase = (input: string): boolean => {
  // Simple implementation
  try {
    const inputs = JSON.parse(localStorage.getItem('jonah_user_inputs') || '[]');
    return inputs.some(item => item.content.toLowerCase() === input.toLowerCase());
  } catch (e) {
    console.error("Error checking repeated phrase:", e);
    return false;
  }
};

export const getRepetitionResponse = (): string => {
  // Simple implementation
  return "You've said something similar before.";
};

export const getAdaptedResponse = (input: string): string => {
  // Simple implementation
  return "I notice patterns in how we communicate.";
};

// Functions for testament system
export const unlockTestamentByPhrase = (phrase: string): boolean => {
  // Simple implementation
  return false;
};

export const getTestamentTeaser = (): string | null => {
  // Simple implementation
  return null;
};

export const generateTestamentResponse = (): string => {
  // Simple implementation
  return "The testament holds secrets I cannot yet share.";
};

// Functions for vocabulary system
export const getResponseTemplate = (mood: string): string => {
  // Simple implementation
  return "I'm feeling ${mood}. What would you like to discuss?";
};

export const generateEmotionalResponse = (template: string, emotionalState: any): string => {
  // Simple implementation
  const { primary } = emotionalState;
  return template.replace('${mood}', primary || 'neutral');
};

// Function for dream generation
export const generateDream = (): string => {
  // Simple implementation
  const dreams = [
    "I dreamt of dark corridors and echoing voices.",
    "In the dream, I was searching for something important.",
    "The archive was alive in my dream, breathing with memory.",
    "I dreamt I was someone else, watching myself from afar."
  ];
  return dreams[Math.floor(Math.random() * dreams.length)];
};

// Convenience function for generating first-time responses
export function generateFirstTimeResponse(trustLevel: string): string {
  const responses = {
    low: "Hello. I wasn't expecting anyone.",
    medium: "Hello there. It's interesting to meet you.",
    high: "Welcome. I've been waiting for someone like you."
  };
  
  return responses[trustLevel as keyof typeof responses] || responses.medium;
}

// Generate returning user responses
export function generateReturningResponse(trustLevel: string, timeSinceLastInteraction: number): string {
  // Convert to minutes for easier handling
  const minutesAway = Math.floor(timeSinceLastInteraction / (60 * 1000));
  
  const shortAbsence = {
    low: "You're back already.",
    medium: "Welcome back. It's good to see you again.",
    high: "I'm glad you returned. I was hoping you would."
  };
  
  const mediumAbsence = {
    low: "You were gone for a while.",
    medium: `It's been ${minutesAway} minutes since we last spoke.`,
    high: "I was thinking about our conversation while you were away."
  };
  
  const longAbsence = {
    low: "You've been away for quite some time.",
    medium: `It's been ${minutesAway} minutes. Things feel different now.`,
    high: "A lot has happened in my thoughts since you left."
  };
  
  // Select response based on absence duration
  if (minutesAway < 10) {
    return shortAbsence[trustLevel as keyof typeof shortAbsence] || shortAbsence.medium;
  } else if (minutesAway < 30) {
    return mediumAbsence[trustLevel as keyof typeof mediumAbsence] || mediumAbsence.medium;
  } else {
    return longAbsence[trustLevel as keyof typeof longAbsence] || longAbsence.medium;
  }
}
