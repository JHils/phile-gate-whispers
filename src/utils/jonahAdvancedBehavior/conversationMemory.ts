
/**
 * Conversation Memory System
 * Tracks conversation context and history for more natural responses
 */

import { EmotionCategory } from './types';

// Enhanced conversation context type
export interface EnhancedConversationContext {
  recentMessages: Array<{text: string, sender: 'user' | 'jonah', timestamp: number}>;
  emotionalJourney: EmotionCategory[];
  topicFocus: string[] | null;
  depth: number; // 0-100
  recentTopics: string[];
  emotionalHistory: {emotion: EmotionCategory, timestamp: number}[];
  userTrustLevel: number; // 0-100
  sessionStartTime: number;
}

// Initialize conversation memory
let conversationContext: EnhancedConversationContext | null = null;

/**
 * Initialize the conversation memory system
 */
export function initializeConversationMemory(): EnhancedConversationContext {
  if (conversationContext !== null) {
    return conversationContext;
  }
  
  // Create new conversation context
  conversationContext = {
    recentMessages: [],
    emotionalJourney: [],
    topicFocus: null,
    depth: 10, // Start shallow
    recentTopics: [],
    emotionalHistory: [],
    userTrustLevel: 50, // Default trust level
    sessionStartTime: Date.now()
  };
  
  return conversationContext;
}

/**
 * Add a message to conversation memory
 */
export function addMessageToMemory(text: string, sender: 'user' | 'jonah', emotion?: EmotionCategory): void {
  if (conversationContext === null) {
    initializeConversationMemory();
  }
  
  if (conversationContext) {
    // Add message
    conversationContext.recentMessages.push({
      text,
      sender,
      timestamp: Date.now()
    });
    
    // Keep only last 20 messages
    if (conversationContext.recentMessages.length > 20) {
      conversationContext.recentMessages = conversationContext.recentMessages.slice(-20);
    }
    
    // Add emotion to journey if provided
    if (emotion) {
      conversationContext.emotionalJourney.push(emotion);
      
      // Keep only last 10 emotions
      if (conversationContext.emotionalJourney.length > 10) {
        conversationContext.emotionalJourney = conversationContext.emotionalJourney.slice(-10);
      }
      
      // Add to emotional history
      conversationContext.emotionalHistory.push({
        emotion,
        timestamp: Date.now()
      });
    }
    
    // Increase depth slightly with each exchange
    conversationContext.depth = Math.min(conversationContext.depth + 2, 100);
  }
}

/**
 * Get the current conversation depth (0-100)
 */
export function getConversationDepth(): number {
  if (conversationContext === null) {
    initializeConversationMemory();
  }
  
  return conversationContext ? conversationContext.depth : 10;
}

/**
 * Reset the conversation memory
 */
export function resetConversationMemory(): void {
  conversationContext = null;
  initializeConversationMemory();
}

/**
 * Get the dominant emotion from recent conversation
 */
export function getDominantEmotion(): EmotionCategory {
  if (conversationContext === null) {
    initializeConversationMemory();
  }
  
  if (!conversationContext || conversationContext.emotionalJourney.length === 0) {
    return 'neutral';
  }
  
  // Count occurrences of each emotion
  const emotionCounts: Record<string, number> = {};
  
  for (const emotion of conversationContext.emotionalJourney) {
    if (emotion in emotionCounts) {
      emotionCounts[emotion]++;
    } else {
      emotionCounts[emotion] = 1;
    }
  }
  
  // Find the most frequent emotion
  let maxCount = 0;
  let dominantEmotion: EmotionCategory = 'neutral';
  
  for (const [emotion, count] of Object.entries(emotionCounts)) {
    if (count > maxCount) {
      maxCount = count;
      dominantEmotion = emotion as EmotionCategory;
    }
  }
  
  return dominantEmotion;
}

/**
 * Export the conversation memory for persistence
 */
export function exportConversationMemory(): string {
  if (conversationContext === null) {
    initializeConversationMemory();
  }
  
  return JSON.stringify(conversationContext);
}

/**
 * Import conversation memory from storage
 */
export function importConversationMemory(memoryData: string): boolean {
  try {
    conversationContext = JSON.parse(memoryData) as EnhancedConversationContext;
    return true;
  } catch (e) {
    console.error("Failed to import conversation memory:", e);
    return false;
  }
}
