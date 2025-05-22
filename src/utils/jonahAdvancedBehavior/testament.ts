
/**
 * Testament System
 * Core module for Jonah's testament functionality
 */

import { TestamentEntry } from './types';

// Storage constants
const TESTAMENT_STORAGE_KEY = 'jonah_testament_entries';

// Load testament entries from storage
export function loadTestamentEntries(): TestamentEntry[] {
  try {
    const entriesJson = localStorage.getItem(TESTAMENT_STORAGE_KEY);
    return entriesJson ? JSON.parse(entriesJson) : [];
  } catch (e) {
    console.error('Error loading testament entries:', e);
    return [];
  }
}

// Save testament entries to storage
export function saveTestamentEntries(entries: TestamentEntry[]): void {
  try {
    localStorage.setItem(TESTAMENT_STORAGE_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error('Error saving testament entries:', e);
  }
}

// Add a new testament entry
export function addTestamentEntry(
  title: string,
  content: string,
  requiresTrust: number = 0,
  revealed: boolean = false
): TestamentEntry {
  const entries = loadTestamentEntries();
  
  const newEntry: TestamentEntry = {
    id: `testament_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    title,
    text: content,
    content,
    timestamp: Date.now(),
    revealed,
    requiresTrust,
    trustLevel: requiresTrust > 70 ? 'high' : requiresTrust > 30 ? 'medium' : 'low'
  };
  
  // Add to entries and save
  entries.push(newEntry);
  saveTestamentEntries(entries);
  
  return newEntry;
}

// Add a locked testament entry
export function addLockedTestamentEntry(
  title: string,
  content: string,
  unlockPhrase: string,
  requiresTrust: number = 50
): TestamentEntry {
  const entries = loadTestamentEntries();
  
  const newEntry: TestamentEntry = {
    id: `testament_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    title,
    text: content,
    content,
    timestamp: Date.now(),
    unlockPhrase,
    revealed: false,
    requiresTrust,
    trustLevel: requiresTrust > 70 ? 'high' : requiresTrust > 30 ? 'medium' : 'low'
  };
  
  // Add to entries and save
  entries.push(newEntry);
  saveTestamentEntries(entries);
  
  return newEntry;
}

// Check if a testament can be unlocked with a phrase
export function attemptUnlockTestament(phrase: string): TestamentEntry | null {
  const entries = loadTestamentEntries();
  
  // Find entry with matching unlock phrase
  const entry = entries.find(e => 
    e.unlockPhrase && 
    e.unlockPhrase.toLowerCase() === phrase.toLowerCase() && 
    !e.revealed
  );
  
  if (entry) {
    // Check if user has required trust level
    const trustScore = parseInt(localStorage.getItem('jonahTrustScore') || '50');
    
    if (trustScore >= (entry.requiresTrust || 0)) {
      // Unlock the entry
      entry.revealed = true;
      saveTestamentEntries(entries);
      return entry;
    }
  }
  
  return null;
}

// Get all visible testament entries
export function getVisibleTestamentEntries(): TestamentEntry[] {
  const entries = loadTestamentEntries();
  const trustScore = parseInt(localStorage.getItem('jonahTrustScore') || '50');
  
  // Return entries that are revealed or meet trust requirements
  return entries.filter(entry => 
    entry.revealed || 
    (entry.requiresTrust !== undefined && trustScore >= entry.requiresTrust)
  );
}
