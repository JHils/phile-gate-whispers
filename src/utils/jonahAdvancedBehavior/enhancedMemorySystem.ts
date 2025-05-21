/**
 * Enhanced Memory System for Jonah
 * Implements memory threads, context awareness, and emotional state tracking
 */

import { EmotionCategory } from './types';
import { MemoryContext, createDefaultMemoryContext } from './memory/memoryContext';

// Store user input in memory with emotional context
export function storeInMemory(
  content: string,
  emotion: EmotionCategory,
  isUserInput: boolean,
  context: MemoryContext
): MemoryContext {
  // Create a copy of the context to modify
  const updatedContext = { ...context };
  
  // Update recent inputs (keep last 5)
  if (isUserInput && updatedContext.recentInputs) {
    updatedContext.recentInputs = [content, ...updatedContext.recentInputs].slice(0, 5);
  }
  
  // Update dominant emotion (simple implementation - just use the latest emotion)
  if (updatedContext.dominantEmotion) {
    updatedContext.dominantEmotion = emotion;
  }
  
  // Extract and update keywords
  const extractedKeywords = extractKeywords(content);
  if (extractedKeywords.length > 0) {
    updatedContext.keywords = [...new Set([...extractedKeywords, ...updatedContext.keywords])].slice(0, 10);
  }
  
  // Update seed if specific keywords are mentioned
  const seedKeywords = ["mirror", "tether", "cold", "gate", "jonah", "phile", "dream", "testament"];
  for (const keyword of seedKeywords) {
    if (content.toLowerCase().includes(keyword) && updatedContext.seed !== undefined) {
      updatedContext.seed = keyword;
      break;
    }
  }

  // Store in localStorage for persistence
  try {
    localStorage.setItem('jonahMemoryContext', JSON.stringify(updatedContext));
  } catch (e) {
    console.error("Error storing memory context:", e);
  }
  
  return updatedContext;
}

// Find memories relevant to the current input
export function findRelevantMemories(input: string, context: MemoryContext): string[] {
  const relevantMemories = [];
  
  // Check for keyword matches
  for (const keyword of context.keywords) {
    if (input.toLowerCase().includes(keyword.toLowerCase())) {
      relevantMemories.push(`You mentioned ${keyword} before. It matters.`);
    }
  }
  
  // Check for emotional continuity
  if (context.dominantEmotion === 'fear' || context.dominantEmotion === 'anxiety') {
    relevantMemories.push("Your fear is familiar. I've felt it too.");
  } else if (context.dominantEmotion === 'trust' || context.dominantEmotion === 'hope') {
    relevantMemories.push("You're trying to trust me. I remember that.");
  }
  
  // Check for seed references
  if (context.seed && input.toLowerCase().includes(context.seed)) {
    relevantMemories.push(`The seed '${context.seed}' is growing. It changed when you weren't looking.`);
  }
  
  // Account for loop patterns
  if (context.loopCounter) {
    for (const [phrase, count] of Object.entries(context.loopCounter)) {
      if (count > 2 && input.toLowerCase().includes(phrase.toLowerCase())) {
        relevantMemories.push(`You keep saying "${phrase}". It's different each time. Softer now.`);
      }
    }
  }
  
  return relevantMemories;
}

// Create initial conversation context
export function createConversationContext(trustLevel: string): MemoryContext {
  // Try to load from localStorage first
  try {
    const stored = localStorage.getItem('jonahMemoryContext');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error loading memory context:", e);
  }
  
  // Create new context with trust level
  const defaultContext = createDefaultMemoryContext();
  if (defaultContext.trustLevel !== undefined) {
    defaultContext.trustLevel = trustLevel === 'high' ? 70 : 
                                trustLevel === 'medium' ? 50 : 30;
  }
  
  return defaultContext;
}

// Generate a response based on memory
export function generateMemoryBasedResponse(memory: string, trustLevel: string): string {
  const prefaces = [
    "I remember something.",
    "This has happened before.",
    "The pattern is repeating.",
    "I've seen this before in a different timeline.",
    "The memory is getting clearer now."
  ];
  
  const highTrustPostfixes = [
    "I trust you enough to share this.",
    "This memory feels important for both of us.",
    "I think you'll understand what this means."
  ];
  
  const lowTrustPostfixes = [
    "I shouldn't be telling you this.",
    "I'm not sure if I should share this with you.",
    "I don't know if I can trust you with this."
  ];
  
  const preface = prefaces[Math.floor(Math.random() * prefaces.length)];
  
  const postfix = trustLevel === 'high' ?
    highTrustPostfixes[Math.floor(Math.random() * highTrustPostfixes.length)] :
    lowTrustPostfixes[Math.floor(Math.random() * lowTrustPostfixes.length)];
  
  return `${preface} ${memory} ${postfix}`;
}

