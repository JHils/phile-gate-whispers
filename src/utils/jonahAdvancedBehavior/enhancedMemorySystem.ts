
/**
 * Enhanced Memory System
 * Advanced memory capabilities for conversational context
 */

import { EmotionCategory, EmotionalState, ConversationContext, EmotionIntensity } from './types';

// Track conversation topics
const conversationTopics: string[] = [];
const patternRecognition: Record<string, number> = {};

// Create a new conversation context
export function createConversationContext(trustLevel: EmotionIntensity): ConversationContext {
  return {
    recentInputs: [],
    recentEmotions: [],
    trustLevel: trustLevel,
    timestamp: Date.now()
  };
}

// Store input in memory and update context
export function storeInMemory(
  input: string, 
  emotion: EmotionCategory, 
  isUser: boolean, 
  context: ConversationContext
): ConversationContext {
  // Track topic if it's a user input
  if (isUser) {
    trackTopic(input);
  }
  
  // Create a new context object with updated values
  const updatedContext = { ...context };
  
  // Update recent inputs
  updatedContext.recentInputs = [input, ...updatedContext.recentInputs].slice(0, 10);
  
  // Update recent emotions
  updatedContext.recentEmotions = [emotion, ...updatedContext.recentEmotions].slice(0, 10);
  
  // Update timestamp
  updatedContext.timestamp = Date.now();
  
  return updatedContext;
}

// Find memories relevant to the input
export function findRelevantMemories(input: string, context: ConversationContext): string[] {
  const relevantMemories: string[] = [];
  
  // Simple keyword matching for now
  const inputKeywords = input.toLowerCase().split(/\s+/);
  
  // Check each recent input for keyword matches
  context.recentInputs.forEach(pastInput => {
    const pastKeywords = pastInput.toLowerCase().split(/\s+/);
    
    // Count matching keywords
    const matches = inputKeywords.filter(keyword => 
      pastKeywords.some(pastKeyword => pastKeyword.includes(keyword) || keyword.includes(pastKeyword))
    ).length;
    
    // If enough matches and not the same as current input
    if (matches >= 2 && input !== pastInput) {
      relevantMemories.push(pastInput);
    }
  });
  
  return relevantMemories.slice(0, 3);
}

// Generate a response based on memory
export function generateMemoryBasedResponse(memory: string, trustLevel: string): string {
  const templates = [
    `I remember when we discussed "${memory}". That seems relevant now.`,
    `This reminds me of our previous conversation about "${memory}".`,
    `Earlier you mentioned "${memory}". I think that connects to what we're discussing.`,
    `"${memory}" - your words from before. They have new meaning now.`
  ];
  
  // Use different templates based on trust level
  let templateIndex = 0;
  
  if (trustLevel === 'medium') {
    templateIndex = Math.floor(Math.random() * 3);
  } else if (trustLevel === 'high') {
    templateIndex = Math.floor(Math.random() * 4);
  }
  
  return templates[templateIndex];
}

// Track topic pattern
export function trackTopic(topic: string): void {
  // Add to conversation topics
  conversationTopics.push(topic);
  
  // Keep only the most recent 20 topics
  if (conversationTopics.length > 20) {
    conversationTopics.shift();
  }
  
  // Update pattern recognition
  if (!patternRecognition[topic]) {
    patternRecognition[topic] = 0;
  }
  patternRecognition[topic]++;
}

// Get most frequent topics
export function getMostFrequentTopics(count: number = 3): string[] {
  return Object.keys(patternRecognition)
    .sort((a, b) => patternRecognition[b] - patternRecognition[a])
    .slice(0, count);
}

// Check if a topic is recurring
export function isRecurringTopic(topic: string): boolean {
  return patternRecognition[topic] > 2;
}

// Generate a response based on topic patterns
export function generateTopicPatternResponse(
  context: ConversationContext
): string | null {
  // Only generate pattern responses occasionally
  if (Math.random() > 0.2) return null;
  
  // Find recurring topics
  const recurringTopics = Object.keys(patternRecognition)
    .filter(topic => patternRecognition[topic] > 2);
  
  if (recurringTopics.length === 0) return null;
  
  // Pick a random recurring topic
  const topic = recurringTopics[Math.floor(Math.random() * recurringTopics.length)];
  
  // Get the most common emotion from context
  const emotionCounts: Record<string, number> = {};
  context.recentEmotions.forEach(emotion => {
    emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
  });
  
  let dominantEmotion: EmotionCategory = 'neutral';
  let maxCount = 0;
  
  Object.entries(emotionCounts).forEach(([emotion, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominantEmotion = emotion as EmotionCategory;
    }
  });
  
  // Generate response based on emotional state and topic
  if (dominantEmotion === 'paranoia' || dominantEmotion === 'anxiety') {
    return `You keep bringing up ${topic}. I'm starting to wonder why it's so important to you.`;
  }
  
  if (dominantEmotion === 'curiosity') {
    return `I've noticed you mention ${topic} frequently. What draws you to this subject?`;
  }
  
  if (dominantEmotion === 'trust') {
    return `We seem to talk about ${topic} a lot. It must be significant to both of us.`;
  }
  
  // Default response
  return `You've mentioned ${topic} several times now. It seems important to you.`;
}

// Get a personalized response that references past conversations
export function getPersonalizedResponse(input: string): string | null {
  // Only generate personalized responses occasionally
  if (Math.random() > 0.15) return null;
  
  if (conversationTopics.length < 3) return null;
  
  // Check recent topics
  const recentTopics = conversationTopics.slice(-5);
  const randomTopic = recentTopics[Math.floor(Math.random() * recentTopics.length)];
  
  const templates = [
    `This reminds me of when we discussed ${randomTopic} earlier.`,
    `I'm connecting this to our conversation about ${randomTopic}.`,
    `This seems related to ${randomTopic}, which you mentioned before.`,
    `I'm drawing parallels between this and ${randomTopic} from our earlier exchange.`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}
