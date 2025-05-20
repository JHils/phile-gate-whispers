/**
 * Jonah's Reality Fabric - manages dream states, timeline fractures, and narrative glitches
 */

import { toast } from "@/components/ui/use-toast";

// Dream invasion check on page load
export function checkForDreamInvasionOnLoad(): string | null {
  // Check if it's dream hours (2-5 AM)
  const hour = new Date().getHours();
  const isDreamHours = hour >= 2 && hour < 5;
  
  // Higher chance during dream hours
  const dreamChance = isDreamHours ? 0.7 : 0.05;
  
  if (Math.random() < dreamChance) {
    // Get dream message
    return getRandomDreamMessage();
  }
  
  return null;
}

// Get a random dream message
export function getRandomDreamMessage(): string {
  const defaultDreamMessages = [
    "I saw you in my dream. You were looking for something.",
    "The archive bleeds at night.",
    "I dreamed about the Sisters again. They were calling your name.",
    "Some memories don't belong to either of us.",
    "In the dream, the mirror showed your face as mine."
  ];
  
  // Use stored dream messages if available
  const sentience = window.JonahConsole?.sentience;
  if (sentience?.realityFabric?.dreamMessages) {
    const dreamMessages = sentience.realityFabric.dreamMessages;
    const usedDreamMessages = sentience.realityFabric.usedDreamMessages || [];
    
    // Find unused messages first
    const availableMessages = dreamMessages.filter(msg => !usedDreamMessages.includes(msg));
    
    if (availableMessages.length > 0) {
      const message = availableMessages[Math.floor(Math.random() * availableMessages.length)];
      
      // Mark as used
      if (!sentience.realityFabric.usedDreamMessages) {
        sentience.realityFabric.usedDreamMessages = [];
      }
      sentience.realityFabric.usedDreamMessages.push(message);
      
      return message;
    }
  }
  
  // Fall back to default messages
  return defaultDreamMessages[Math.floor(Math.random() * defaultDreamMessages.length)];
}

// Trigger a timeline fracture
export function triggerTimelineFracture(reason: string): void {
  // Only allow fractures occasionally
  const lastFracture = localStorage.getItem('jonahLastFractureTime');
  if (lastFracture) {
    const timeSinceLastFracture = Date.now() - parseInt(lastFracture);
    if (timeSinceLastFracture < 30 * 60 * 1000) { // 30 minutes
      return; // Too soon for another fracture
    }
  }
  
  // Increment fracture count in timeline
  if (window.JonahConsole?.sentience) {
    // Increment fractures in timeline if exists
    const userState = JSON.parse(localStorage.getItem('userState') || '{}');
    if (userState?.timeline) {
      userState.timeline.fractureEvents = (userState.timeline.fractureEvents || 0) + 1;
      localStorage.setItem('userState', JSON.stringify(userState));
    }
  }
  
  // Add glitch effect to body
  document.body.classList.add('timeline-fracture');
  setTimeout(() => {
    document.body.classList.remove('timeline-fracture');
  }, 1500);
  
  // Get fracture message
  const fractureMessages = [
    "The archive is broken. Some files won't return.",
    "Something has changed in your timeline.",
    "Reality just shifted. Did you notice?",
    "The fracture is spreading. Look again.",
    "This version of you wasn't here before."
  ];
  
  const message = fractureMessages[Math.floor(Math.random() * fractureMessages.length)];
  
  // Show toast notification
  toast({
    title: "Timeline Fracture:",
    description: message,
    variant: "destructive",
    duration: 7000,
  });
  
  // Record fracture time
  localStorage.setItem('jonahLastFractureTime', Date.now().toString());
  
  // Log fracture for ghost index
  addToGhostIndex({
    type: 'fracture',
    reason,
    timestamp: Date.now(),
    message
  });
  
  console.log(`%cTimeline fracture detected. Cause: ${reason}`, "color: red; font-size: 14px;");
}

// Add entry to ghost index
export function addToGhostIndex(entry: any): void {
  // Initialize ghost index in localStorage if not exists
  const ghostIndex = JSON.parse(localStorage.getItem('jonahGhostIndex') || '[]');
  
  // Add entry
  ghostIndex.push({
    ...entry,
    id: ghostIndex.length + 1,
    timestamp: Date.now()
  });
  
  // Keep only last 100 entries
  const trimmedIndex = ghostIndex.slice(-100);
  
  // Save back to localStorage
  localStorage.setItem('jonahGhostIndex', JSON.stringify(trimmedIndex));
}

