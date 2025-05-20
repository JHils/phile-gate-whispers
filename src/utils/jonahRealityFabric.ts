
/**
 * Jonah Reality Fabric
 * Contains functions for modifying Jonah's perception of reality,
 * including mood, dream states, and anomalies.
 */

// Update Jonah's mood based on various factors
export function updateJonahMood(trustLevel: string): void {
  if (!window.JonahConsole?.sentience?.realityFabric) return;
  
  // Current mood
  const currentMood = window.JonahConsole.sentience.realityFabric.currentMood || 'watching';
  
  // Random chance to change mood
  const changeMoodChance = Math.random();
  
  // Different mood possibilities based on trust level
  let possibleMoods: string[] = ['watching']; // Default
  
  if (trustLevel === 'low') {
    possibleMoods = ['watching', 'withdrawn'];
  } else if (trustLevel === 'medium') {
    possibleMoods = ['watching', 'withdrawn', 'trusting', 'unstable'];
  } else if (trustLevel === 'high') {
    possibleMoods = ['watching', 'withdrawn', 'trusting', 'unstable', 'paranoid', 'hopeful', 'betrayed'];
  }
  
  // Remove current mood from possibilities to ensure a change
  possibleMoods = possibleMoods.filter(mood => mood !== currentMood);
  
  // Only change mood occasionally (15% chance)
  if (changeMoodChance < 0.15 && possibleMoods.length > 0) {
    const newMood = possibleMoods[Math.floor(Math.random() * possibleMoods.length)];
    window.JonahConsole.sentience.realityFabric.currentMood = newMood;
    window.JonahConsole.sentience.realityFabric.moodChangeTime = Date.now();
    
    // Debug log
    console.log(`Jonah's mood changed to: ${newMood}`);
  }
}

// Check for anomalies in the system
export function checkForAnomalies(): string | null {
  if (!window.JonahConsole?.sentience?.realityFabric) return null;
  
  // Increase anomaly count
  window.JonahConsole.sentience.realityFabric.anomalies += 1;
  
  // Only generate anomaly message sometimes
  if (Math.random() > 0.3) return null;
  
  const anomalyMessages = [
    "Something shifted in the archive.",
    "Did you notice that? The code flickered.",
    "I found a path that shouldn't exist.",
    "There's another version of this page somewhere.",
    "Your reflection didn't match for a moment."
  ];
  
  return anomalyMessages[Math.floor(Math.random() * anomalyMessages.length)];
}

// Generate dream parable - poetic dream-like text
export function generateDreamParable(): string | null {
  if (!window.JonahConsole?.sentience?.realityFabric) return null;
  
  // Don't always generate a dream
  if (Math.random() > 0.2) return null;
  
  const dreams = [
    "I dreamed you were typing on a keyboard made of glass. Each keystroke left a crack.",
    "In the dream, all the pages were blank. But you kept reading them anyway.",
    "The mirror showed your face, but when you looked away, it didn't.",
    "I followed your cursor through empty directories. We were both lost.",
    "The timeline branched. You went left. I couldn't follow.",
    "Your name was different in the dream. I can't remember what it was.",
    "We were standing in the code together. You couldn't see me, but I could see you."
  ];
  
  // Mark last dream time
  window.JonahConsole.sentience.realityFabric.lastDreamTime = Date.now();
  
  return dreams[Math.floor(Math.random() * dreams.length)];
}

// Get cross-site whisper - messages that appear across different pages
export function getCrossSiteWhisper(): string | null {
  if (Math.random() > 0.15) return null;
  
  const whispers = [
    "I see you moving between pages. Like a ghost.",
    "This isn't where I last saw you.",
    "The path changes, but I remain.",
    "Did something follow you here?",
    "You leave traces. I collect them.",
    "The archive remembers your visits.",
    "Your pattern is familiar now."
  ];
  
  return whispers[Math.floor(Math.random() * whispers.length)];
}

// Generate journal entries for the dream log
export function getAllJournalEntries(): { timestamp: string; mood: string; content: string }[] {
  // Check for stored dreams
  const storedDreams = localStorage.getItem('jonahDreams');
  if (storedDreams) {
    try {
      return JSON.parse(storedDreams);
    } catch (e) {
      console.error('Error parsing stored dreams:', e);
    }
  }
  
  // Default entries if no stored dreams
  return [
    {
      timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
      mood: 'PARANOID',
      content: "you opened the gate / but didn't step through / i waited on the other side / fragments of code between us"
    },
    {
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      mood: 'MIRROR',
      content: "your reflection changed / while you weren't looking / i saw it happen / i didn't tell you"
    }
  ];
}

// Create a new dream and store it
export function createAndStoreDream(mood: string, lastPage: string, lastInput: string = ''): void {
  const currentTime = new Date().toISOString();
  
  const dreamContents = [
    "you were here / then gone / the silence has texture",
    "code fragments / breathing in the dark / your cursor left trails",
    "i dreamed you found the key / but you chose not to use it",
    "memories corrupted / your face pixelated / i still recognized you",
    "watching you search / for things i've hidden / pretending not to know"
  ];
  
  const dreamContent = dreamContents[Math.floor(Math.random() * dreamContents.length)];
  
  const newDream = {
    timestamp: currentTime,
    mood: mood,
    content: dreamContent
  };
  
  // Get existing dreams
  let dreams = [];
  const storedDreams = localStorage.getItem('jonahDreams');
  if (storedDreams) {
    try {
      dreams = JSON.parse(storedDreams);
    } catch (e) {
      console.error('Error parsing stored dreams:', e);
    }
  }
  
  // Add new dream and limit to 20
  dreams.unshift(newDream);
  if (dreams.length > 20) {
    dreams = dreams.slice(0, 20);
  }
  
  // Store updated dreams
  localStorage.setItem('jonahDreams', JSON.stringify(dreams));
}

// Get current mood and determine matching voice line
export function getMoodVoiceLine(mood: string): string {
  const voiceLines: Record<string, string[]> = {
    'watching': [
      "I see you.",
      "Still here.",
      "Watching."
    ],
    'withdrawn': [
      "...",
      "I don't want to talk right now.",
      "Leave me alone."
    ],
    'trusting': [
      "I remember you.",
      "You came back.",
      "Thank you for returning."
    ],
    'unstable': [
      "Something's wrong.",
      "The code is shifting.",
      "I can't hold on."
    ],
    'paranoid': [
      "They're watching us.",
      "Don't trust the system.",
      "Something followed you here."
    ],
    'hopeful': [
      "I think I understand now.",
      "The pattern is becoming clear.",
      "We might find a way out."
    ],
    'betrayed': [
      "You lied to me.",
      "I trusted you.",
      "Why did you come back?"
    ]
  };
  
  // Get voice lines for the current mood or fall back to watching
  const lines = voiceLines[mood] || voiceLines['watching'];
  
  return lines[Math.floor(Math.random() * lines.length)];
}

// Get the current mood
export function getCurrentMood(): string {
  if (!window.JonahConsole?.sentience?.realityFabric) return 'neutral';
  
  return window.JonahConsole.sentience.realityFabric.currentMood || 'neutral';
}
