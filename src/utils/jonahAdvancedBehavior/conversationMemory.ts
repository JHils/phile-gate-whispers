
/**
 * Conversation Memory System for Jonah AI
 * Stores and retrieves memory fragments, conversation history, and personal details
 */

import { EmotionCategory } from './types';

// Types
interface ConversationMemory {
  recentMessages: string[];
  userEmotions: Record<EmotionCategory, number>;
  personalDetails: Record<string, string>;
  keywords: Set<string>;
  narrativeEvents: Record<string, boolean>;
  sessionStartTime: number;
  lastInteractionTime: number;
}

// Initialize or get memory
let memory: ConversationMemory = {
  recentMessages: [],
  userEmotions: {
    joy: 0, sadness: 0, anger: 0, fear: 0, 
    surprise: 0, disgust: 0, neutral: 0, confused: 0,
    curiosity: 0, confusion: 0, hope: 0, 
    anxiety: 0, paranoia: 0, trust: 0
  },
  personalDetails: {},
  keywords: new Set(),
  narrativeEvents: {},
  sessionStartTime: Date.now(),
  lastInteractionTime: Date.now()
};

// Key phrases to track for personal information
const PERSONAL_INFO_PATTERNS = [
  { regex: /my name is (\w+)/i, key: 'name' },
  { regex: /call me (\w+)/i, key: 'name' },
  { regex: /i'm (\w+)/i, key: 'name' },
  { regex: /i am (\w+) years old/i, key: 'age' },
  { regex: /i'm from (\w+)/i, key: 'location' },
  { regex: /i live in (\w+)/i, key: 'location' },
];

// Important narrative keywords to track
const NARRATIVE_KEYWORDS = [
  'mirror', 'gate', 'dream', 'sister', 'timeline',
  'jonah', 'memory', 'forget', 'broadcast', 'phile',
  'lost', 'found', 'help', 'monster', 'testament'
];

/**
 * Store message in conversation memory
 */
export function storeConversationMemory(message: string, emotion: EmotionCategory, isUser: boolean): void {
  // Store recent message (only user messages)
  if (isUser) {
    memory.recentMessages = [message, ...memory.recentMessages].slice(0, 10);
    memory.lastInteractionTime = Date.now();
    
    // Track emotion
    memory.userEmotions[emotion]++;
    
    // Extract personal information
    extractPersonalInfo(message);
    
    // Extract keywords
    extractKeywords(message);
  }
  
  // Maybe persist to localStorage for session continuity
  try {
    localStorage.setItem('jonah_conversation_memory', JSON.stringify({
      recentMessages: memory.recentMessages,
      userEmotions: memory.userEmotions,
      personalDetails: memory.personalDetails,
      keywords: Array.from(memory.keywords),
      narrativeEvents: memory.narrativeEvents,
      sessionStartTime: memory.sessionStartTime,
      lastInteractionTime: memory.lastInteractionTime
    }));
  } catch (e) {
    // Ignore storage errors
    console.error('Failed to store conversation memory:', e);
  }
}

/**
 * Load memory from localStorage if available
 */
export function loadConversationMemory(): void {
  try {
    const saved = localStorage.getItem('jonah_conversation_memory');
    if (saved) {
      const parsed = JSON.parse(saved);
      memory = {
        ...memory,
        ...parsed,
        keywords: new Set(parsed.keywords || []),
        lastInteractionTime: parsed.lastInteractionTime || Date.now()
      };
    }
  } catch (e) {
    // Ignore load errors
    console.error('Failed to load conversation memory:', e);
  }
}

/**
 * Extract personal information from message
 */
function extractPersonalInfo(message: string): void {
  PERSONAL_INFO_PATTERNS.forEach(pattern => {
    const match = message.match(pattern.regex);
    if (match && match[1]) {
      memory.personalDetails[pattern.key] = match[1];
    }
  });
}

/**
 * Extract important keywords from message
 */
function extractKeywords(message: string): void {
  const lowerMessage = message.toLowerCase();
  
  NARRATIVE_KEYWORDS.forEach(keyword => {
    if (lowerMessage.includes(keyword.toLowerCase())) {
      memory.keywords.add(keyword);
    }
  });
}

/**
 * Find relevant memory based on user input
 */
export function findMemoryReference(input: string): string | null {
  // Don't reference memories for very short inputs
  if (input.length < 5) return null;
  
  // Extract potential keywords from input
  const inputWords = new Set(input.toLowerCase().split(/\s+/));
  
  // Check for keyword matches in previous messages
  for (const message of memory.recentMessages) {
    const messageWords = new Set(message.toLowerCase().split(/\s+/));
    
    // Find intersection of words
    let matches = 0;
    inputWords.forEach(word => {
      if (word.length > 3 && messageWords.has(word)) {
        matches++;
      }
    });
    
    // If we find enough matches, reference this memory
    if (matches >= 2) {
      return message;
    }
  }
  
  return null;
}

/**
 * Generate a response that references a memory
 */
export function generateMemoryResponse(memoryReference: string): string {
  const templates = [
    `You said "${truncate(memoryReference, 40)}" earlier. That connects to this.`,
    `I remember when you mentioned "${truncate(memoryReference, 40)}". It relates.`,
    `This reminds me of your words: "${truncate(memoryReference, 40)}".`,
    `The pattern connects to when you said "${truncate(memoryReference, 40)}".`,
    `This echoes what you told me before: "${truncate(memoryReference, 40)}".`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

/**
 * Handle an ambiguous or unclear input
 */
export function getAmbiguityResponse(input: string): string {
  // Different responses based on input length
  if (input.length < 3) {
    const shortResponses = [
      "More. The archive needs more than that.",
      "I need more to connect with.",
      "...?",
      "A fragment isn't enough. Continue.",
      "Speak clearly. I'm listening."
    ];
    return shortResponses[Math.floor(Math.random() * shortResponses.length)];
  }
  
  // Standard ambiguity responses
  const templates = [
    "What exactly do you mean?",
    "I'm not sure I understand. Can you clarify?",
    "The meaning is unclear. Tell me more.",
    "Your words are fragments. I need the whole thought.",
    "Something's missing. I can't see the full picture."
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

/**
 * Get personalization info for response generation
 */
export function getPersonalizationInfo(): {
  name: string | null,
  keywords: string[],
  dominantEmotion: EmotionCategory
} {
  // Get user's name if known
  const name = memory.personalDetails['name'] || null;
  
  // Get top keywords
  const keywords = Array.from(memory.keywords).slice(0, 5);
  
  // Get dominant emotion
  let dominantEmotion: EmotionCategory = 'neutral';
  let highestCount = 0;
  
  Object.entries(memory.userEmotions).forEach(([emotion, count]) => {
    if (count > highestCount) {
      highestCount = count;
      dominantEmotion = emotion as EmotionCategory;
    }
  });
  
  return {
    name,
    keywords,
    dominantEmotion
  };
}

/**
 * Helper function to truncate text
 */
function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