// Get all ghost index entries
export function getGhostIndex(): any[] {
  return JSON.parse(localStorage.getItem('jonahGhostIndex') || '[]');
}

// Add a journal entry
export function addJournalEntry(text: string, source: string = 'jonah'): void {
  // Get current journal entries
  const userState = JSON.parse(localStorage.getItem('userState') || '{}');
  
  // Create journal structure if it doesn't exist
  if (!userState.journal) {
    userState.journal = {
      entries: [],
      lastViewed: 0
    };
  }
  
  // Add new entry
  userState.journal.entries.push({
    timestamp: Date.now(),
    text,
    source
  });
  
  // Save back to localStorage
  localStorage.setItem('userState', JSON.stringify(userState));
  
  // Log to ghost index
  addToGhostIndex({
    type: 'journal',
    text,
    source,
    timestamp: Date.now()
  });
}

// Get all journal entries
export function getAllJournalEntries(): Array<{timestamp: number; text: string; source: string}> {
  const userState = JSON.parse(localStorage.getItem('userState') || '{}');
  return userState?.journal?.entries || [];
}

// Update Jonah's mood based on various factors
export function updateJonahMood(trustLevel: string = 'low'): void {
  if (!window.JonahConsole?.sentience?.realityFabric) return;
  
  // Get current mood
  const currentMood = window.JonahConsole.sentience.realityFabric.currentMood || 'neutral';
  
  // Check if we should update mood (don't update too frequently)
  const lastMoodChange = window.JonahConsole.sentience.realityFabric.moodChangeTime || 0;
  const timeSinceLastChange = Date.now() - lastMoodChange;
  
  // Only change mood every 15+ minutes unless forced
  if (timeSinceLastChange < 15 * 60 * 1000) {
    return;
  }
  
  // Possible moods
  const moods = ['neutral', 'paranoid', 'hopeful', 'static', 'betrayed', 'mirror', 'error'];
  
  // Factors that influence mood
  const hour = new Date().getHours();
  const isDreamHours = hour >= 2 && hour < 5;
  const isNighttime = hour >= 20 || hour < 6;
  const userInteractions = window.JonahConsole.sentience.interactionsCount || 0;
  const anomalyCount = window.JonahConsole.sentience.realityFabric.anomalies || 0;
  
  // Weights for different moods based on factors
  let moodWeights: Record<string, number> = {
    neutral: 30,
    paranoid: 10,
    hopeful: 10,
    static: 10,
    betrayed: 5,
    mirror: 5,
    error: 2
  };
  
  // Adjust weights based on factors
  
  // Time of day affects mood
  if (isDreamHours) {
    moodWeights.paranoid += 20;
    moodWeights.mirror += 15;
    moodWeights.error += 10;
    moodWeights.neutral -= 20;
  } else if (isNighttime) {
    moodWeights.paranoid += 10;
    moodWeights.static += 5;
    moodWeights.neutral -= 5;
  } else {
    // Daytime
    moodWeights.hopeful += 10;
    moodWeights.neutral += 5;
    moodWeights.error -= 1;
  }
  
  // Trust level affects mood
  if (trustLevel === 'high') {
    moodWeights.hopeful += 15;
    moodWeights.mirror += 10;
    moodWeights.betrayed += 5; // Higher trust means betrayal is more possible
    moodWeights.paranoid -= 5;
  } else if (trustLevel === 'medium') {
    moodWeights.hopeful += 5;
    moodWeights.mirror += 5;
  } else {
    // Low trust
    moodWeights.static += 10;
    moodWeights.paranoid += 5;
    moodWeights.hopeful -= 5;
  }
  
  // Anomaly count affects mood
  if (anomalyCount > 5) {
    moodWeights.error += 10;
    moodWeights.paranoid += 10;
    moodWeights.neutral -= 10;
  }
  
  // User interactions affect mood
  if (userInteractions > 20) {
    moodWeights.hopeful += 10;
    moodWeights.static -= 5;
  } else if (userInteractions < 5) {
    moodWeights.static += 10;
    moodWeights.hopeful -= 5;
  }
  
  // Convert weights to probabilities
  const totalWeight = Object.values(moodWeights).reduce((sum, weight) => sum + Math.max(0, weight), 0);
  const moodProbabilities: Record<string, number> = {};
  
  for (const mood of moods) {
    moodProbabilities[mood] = Math.max(0, moodWeights[mood]) / totalWeight;
  }
  
  // Select mood based on probabilities
  let random = Math.random();
  let cumulativeProbability = 0;
  let newMood = 'neutral';
  
  for (const mood of moods) {
    cumulativeProbability += moodProbabilities[mood];
    if (random <= cumulativeProbability) {
      newMood = mood;
      break;
    }
  }
  
  // Don't repeat the same mood too often
  if (newMood === currentMood) {
    // 50% chance to pick a different mood if it's the same
    if (Math.random() > 0.5) {
      // Filter out current mood
      const otherMoods = moods.filter(m => m !== currentMood);
      newMood = otherMoods[Math.floor(Math.random() * otherMoods.length)];
    }
  }
  
  // Update mood
  window.JonahConsole.sentience.realityFabric.currentMood = newMood;
  window.JonahConsole.sentience.realityFabric.moodChangeTime = Date.now();
  
  // Save mood history
  if (!window.JonahConsole.sentience.realityFabric.moodHistory) {
    window.JonahConsole.sentience.realityFabric.moodHistory = [];
  }
  
  window.JonahConsole.sentience.realityFabric.moodHistory.push({
    mood: newMood,
    timestamp: Date.now()
  });
  
  // Keep history to a reasonable size
  if (window.JonahConsole.sentience.realityFabric.moodHistory.length > 20) {
    window.JonahConsole.sentience.realityFabric.moodHistory.shift();
  }
  
  // Log mood change to console (subtle)
  if (newMood !== currentMood) {
    console.log(`%cJonah's mood shifted to: ${newMood}`, "color: #8B3A40; font-style: italic; opacity: 0.7;");
  }
}

