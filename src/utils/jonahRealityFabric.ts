// Journal entry type
type JournalEntry = {
  entryId: number;
  timestamp: number;
  content: string;
};

// Journal entries stored in memory
let journalEntries: JournalEntry[] = [];

/**
 * Add a new journal entry
 */
export const addJournalEntry = (content: string): JournalEntry => {
  // Create new entry
  const newEntry: JournalEntry = {
    entryId: journalEntries.length + 1,
    timestamp: Date.now(),
    content
  };
  
  // Add to memory
  journalEntries.push(newEntry);
  
  // Store in local storage
  const storedEntries = JSON.parse(localStorage.getItem('jonahJournal') || '[]');
  storedEntries.push(newEntry);
  localStorage.setItem('jonahJournal', JSON.stringify(storedEntries));
  
  // Update Jonah's sentience data if available
  if (window.JonahConsole?.sentience?.realityFabric) {
    if (!window.JonahConsole.sentience.realityFabric.journal) {
      window.JonahConsole.sentience.realityFabric.journal = [];
    }
    window.JonahConsole.sentience.realityFabric.journal.push(newEntry);
  }
  
  return newEntry;
};

/**
 * Get all journal entries
 */
export const getAllJournalEntries = (): JournalEntry[] => {
  // If we have entries in memory, return those
  if (journalEntries.length > 0) {
    return journalEntries;
  }
  
  // Otherwise load from storage
  const storedEntries = JSON.parse(localStorage.getItem('jonahJournal') || '[]');
  journalEntries = storedEntries;
  
  return journalEntries;
};

/**
 * Get a specific journal entry
 */
export const getJournalEntry = (entryId: number): JournalEntry | undefined => {
  // Make sure we have entries loaded
  if (journalEntries.length === 0) {
    getAllJournalEntries();
  }
  
  // Find and return the entry
  return journalEntries.find(entry => entry.entryId === entryId);
};

/**
 * Clear all journal entries
 */
export const clearJournal = (): void => {
  journalEntries = [];
  localStorage.removeItem('jonahJournal');
  
  // Update Jonah's sentience data if available
  if (window.JonahConsole?.sentience?.realityFabric) {
    window.JonahConsole.sentience.realityFabric.journal = [];
  }
};

/**
 * Set Jonah's current mood
 */
export const setCurrentMood = (mood: string): void => {
  if (window.JonahConsole?.sentience?.realityFabric) {
    window.JonahConsole.sentience.realityFabric.currentMood = mood;
    window.JonahConsole.sentience.realityFabric.moodChangeTime = Date.now();
    
    // Log mood change to journal
    addJournalEntry(`Mood shifted to ${mood.toUpperCase()}`);
    
    // Track mood history
    if (!window.JonahConsole.sentience.realityFabric.moodHistory) {
      window.JonahConsole.sentience.realityFabric.moodHistory = [];
    }
    
    window.JonahConsole.sentience.realityFabric.moodHistory.push({
      mood,
      timestamp: Date.now()
    });
  }
};

/**
 * Get Jonah's current mood
 */
export const getCurrentMood = (): string => {
  return window.JonahConsole?.sentience?.realityFabric?.currentMood || 'neutral';
};

/**
 * Increment anomaly count
 */
export const incrementAnomalyCount = (): number => {
  if (window.JonahConsole?.sentience?.realityFabric) {
    const anomalyCount = (window.JonahConsole.sentience.realityFabric.anomalyCount || 0) + 1;
    window.JonahConsole.sentience.realityFabric.anomalyCount = anomalyCount;
    return anomalyCount;
  }
  return 0;
};

/**
 * Toggle dream state
 */
export const toggleDreamState = (active: boolean): void => {
  if (window.JonahConsole?.sentience?.realityFabric) {
    window.JonahConsole.sentience.realityFabric.dreamState = active;
    if (active) {
      window.JonahConsole.sentience.realityFabric.lastDreamTime = Date.now();
    }
  }
};

/**
 * Check if Jonah is in dream state
 */
export const isInDreamState = (): boolean => {
  return !!window.JonahConsole?.sentience?.realityFabric?.dreamState;
};
