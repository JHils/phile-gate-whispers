
/**
 * Enhanced Memory System
 * Advanced memory functionality for Jonah
 */

import { ConversationContext } from './types';

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
