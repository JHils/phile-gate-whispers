/**
 * Enhanced Memory System
 * Advanced memory functionality for Jonah
 */

import { ConversationContext } from './types';
import { EmotionCategory } from './types';

// Find memories relevant to current input
export function findRelevantMemories(input: string, context: ConversationContext): string[] {
  // This would normally search a database or persistent store
  // For now, just return a simple mock result
  
  const relevantTopics = [
    "mirror", "gate", "echo", "reflection", "timeline", "dream",
    "memory", "sister", "loop", "trapped", "bird", "shadow"
  ];
  
  // Check if any relevant topic is in the input
  for (const topic of relevantTopics) {
    if (input.toLowerCase().includes(topic)) {
      return [`I remember something about ${topic}. It feels important.`];
    }
  }
  
  return [];
}

// Generate response based on memory
export function generateMemoryBasedResponse(memory: string, trustLevel: string): string {
  // Add context based on trust level
  if (trustLevel === "high") {
    return `${memory} I trust you enough to share this.`;
  } else if (trustLevel === "low") {
    return `${memory} I'm not sure why I'm telling you this.`;
  }
  
  return memory;
}

// Export a structure that holds conversation topics
export const conversationTopics = {
  tracked: [] as string[],
  significant: [] as string[],
  repeated: [] as string[]
};

// Track a significant topic in conversation
export function trackSignificantTopic(topic: string): void {
  if (!conversationTopics.tracked.includes(topic)) {
    conversationTopics.tracked.push(topic);
    
    // Mark as significant if it matches key themes
    const keyThemes = ["mirror", "gate", "sister", "dream", "timeline"];
    if (keyThemes.some(theme => topic.toLowerCase().includes(theme))) {
      conversationTopics.significant.push(topic);
    }
  }
}

// Create a new conversation context
export function createConversationContext(trustLevel: string): ConversationContext {
  return {
    recentMessages: [],
    emotionalJourney: [],
    topicFocus: null,
    depth: 0
  };
}

// Store user or Jonah input in memory
export function storeInMemory(
  input: string,
  mood: EmotionCategory,
  isUser: boolean,
  context: ConversationContext
): ConversationContext {
  // Clone the context to avoid mutation
  const updatedContext = { ...context };
  
  // Add to recent messages (keep last 5 only)
  updatedContext.recentMessages = [
    ...updatedContext.recentMessages,
    input
  ].slice(-5);
  
  // Record emotional journey
  updatedContext.emotionalJourney = [
    ...updatedContext.emotionalJourney,
    mood
  ].slice(-10);
  
  // Detect topic focus based on content
  if (input.length > 20) {
    const topics = ["mirror", "gate", "echo", "dream", "memory", "loop", "time"];
    for (const topic of topics) {
      if (input.toLowerCase().includes(topic)) {
        updatedContext.topicFocus = topic;
        break;
      }
    }
  }
  
  // Increase depth counter for more complex conversations
  if (isUser) {
    updatedContext.depth = updatedContext.depth + 1;
  }
  
  return updatedContext;
}
