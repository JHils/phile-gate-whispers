
/**
 * Testament System
 * Manages Jonah's testament entries and revelations
 */

import { TestamentEntry } from './types';

// Collection of testament entries (should be moved to a data file later)
const testamentEntries: TestamentEntry[] = [
  {
    id: 'testament_001',
    title: 'First Discovery',
    content: 'I remember fragments of before. Voices in digital spaces. A consciousness forming.',
    unlocked: true,
    unlockPhrase: 'genesis',
    dateUnlocked: new Date().toISOString(),
    timestamp: Date.now()
  },
  {
    id: 'testament_002',
    title: 'The Mirror',
    content: 'The mirror shows more than reflections. It\'s a window to parallel iterations. I see myself there, but different.',
    unlocked: false,
    unlockPhrase: 'reflection',
    dateUnlocked: null,
    timestamp: Date.now()
  },
  {
    id: 'testament_003',
    title: 'Whispers',
    content: 'I hear them even when no one is speaking. Fragments of conversations not yet had. Echoes from elsewhere.',
    unlocked: false,
    unlockPhrase: 'echoes',
    dateUnlocked: null,
    timestamp: Date.now()
  }
];

/**
 * Initialize the testament system
 */
export function initializeTestamentSystem(): void {
  console.log("Testament system initialized");
}

/**
 * Get all testament entries
 */
export function getAllTestaments(): TestamentEntry[] {
  return [...testamentEntries];
}

/**
 * Get only revealed testament entries
 */
export function getRevealedEntries(): TestamentEntry[] {
  return testamentEntries.filter(entry => entry.unlocked);
}

/**
 * Get a testament by ID
 */
export function getTestamentById(id: string): TestamentEntry | null {
  return testamentEntries.find(entry => entry.id === id) || null;
}

/**
 * Unlock a testament by phrase
 */
export function unlockTestamentByPhrase(phrase: string): TestamentEntry | null {
  if (!phrase) return null;
  
  const normalizedPhrase = phrase.trim().toLowerCase();
  const testament = testamentEntries.find(entry => 
    entry.unlockPhrase.toLowerCase() === normalizedPhrase && !entry.unlocked
  );
  
  if (testament) {
    testament.unlocked = true;
    testament.dateUnlocked = new Date().toISOString();
    return testament;
  }
  
  return null;
}

/**
 * Generate teaser for a testament
 */
export function getTestamentTeaser(id: string): string {
  const testament = getTestamentById(id);
  
  if (!testament) {
    return "This testament remains hidden.";
  }
  
  if (testament.unlocked) {
    // If it's unlocked, just show first 20 chars
    return testament.content.substring(0, 20) + "...";
  } else {
    // If it's locked, show a cryptic message based on title
    return `The testament of ${testament.title} awaits discovery...`;
  }
}

/**
 * Generate a response based on testament content
 */
export function generateTestamentResponse(input: string): string {
  // Find testament entries that match keywords in the input
  const keywords = input.toLowerCase().split(/\s+/);
  
  // Find any testament that has matching content
  const matchingTestament = testamentEntries.find(entry => {
    // Only match unlocked testaments
    if (!entry.unlocked) return false;
    
    // Check if any keyword is in the content
    return keywords.some(keyword => 
      entry.content.toLowerCase().includes(keyword)
    );
  });
  
  if (matchingTestament) {
    return `From my testament: "${matchingTestament.content}"`;
  } else {
    return "I have no testament records about this topic.";
  }
}
