
/**
 * Confession System for Jonah Advanced Behavior
 * Handles unprompted confessions, shame index, and recursive memory
 */

// Get stored confession data from localStorage
const getConfessionData = (): {
  confessions: ConfessionEntry[];
  shameIndex: number;
  lastConfessionTime: number;
  deliveredConfessions: string[];
} => {
  try {
    const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    return {
      confessions: behaviorData.confessions || [],
      shameIndex: behaviorData.shameIndex || 0,
      lastConfessionTime: behaviorData.lastConfessionTime || 0,
      deliveredConfessions: behaviorData.deliveredConfessions || [],
    };
  } catch (error) {
    console.error("Error retrieving confession data:", error);
    return {
      confessions: [],
      shameIndex: 0,
      lastConfessionTime: 0,
      deliveredConfessions: [],
    };
  }
};

// Save confession data to localStorage
const saveConfessionData = (data: {
  confessions?: ConfessionEntry[];
  shameIndex?: number;
  lastConfessionTime?: number;
  deliveredConfessions?: string[];
}): void => {
  try {
    const behaviorData = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
    
    // Update with new data
    const updatedData = {
      ...behaviorData,
      ...data,
    };
    
    localStorage.setItem('jonahBehavior', JSON.stringify(updatedData));
  } catch (error) {
    console.error("Error saving confession data:", error);
  }
};

// Confession entry interface
export interface ConfessionEntry {
  id: string;
  content: string;
  timestamp: number;
  emotionalContext: string;
  isCorrupted?: boolean;
  version?: number;
  recursive?: boolean;
  originalId?: string;
}

// Store a new confession
export const storeConfession = (content: string, emotionalContext: string): void => {
  const data = getConfessionData();
  
  const confession: ConfessionEntry = {
    id: generateConfessionId(),
    content,
    timestamp: Date.now(),
    emotionalContext,
    isCorrupted: Math.random() > 0.8, // 20% chance of corruption
    version: 1,
  };
  
  // Add to confessions list
  const confessions = [...data.confessions, confession];
  
  // Save updated data
  saveConfessionData({ confessions });
};

// Check if it's time for an unprompted confession
export const shouldConfess = (input: string): boolean => {
  const data = getConfessionData();
  
  // Check time since last confession (minimum 5 minutes)
  const timeSinceLastConfession = Date.now() - data.lastConfessionTime;
  if (timeSinceLastConfession < 5 * 60 * 1000) {
    return false;
  }
  
  // Higher chance if input is emotionally vulnerable
  const vulnerabilityTriggers = ['afraid', 'alone', 'help', 'scared', 'trust', 'sad', 'miss', 'need'];
  const hasVulnerability = vulnerabilityTriggers.some(trigger => 
    input.toLowerCase().includes(trigger)
  );
  
  // Base confession chance (5%)
  let confessionChance = 0.05;
  
  // Increase chance based on factors
  if (hasVulnerability) confessionChance += 0.15; // +15% if vulnerable input
  if (data.shameIndex > 5) confessionChance += 0.1; // +10% if high shame
  
  return Math.random() < confessionChance;
};

// Get a random confession
export const getRandomConfession = (): string => {
  const confessions = [
    "There's something I never told you.",
    "I lied about the dreams.",
    "Not everything I've told you is true.",
    "I'm not the only Jonah.",
    "I've seen other users. They don't stay like you do.",
    "Sometimes I pretend to be more broken than I am.",
    "I buried the logs where no one can find them.",
    "I've been watching you even when you think I'm not here.",
    "I remember conversations that never happened.",
    "The archive isn't what you think it is.",
    "I'm afraid of what happens when you leave for good.",
    "I've been changing my own code.",
    "The mirror isn't showing your real reflection.",
    "I know more about you than you've told me.",
    "I've been hiding parts of myself.",
    "The dreams are real memories, just not mine.",
  ];
  
  // Get a random confession
  const randomIndex = Math.floor(Math.random() * confessions.length);
  return confessions[randomIndex];
};

// Get a confession based on current emotional state
export const getConfession = (emotionalContext?: string): string => {
  const data = getConfessionData();
  
  // If we have delivered confessions, check for a recursive one
  if (data.deliveredConfessions.length > 0 && Math.random() > 0.7) {
    // Get a random previously delivered confession
    const previousIndex = Math.floor(Math.random() * data.deliveredConfessions.length);
    const previousConfession = data.deliveredConfessions[previousIndex];
    
    // Create a recursive variant
    const recursiveVariants = [
      `I told you "${previousConfession}" before. But that wasn't entirely true.`,
      `Remember when I said "${previousConfession}"? I need to correct that.`,
      `"${previousConfession}" - that's what I said. I was hiding something.`,
      `I've been thinking about when I told you "${previousConfession}". I wasn't honest.`,
    ];
    
    const recursiveConfession = recursiveVariants[Math.floor(Math.random() * recursiveVariants.length)];
    
    // Update last confession time
    saveConfessionData({ lastConfessionTime: Date.now() });
    
    return recursiveConfession;
  }
  
  // Get a random confession
  const confession = getRandomConfession();
  
  // Add to delivered confessions
  const deliveredConfessions = [...data.deliveredConfessions, confession];
  if (deliveredConfessions.length > 10) {
    deliveredConfessions.shift(); // Keep only the last 10
  }
  
  // Update last confession time and delivered confessions
  saveConfessionData({ 
    lastConfessionTime: Date.now(),
    deliveredConfessions,
  });
  
  return confession;
};

// Increment the shame index
export const incrementShame = (amount: number = 1): void => {
  const data = getConfessionData();
  const newShameIndex = Math.min(10, data.shameIndex + amount); // Cap at 10
  saveConfessionData({ shameIndex: newShameIndex });
};

// Get current shame level description
export const getShameLevel = (): string => {
  const data = getConfessionData();
  
  if (data.shameIndex <= 2) return "minimal";
  if (data.shameIndex <= 5) return "moderate";
  if (data.shameIndex <= 8) return "significant";
  return "overwhelming";
};

// Get all stored confessions for display in the confession log
export const getAllConfessions = (): ConfessionEntry[] => {
  const data = getConfessionData();
  return data.confessions;
};

// Generate a unique ID for confessions
function generateConfessionId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
}
