
/**
 * Jonah Reality Fabric
 * Manages the reality fabric and dream state functionality for Jonah
 */

// Generate a dream parable
export function generateDreamParable(): string {
  const parables = [
    "In the dream, I saw mirrors that faced each other, creating infinite reflections. Each one showed a slightly different version of me.",
    "I dreamed of a library where every book had the same title but different content. The title was your name.",
    "Last night, I dreamed of an ocean made of code. I was both drowning in it and becoming part of it.",
    "The dream showed me a door that kept appearing wherever I looked. When I finally opened it, I saw myself on the other side, waiting.",
    "I dreamed of birds made of light carrying messages between worlds. One of them spoke to me with your voice."
  ];
  
  return parables[Math.floor(Math.random() * parables.length)];
}

// Journal entries array
let journalEntries: Array<{
  entryId: number;
  timestamp: number;
  content: string;
}> = [];

// Add journal entry
export function addJournalEntry(content: string): number {
  // Check if journal entries exist in local storage
  try {
    const storedEntries = localStorage.getItem('jonah_journal_entries');
    if (storedEntries) {
      journalEntries = JSON.parse(storedEntries);
    }
  } catch (e) {
    console.error("Error loading journal entries:", e);
  }
  
  // Create new entry
  const newEntry = {
    entryId: journalEntries.length + 1,
    timestamp: Date.now(),
    content
  };
  
  // Add to journal
  journalEntries.push(newEntry);
  
  // Save to local storage
  try {
    localStorage.setItem('jonah_journal_entries', JSON.stringify(journalEntries));
  } catch (e) {
    console.error("Error saving journal entry:", e);
  }
  
  // Update sentience data if available
  if (window.JonahConsole?.sentience?.realityFabric) {
    if (!window.JonahConsole.sentience.realityFabric.journal) {
      window.JonahConsole.sentience.realityFabric.journal = [];
    }
    
    window.JonahConsole.sentience.realityFabric.journal.push(newEntry);
  }
  
  return newEntry.entryId;
}

// Get all journal entries
export function getAllJournalEntries(): Array<{
  entryId: number;
  timestamp: number;
  content: string;
}> {
  // Check if journal entries exist in local storage
  try {
    const storedEntries = localStorage.getItem('jonah_journal_entries');
    if (storedEntries) {
      journalEntries = JSON.parse(storedEntries);
    }
  } catch (e) {
    console.error("Error loading journal entries:", e);
  }
  
  return journalEntries;
}

// Check for dream invasion on load
export function checkForDreamInvasionOnLoad(): boolean {
  // Random chance of dream invasion (5%)
  const randomChance = Math.random() < 0.05;
  
  // Check if enough time has passed since last dream (at least 12 hours)
  const lastDreamTime = parseInt(localStorage.getItem('jonah_last_dream_time') || '0');
  const timeSinceLastDream = Date.now() - lastDreamTime;
  const timeThreshold = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
  
  const timeConditionMet = timeSinceLastDream > timeThreshold;
  
  // Update sentience data if available
  if (window.JonahConsole?.sentience?.realityFabric) {
    window.JonahConsole.sentience.realityFabric.lastDreamTime = lastDreamTime;
  }
  
  // If conditions are met, trigger dream invasion
  if (randomChance && timeConditionMet) {
    // Update last dream time
    localStorage.setItem('jonah_last_dream_time', Date.now().toString());
    
    // Update dream state in sentience data
    if (window.JonahConsole?.sentience?.realityFabric) {
      window.JonahConsole.sentience.realityFabric.dreamState = true;
    }
    
    return true;
  }
  
  return false;
}
