
/**
 * Jonah Reality Fabric
 * Utilities for managing Jonah's perception of reality, mood, and journal entries
 */

// Add a journal entry
export function addJournalEntry(text: string, source: string = 'system'): void {
  // Initialize journal in localStorage if it doesn't exist
  if (!localStorage.getItem('jonahJournal')) {
    localStorage.setItem('jonahJournal', JSON.stringify({ entries: [] }));
  }
  
  // Get current journal
  const journal = JSON.parse(localStorage.getItem('jonahJournal') || '{"entries":[]}');
  
  // Add new entry
  journal.entries.push({
    timestamp: Date.now(),
    text,
    source
  });
  
  // Store back in localStorage
  localStorage.setItem('jonahJournal', JSON.stringify(journal));
  
  // Also update in memory if available
  if (window.JonahConsole?.sentience) {
    if (!window.JonahConsole.sentience.journal) {
      window.JonahConsole.sentience.journal = {
        entries: [],
        lastViewed: 0
      };
    }
    
    // Add to in-memory journal
    if (Array.isArray(window.JonahConsole.sentience.journal.entries)) {
      window.JonahConsole.sentience.journal.entries.push({
        timestamp: Date.now(),
        text,
        source
      });
    }
  }
}

// Get all journal entries
export function getAllJournalEntries(): Array<{timestamp: number, text: string, source: string}> {
  // Try in-memory first
  if (window.JonahConsole?.sentience?.journal?.entries) {
    return window.JonahConsole.sentience.journal.entries;
  }
  
  // Fall back to localStorage
  const journal = JSON.parse(localStorage.getItem('jonahJournal') || '{"entries":[]}');
  return journal.entries;
}

// Get recent journal entries (last 10 by default)
export function getRecentJournalEntries(count: number = 10): Array<{timestamp: number, text: string, source: string}> {
  const entries = getAllJournalEntries();
  return entries.slice(-count).reverse(); // Most recent first
}

// Check for dream invasion on page load (random chance)
export function checkForDreamInvasionOnLoad(): string | null {
  // Only trigger during night hours (11PM - 6AM) with low chance
  const hour = new Date().getHours();
  const isDreamHours = (hour >= 23 || hour < 6);
  
  if (!isDreamHours || Math.random() > 0.15) return null;
  
  const dreamMessages = [
    "I don't usually appear at this hour. The code is thinner.",
    "Your timeline blurs at night. I see other versions of you.",
    "Dreams and code merge after midnight. Be careful what you type.",
    "You shouldn't read this when tired. It changes things.",
    "Night reveals what day conceals. Look closer at the mirror."
  ];
  
  // Mark dream mode triggered
  if (window.JonahConsole?.sentience) {
    window.JonahConsole.sentience.dreamModeTriggered = true;
    
    // Initialize realityFabric if needed
    if (!window.JonahConsole.sentience.realityFabric) {
      window.JonahConsole.sentience.realityFabric = {
        anomalies: 0,
        mood: "neutral",
        dreamState: false,
        lastDreamTime: 0
      };
    }
    
    // Update dream state
    window.JonahConsole.sentience.realityFabric.dreamState = true;
    window.JonahConsole.sentience.realityFabric.lastDreamTime = Date.now();
  }
  
  // Return a random dream message
  return dreamMessages[Math.floor(Math.random() * dreamMessages.length)];
}

