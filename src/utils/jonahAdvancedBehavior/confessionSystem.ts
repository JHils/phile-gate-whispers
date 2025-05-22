/**
 * Confession System
 * Manages Jonah's confession entries
 */

import { ConfessionEntry, generateUniqueId } from './types';

// Storage key
const CONFESSION_STORAGE_KEY = 'jonah_confessions';

/**
 * Initialize the confession system
 */
export function initializeConfessionSystem(): void {
  // Check if we already have confessions
  if (!localStorage.getItem(CONFESSION_STORAGE_KEY)) {
    // If not, set initial confessions
    localStorage.setItem(CONFESSION_STORAGE_KEY, JSON.stringify([]));
  }
}

/**
 * Get all confession entries
 */
export function getConfessions(): ConfessionEntry[] {
  try {
    const data = localStorage.getItem(CONFESSION_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error fetching confessions:', e);
    return [];
  }
}

/**
 * Add a new confession entry
 */
export function addConfession(confession: Partial<ConfessionEntry>): ConfessionEntry {
  try {
    const confessions = getConfessions();
    
    // Create new confession with required fields
    const newConfession: ConfessionEntry = {
      id: generateUniqueId(),
      title: confession.title || 'Untitled Confession',
      content: confession.content || '',
      timestamp: Date.now(),
      author: confession.author || 'Anonymous',
      isAnonymous: confession.isAnonymous || true,
      emotionalContext: confession.emotionalContext || 'neutral',
      sentiment: confession.sentiment || 'neutral',
      isCorrupted: confession.isCorrupted || false,
      recursive: confession.recursive || false,
      version: confession.version || '1.0'
    };
    
    // Add to array
    confessions.push(newConfession);
    
    // Save to storage
    localStorage.setItem(CONFESSION_STORAGE_KEY, JSON.stringify(confessions));
    
    return newConfession;
  } catch (e) {
    console.error('Error adding confession:', e);
    
    // Return minimal valid confession on error
    return {
      id: generateUniqueId(),
      title: 'Error Confession',
      content: 'An error occurred while recording this confession.',
      timestamp: Date.now(),
      author: 'System',
      isAnonymous: true,
      emotionalContext: 'error',
      sentiment: 'negative',
      isCorrupted: true,
      recursive: false,
      version: 'error'
    };
  }
}

/**
 * Get a confession by ID
 */
export function getConfessionById(id: string): ConfessionEntry | null {
  const confessions = getConfessions();
  return confessions.find(confession => confession.id === id) || null;
}

/**
 * Update an existing confession
 */
export function updateConfession(id: string, updates: Partial<ConfessionEntry>): ConfessionEntry | null {
  try {
    const confessions = getConfessions();
    const index = confessions.findIndex(confession => confession.id === id);
    
    if (index === -1) {
      return null;
    }
    
    // Merge updates
    confessions[index] = { ...confessions[index], ...updates };
    
    // Save to storage
    localStorage.setItem(CONFESSION_STORAGE_KEY, JSON.stringify(confessions));
    
    return confessions[index];
  } catch (e) {
    console.error('Error updating confession:', e);
    return null;
  }
}

/**
 * Delete a confession by ID
 */
export function deleteConfession(id: string): boolean {
  try {
    let confessions = getConfessions();
    confessions = confessions.filter(confession => confession.id !== id);
    
    // Save to storage
    localStorage.setItem(CONFESSION_STORAGE_KEY, JSON.stringify(confessions));
    
    return true;
  } catch (e) {
    console.error('Error deleting confession:', e);
    return false;
  }
}

/**
 * Get confessions by author
 */
export function getConfessionsByAuthor(author: string): ConfessionEntry[] {
  const confessions = getConfessions();
  return confessions.filter(confession => confession.author === author);
}

/**
 * Get corrupted confessions
 */
export function getCorruptedConfessions(): ConfessionEntry[] {
  const confessions = getConfessions();
  return confessions.filter(confession => confession.isCorrupted === true);
}

/**
 * Get anonymous confessions
 */
export function getAnonymousConfessions(): ConfessionEntry[] {
  const confessions = getConfessions();
  return confessions.filter(confession => confession.isAnonymous === true);
}
