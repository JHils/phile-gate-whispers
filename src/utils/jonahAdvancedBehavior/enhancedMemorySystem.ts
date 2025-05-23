/**
 * Enhanced Memory System
 * Provides advanced memory retrieval and response generation based on memories
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
    dominantEmotions: [],
    trustLevel: 'medium',
    sessionStart: Date.now(),
    messageCount: 0,
    topics: []
  };
  
  // If sentience data is available, use it to create context
  if (sentience) {
    context = {
      recentMessages: getRecentMessagesAsObjects(),
      dominantEmotions: getEmotionalHistory(),
      trustLevel: sentience.userPerception?.trustLevel > 50 ? 'high' : sentience.userPerception?.trustLevel > 25 ? 'medium' : 'low',
      sessionStart: sentience.temporalContext?.startTime || Date.now(),
      messageCount: sentience.temporalContext?.messageCount || 0,
      topics: sentience.temporalContext?.topicFocus || []
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

function getRecentMessagesAsObjects(): Array<{content: string; isUser: boolean; emotion: EmotionCategory; timestamp: number}> {
  try {
    const record = JSON.parse(localStorage.getItem('jonah_conversation_record') || '[]');
    return record.slice(-5).map((item: any) => ({
      content: item.user || '',
      isUser: true,
      emotion: item.emotion || 'neutral',
      timestamp: item.timestamp || Date.now()
    }));
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
    dominantEmotions: ['neutral'],
    trustLevel: trustLevel,
    sessionStart: Date.now(),
    messageCount: 0,
    topics: [],
    userTrustLevel: trustLevel === 'high' ? 80 : trustLevel === 'medium' ? 50 : 20
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
  
  // Update recent messages with properly structured objects
  if (isUser) {
    const newMessage = {
      content: input,
      isUser: true,
      emotion: mood,
      timestamp: Date.now()
    };
    
    newContext.recentMessages = [
      ...(newContext.recentMessages || []).slice(-4),
      newMessage
    ];
  }
  
  // Update emotional journey
  newContext.dominantEmotions = [
    ...(newContext.dominantEmotions || []).slice(-9),
    mood
  ];
  
  return newContext;
}

// Find relevant memories
export function findRelevantMemories(input: string, context: any = {}): string[] {
  // In a real implementation, this would use more sophisticated relevance scoring
  // For now, this is a simple placeholder implementation
  const allMemories = getMemoryFragments();
  
  // Simple keyword matching
  const relevantMemories = allMemories.filter(memory => {
    // Check for direct word matches
    const words = input.toLowerCase().split(/\s+/);
    const memoryText = memory.toLowerCase();
    
    return words.some(word => {
      // Skip very short words
      if (word.length < 4) return false;
      
      return memoryText.includes(word);
    });
  });
  
  return relevantMemories;
}

// Get memory fragments from localStorage
function getMemoryFragments(): string[] {
  try {
    const fragments = JSON.parse(localStorage.getItem('jonah_memory_fragments') || '[]');
    return fragments.map((frag: {content: string}) => frag.content);
  } catch (e) {
    return [];
  }
}

// Generate a response based on a memory
export function generateMemoryBasedResponse(memory: string, trustLevel: string): string {
  // In a real implementation, this would format the memory into a natural response
  // For now, we'll use simple templates
  
  const intros = {
    high: [
      "I remember something about this...",
      "This reminds me of something I've seen before...",
      "I have a memory that relates to this:"
    ],
    medium: [
      "I think I recall something similar:",
      "This seems familiar somehow:",
      "I have a vague memory about this:"
    ],
    low: [
      "I might have seen something like this...",
      "This triggers a faint memory:",
      "I'm not certain, but this reminds me of:"
    ]
  };
  
  const introsByTrust: Record<string, string[]> = intros;
  const trustIntros = introsByTrust[trustLevel] || introsByTrust.medium;
  const intro = trustIntros[Math.floor(Math.random() * trustIntros.length)];
  
  return `${intro} "${memory}"`;
}

// Store a new memory fragment
export function storeEnhancedMemoryFragment(content: string, tags: string[] = []): boolean {
  try {
    // Get existing fragments
    const fragments = JSON.parse(localStorage.getItem('jonah_enhanced_memories') || '[]');
    
    // Add new fragment
    fragments.push({
      content,
      tags,
      timestamp: Date.now(),
      accessCount: 0
    });
    
    // Store back to localStorage (keep last 100)
    localStorage.setItem('jonah_enhanced_memories', JSON.stringify(fragments.slice(-100)));
    
    return true;
  } catch (e) {
    console.error("Error storing enhanced memory:", e);
    return false;
  }
}

// Get memories by tag
export function getMemoriesByTag(tag: string): string[] {
  try {
    const fragments = JSON.parse(localStorage.getItem('jonah_enhanced_memories') || '[]');
    return fragments
      .filter((mem: {tags: string[]}) => mem.tags.includes(tag))
      .map((mem: {content: string}) => mem.content);
  } catch (e) {
    console.error("Error retrieving tagged memories:", e);
    return [];
  }
}

// Clear enhanced memories
export function clearEnhancedMemories(): boolean {
  try {
    localStorage.removeItem('jonah_enhanced_memories');
    return true;
  } catch (e) {
    console.error("Error clearing enhanced memories:", e);
    return false;
  }
}
