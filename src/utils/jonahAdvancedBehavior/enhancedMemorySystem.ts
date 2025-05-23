
/**
 * Enhanced Memory System for Jonah
 */

import { 
  EmotionCategory,
  EmotionalState,
  SentienceData,
  TrustLevel,
  ConversationContextData
} from './types';

// Store user input in memory
export function storeUserInput(input: string, emotionalState: EmotionalState): void {
  if (!input) return;
  
  // Get existing memory data or initialize it
  let memoryData = [];
  try {
    const storedData = localStorage.getItem('jonah_memory');
    if (storedData) {
      memoryData = JSON.parse(storedData);
    }
  } catch (e) {
    console.error("Error accessing memory data:", e);
  }
  
  // Add new entry
  memoryData.push({
    timestamp: Date.now(),
    input,
    emotion: emotionalState.primary
  });
  
  // Limit memory size
  if (memoryData.length > 100) {
    memoryData = memoryData.slice(-100);
  }
  
  // Store updated memory
  try {
    localStorage.setItem('jonah_memory', JSON.stringify(memoryData));
  } catch (e) {
    console.error("Error storing memory data:", e);
  }
}

// Get conversation context for response generation
export function getConversationContext(sentience?: SentienceData): ConversationContextData {
  // Default context if no sentience data available
  let context: ConversationContextData = {
    recentMessages: [],
    emotionalJourney: [],
    topicFocus: null,
    depth: 0,
    recentTopics: [],
    emotionalHistory: [],
    userTrustLevel: 50,
    sessionStartTime: Date.now()
  };
  
  // If sentience data is available, use it to create context
  if (sentience) {
    context = {
      recentMessages: getRecentMessages(),
      emotionalJourney: getEmotionalHistory(),
      topicFocus: getTopicFocus(),
      depth: sentience.conversationContext?.depth || 0,
      recentTopics: getRecentTopics(),
      emotionalHistory: getEmotionalStateHistory(),
      userTrustLevel: sentience.userPerception?.trustLevel || 50,
      sessionStartTime: sentience.temporalContext?.startTime || Date.now()
    };
  }
  
  return context;
}

// Update memory with new response data
export function updateMemoryWithResponse(
  userInput: string, 
  response: string, 
  emotionalState: EmotionalState, 
  trustLevel: TrustLevel
): void {
  // Get existing memory record
  let memoryRecord = [];
  try {
    const storedRecord = localStorage.getItem('jonah_conversation_record');
    if (storedRecord) {
      memoryRecord = JSON.parse(storedRecord);
    }
  } catch (e) {
    console.error("Error accessing conversation record:", e);
  }
  
  // Add new interaction
  memoryRecord.push({
    timestamp: Date.now(),
    user: userInput,
    response,
    emotion: emotionalState.primary,
    trust: trustLevel
  });
  
  // Limit size
  if (memoryRecord.length > 50) {
    memoryRecord = memoryRecord.slice(-50);
  }
  
  // Store updated record
  try {
    localStorage.setItem('jonah_conversation_record', JSON.stringify(memoryRecord));
  } catch (e) {
    console.error("Error storing conversation record:", e);
  }
  
  // Update most recent inputs for pattern recognition
  updateRecentInputs(userInput);
}

// Update recent inputs list
function updateRecentInputs(input: string): void {
  try {
    // Get recent inputs
    let recentInputs = JSON.parse(localStorage.getItem('recent_inputs') || '[]');
    
    // Add new input
    recentInputs.push(input);
    
    // Limit to last 10
    if (recentInputs.length > 10) {
      recentInputs = recentInputs.slice(-10);
    }
    
    // Store updated list
    localStorage.setItem('recent_inputs', JSON.stringify(recentInputs));
  } catch (e) {
    console.error("Error updating recent inputs:", e);
  }
}

// Helper functions for conversation context

function getRecentMessages(): string[] {
  try {
    const record = JSON.parse(localStorage.getItem('jonah_conversation_record') || '[]');
    return record.slice(-5).map((item: any) => item.user || '');
  } catch (e) {
    console.error("Error getting recent messages:", e);
    return [];
  }
}

function getEmotionalHistory(): EmotionCategory[] {
  try {
    const record = JSON.parse(localStorage.getItem('jonah_conversation_record') || '[]');
    return record.slice(-10).map((item: any) => item.emotion || 'neutral');
  } catch (e) {
    console.error("Error getting emotional history:", e);
    return ['neutral'];
  }
}

function getTopicFocus(): string[] | null {
  // This would use more advanced NLP in a real implementation
  return null;
}

function getRecentTopics(): string[] {
  // This would extract topics with NLP in a real implementation
  return [];
}

function getEmotionalStateHistory(): EmotionalState[] {
  try {
    const record = JSON.parse(localStorage.getItem('jonah_emotional_states') || '[]');
    return record;
  } catch (e) {
    console.error("Error getting emotional state history:", e);
    return [];
  }
}

// Create conversation context
export function createConversationContext(trustLevel: 'low' | 'medium' | 'high'): ConversationContextData {
  return {
    recentMessages: [],
    emotionalJourney: ['neutral'],
    topicFocus: null,
    depth: 0,
    recentTopics: [],
    emotionalHistory: [],
    userTrustLevel: trustLevel === 'high' ? 80 : trustLevel === 'medium' ? 50 : 20,
    sessionStartTime: Date.now()
  };
}

// Store in memory function
export function storeInMemory(
  input: string,
  mood: EmotionCategory,
  isUser: boolean,
  context: ConversationContextData
): ConversationContextData {
  const newContext = { ...context };
  
  // Update recent messages
  if (isUser) {
    newContext.recentMessages = [...newContext.recentMessages.slice(-4), input];
  }
  
  // Update emotional journey
  newContext.emotionalJourney = [...newContext.emotionalJourney.slice(-9), mood];
  
  return newContext;
}

// Find relevant memories
export function findRelevantMemories(input: string, context: any): any[] {
  // Mock implementation - would use real NLP in a production system
  return [];
}

// Generate memory-based response
export function generateMemoryBasedResponse(memory: any, trustLevel: string): string {
  // Mock implementation
  return "I remember something similar to that.";
}
