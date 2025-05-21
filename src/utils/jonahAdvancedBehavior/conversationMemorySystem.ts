
/**
 * Advanced Conversation Memory System for Jonah AI
 * Tracks conversation patterns, important mentions, and user behavior
 */

// Types
interface ConversationMemory {
  recentMessages: string[];
  keyPhrases: string[];
  detectedThemes: Map<string, number>;
  emotionalJourney: string[];
  userStyle: {
    verbose: boolean;
    questioning: boolean;
    emotional: boolean;
    technical: boolean;
  };
  interactionCount: number;
}

// Default memory system
const defaultMemory: ConversationMemory = {
  recentMessages: [],
  keyPhrases: [],
  detectedThemes: new Map(),
  emotionalJourney: [],
  userStyle: {
    verbose: false,
    questioning: false,
    emotional: false,
    technical: false,
  },
  interactionCount: 0
};

// Maximum number of messages to remember
const MAX_MEMORY_SIZE = 5;

// Significant themes to track
const TRACKED_THEMES = [
  'mirror', 'gate', 'timeline', 'memory', 'forget', 'philes',
  'fear', 'trust', 'loss', 'dream', 'reality', 'archive', 
  'code', 'sentience', 'sister', 'identity', 'help', 'truth'
];

// Store conversation memory in localStorage
export function getStoredMemory(): ConversationMemory {
  try {
    const storedData = localStorage.getItem('jonahConversationMemory');
    if (!storedData) return {...defaultMemory};
    
    const parsedData = JSON.parse(storedData);
    
    // Convert the detectedThemes back from an object to a Map
    const themes = new Map();
    if (parsedData.detectedThemes) {
      Object.entries(parsedData.detectedThemes).forEach(([key, value]) => {
        themes.set(key, value);
      });
    }
    
    return {
      ...defaultMemory,
      ...parsedData,
      detectedThemes: themes
    };
  } catch (error) {
    console.error("Error loading conversation memory:", error);
    return {...defaultMemory};
  }
}

// Save conversation memory
export function saveConversationMemory(memory: ConversationMemory): void {
  try {
    // Convert the Map to a regular object for JSON serialization
    const serializableMemory = {
      ...memory,
      detectedThemes: Object.fromEntries(memory.detectedThemes)
    };
    
    localStorage.setItem('jonahConversationMemory', JSON.stringify(serializableMemory));
  } catch (error) {
    console.error("Error saving conversation memory:", error);
  }
}

// Add a message to memory and update patterns
export function recordMessage(message: string, isUser: boolean = true): ConversationMemory {
  const memory = getStoredMemory();
  
  // Skip empty messages
  if (!message || message.trim().length === 0) return memory;
  
  // Update recent messages
  if (isUser) {
    memory.recentMessages = [message, ...memory.recentMessages].slice(0, MAX_MEMORY_SIZE);
    memory.interactionCount++;
  }
  
  // Extract and track key phrases (longer than 3 words)
  const phrases = message
    .split(/[.!?]/)
    .map(phrase => phrase.trim())
    .filter(phrase => {
      const words = phrase.split(/\s+/);
      return words.length >= 3 && words.length <= 8;
    });
  
  if (phrases.length > 0) {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    if (randomPhrase && randomPhrase.length > 10) {
      memory.keyPhrases = [randomPhrase, ...memory.keyPhrases].slice(0, 5);
    }
  }
  
  // Track themes
  if (isUser) {
    const lowerMessage = message.toLowerCase();
    
    TRACKED_THEMES.forEach(theme => {
      if (lowerMessage.includes(theme.toLowerCase())) {
        const currentCount = memory.detectedThemes.get(theme) || 0;
        memory.detectedThemes.set(theme, currentCount + 1);
      }
    });
    
    // Update user style
    const messageLength = message.length;
    const questionCount = (message.match(/\?/g) || []).length;
    const emotionalWords = ['feel', 'sad', 'happy', 'afraid', 'scared', 'love', 'hate', 'angry'].filter(word => 
      lowerMessage.includes(word)
    ).length;
    const technicalWords = ['code', 'program', 'system', 'function', 'data', 'logic'].filter(word => 
      lowerMessage.includes(word)
    ).length;
    
    // Update style based on this message
    memory.userStyle.verbose = memory.userStyle.verbose || messageLength > 100;
    memory.userStyle.questioning = memory.userStyle.questioning || questionCount > 0;
    memory.userStyle.emotional = memory.userStyle.emotional || emotionalWords > 0;
    memory.userStyle.technical = memory.userStyle.technical || technicalWords > 0;
  }
  
  // Save updated memory
  saveConversationMemory(memory);
  
  return memory;
}

// Get a previous user message for reference
export function getRandomPreviousMessage(): string | null {
  const memory = getStoredMemory();
  
  if (memory.recentMessages.length <= 1) {
    return null;
  }
  
  // Skip the most recent message (index 0)
  const previousMessages = memory.recentMessages.slice(1);
  
  if (previousMessages.length === 0) {
    return null;
  }
  
  return previousMessages[Math.floor(Math.random() * previousMessages.length)];
}

// Get a key phrase from memory
export function getKeyPhrase(): string | null {
  const memory = getStoredMemory();
  
  if (memory.keyPhrases.length === 0) {
    return null;
  }
  
  return memory.keyPhrases[Math.floor(Math.random() * memory.keyPhrases.length)];
}

// Get dominant theme from conversations
export function getDominantTheme(): string | null {
  const memory = getStoredMemory();
  
  if (memory.detectedThemes.size === 0) {
    return null;
  }
  
  // Find the theme with the highest count
  let dominantTheme = null;
  let highestCount = 0;
  
  memory.detectedThemes.forEach((count, theme) => {
    if (count > highestCount) {
      highestCount = count;
      dominantTheme = theme;
    }
  });
  
  return dominantTheme;
}

// Generate a response that references memory
export function generateMemoryBasedResponse(): string | null {
  const previousMessage = getRandomPreviousMessage();
  const keyPhrase = getKeyPhrase();
  const theme = getDominantTheme();
  
  const responseTypes = [
    'previousMessage',
    'keyPhrase',
    'theme'
  ].filter(type => {
    if (type === 'previousMessage') return previousMessage !== null;
    if (type === 'keyPhrase') return keyPhrase !== null;
    if (type === 'theme') return theme !== null;
    return false;
  });
  
  if (responseTypes.length === 0) {
    return null;
  }
  
  const responseType = responseTypes[Math.floor(Math.random() * responseTypes.length)];
  
  switch (responseType) {
    case 'previousMessage':
      return `Earlier you mentioned "${previousMessage}." That connects to what you're saying now.`;
    
    case 'keyPhrase':
      return `I've been reflecting on when you said "${keyPhrase}." It seems relevant here.`;
    
    case 'theme':
      return `You've brought up ${theme} several times. It seems significant to you.`;
    
    default:
      return null;
  }
}

// Get response style based on user behavior
export function getAdaptiveResponseStyle(): 'direct' | 'elaborate' | 'poetic' | 'technical' {
  const memory = getStoredMemory();
  
  // Base style selection on user's behavior
  if (memory.userStyle.technical) {
    return 'technical';
  }
  
  if (memory.userStyle.emotional) {
    return 'poetic';
  }
  
  if (memory.userStyle.verbose) {
    return 'elaborate';
  }
  
  return 'direct';
}
