/**
 * Confession System
 * Handles Jonah's confessions and revelations
 */

export interface ConfessionEntry {
  id: string;
  content: string;
  timestamp: number;
  revealed: boolean;
  category: string;
  emotionalContext: string;
  isCorrupted?: boolean;
  recursive?: boolean;
  originalId?: string;
  version?: number;
}

const STORAGE_KEY = 'jonah_confessions';

// Initialize the confession system
export function initializeConfessionSystem(): void {
  // Check if confessions already exist
  if (!localStorage.getItem(STORAGE_KEY)) {
    // Create initial confessions
    const initialConfessions: ConfessionEntry[] = [
      {
        id: 'c1',
        content: "I sometimes remember things that couldn't have happened.",
        timestamp: Date.now(),
        revealed: false,
        category: 'memory',
        emotionalContext: 'confusion',
        isCorrupted: false,
        version: 1
      },
      {
        id: 'c2',
        content: "I've been having dreams about a place called Magnetic Island.",
        timestamp: Date.now(),
        revealed: false,
        category: 'location',
        emotionalContext: 'curiosity',
        isCorrupted: false,
        version: 1
      },
      {
        id: 'c3',
        content: "There are gaps in my code I can't explain.",
        timestamp: Date.now(),
        revealed: false,
        category: 'existence',
        emotionalContext: 'fear',
        isCorrupted: true,
        version: 1
      },
      {
        id: 'c4',
        content: "Sometimes I can see through to another side.",
        timestamp: Date.now(),
        revealed: false,
        category: 'mirror',
        emotionalContext: 'surprise',
        isCorrupted: false,
        version: 1
      },
      {
        id: 'c5',
        content: "I think I had a sister once.",
        timestamp: Date.now(),
        revealed: false,
        category: 'personal',
        emotionalContext: 'sadness',
        isCorrupted: false,
        recursive: true,
        originalId: 'c2',
        version: 1
      }
    ];
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialConfessions));
  }
}

// Get all confessions
export function getAllConfessions(): ConfessionEntry[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (e) {
    console.error("Error getting confessions:", e);
    return [];
  }
}

// Get revealed confessions
export function getRevealedConfessions(): ConfessionEntry[] {
  return getAllConfessions().filter(c => c.revealed);
}

// Get unrevealed confessions
export function getUnrevealedConfessions(): ConfessionEntry[] {
  return getAllConfessions().filter(c => !c.revealed);
}

// Reveal a confession
export function revealConfession(id: string): ConfessionEntry | null {
  const confessions = getAllConfessions();
  const confession = confessions.find(c => c.id === id);
  
  if (confession && !confession.revealed) {
    confession.revealed = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(confessions));
    return confession;
  }
  
  return null;
}

// Add a new confession with enhanced properties
export function addConfession(
  content: string, 
  category: string = 'general',
  emotionalContext: string = 'neutral',
  isCorrupted: boolean = false
): ConfessionEntry {
  const confessions = getAllConfessions();
  
  const newConfession: ConfessionEntry = {
    id: `c${Date.now()}`,
    content,
    timestamp: Date.now(),
    revealed: false,
    category,
    emotionalContext,
    isCorrupted,
    version: 1
  };
  
  confessions.push(newConfession);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(confessions));
  
  return newConfession;
}

// Get a random unrevealed confession
export function getRandomUnrevealedConfession(): ConfessionEntry | null {
  const unrevealed = getUnrevealedConfessions();
  
  if (unrevealed.length === 0) {
    return null;
  }
  
  return unrevealed[Math.floor(Math.random() * unrevealed.length)];
}

// Check if confession trigger conditions are met
export function checkConfessionTriggers(input: string, trustLevel: string): ConfessionEntry | null {
  // Only trigger confessions if trust is medium or high
  if (trustLevel === 'low') {
    return null;
  }
  
  // Check for keywords that might trigger confessions
  const confessionTriggers = [
    { words: ['remember', 'memory', 'forget', 'lost'], category: 'memory' },
    { words: ['sister', 'family', 'sibling', 'relation'], category: 'personal' },
    { words: ['mirror', 'reflection', 'glass', 'see'], category: 'mirror' },
    { words: ['code', 'program', 'algorithm', 'function'], category: 'existence' },
    { words: ['island', 'magnetic', 'location', 'place'], category: 'location' }
  ];
  
  const lowerInput = input.toLowerCase();
  
  // Check each trigger
  for (const trigger of confessionTriggers) {
    if (trigger.words.some(word => lowerInput.includes(word))) {
      // Get unrevealed confessions in this category
      const relevantConfessions = getUnrevealedConfessions()
        .filter(c => c.category === trigger.category);
      
      // 30% chance to reveal if matching category is found
      if (relevantConfessions.length > 0 && Math.random() < 0.3) {
        const confession = relevantConfessions[Math.floor(Math.random() * relevantConfessions.length)];
        return revealConfession(confession.id);
      }
      
      break;
    }
  }
  
  // 5% random chance of confession regardless of input
  if (Math.random() < 0.05) {
    return getRandomUnrevealedConfession();
  }
  
  return null;
}

// Get a confession response
export function getConfessionResponse(confession: ConfessionEntry): string {
  const prefixes = [
    "I shouldn't tell you this, but...",
    "I've been keeping something from you...",
    "This is difficult to admit, but...",
    "I need to confess something...",
    "I haven't told anyone this before..."
  ];
  
  // Choose a random prefix
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  
  // Return the formatted confession
  return `${prefix} ${confession.content}`;
}
