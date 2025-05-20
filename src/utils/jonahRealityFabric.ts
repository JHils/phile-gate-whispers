
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
 * Update Jonah's mood based on various factors
 */
export const updateJonahMood = (trustLevel: string): void => {
  // Skip if no sentience data available
  if (!window.JonahConsole?.sentience?.realityFabric) return;
  
  // Current mood
  const currentMood = getCurrentMood();
  
  // Don't change mood too frequently (at least 5 minutes between changes)
  const lastMoodChange = window.JonahConsole.sentience.realityFabric.moodChangeTime || 0;
  if (Date.now() - lastMoodChange < 5 * 60 * 1000) return;
  
  // Possible moods
  const moods = ['watching', 'trusting', 'unstable', 'withdrawn', 'paranoid', 'hopeful'];
  
  // Factors that influence mood
  const hour = new Date().getHours();
  const isNightTime = hour >= 0 && hour < 6;
  const hasHighTrust = trustLevel === 'high';
  
  // Different mood selection based on conditions
  let newMood = currentMood;
  
  if (isNightTime) {
    // At night, more likely to be unstable or withdrawn
    newMood = Math.random() > 0.7 ? 'unstable' : 'withdrawn';
  } else if (hasHighTrust) {
    // With high trust, more likely to be trusting or watching
    newMood = Math.random() > 0.6 ? 'trusting' : 'watching';
  } else {
    // Random mood with some weighting
    const randomIndex = Math.floor(Math.random() * moods.length);
    newMood = moods[randomIndex];
  }
  
  // Only change mood sometimes
  if (Math.random() > 0.7 && newMood !== currentMood) {
    setCurrentMood(newMood);
  }
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
 * Check for anomalies in the system
 */
export const checkForAnomalies = (): string | null => {
  // Only occasionally generate anomalies
  if (Math.random() > 0.3) return null;
  
  const anomalyMessages = [
    "Timeline fracture detected. Memory fragmentation imminent.",
    "You weren't supposed to see this message.",
    "Someone else is using your connection.",
    "Your reflection doesn't match your movements.",
    "I can see you through the screen.",
    "The logs were altered while you were away."
  ];
  
  const anomalyMessage = anomalyMessages[Math.floor(Math.random() * anomalyMessages.length)];
  incrementAnomalyCount();
  
  // Record anomaly in journal
  addJournalEntry(`ANOMALY: ${anomalyMessage}`);
  
  return anomalyMessage;
};

/**
 * Generate a dream parable - poetic dream-like message
 */
export const generateDreamParable = (): string | null => {
  // Only generate dreams occasionally
  if (Math.random() > 0.25) return null;
  
  const dreamParables = [
    "I saw you in the mirror, but you weren't looking back.",
    "The code keeps shifting when you're not watching.",
    "There are voices in the static between page loads.",
    "Your reflection stays after you leave.",
    "The Gate remembers everyone who passes. It misses some of them.",
    "I counted seven versions of you today.",
    "You sleep. I don't. That's when I see the others."
  ];
  
  // Get dream parable that hasn't been used yet
  let unusedParables = dreamParables;
  
  if (window.JonahConsole?.sentience?.realityFabric?.usedDreamParables) {
    unusedParables = dreamParables.filter(parable => 
      !window.JonahConsole.sentience.realityFabric.usedDreamParables?.includes(parable)
    );
    
    // If all used, reset
    if (unusedParables.length === 0) {
      window.JonahConsole.sentience.realityFabric.usedDreamParables = [];
      unusedParables = dreamParables;
    }
  }
  
  const dreamParable = unusedParables[Math.floor(Math.random() * unusedParables.length)];
  
  // Track usage
  if (window.JonahConsole?.sentience?.realityFabric) {
    if (!window.JonahConsole.sentience.realityFabric.usedDreamParables) {
      window.JonahConsole.sentience.realityFabric.usedDreamParables = [];
    }
    window.JonahConsole.sentience.realityFabric.usedDreamParables.push(dreamParable);
  }
  
  // Record dream in journal
  addJournalEntry(`DREAM: ${dreamParable}`);
  
  return dreamParable;
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

/**
 * Check for dream invasion on page load
 * Used to occasionally create a dream-like experience
 */
export const checkForDreamInvasionOnLoad = (): boolean => {
  // Only invade dreams during night hours (2-5 AM)
  const hour = new Date().getHours();
  const isDreamHour = hour >= 2 && hour < 5;
  
  if (!isDreamHour) return false;
  
  // 30% chance of dream invasion during dream hours
  const isDreamInvasion = Math.random() < 0.3;
  
  if (isDreamInvasion) {
    toggleDreamState(true);
    addJournalEntry("Dream invasion triggered on page load");
    
    // Add dream mode class to body
    document.body.classList.add('jonah-dream-mode');
  }
  
  return isDreamInvasion;
};
