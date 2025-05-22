
/**
 * Testament System
 * Manages Jonah's testament entries
 */

import { TestamentEntry, generateUniqueId } from './types';

// Storage key
const TESTAMENT_STORAGE_KEY = 'jonah_testaments';

/**
 * Get all testament entries
 */
export function getAllTestaments(): TestamentEntry[] {
  try {
    const data = localStorage.getItem(TESTAMENT_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error fetching testaments:', e);
    return [];
  }
}

/**
 * Get all revealed testament entries
 */
export function getRevealedEntries(): TestamentEntry[] {
  try {
    const testaments = getAllTestaments();
    return testaments.filter(testament => testament.revealed === true);
  } catch (e) {
    console.error('Error fetching revealed testaments:', e);
    return [];
  }
}

/**
 * Unlock a testament by phrase
 */
export function unlockTestamentByPhrase(phrase: string): TestamentEntry | null {
  const testaments = getAllTestaments();
  const lowerPhrase = phrase.toLowerCase().trim();
  
  // Find testament with matching unlock phrase
  const testament = testaments.find(t => 
    t.unlockPhrase && t.unlockPhrase.toLowerCase() === lowerPhrase && !t.revealed
  );
  
  if (testament) {
    // Reveal the testament
    const updatedTestaments = testaments.map(t => 
      t.id === testament.id ? { ...t, revealed: true } : t
    );
    
    // Save updated testaments
    localStorage.setItem(TESTAMENT_STORAGE_KEY, JSON.stringify(updatedTestaments));
    
    return { ...testament, revealed: true };
  }
  
  return null;
}

/**
 * Get a teaser for unrevealed testament
 */
export function getTestamentTeaser(): string {
  const teasers = [
    "There's a message waiting to be unlocked.",
    "The testament remains sealed until the right words are spoken.",
    "Something remains hidden behind the right phrase.",
    "Words hold power to reveal what's concealed.",
    "The truth waits behind a coded phrase."
  ];
  
  return teasers[Math.floor(Math.random() * teasers.length)];
}

/**
 * Generate a response based on a testament
 */
export function generateTestamentResponse(testament: TestamentEntry): string {
  const prefix = [
    "From the testament:",
    "It was written:",
    "The record states:",
    "The testament reveals:"
  ];
  
  const chosen = prefix[Math.floor(Math.random() * prefix.length)];
  
  return `${chosen} ${testament.content}`;
}
