
/**
 * Conversation Memory System
 * Handles storing and retrieving conversation memory
 */

import { EmotionalState, SentienceData, ConversationContext } from './types';

// Memory system constants
const MEMORY_KEY = 'jonah_conversation_memory';
const MAX_CONVERSATIONS = 10;
const MAX_MESSAGES_PER_CONV = 20;

// Load memories from storage
export function loadMemories(): ConversationContext[] {
  try {
    const memoryJson = localStorage.getItem(MEMORY_KEY);
    return memoryJson ? JSON.parse(memoryJson) : [];
  } catch (e) {
    console.error('Error loading conversation memories:', e);
    return [];
  }
}

// Save memories to storage
export function saveMemories(memories: ConversationContext[]): void {
  try {
    localStorage.setItem(MEMORY_KEY, JSON.stringify(memories.slice(0, MAX_CONVERSATIONS)));
  } catch (e) {
    console.error('Error saving conversation memories:', e);
  }
}

// Add a message to memory
export function addToMemory(
  message: string, 
  emotion: string,
  isUserMessage: boolean = true
): void {
  const memories = loadMemories();
  
  // Get current conversation or create new one
  let currentConversation = memories[0];
  if (!currentConversation || Date.now() - currentConversation.sessionStartTime > 3600000) {
    // Create new conversation if none exists or last one is over 1 hour old
    currentConversation = {
      recentMessages: [],
      emotionalJourney: [],
      topicFocus: null,
      depth: 0,
      recentTopics: [],
      emotionalHistory: [],
      userTrustLevel: parseInt(localStorage.getItem('jonahTrustScore') || '50'),
      sessionStartTime: Date.now()
    };
    memories.unshift(currentConversation);
  }
  
  // Add message to current conversation
  currentConversation.recentMessages.unshift(message);
  if (currentConversation.recentMessages.length > MAX_MESSAGES_PER_CONV) {
    currentConversation.recentMessages.pop();
  }
  
  // Add emotion to emotional journey
  currentConversation.emotionalJourney.unshift(emotion as any);
  if (currentConversation.emotionalJourney.length > MAX_MESSAGES_PER_CONV) {
    currentConversation.emotionalJourney.pop();
  }
  
  // Add to emotional history
  currentConversation.emotionalHistory.unshift(emotion as any);
  if (currentConversation.emotionalHistory.length > MAX_MESSAGES_PER_CONV) {
    currentConversation.emotionalHistory.pop();
  }
  
  // Increment conversation depth
  currentConversation.depth += 1;
  
  // Save updated memories
  saveMemories(memories);
}

// Get emotional state from memory
export function getEmotionalState(): EmotionalState {
  const memories = loadMemories();
  
  if (!memories.length || !memories[0].emotionalJourney.length) {
    return { primary: 'neutral', secondary: null, intensity: 'medium' };
  }
  
  const recentEmotions = memories[0].emotionalJourney.slice(0, 5);
  
  // Count emotion frequencies
  const emotionCounts: Record<string, number> = {};
  recentEmotions.forEach(emotion => {
    emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
  });
  
  // Find primary and secondary emotions
  let primary = 'neutral';
  let secondary = null;
  let maxCount = 0;
  let secondMaxCount = 0;
  
  Object.entries(emotionCounts).forEach(([emotion, count]) => {
    if (count > maxCount) {
      secondary = primary;
      secondMaxCount = maxCount;
      primary = emotion;
      maxCount = count;
    } else if (count > secondMaxCount) {
      secondary = emotion;
      secondMaxCount = count;
    }
  });
  
  // Determine intensity
  let intensity = 'medium';
  if (maxCount > 3) {
    intensity = 'high';
  } else if (maxCount === 1) {
    intensity = 'low';
  }
  
  return { 
    primary: primary as any, 
    secondary: secondary as any, 
    intensity: intensity as any 
  };
}

// Export for use in other modules
export function setupConversationMemory(sentience: SentienceData): SentienceData {
  // Initialize memory if needed
  if (!localStorage.getItem(MEMORY_KEY)) {
    localStorage.setItem(MEMORY_KEY, JSON.stringify([]));
  }
  
  return sentience;
}

// Get conversation depth
export function getConversationDepth(): number {
  const memories = loadMemories();
  
  if (!memories.length) {
    return 0;
  }
  
  return memories[0].depth;
}

// Update conversation emotional state
export function updateConversationEmotion(emotionalState: EmotionalState): void {
  const memories = loadMemories();
  
  if (!memories.length) {
    return;
  }
  
  memories[0].emotionalHistory.unshift(emotionalState.primary);
  if (memories[0].emotionalHistory.length > MAX_MESSAGES_PER_CONV) {
    memories[0].emotionalHistory.pop();
  }
  
  saveMemories(memories);
}
