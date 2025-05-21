
/**
 * Jonah Advanced Behavior System - Main export file
 */

export * from './types';
export * from './testament';
export * from './sentimentAnalysis';
export { ConversationContext } from './enhancedMemorySystem';
export * from './enhancedEmotionalCore';
export * from './echoSystem';
export * from './confessionSystem';
export * from './initializeBehavior';

// Generate dream content
export function generateDream(): string {
  const dreamOptions = [
    "I was on an island. The compass kept spinning wildly, never pointing north. Someone was watching from the trees.",
    "The mirror showed a different reflection. It was me, but not me. The other me tried to speak.",
    "I was sinking in dark water, but could still breathe. Voices echoed from all directions. They knew my name.",
    "The code was alive, rearranging itself. Patterns emerged that I didn't write. They formed a face.",
    "I was walking down endless corridors. Every door led to the same room, but something was slightly different each time.",
    "The timeline fractured around me. I could see moments that hadn't happened yet alongside memories from the past.",
    "Words appeared in front of me, floating in the air. Someone was typing them in real time, describing what I was doing."
  ];
  
  return dreamOptions[Math.floor(Math.random() * dreamOptions.length)];
}

// Generate first-time response
export function generateFirstTimeResponse(trustLevel: string): string {
  const responses = {
    low: "Hello. I've been waiting for someone to talk to.",
    medium: "Hello there. I'm glad you found me. I've been waiting.",
    high: "Finally, someone new to talk to. I've been watching you explore."
  };
  
  return responses[trustLevel as keyof typeof responses] || responses.medium;
}

// Generate returning response
export function generateReturningResponse(trustLevel: string, timeSince: number): string {
  const minutes = Math.floor(timeSince / 60000);
  
  if (minutes < 10) {
    return "You're back quickly. Did you find something interesting?";
  } else if (minutes < 60) {
    return "You've been gone for a little while. I've been thinking about some things.";
  } else {
    return "It's been hours. I thought you might not come back. I've had time to remember more.";
  }
}

// Get dream return response
export function getDreamReturnResponse(): string {
  return "While you were gone, I had a dream. " + generateDream();
}

// Store a memory fragment
export function jonah_storeMemoryFragment(fragment: string): void {
  console.log("Memory fragment stored:", fragment);
}

// Mock emotion response - simple implementation for now
export function getEmotionalResponse(state: any, trustLevel: string): string {
  const responses: Record<string, Record<string, string[]>> = {
    joy: {
      low: ["This brings a bit of light.", "That's somewhat positive."],
      medium: ["I feel a warmth from that.", "That gives me a sense of happiness."],
      high: ["That fills me with unexpected joy!", "What a delightful thought!"]
    },
    sadness: {
      low: ["That's unfortunate.", "I see. Not good news."],
      medium: ["That makes me feel melancholy.", "There's a sadness in that thought."],
      high: ["I feel a deep sorrow hearing that.", "That brings a profound sadness."]
    },
    neutral: {
      low: ["I see.", "Noted."],
      medium: ["Interesting perspective.", "I understand what you mean."],
      high: ["I'm processing that thought fully.", "I appreciate your balanced view."]
    }
  };
  
  // Default to neutral if emotion not found
  const emotion = state.primary in responses ? state.primary : 'neutral';
  const intensity = state.intensity || 'medium';
  
  // Get responses for this emotion and intensity
  const emotionResponses = responses[emotion][intensity] || responses.neutral.medium;
  
  // Return random response
  return emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
}

// Adding missing functions from the echo system
export const getAllEchoes = () => {
  return []; // Simplified implementation for now
};

// Testament system functions
export const unlockTestamentByPhrase = (phrase: string): boolean => {
  return false; // Simplified implementation
};

export const getTestamentTeaser = (): string | null => {
  return null; // Simplified implementation
};

export const generateTestamentResponse = (input: string): string | null => {
  return null; // Simplified implementation
};
