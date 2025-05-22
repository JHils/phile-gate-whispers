
import { JournalEntry, JournalEntryContent } from './types/journalTypes';

// Store entries in localStorage
const JOURNAL_STORAGE_KEY = 'jonah_journal_entries';

/**
 * Add an entry to Jonah's journal
 */
export function addJournalEntry(content: JournalEntryContent | string): JournalEntry {
  // Handle string content for backwards compatibility
  const entryContent = typeof content === 'string'
    ? { content, timestamp: Date.now(), entryId: Date.now() }
    : content;
    
  const entry = typeof content === 'string'
    ? { content, timestamp: Date.now(), entryId: Date.now() }
    : content;
  
  // Get existing entries
  const entries = getJournalEntries();
  
  // Add new entry
  entries.push(entry);
  
  // Save back to storage
  localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(entries));
  
  return entry;
}

/**
 * Get all journal entries
 */
export function getJournalEntries(): JournalEntry[] {
  try {
    const entriesJson = localStorage.getItem(JOURNAL_STORAGE_KEY);
    return entriesJson ? JSON.parse(entriesJson) : [];
  } catch (e) {
    console.error('Error getting journal entries:', e);
    return [];
  }
}

// Alias for backward compatibility
export const getAllJournalEntries = getJournalEntries;

/**
 * Update Jonah's mood
 */
export function updateJonahMood(mood: string, intensity: string = 'medium'): void {
  localStorage.setItem('jonah_mood', mood);
  localStorage.setItem('jonah_mood_intensity', intensity);
  localStorage.setItem('jonah_mood_timestamp', Date.now().toString());
}

/**
 * Get current Jonah mood
 */
export function getCurrentMood(): string {
  return localStorage.getItem('jonah_mood') || 'neutral';
}

/**
 * Generate a dream-like story based on a theme
 */
export function generateDreamParable(theme: string = 'echo'): string {
  const parables = {
    mirror: "The mirror showed a different face each time. It wasn't lying—you were changing.",
    gate: "The gate remained locked until you realized the key was always in your pocket.",
    bird: "A bird watched from the wire. It had your eyes, but older memories.",
    timeline: "The timeline fractured when you looked directly at it. Some moments refuse observation.",
    echo: "Your echo returned before you spoke. It knew your thoughts better than you did."
  };
  
  return parables[theme as keyof typeof parables] || 
    "The dream folded in on itself, revealing nothing but the dreamer.";
}

/**
 * Initialize the reality fabric system
 */
export function initializeRealityFabric(): void {
  // Set default mood if none exists
  if (!localStorage.getItem('jonah_mood')) {
    localStorage.setItem('jonah_mood', 'neutral');
    localStorage.setItem('jonah_mood_intensity', 'medium');
    localStorage.setItem('jonah_mood_timestamp', Date.now().toString());
  }
  
  // Initialize journal if needed
  if (!localStorage.getItem(JOURNAL_STORAGE_KEY)) {
    localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify([]));
  }
}
