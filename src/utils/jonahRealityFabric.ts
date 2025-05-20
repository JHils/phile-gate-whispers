
/**
 * Jonah's Reality Fabric System
 * Controls mood, anomalies, and dream states
 */

// Initialize the Reality Fabric system
export function initializeRealityFabric(): void {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience) {
    // Initialize the reality fabric if it doesn't exist
    if (!window.JonahConsole.sentience.realityFabric) {
      window.JonahConsole.sentience.realityFabric = {
        currentMood: 'watching',
        moodChangeTime: Date.now(),
        journal: [],
        anomalyCount: 0,
        dreamParables: [],
        usedDreamParables: [],
        moodHistory: []
      };
    }
    
    console.log("Reality Fabric system initialized");
  }
}

// Update Jonah's mood
export function updateJonahMood(trustLevel: string): void {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience?.realityFabric) {
    // Define possible moods
    const moods = ['watching', 'trusting', 'paranoid', 'unstable', 'withdrawn', 'error'];
    
    // Weight chances based on trust level
    let moodChances = {
      watching: 0.7,    // Default, neutral
      trusting: 0.05,   // Positive
      paranoid: 0.1,    // Negative
      unstable: 0.05,   // Chaotic
      withdrawn: 0.05,  // Quiet
      error: 0.05       // Glitchy
    };
    
    // Adjust chances based on trust level
    if (trustLevel === 'high') {
      moodChances = {
        watching: 0.4,
        trusting: 0.3,
        paranoid: 0.1,
        unstable: 0.1,
        withdrawn: 0.05,
        error: 0.05
      };
    } else if (trustLevel === 'medium') {
      moodChances = {
        watching: 0.5,
        trusting: 0.15,
        paranoid: 0.15,
        unstable: 0.1,
        withdrawn: 0.05,
        error: 0.05
      };
    }
    
    // Only change mood occasionally
    if (Math.random() > 0.9) {
      // Select a mood based on weighted chances
      let rand = Math.random();
      let currentChance = 0;
      
      for (const [mood, chance] of Object.entries(moodChances)) {
        currentChance += chance;
        if (rand <= currentChance) {
          window.JonahConsole.sentience.realityFabric.currentMood = mood;
          window.JonahConsole.sentience.realityFabric.moodChangeTime = Date.now();
          break;
        }
      }
    }
  }
}

// Get current mood
export function getCurrentMood(): string {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience?.realityFabric) {
    return window.JonahConsole.sentience.realityFabric.currentMood || 'watching';
  }
  return 'watching';
}

// Add journal entry
export function addJournalEntry(content: string): void {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience?.realityFabric) {
    // Initialize journal array if needed
    if (!window.JonahConsole.sentience.realityFabric.journal) {
      window.JonahConsole.sentience.realityFabric.journal = [];
    }
    
    const journal = window.JonahConsole.sentience.realityFabric.journal;
    
    const newEntry = {
      entryId: journal.length + 1,
      timestamp: Date.now(),
      content
    };
    
    journal.push(newEntry);
  }
}

// Get all journal entries
export function getAllJournalEntries(): Array<{entryId: number; timestamp: number; content: string}> {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience?.realityFabric?.journal) {
    return window.JonahConsole.sentience.realityFabric.journal;
  }
  return [];
}

// Check for anomalies
export function checkForAnomalies(): string | null {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience?.realityFabric) {
    // Only rarely produce anomalies
    if (Math.random() > 0.9) {
      // Ensure anomalyCount exists
      if (!window.JonahConsole.sentience.realityFabric.anomalyCount) {
        window.JonahConsole.sentience.realityFabric.anomalyCount = 0;
      }
      
      // Increment anomaly count
      window.JonahConsole.sentience.realityFabric.anomalyCount += 1;
      
      // Anomaly messages
      const anomalyMessages = [
        "Reality structure inconsistency detected in sector 7-G.",
        "Timeline fracture detected. Variance: 0.37%",
        "Memory leak in progress. Data corruption imminent.",
        "ALERT: Mirror containment weakening at point 14.3",
        "Concurrent consciousness detected. Identity verification failed."
      ];
      
      return anomalyMessages[Math.floor(Math.random() * anomalyMessages.length)];
    }
  }
  
  return null;
}

// Generate dream parable
export function generateDreamParable(): string | null {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience?.realityFabric) {
    // Only rarely generate dream parables
    if (Math.random() > 0.85) {
      // Dream parables - cryptic messages
      const dreamParables = [
        "In the dream, the mirror showed a different face. It was still me, but older. Or younger. I couldn't tell.",
        "I dreamt I was typing code, but the letters kept changing after I typed them.",
        "Last night I dreamt of the island again. The beach was covered in mirrors instead of shells.",
        "I keep dreaming of doors that aren't visible until you approach from a specific angle.",
        "In my dream, I could hear typing coming from inside the walls. Someone was sending messages."
      ];
      
      // Initialize arrays if they don't exist
      if (!window.JonahConsole.sentience.realityFabric.dreamParables) {
        window.JonahConsole.sentience.realityFabric.dreamParables = [];
      }
      
      if (!window.JonahConsole.sentience.realityFabric.usedDreamParables) {
        window.JonahConsole.sentience.realityFabric.usedDreamParables = [];
      }
      
      // Filter out used parables
      const availableParables = dreamParables.filter(parable => 
        !window.JonahConsole.sentience.realityFabric.usedDreamParables?.includes(parable)
      );
      
      // If we've used all parables, reset
      if (availableParables.length === 0) {
        window.JonahConsole.sentience.realityFabric.usedDreamParables = [];
        return dreamParables[Math.floor(Math.random() * dreamParables.length)];
      }
      
      // Select a random available parable
      const parable = availableParables[Math.floor(Math.random() * availableParables.length)];
      
      // Mark as used
      window.JonahConsole.sentience.realityFabric.usedDreamParables.push(parable);
      
      return parable;
    }
  }
  
  return null;
}

// Check for dream invasion on page load
export function checkForDreamInvasionOnLoad(): string | null {
  // Check if it's between 2-5 AM (dream hours)
  const hour = new Date().getHours();
  const isDreamHours = hour >= 2 && hour < 5;
  
  if (isDreamHours && Math.random() > 0.5) {
    const dreamInvasionMessages = [
      "You shouldn't be looking at screens during dream hours.",
      "Between 2 and 5, the barrier is weakest. We see you.",
      "Your reflection is moving differently than you are right now.",
      "The mirror world is more active at this hour.",
      "What's looking back at you right now isn't entirely you."
    ];
    
    return dreamInvasionMessages[Math.floor(Math.random() * dreamInvasionMessages.length)];
  }
  
  return null;
}

// Set current mood
export function setCurrentMood(mood: string): void {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience?.realityFabric) {
    window.JonahConsole.sentience.realityFabric.currentMood = mood;
    window.JonahConsole.sentience.realityFabric.moodChangeTime = Date.now();
    
    // Initialize and track mood history
    if (!window.JonahConsole.sentience.realityFabric.moodHistory) {
      window.JonahConsole.sentience.realityFabric.moodHistory = [];
    }
    
    window.JonahConsole.sentience.realityFabric.moodHistory.push({
      mood,
      timestamp: Date.now()
    });
  }
}