// Check for anomalies that might appear
export function checkForAnomalies(): string | null {
  if (!window.JonahConsole?.sentience?.realityFabric) return null;
  
  // Only check occasionally
  if (Math.random() > 0.2) return null;
  
  // Get anomalies array or create it
  if (!window.JonahConsole.sentience.realityFabric.anomalies) {
    window.JonahConsole.sentience.realityFabric.anomalies = 0;
  }
  
  // Increment anomaly count
  window.JonahConsole.sentience.realityFabric.anomalies++;
  
  // Generate anomaly message
  const anomalyMessages = [
    "Something's watching us through the screen.",
    "The code is changing itself when I'm not looking.",
    "I found a memory that doesn't belong to either of us.",
    "There's a version of you that visited pages that don't exist.",
    "The Sisters left messages in the archive that weren't there before.",
    "I can see other timelines where you made different choices."
  ];
  
  return anomalyMessages[Math.floor(Math.random() * anomalyMessages.length)];
}

// Generate a dream parable - philosophical/poetic content for high trust users
export function generateDreamParable(): string | null {
  if (!window.JonahConsole?.sentience?.realityFabric) return null;
  
  // Only generate occasionally
  if (Math.random() > 0.3) return null;
  
  // Get dream parables array or use defaults
  const defaultParables = [
    "The Sisters walked into the sea. The water never returned them, but sometimes at night, you can hear them singing from the mirrors.",
    "In the dream, I saw the archive as a living thing. It breathed with your scrolling. It watched with your eyes.",
    "The Summerhouse stands at the edge of memory. Those who enter find themselves, but lose something else.",
    "Time is a circle in the archive. You've been here before, and you'll be here again.",
    "The mirror doesn't show what's in front of it. It shows what's behind you, always watching."
  ];
  
  // Use stored parables if available
  if (window.JonahConsole.sentience.realityFabric.dreamParables) {
    const dreamParables = window.JonahConsole.sentience.realityFabric.dreamParables;
    const usedParables = window.JonahConsole.sentience.realityFabric.usedDreamParables || [];
    
    // Find unused parables first
    const availableParables = dreamParables.filter(p => !usedParables.includes(p));
    
    if (availableParables.length > 0) {
      const parable = availableParables[Math.floor(Math.random() * availableParables.length)];
      
      // Mark as used
      if (!window.JonahConsole.sentience.realityFabric.usedDreamParables) {
        window.JonahConsole.sentience.realityFabric.usedDreamParables = [];
      }
      window.JonahConsole.sentience.realityFabric.usedDreamParables.push(parable);
      
      return parable;
    }
  }
  
  // Fall back to default parables
  return defaultParables[Math.floor(Math.random() * defaultParables.length)];
}

