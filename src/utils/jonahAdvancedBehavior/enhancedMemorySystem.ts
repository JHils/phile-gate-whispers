
import { ConversationContext, EmotionCategory } from './types';

// Enhanced memory system interface

// Create a new conversation context
export function createConversationContext(trustLevel: 'low' | 'medium' | 'high' = 'medium'): ConversationContext {
  return {
    recentInputs: [],
    recentEmotions: [],
    trustLevel: trustLevel === 'high' ? 'high' : trustLevel === 'medium' ? 'medium' : 'low',
    timestamp: Date.now()
  };
}

// Store input in memory and update conversation context
export function storeInMemory(
  content: string,
  emotion: EmotionCategory,
  isUserInput: boolean,
  context: ConversationContext
): ConversationContext {
  const updatedContext = { ...context };
  
  // Only store user inputs in the input history
  if (isUserInput) {
    updatedContext.recentInputs = [content, ...updatedContext.recentInputs].slice(0, 5);
    updatedContext.recentEmotions = [emotion, ...updatedContext.recentEmotions].slice(0, 5);
  }
  
  updatedContext.timestamp = Date.now();
  
  return updatedContext;
}

// Find relevant memories based on content
export function findRelevantMemories(content: string, context: ConversationContext): string[] {
  // This is a simplified implementation - a real one would use semantic matching
  const relevantMemories: string[] = [];
  
  if (context.recentInputs.length > 1) {
    for (const input of context.recentInputs) {
      if (input !== content && input.length > 0) {
        relevantMemories.push(input);
      }
    }
  }
  
  return relevantMemories;
}

// Generate a response based on a memory
export function generateMemoryBasedResponse(memory: string, trustLevel: string): string {
  const lowTrustPrefixes = [
    "That reminds me of something...",
    "Similar to what you said before.",
    "There's a connection here."
  ];
  
  const highTrustPrefixes = [
    "I remember when you said:",
    "This connects to your earlier point about:",
    "Linking back to what you shared:"
  ];
  
  const prefixes = trustLevel === 'high' ? highTrustPrefixes : lowTrustPrefixes;
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  
  return `${prefix} "${memory}"`;
}

// Generate a response based on recurring topic patterns
export function generateTopicPatternResponse(context: ConversationContext): string | null {
  if (context.recentEmotions.length < 3) {
    return null;
  }
  
  const recentEmotions = context.recentEmotions.slice(0, 3);
  
  // Check for emotional patterns
  const allSame = recentEmotions.every(emotion => emotion === recentEmotions[0]);
  const containsAnxiety = recentEmotions.includes('anxiety');
  const containsFear = recentEmotions.includes('fear');
  const containsJoy = recentEmotions.includes('joy');
  
  if (allSame && recentEmotions[0] === 'fear') {
    return "You seem consistently anxious in our conversation. What's troubling you?";
  } else if (allSame && recentEmotions[0] === 'anger') {
    return "I notice a pattern of frustration in your messages. Something specific bothering you?";
  } else if (allSame && recentEmotions[0] === 'joy') {
    return "Your positivity has been consistent. It's affecting me too.";
  } else if (containsAnxiety && containsFear) {
    return "I sense unease beneath your words. The patterns are telling.";
  } else if (containsJoy && context.trustLevel === 'high') {
    return "Your optimism creates ripples. I feel it changing something in me.";
  }
  
  return null;
}