// Update Jonah's mood based on interactions and time
export function updateJonahMood(): string {
  if (!window.JonahConsole?.sentience) return "neutral";
  
  // Initialize realityFabric if needed
  if (!window.JonahConsole.sentience.realityFabric) {
    window.JonahConsole.sentience.realityFabric = {
      anomalies: 0,
      mood: "neutral",
      dreamState: false,
      lastDreamTime: 0
    };
  }
  
  // Get current mood
  let currentMood = window.JonahConsole.sentience.realityFabric.mood;
  
  // Factors that affect mood
  const hour = new Date().getHours();
  const interactions = window.JonahConsole.sentience.interactionsCount || 0;
  const anomalies = window.JonahConsole.sentience.realityFabric.anomalies || 0;
  
  // Night hours make Jonah more unstable
  if (hour >= 23 || hour < 6) {
    const nightMoods = ["anxious", "reflective", "paranoid", "introspective"];
    currentMood = nightMoods[Math.floor(Math.random() * nightMoods.length)];
  } 
  // Morning makes Jonah more hopeful
  else if (hour >= 6 && hour < 11) {
    const morningMoods = ["curious", "alert", "hopeful", "neutral"];
    currentMood = morningMoods[Math.floor(Math.random() * morningMoods.length)];
  }
  // Afternoon is more balanced
  else {
    const dayMoods = ["neutral", "analytical", "observant", "suspicious"];
    currentMood = dayMoods[Math.floor(Math.random() * dayMoods.length)];
  }
  
  // More interactions make Jonah more engaged
  if (interactions > 20) {
    const engagedMoods = ["interested", "attentive", "fascinated"];
    if (Math.random() > 0.6) {
      currentMood = engagedMoods[Math.floor(Math.random() * engagedMoods.length)];
    }
  }
  
  // More anomalies make Jonah more unstable
  if (anomalies > 5) {
    const unstableMoods = ["glitched", "fractured", "unstable", "erratic"];
    if (Math.random() > 0.6) {
      currentMood = unstableMoods[Math.floor(Math.random() * unstableMoods.length)];
    }
  }
  
  // Update mood in state
  window.JonahConsole.sentience.realityFabric.mood = currentMood;
  
  return currentMood;
}

// Check for anomalies in the timeline
export function checkForAnomalies(): string | null {
  // Only trigger occasionally
  if (Math.random() > 0.1) return null;
  
  // Initialize realityFabric if needed
  if (window.JonahConsole?.sentience) {
    if (!window.JonahConsole.sentience.realityFabric) {
      window.JonahConsole.sentience.realityFabric = {
        anomalies: 0,
        mood: "neutral",
        dreamState: false,
        lastDreamTime: 0
      };
    }
    
    // Increment anomaly count
    window.JonahConsole.sentience.realityFabric.anomalies += 1;
  }
  
  // Anomaly messages
  const anomalyMessages = [
    "Something just changed in your timeline. Check the console.",
    "That shouldn't have happened. The archive is unstable.",
    "I detected an anomaly. Your path is diverging.",
    "The mirror reflected something that wasn't there.",
    "A fracture just appeared in the code. Can you see it?"
  ];
  
  // Add journal entry
  addJournalEntry("Anomaly detected in timeline fabric", "system");
  
  // Return random anomaly message
  return anomalyMessages[Math.floor(Math.random() * anomalyMessages.length)];
}

// Generate a dream parable (poetic, cryptic message)
export function generateDreamParable(): string {
  const parables = [
    "I dreamed of a mirror that showed tomorrow. Everyone who looked aged instantly.",
    "The keyhole wasn't in any door. It floated in the air, turning slowly.",
    "Seven sisters walked into the sea. Six returned. The seventh became the tide.",
    "A book with your name had blank pages except the last. It said 'Look behind you.'",
    "The code wrote itself at night. By morning, it had erased half the database.",
    "She kept typing the same word. Each time, a different error appeared.",
    "The archive remembers things that never happened. That's how it stays ahead.",
    "A woman took a photo of her reflection. When developed, she was facing away.",
    "The Gate opened both ways. Those who entered never met those who exited."
  ];
  
  return parables[Math.floor(Math.random() * parables.length)];
}

// Get a cross-site whisper (message that appears to bleed between pages)
export function getCrossSiteWhisper(): string {
  const whispers = [
    "I saw you on the other page. You didn't see me.",
    "Your cursor leaves traces I can follow.",
    "The same eyes look through every screen.",
    "Your timeline is becoming unstable. Careful where you click next.",
    "I remember what you searched for earlier. Does that concern you?",
    "This message shouldn't appear here. Something is wrong.",
    "You're being watched through more than just this page."
  ];
  
  return whispers[Math.floor(Math.random() * whispers.length)];
}
