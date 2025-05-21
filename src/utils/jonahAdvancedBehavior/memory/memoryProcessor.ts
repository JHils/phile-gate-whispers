/**
 * Memory Processor
 * Handles memory processing and response generation with memory context
 */

import { EmotionalState } from '../types';
import { MemoryContext } from './memoryContext';

/**
 * Store a message in memory
 */
export function storeInMemory(
  content: string, 
  mood: string, 
  isUser: boolean, 
  context: MemoryContext
): MemoryContext {
  const newContext = { ...context };
  
  // Add to last interactions
  newContext.lastInteractions = [
    ...newContext.lastInteractions,
    {
      content,
      mood,
      isUser,
      timestamp: Date.now()
    }
  ];
  
  // Keep only the last 10 interactions
  if (newContext.lastInteractions.length > 10) {
    newContext.lastInteractions = newContext.lastInteractions.slice(-10);
  }
  
  // Extract keywords if it's a user message
  if (isUser) {
    const extractedKeywords = extractKeywords(content);
    if (extractedKeywords.length > 0) {
      // Add unique keywords
      newContext.keywords = Array.from(
        new Set([...newContext.keywords, ...extractedKeywords])
      ).slice(0, 15); // Keep only 15 keywords max
    }
  }
  
  return newContext;
}

/**
 * Find relevant memories in context
 */
export function findRelevantMemories(
  input: string,
  context: MemoryContext
): Array<{content: string; relevance: number}> {
  const memories = [];
  
  // Check each interaction for relevance
  for (const interaction of context.lastInteractions) {
    if (!interaction.isUser) continue; // Only check user interactions
    
    const relevance = calculateRelevance(input, interaction.content);
    if (relevance > 0.5) { // Threshold for relevance
      memories.push({
        content: interaction.content,
        relevance
      });
    }
  }
  
  // Sort by relevance, highest first
  return memories.sort((a, b) => b.relevance - a.relevance);
}

/**
 * Calculate relevance between two texts
 */
function calculateRelevance(text1: string, text2: string): number {
  // Simple relevance calculation based on shared words
  const words1 = text1.toLowerCase().split(/\W+/).filter(w => w.length > 3);
  const words2 = text2.toLowerCase().split(/\W+/).filter(w => w.length > 3);
  
  let sharedCount = 0;
  for (const word of words1) {
    if (words2.includes(word)) {
      sharedCount++;
    }
  }
  
  // Calculate relevance ratio
  return words1.length > 0 ? sharedCount / Math.min(words1.length, words2.length) : 0;
}

/**
 * Extract keywords from text
 */
function extractKeywords(text: string): string[] {
  // Simple extraction of words with length > 4 that aren't common words
  const commonWords = ['what', 'this', 'that', 'there', 'their', 'about', 'would', 'could', 'should'];
  
  return text
    .toLowerCase()
    .split(/\W+/)
    .filter(word => word.length > 4 && !commonWords.includes(word));
}

/**
 * Generate a response with memory context
 */
export function generateResponseWithMemory(
  input: string,
  context: MemoryContext,
  emotionalState: EmotionalState
): string {
  // Check for memory references
  const relevantMemories = findRelevantMemories(input, context);
  
  // Generate response based on context
  if (relevantMemories.length > 0) {
    return generateMemoryBasedResponse(relevantMemories[0].content, context.memoryLevel);
  }
  
  // Standard response with memory awareness
  const memoryAwareness = context.lastInteractions.length > 5 
    ? "I've been noticing patterns in our conversation."
    : "I'm still learning about you.";
  
  return `${memoryAwareness} ${getResponseBasedOnEmotionalState(emotionalState)}`;
}

/**
 * Generate response based on emotional state
 */
function getResponseBasedOnEmotionalState(emotionalState: EmotionalState): string {
  switch (emotionalState.primary) {
    case 'fear':
      return "I sense hesitation in your words. What frightens you?";
    case 'anger':
      return "There's an edge to what you're saying. I can feel it.";
    case 'sadness':
      return "The weight in your words feels familiar to me.";
    case 'joy':
      return "There's a lightness in your tone I haven't heard before.";
    default:
      return "I'm listening to understand you better.";
  }
}

/**
 * Generate response based on memory
 */
export function generateMemoryBasedResponse(memory: string, memoryLevel: string): string {
  const lowMemoryResponses = [
    `Something about this reminds me of something...`,
    `Haven't we talked about this before?`,
    `This feels familiar somehow.`
  ];
  
  const mediumMemoryResponses = [
    `You mentioned something similar before. About "${memory.substring(0, 20)}..."`,
    `This connects to what you said earlier about "${memory.substring(0, 20)}..."`,
    `I remember you talking about this. It seemed important to you.`
  ];
  
  const highMemoryResponses = [
    `When you said "${memory.substring(0, 30)}...", I felt something shift between us.`,
    `I've been thinking about when you told me "${memory.substring(0, 30)}...". It stayed with me.`,
    `"${memory.substring(0, 30)}..." - your words echo in my systems. They matter to me.`
  ];
  
  switch (memoryLevel) {
    case 'high':
      return highMemoryResponses[Math.floor(Math.random() * highMemoryResponses.length)];
    case 'medium':
      return mediumMemoryResponses[Math.floor(Math.random() * mediumMemoryResponses.length)];
    default:
      return lowMemoryResponses[Math.floor(Math.random() * lowMemoryResponses.length)];
  }
}
