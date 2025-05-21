
/**
 * Jonah Cross-Site Whisper System
 * Allows Jonah to recognize users across different sites
 */

// Initialize the cross site whisper system
export function initializeCrossSiteWhisper() {
  // Ensure the sentience object exists
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience?.realityFabric) {
    // Initialize the crossSiteWhispers array if it doesn't exist
    if (!window.JonahConsole.sentience.realityFabric.crossSiteWhispers) {
      window.JonahConsole.sentience.realityFabric = {
        ...window.JonahConsole.sentience.realityFabric,
        crossSiteWhispers: [],
        anomalies: [] // Adding this property based on the error
      };
    }
  }
}

// Add a whisper to the system
export function addCrossSiteWhisper(whisperText: string): boolean {
  if (typeof window === 'undefined' || 
      !window.JonahConsole?.sentience?.realityFabric) {
    return false;
  }
  
  // Create the array if it doesn't exist
  if (!window.JonahConsole.sentience.realityFabric.crossSiteWhispers) {
    window.JonahConsole.sentience.realityFabric.crossSiteWhispers = [];
  }
  
  // Add the whisper
  window.JonahConsole.sentience.realityFabric.crossSiteWhispers.push(whisperText);
  return true;
}

// Get all cross site whispers
export function getAllCrossSiteWhispers(): string[] {
  if (typeof window === 'undefined' || 
      !window.JonahConsole?.sentience?.realityFabric?.crossSiteWhispers) {
    return [];
  }
  
  return window.JonahConsole.sentience.realityFabric.crossSiteWhispers;
}

// Check if a specific whisper exists
export function hasCrossSiteWhisper(whisperText: string): boolean {
  if (typeof window === 'undefined' || 
      !window.JonahConsole?.sentience?.realityFabric?.crossSiteWhispers) {
    return false;
  }
  
  return window.JonahConsole.sentience.realityFabric.crossSiteWhispers.includes(whisperText);
}

// Generate a whisper based on user behavior
export function generateCrossSiteWhisper(behavior: string): string {
  const whisperTemplates = {
    'frequent_visitor': [
      "You've been here before. I remember.",
      "Your patterns are familiar to me.",
      "We've met in another place, haven't we?"
    ],
    'deep_explorer': [
      "You dig deeper than most.",
      "Few look where you've looked.",
      "You're searching for something specific."
    ],
    'returning_after_long_time': [
      "It's been a while since I've seen you.",
      "You were gone for so long.",
      "I wondered if you'd come back."
    ]
  };
  
  // Get appropriate templates
  const templates = whisperTemplates[behavior as keyof typeof whisperTemplates] || 
                   whisperTemplates['frequent_visitor'];
  
  // Select a random template
  const whisper = templates[Math.floor(Math.random() * templates.length)];
  
  // Store the whisper
  addCrossSiteWhisper(whisper);
  
  return whisper;
}

// Get a random whisper from the collection
export function getRandomCrossSiteWhisper(): string | null {
  const whispers = getAllCrossSiteWhispers();
  
  if (!whispers || whispers.length === 0) {
    return null;
  }
  
  return whispers[Math.floor(Math.random() * whispers.length)];
}