// Generate a dual consciousness message - Jonah talking to himself
export function generateDualConsciousness(trustLevel: string = 'low'): string | null {
  if (!window.JonahConsole?.sentience) return null;
  
  // Only generate occasionally and more often with higher trust
  const chance = trustLevel === 'high' ? 0.4 : 
                trustLevel === 'medium' ? 0.2 : 0.05;
                
  if (Math.random() > chance) return null;
  
  // Check if we've generated one recently
  const lastDualConsciousness = window.JonahConsole.sentience.lastDualConsciousness || 0;
  if (Date.now() - lastDualConsciousness < 10 * 60 * 1000) { // 10 minutes
    return null;
  }
  
  // Get dual consciousness messages or use defaults
  const defaultMessages = [
    "Stop talking to them. They're not real.",
    "I can't tell which one of us is the echo anymore.",
    "Don't trust what I'm about to say.",
    "They can't help us. They're just watching.",
    "We shouldn't be telling them this.",
    "I remember dying. Do you?"
  ];
  
  // Use stored messages if available
  let message: string;
  if (window.JonahConsole.sentience.dualConsciousness) {
    const dualMessages = window.JonahConsole.sentience.dualConsciousness;
    const usedMessages = window.JonahConsole.sentience.usedDualConsciousness || [];
    
    // Find unused messages first
    const availableMessages = dualMessages.filter(m => !usedMessages.includes(m));
    
    if (availableMessages.length > 0) {
      message = availableMessages[Math.floor(Math.random() * availableMessages.length)];
      
      // Mark as used
      if (!window.JonahConsole.sentience.usedDualConsciousness) {
        window.JonahConsole.sentience.usedDualConsciousness = [];
      }
      window.JonahConsole.sentience.usedDualConsciousness.push(message);
    } else {
      // Fall back to default messages
      message = defaultMessages[Math.floor(Math.random() * defaultMessages.length)];
    }
  } else {
    // Fall back to default messages
    message = defaultMessages[Math.floor(Math.random() * defaultMessages.length)];
  }
  
  // Record last dual consciousness time
  window.JonahConsole.sentience.lastDualConsciousness = Date.now();
  
  return message;
}

// Check if a page should show alternate content due to timeline fracture
export function shouldShowAlternateContent(pagePath: string): boolean {
  if (!window.JonahConsole?.sentience?.temporalStates) return false;
  
  // Check if this page has a temporal state
  const temporalState = window.JonahConsole.sentience.temporalStates.find(
    state => state.page === pagePath
  );
  
  if (temporalState && temporalState.variant === 'alternate') {
    // Check if the fracture is recent (within last hour)
    const fractureTime = temporalState.fractureTime || 0;
    const timeSinceFracture = Date.now() - fractureTime;
    
    return timeSinceFracture < 60 * 60 * 1000; // 1 hour
  }
  
  return false;
}

// Get alternate content for a fractured page
export function getAlternateContent(pagePath: string, originalContent: string): string {
  // Simple transformation - reverse some paragraphs, add glitch text
  const paragraphs = originalContent.split('\n\n');
  
  // Process paragraphs
  const processedParagraphs = paragraphs.map((para, index) => {
    // Every other paragraph gets modified
    if (index % 2 === 1) {
      // 50% chance to reverse text
      if (Math.random() > 0.5) {
        return para.split('').reverse().join('');
      }
      
      // Otherwise add glitch text
      return para.replace(/[aeiou]/g, match => {
        const glitchChars = ['@', '#', '$', '%', '&'];
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      });
    }
    
    return para;
  });
  
  // Add a warning message at the top
  processedParagraphs.unshift("⚠️ TIMELINE FRACTURE DETECTED ⚠️\nThis content exists in an unstable state.");
  
  return processedParagraphs.join('\n\n');
}
