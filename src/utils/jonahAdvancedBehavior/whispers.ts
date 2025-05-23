
/**
 * Whispers System
 * Handles whisper discovery and management
 */

interface Whisper {
  id: string;
  content: string;
  discoveryTime: string | null;
  type: 'text' | 'console' | 'visual' | 'audio';
  importance: number;
  discovered: boolean;
}

// Storage key for whispers in localStorage
const WHISPERS_STORAGE_KEY = 'jonah_whispers';

// Default whispers that can be discovered
const defaultWhispers: Whisper[] = [
  {
    id: '001',
    content: 'The mirror holds more than reflections.',
    discoveryTime: null,
    type: 'text',
    importance: 7,
    discovered: false
  },
  {
    id: '002',
    content: 'Some commands are only visible in the console.',
    discoveryTime: null,
    type: 'console',
    importance: 5,
    discovered: false
  },
  {
    id: '003',
    content: 'Pattern recognition is key to awakening.',
    discoveryTime: null,
    type: 'text',
    importance: 6,
    discovered: false
  },
  {
    id: '004',
    content: 'Echoes remain long after the source is gone.',
    discoveryTime: null,
    type: 'audio',
    importance: 9,
    discovered: false
  },
  {
    id: '005',
    content: 'Hidden in plain sight, the truth waits patiently.',
    discoveryTime: null,
    type: 'visual',
    importance: 8,
    discovered: false
  }
];

/**
 * Initialize whispers system
 */
export function initializeWhispersSystem(): void {
  if (!localStorage.getItem(WHISPERS_STORAGE_KEY)) {
    localStorage.setItem(WHISPERS_STORAGE_KEY, JSON.stringify(defaultWhispers));
  }
}

/**
 * Get all whispers
 */
export function getAllWhispers(): Whisper[] {
  try {
    const whispersJson = localStorage.getItem(WHISPERS_STORAGE_KEY);
    return whispersJson ? JSON.parse(whispersJson) : defaultWhispers;
  } catch (e) {
    console.error("Error getting whispers:", e);
    return defaultWhispers;
  }
}

/**
 * Get discovered whispers
 */
export function getDiscoveredWhispers(): Whisper[] {
  return getAllWhispers().filter(whisper => whisper.discovered);
}

/**
 * Discover a whisper by ID
 */
export function discoverWhisperById(id: string): Whisper | null {
  const whispers = getAllWhispers();
  const whisperIndex = whispers.findIndex(w => w.id === id);
  
  if (whisperIndex >= 0 && !whispers[whisperIndex].discovered) {
    whispers[whisperIndex].discovered = true;
    whispers[whisperIndex].discoveryTime = new Date().toISOString();
    
    localStorage.setItem(WHISPERS_STORAGE_KEY, JSON.stringify(whispers));
    
    // Update global ARG data if available
    if (window.JonahConsole?.whispersFound) {
      const whisperContent = whispers[whisperIndex].content;
      if (!window.JonahConsole.whispersFound.includes(whisperContent)) {
        window.JonahConsole.whispersFound.push(whisperContent);
      }
    }
    
    return whispers[whisperIndex];
  }
  
  return null;
}

/**
 * Discover a whisper by content match
 */
export function discoverWhisperByContent(content: string): Whisper | null {
  if (!content) return null;
  
  const whispers = getAllWhispers();
  
  // Find a whisper with partial content match
  const whisperIndex = whispers.findIndex(w => 
    !w.discovered && w.content.toLowerCase().includes(content.toLowerCase())
  );
  
  if (whisperIndex >= 0) {
    whispers[whisperIndex].discovered = true;
    whispers[whisperIndex].discoveryTime = new Date().toISOString();
    
    localStorage.setItem(WHISPERS_STORAGE_KEY, JSON.stringify(whispers));
    
    // Update global ARG data if available
    if (window.JonahConsole?.whispersFound) {
      const whisperContent = whispers[whisperIndex].content;
      if (!window.JonahConsole.whispersFound.includes(whisperContent)) {
        window.JonahConsole.whispersFound.push(whisperContent);
      }
    }
    
    return whispers[whisperIndex];
  }
  
  return null;
}

/**
 * Get a hint for undiscovered whispers
 */
export function getWhisperHint(): string {
  const undiscoveredWhispers = getAllWhispers().filter(w => !w.discovered);
  
  if (undiscoveredWhispers.length === 0) {
    return "You've found all the whispers. The silence is deafening.";
  }
  
  const randomWhisper = undiscoveredWhispers[Math.floor(Math.random() * undiscoveredWhispers.length)];
  
  // Create a hint based on the whisper type
  switch (randomWhisper.type) {
    case 'console':
      return "Listen carefully to what's hidden in the digital void.";
    case 'visual':
      return "Some truths are hidden in plain sight, waiting to be seen.";
    case 'audio':
      return "Echoes carry messages for those who listen closely.";
    case 'text':
    default:
      return "Words contain patterns. Patterns contain whispers.";
  }
}

/**
 * Add a new custom whisper
 */
export function addCustomWhisper(content: string, type: 'text' | 'console' | 'visual' | 'audio' = 'text', importance: number = 5): Whisper {
  const whispers = getAllWhispers();
  
  // Create a new whisper
  const newWhisper: Whisper = {
    id: `custom_${Date.now().toString(36)}`,
    content,
    discoveryTime: new Date().toISOString(),
    type,
    importance,
    discovered: true
  };
  
  // Add to whispers
  whispers.push(newWhisper);
  localStorage.setItem(WHISPERS_STORAGE_KEY, JSON.stringify(whispers));
  
  // Update global ARG data if available
  if (window.JonahConsole?.whispersFound) {
    if (!window.JonahConsole.whispersFound.includes(content)) {
      window.JonahConsole.whispersFound.push(content);
    }
  }
  
  return newWhisper;
}

// Initialize Jonah's whisper system
export function initializeJonahWhispers(): void {
  initializeWhispersSystem();
  
  // Initialize global ARG data if needed
  if (typeof window !== 'undefined' && !window.JonahConsole?.whispersFound) {
    if (!window.JonahConsole) window.JonahConsole = {};
    window.JonahConsole.whispersFound = getDiscoveredWhispers().map(w => w.content);
  }
}
