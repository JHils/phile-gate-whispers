/**
 * Enhanced Memory System
 * Advanced memory capabilities for conversational context
 */

import { EmotionCategory, EmotionalState } from './types';

// Track conversation topics
const conversationTopics: string[] = [];
const patternRecognition: Record<string, number> = {};

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
  input: string, 
  emotionalState: EmotionalState
): string | null {
  // Only generate pattern responses occasionally
  if (Math.random() > 0.2) return null;
  
  // Find recurring topics
  const recurringTopics = Object.keys(patternRecognition)
    .filter(topic => patternRecognition[topic] > 2);
  
  if (recurringTopics.length === 0) return null;
  
  // Pick a random recurring topic
  const topic = recurringTopics[Math.floor(Math.random() * recurringTopics.length)];
  
  // Generate response based on emotional state and topic
  if (emotionalState.primary === 'paranoia' || emotionalState.primary === 'anxiety') {
    return `You keep bringing up ${topic}. I'm starting to wonder why it's so important to you.`;
  }
  
  if (emotionalState.primary === 'curiosity') {
    return `I've noticed you mention ${topic} frequently. What draws you to this subject?`;
  }
  
  if (emotionalState.primary === 'trust') {
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