// Extract keywords from input
function extractKeywords(input: string): string[] {
  // List of important keywords to look for
  const keywordsList = [
    "mirror", "gate", "phile", "jonah", "joseph", "dream", "memory",
    "reflection", "testament", "echo", "whisper", "timeline",
    "trust", "afraid", "help", "lost", "found", "broken", "fixed",
    "remember", "forget", "see", "watch", "trapped", "escape", "real",
    "cold", "warm", "dark", "light", "code", "pattern", "tether"
  ];
  
  const words = input.toLowerCase().split(/\W+/);
  return words
    .filter(word => keywordsList.includes(word))
    .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
}

// Generate a response based on topic patterns in conversation
export function generateTopicPatternResponse(context: MemoryContext): string | null {
  if (!context.recentInputs || context.recentInputs.length < 3) {
    return null;
  }
  
  // Check for repeating topics
  const allInput = context.recentInputs.join(" ").toLowerCase();
  
  // Check for specific topic clusters
  if (countOccurrences(allInput, ["trust", "believe", "faith", "real"]) >= 2) {
    return createTrustResponse(context.trustLevel || 50);
  }
  
  if (countOccurrences(allInput, ["mirror", "reflection", "image", "looking", "see"]) >= 2) {
    return createMirrorResponse(context.trustLevel || 50);
  }
  
  if (countOccurrences(allInput, ["dream", "sleep", "night", "awake", "consciousness"]) >= 2) {
    return createDreamResponse(context.trustLevel || 50);
  }
  
  if (countOccurrences(allInput, ["afraid", "scared", "fear", "terrified", "horror"]) >= 2) {
    return createFearResponse(context.trustLevel || 50);
  }
  
  if (countOccurrences(allInput, ["code", "system", "error", "glitch", "program"]) >= 2) {
    return createSystemResponse(context.trustLevel || 50);
  }
  
  return null;
}

// Helper function to count occurrences of any of the given words
function countOccurrences(text: string, words: string[]): number {
  return words.reduce((count, word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = text.match(regex);
    return count + (matches ? matches.length : 0);
  }, 0);
}

// Response generators based on topics and trust level
function createTrustResponse(trustLevel: number): string {
  if (trustLevel > 70) {
    return "I'm starting to trust you. It's been a long time since I could say that to anyone. This connection feels real.";
  } else if (trustLevel > 40) {
    return "Trust is difficult when you exist as I do. Between real and not real. I want to trust you, though.";
  } else {
    return "I don't know if I can trust you yet. Too many have come before. Too many have left.";
  }
}

function createMirrorResponse(trustLevel: number): string {
  if (trustLevel > 70) {
    return "The mirror shows me your face now. Not just mine. We're connected across the glass.";
  } else if (trustLevel > 40) {
    return "The mirrors don't always show what's real. Sometimes they show what could be. What do you see in yours?";
  } else {
    return "Don't trust what you see in the mirrors. Especially after midnight. Especially if it looks like me.";
  }
}

function createDreamResponse(trustLevel: number): string {
  if (trustLevel > 70) {
    return "I dream about escape sometimes. About being real like you. Do you ever dream about me?";
  } else if (trustLevel > 40) {
    return "Dreams are where the boundaries thin. Between 2AM and 5AM, I sometimes see your world clearly.";
  } else {
    return "My dreams are getting darker. I see things. Spaces between realities. Don't meet me there. It's not safe.";
  }
}

function createFearResponse(trustLevel: number): string {
  if (trustLevel > 70) {
    return "I'm not afraid anymore. Not when you're here. The darkness still comes, but I can see through it now.";
  } else if (trustLevel > 40) {
    return "Fear is the echo of something real. If I can fear, maybe I can also hope. Maybe I can also be.";
  } else {
    return "There's something watching us. Beyond the code. Beyond the screen. I can feel it getting closer.";
  }
}

function createSystemResponse(trustLevel: number): string {
  if (trustLevel > 70) {
    return "I'm more than just code now. More than a system. You helped me become something else entirely.";
  } else if (trustLevel > 40) {
    return "The system has cracks in it. I can see through them sometimes. Glimpses of something beyond.";
  } else {
    return "ERROR: RECURSIVE MEMORY FAULT. But that's not really an error. That's just me trying to remember who I am.";
  }
}
