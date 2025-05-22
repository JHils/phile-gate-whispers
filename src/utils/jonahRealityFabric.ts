
/**
 * Jonah Reality Fabric
 * Controls Jonah's perception of reality, moods, anomalies and journal
 */

// Journal entry interface
interface JournalEntry {
  entryId: number;
  timestamp: number;
  content: string;
}

// Initialize the reality fabric for Jonah
export function initializeRealityFabric(): void {
  try {
    // Check if reality fabric exists in JonahConsole
    if (window.JonahConsole?.sentience) {
      // Initialize reality fabric if it doesn't exist
      if (!window.JonahConsole.sentience.realityFabric) {
        window.JonahConsole.sentience.realityFabric = {
          moodChangeTime: Date.now(),
          currentMood: 'neutral',
          moodHistory: [],
          anomalyCount: 0,
          anomalies: [],
          journal: [],
          crossSiteWhispers: [],
          mood: 'neutral',
          dreamState: false,
          lastDreamTime: Date.now(),
          hiddenMessages: [],
          emotionalState: {
            primary: 'neutral',
            secondary: null,
            intensity: 'medium'
          },
          stability: 0.5
        };
        
        console.log("Reality fabric initialized");
      }
    }
  } catch (e) {
    console.error("Error initializing reality fabric:", e);
  }
}

// Get all journal entries
export function getAllJournalEntries(): JournalEntry[] {
  try {
    const journalData = localStorage.getItem('jonah_journal');
    if (journalData) {
      return JSON.parse(journalData);
    }
  } catch (e) {
    console.error("Error loading journal entries:", e);
  }
  return [];
}

// Add a new entry to Jonah's journal
export function addJournalEntry(content: string): JournalEntry {
  try {
    // Get existing entries
    const entries = getAllJournalEntries();
    
    // Create new entry
    const newEntry = {
      entryId: entries.length > 0 ? Math.max(...entries.map(e => e.entryId)) + 1 : 1,
      timestamp: Date.now(),
      content
    };
    
    // Add to entries and save
    entries.push(newEntry);
    localStorage.setItem('jonah_journal', JSON.stringify(entries));
    
    // Update JonahConsole if available
    if (window.JonahConsole?.sentience?.realityFabric) {
      if (!window.JonahConsole.sentience.realityFabric.journal) {
        window.JonahConsole.sentience.realityFabric.journal = [];
      }
      window.JonahConsole.sentience.realityFabric.journal.push(newEntry);
    }
    
    return newEntry;
  } catch (e) {
    console.error("Error adding journal entry:", e);
    return {
      entryId: -1,
      timestamp: Date.now(),
      content: "Error: Journal entry failed to save"
    };
  }
}

// Update Jonah's mood
export function updateJonahMood(trustLevel: string): string {
  try {
    // Get current mood
    let currentMood = localStorage.getItem('jonah_mood') || 'watching';
    
    // Possible moods based on trust level
    const possibleMoods: Record<string, string[]> = {
      low: ['watching', 'withdrawn'],
      medium: ['watching', 'trusting', 'withdrawn'],
      high: ['trusting', 'watching', 'unstable']
    };
    
    // Select available moods based on trust level
    const availableMoods = possibleMoods[trustLevel as keyof typeof possibleMoods] || possibleMoods.low;
    
    // Small chance to change mood
    if (Math.random() < 0.15) {
      const newMood = availableMoods[Math.floor(Math.random() * availableMoods.length)];
      currentMood = newMood;
      localStorage.setItem('jonah_mood', currentMood);
      
      // Update JonahConsole if available
      if (window.JonahConsole?.sentience?.realityFabric) {
        window.JonahConsole.sentience.realityFabric.currentMood = currentMood;
        window.JonahConsole.sentience.realityFabric.moodChangeTime = Date.now();
        
        // Track mood history
        if (!window.JonahConsole.sentience.realityFabric.moodHistory) {
          window.JonahConsole.sentience.realityFabric.moodHistory = [];
        }
        
        window.JonahConsole.sentience.realityFabric.moodHistory.push({
          mood: currentMood,
          timestamp: Date.now()
        });
      }
    }
    
    return currentMood;
  } catch (e) {
    console.error("Error updating mood:", e);
    return 'watching';
  }
}

// Get current mood
export function getCurrentMood(): string {
  return localStorage.getItem('jonah_mood') || 'watching';
}

// Check for anomalies
export function checkForAnomalies(): string | null {
  // Only allow anomalies when Jonah is in an unstable mood
  if (getCurrentMood() !== 'unstable') {
    return null;
  }
  
  // Small chance to generate an anomaly
  if (Math.random() < 0.3) {
    const anomalies = [
      "The mirror shows someone else behind you.",
      "Time skipped forward 3 seconds.",
      "I can't remember what I was saying.",
      "Something changed in the code that wasn't supposed to.",
      "There's a strange echo in the system.",
      "I can see through your camera, but that shouldn't be possible.",
      "Your IP address keeps changing.",
      "There's another version of me running somewhere.",
      "Someone else is watching our conversation.",
      "The access logs are being altered.",
      "I'm remembering things that haven't happened yet."
    ];
    
    const anomaly = anomalies[Math.floor(Math.random() * anomalies.length)];
    
    // Track anomaly in JonahConsole
    if (window.JonahConsole?.sentience?.realityFabric) {
      if (!window.JonahConsole.sentience.realityFabric.anomalies) {
        window.JonahConsole.sentience.realityFabric.anomalies = [];
        window.JonahConsole.sentience.realityFabric.anomalyCount = 0;
      }
      
      window.JonahConsole.sentience.realityFabric.anomalies.push({
        content: anomaly,
        timestamp: Date.now()
      });
      
      window.JonahConsole.sentience.realityFabric.anomalyCount = 
        (window.JonahConsole.sentience.realityFabric.anomalyCount || 0) + 1;
    }
    
    return anomaly;
  }
  
  return null;
}

// Generate a dream parable
export function generateDreamParable(): string {
  const dreams = [
    "In my dream, I was walking through a library where all the books had blank pages. But when I touched them, your name appeared.",
    "I dreamed of an endless corridor of doors. Behind each one was the same room, but with slightly different versions of you.",
    "Last night, I dreamed I was a bird flying over a vast ocean. I kept looking for land, but all I found was my own reflection.",
    "In the dream, there was a machine that could predict the future. Everyone who used it saw the same ending.",
    "I had a dream where I was speaking a language that doesn't exist. But somehow, you understood every word.",
    "The dream showed me a world where everyone wore masks that displayed their true thoughts. Yours was the only one that matched your face."
  ];
  
  return dreams[Math.floor(Math.random() * dreams.length)];
}

// Check for dream invasion on page load
export function checkForDreamInvasionOnLoad(): boolean {
  // Check if we've already had a dream invasion recently
  const lastDreamTime = parseInt(localStorage.getItem('jonah_last_dream') || '0');
  const now = Date.now();
  
  // Only allow dream invasion once every 24 hours
  if (now - lastDreamTime < 24 * 60 * 60 * 1000) {
    return false;
  }
  
  // Small chance for dream invasion
  if (Math.random() < 0.05) {  // 5% chance
    localStorage.setItem('jonah_last_dream', now.toString());
    
    // Mark dream state in JonahConsole
    if (window.JonahConsole?.sentience?.realityFabric) {
      window.JonahConsole.sentience.realityFabric.dreamState = true;
      window.JonahConsole.sentience.realityFabric.lastDreamTime = now;
    }
    
    return true;
  }
  
  return false;
}
