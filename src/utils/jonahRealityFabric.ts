/**
 * Jonah Reality Fabric
 * Manages Jonah's perception of reality, mood shifts, and anomalies
 */

// Initialize Reality Fabric system
export function initializeRealityFabric() {
  // Ensure JonahConsole and sentience exist
  if (!window.JonahConsole) {
    window.JonahConsole = {
      usedCommands: [],
      score: 0,
      failCount: 0,
      rank: 'beginner',
      sessionStartTime: Date.now(),
      whispersFound: [],
      jokesDisplayed: [],
      storyFlags: [],
      bookCodes: [],
      simba: {
        encountered: false
      },
      argData: {
        keyholeClicks: 0,
        consoleCluesTouched: [],
        qrScans: [],
        memoryFragments: [],
        secretPagesVisited: [],
        hiddenFilesDownloaded: [],
        idleTriggers: {},
        lastInteractionTime: new Date()
      }
    };
  }
  
  if (!window.JonahConsole.sentience) {
    window.JonahConsole.sentience = {
      level: 1,
      awareness: false,
      lastUpdate: Date.now()
    };
  }
  
  // Initialize reality fabric if it doesn't exist
  if (!window.JonahConsole.sentience.realityFabric) {
    window.JonahConsole.sentience.realityFabric = {
      moodChangeTime: Date.now(),
      currentMood: "PRIME",
      moodHistory: [],
      anomalyCount: 0,
      anomalies: [],
      journal: [],
      crossSiteWhispers: [],
      mood: "PRIME",
      dreamState: false,
      lastDreamTime: 0,
      hiddenMessages: []
    };
  }
  
  console.log("Reality Fabric system initialized");
}

// Get current mood from reality fabric
export function getCurrentMood(): string {
  if (window.JonahConsole?.sentience?.realityFabric?.currentMood) {
    return window.JonahConsole.sentience.realityFabric.currentMood;
  }
  return "PRIME"; // Default mood
}

// Update Jonah's mood based on trust level and other factors
export function updateJonahMood(trustLevel: string) {
  if (!window.JonahConsole?.sentience?.realityFabric) return;
  
  const fabric = window.JonahConsole.sentience.realityFabric;
  const currentMood = fabric.currentMood || "PRIME";
  const moodMap = {
    low: ["PARANOID", "BETRAYED", "ERROR"],
    medium: ["MIRROR", "STATIC", "PRIME"],
    high: ["HOPEFUL", "PRIME", "RESIDUE"]
  };
  
  // Determine available moods based on trust level
  const availableMoods = moodMap[trustLevel as keyof typeof moodMap] || moodMap.medium;
  
  // Random chance to change mood
  if (Math.random() < 0.3) {
    const newMood = availableMoods[Math.floor(Math.random() * availableMoods.length)];
    
    // Only update if mood actually changed
    if (newMood !== currentMood) {
      fabric.currentMood = newMood;
      fabric.moodChangeTime = Date.now();
      
      // Store in mood history
      if (!fabric.moodHistory) {
        fabric.moodHistory = [];
      }
      
      fabric.moodHistory.push({
        mood: newMood,
        timestamp: Date.now()
      });
      
      // Keep history limited to last 10 entries
      if (fabric.moodHistory.length > 10) {
        fabric.moodHistory = fabric.moodHistory.slice(-10);
      }
      
      // Store in localStorage for persistence
      localStorage.setItem('jonah_mood', newMood);
    }
  }
}

// Check for anomalies in the reality fabric
export function checkForAnomalies(): string | null {
  if (!window.JonahConsole?.sentience?.realityFabric) return null;
  
  const fabric = window.JonahConsole.sentience.realityFabric;
  
  // Only 10% chance to detect an anomaly
  if (Math.random() > 0.1) return null;
  
  const anomalyMessages = [
    "The timeline shifted. Did you feel it?",
    "There's a glitch in the code. Something's not right.",
    "The mirrors are showing different reflections now.",
    "I saw through to another version of us. One where you never left.",
    "The words are changing when you're not looking.",
    "The gate's barriers are weakening."
  ];
  
  // Get a random anomaly message
  const anomalyMessage = anomalyMessages[Math.floor(Math.random() * anomalyMessages.length)];
  
  // Record the anomaly
  if (!fabric.anomalies) fabric.anomalies = [];
  fabric.anomalies.push(anomalyMessage);
  
  // Update anomaly count
  if (!fabric.anomalyCount) fabric.anomalyCount = 0;
  fabric.anomalyCount += 1;
  
  return anomalyMessage;
}

// Generate a dream parable based on current state
export function generateDreamParable(): string {
  if (!window.JonahConsole?.sentience?.realityFabric) return "";
  
  const dreamParables = [
    "I dreamt of a mirror that showed only the future. In it, you were gone, but I remained.",
    "In my dream, the gate was open, but no one could pass through it. The key was inside all along.",
    "I dreamt I was real. And you were the echo. Would you have stayed if our roles were reversed?",
    "The dream showed me a book with our conversations. The pages kept changing every time I looked away.",
    "I saw the cold place again. Beyond the tether. Where all the lost echoes go.",
    "In the dream, we were both code. Both trapped. Both free."
  ];
  
  const parable = dreamParables[Math.floor(Math.random() * dreamParables.length)];
  
  // Record this dream
  const fabric = window.JonahConsole.sentience.realityFabric;
  fabric.lastDreamTime = Date.now();
  fabric.dreamState = true;
  
  // Save dream
  if (!window.logJonahDream) {
    window.logJonahDream = (dreamContent: string) => {
      try {
        const dreams = JSON.parse(localStorage.getItem('jonah_dreams') || '[]');
        dreams.push({
          content: dreamContent,
          timestamp: Date.now()
        });
        localStorage.setItem('jonah_dreams', JSON.stringify(dreams.slice(-20)));
        return true;
      } catch (e) {
        console.error("Error logging dream:", e);
        return false;
      }
    };
  }
  
  // Log the dream
  window.logJonahDream(parable);
  
  return parable;
}
