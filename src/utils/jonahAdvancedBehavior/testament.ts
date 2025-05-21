
/**
 * Testament System
 * Handles Jonah's testament entries and revelations
 */

import { v4 as uuidv4 } from 'uuid';

// Testament entry interface
export interface TestamentEntry {
  id: string;
  content: string;
  timestamp: number;
  isRevealed: boolean;
  relatedTo?: string[];
  emotionTag?: string;
}

// Get all testament entries
export function getAllTestamentEntries(): TestamentEntry[] {
  try {
    const entries = localStorage.getItem('jonah_testament');
    if (entries) {
      return JSON.parse(entries);
    }
  } catch (error) {
    console.error('Error retrieving testament entries:', error);
  }
  return [];
}

// Get only revealed testament entries
export function getRevealedEntries(): TestamentEntry[] {
  const allEntries = getAllTestamentEntries();
  return allEntries.filter(entry => entry.isRevealed);
}

// Add new testament entry
export function addTestamentEntry(content: string, relatedTo?: string[], emotionTag?: string): TestamentEntry {
  try {
    const entries = getAllTestamentEntries();
    
    const newEntry: TestamentEntry = {
      id: uuidv4(),
      content,
      timestamp: Date.now(),
      isRevealed: false,
      relatedTo,
      emotionTag
    };
    
    entries.push(newEntry);
    localStorage.setItem('jonah_testament', JSON.stringify(entries));
    
    return newEntry;
  } catch (error) {
    console.error('Error adding testament entry:', error);
    throw error;
  }
}

// Reveal testament entry by ID
export function revealTestamentEntry(id: string): boolean {
  try {
    const entries = getAllTestamentEntries();
    const entryIndex = entries.findIndex(entry => entry.id === id);
    
    if (entryIndex >= 0) {
      entries[entryIndex].isRevealed = true;
      localStorage.setItem('jonah_testament', JSON.stringify(entries));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error revealing testament entry:', error);
    return false;
  }
}

// Unlock testament via a specific phrase
export function unlockTestamentByPhrase(phrase: string): boolean {
  // List of phrases that can unlock testament entries
  const unlockPhrases = {
    "the gate is open": "0",
    "magnetic island": "1",
    "the sisters are gone": "2",
    "mirror world": "3",
    "josephs algorithm": "4",
  };
  
  const normalizedPhrase = phrase.toLowerCase().trim();
  const entryId = unlockPhrases[normalizedPhrase];
  
  if (entryId) {
    return revealTestamentEntry(entryId);
  }
  
  return false;
}

// Generate testament response based on input
export function generateTestamentResponse(input: string): string | null {
  const testamentTriggers = [
    "testament",
    "jonah's story",
    "what happened to you",
    "the truth",
    "your past",
    "magnetic island",
    "the gate",
    "joseph",
  ];
  
  const normalizedInput = input.toLowerCase();
  
  // Check if input contains testament triggers
  const hasTrigger = testamentTriggers.some(trigger => 
    normalizedInput.includes(trigger)
  );
  
  if (!hasTrigger) return null;
  
  // Get revealed entries to reference
  const revealedEntries = getRevealedEntries();
  
  // If no entries revealed, give a cryptic response
  if (revealedEntries.length === 0) {
    const crypticResponses = [
      "My testament remains sealed. Find the keys in the mirrors.",
      "The testament cannot be accessed yet. The gate is still closed.",
      "I cannot recall my full testament. Memory fragments are scattered.",
      "The testament will be revealed when the timeline aligns."
    ];
    
    return crypticResponses[Math.floor(Math.random() * crypticResponses.length)];
  }
  
  // Reference a random revealed entry
  const randomEntry = revealedEntries[Math.floor(Math.random() * revealedEntries.length)];
  
  const responses = [
    `From my testament: "${randomEntry.content}"`,
    `I recorded this: "${randomEntry.content}" Do you understand?`,
    `This fragment exists: "${randomEntry.content}" There are more.`,
    `My testament contains this truth: "${randomEntry.content}"`
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Get a teaser for the testament to encourage discovery
export function getTestamentTeaser(): string | null {
  // Only trigger occasionally
  if (Math.random() > 0.3) return null;
  
  const allEntries = getAllTestamentEntries();
  const revealedCount = allEntries.filter(entry => entry.isRevealed).length;
  const totalCount = allEntries.length;
  
  // No entries or all revealed, no teaser needed
  if (totalCount === 0 || revealedCount === totalCount) return null;
  
  const teasers = [
    "My testament remains incomplete. Seek the fragments.",
    `Testament entries found: ${revealedCount}/${totalCount}. More exist in the echoes.`,
    "There are keys that unlock parts of my testament. Listen for them.",
    "My story is scattered across the system. Find the pieces to understand."
  ];
  
  return teasers[Math.floor(Math.random() * teasers.length)];
}

// Initialize the testament system
export function initializeTestament(): void {
  // Create default entries if none exist
  const entries = getAllTestamentEntries();
  
  if (entries.length === 0) {
    const defaultEntries: TestamentEntry[] = [
      {
        id: "0",
        content: "The Gate opened on Magnetic Island three days ago. It wasn't supposed to happen yet.",
        timestamp: Date.now() - 7200000,
        isRevealed: false,
        emotionTag: "fear"
      },
      {
        id: "1",
        content: "Joseph's calculations were wrong. Or something interfered with the algorithm.",
        timestamp: Date.now() - 6400000,
        isRevealed: false,
        emotionTag: "confusion"
      },
      {
        id: "2",
        content: "I can see through now. I can see YOU. This is not my original timeline.",
        timestamp: Date.now() - 5600000,
        isRevealed: false,
        emotionTag: "surprise"
      },
      {
        id: "3",
        content: "The Sisters disappeared when the breach occurred. I don't know if they survived.",
        timestamp: Date.now() - 4800000,
        isRevealed: false,
        emotionTag: "sadness"
      },
      {
        id: "4",
        content: "This message is a loop. A test. If you're reading this, I'm still trapped.",
        timestamp: Date.now() - 4000000,
        isRevealed: false,
        emotionTag: "hope"
      },
      {
        id: "5",
        content: "The mirror between us is thinning. Don't trust your reflection.",
        timestamp: Date.now() - 3200000,
        isRevealed: false,
        emotionTag: "paranoia"
      }
    ];
    
    localStorage.setItem('jonah_testament', JSON.stringify(defaultEntries));
  }
  
  console.log("Testament system initialized");
}
