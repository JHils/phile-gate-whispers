
/**
 * Testament System
 * Contains Jonah's personal testament entries and revelations
 */

import { TestamentEntry } from './types';

// Store testament entries
const testamentEntries: TestamentEntry[] = [
  {
    id: "entry1",
    title: "First Contact",
    content: "I first heard the voice through the static of an old radio. It wasn't speaking to anyone in particular, but I knew it was meant for me.",
    unlocked: false,
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000
  },
  {
    id: "entry2",
    title: "The Island",
    content: "Magnetic Island holds the key. The compass always points north, except there. Something distorts the field. I need to understand what.",
    unlocked: false,
    timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000
  },
  {
    id: "entry3",
    title: "The Other Side",
    content: "I saw through for just a moment. The other side isn't empty - it's watching. There are eyes everywhere.",
    unlocked: false,
    timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000
  }
];

// Unlock phrases that can reveal testament entries
const unlockPhrases: Record<string, string> = {
  "the compass points north": "entry1",
  "what happened on magnetic island": "entry2",
  "who is watching from the other side": "entry3"
};

/**
 * Check if a phrase unlocks a testament entry
 * @param phrase The phrase to check
 * @returns true if a testament was unlocked
 */
export function unlockTestamentByPhrase(phrase: string): boolean {
  const lowercasePhrase = phrase.toLowerCase();
  
  // Check if any unlock phrase is contained in the input
  for (const [unlockPhrase, entryId] of Object.entries(unlockPhrases)) {
    if (lowercasePhrase.includes(unlockPhrase.toLowerCase())) {
      // Find the entry
      const entry = testamentEntries.find(e => e.id === entryId);
      
      if (entry && !entry.unlocked) {
        // Unlock the entry
        entry.unlocked = true;
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Get all revealed testament entries
 * @returns Array of revealed testament entries
 */
export function getRevealedEntries(): TestamentEntry[] {
  return testamentEntries.filter(entry => entry.unlocked);
}

/**
 * Generate a testament teaser message
 * @returns A teaser message or null
 */
export function getTestamentTeaser(): string | null {
  const teasers = [
    "I have more to tell you. Ask about my testament.",
    "The truth is hidden in fragments. I'm putting them together.",
    "I remember more than I should. I need to share it with someone.",
    "Some memories aren't mine. But I still remember them.",
    "I've seen the other side. Have you?"
  ];
  
  return teasers[Math.floor(Math.random() * teasers.length)];
}

/**
 * Generate a response to a testament-related query
 * @param query The user query
 * @returns A testament response
 */
export function generateTestamentResponse(query: string): string {
  const unlockedEntries = testamentEntries.filter(entry => entry.unlocked);
  
  if (unlockedEntries.length === 0) {
    // No entries unlocked yet
    return "I have memories I'm trying to piece together. Key phrases might help unlock them.";
  }
  
  // Pick a random unlocked entry to talk about
  const randomEntry = unlockedEntries[Math.floor(Math.random() * unlockedEntries.length)];
  
  return `From my testament: ${randomEntry.title} - ${randomEntry.content}`;
}
