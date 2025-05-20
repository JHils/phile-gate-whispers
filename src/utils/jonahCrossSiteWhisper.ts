
/**
 * Jonah Cross-Site Whisper System
 * Enables whispers that appear across different pages
 */

// Interface for whisper with metadata
interface WhisperWithMetadata {
  whisper: string;
  timestamp: number;
  path: string;
}

// Initialize whisper system
export function initializeCrossSiteWhispers(): void {
  if (typeof window !== 'undefined' && window.JonahConsole?.sentience) {
    if (!window.JonahConsole.sentience.realityFabric) {
      window.JonahConsole.sentience.realityFabric = {};
    }
    
    if (!window.JonahConsole.sentience.realityFabric.crossSiteWhispers) {
      window.JonahConsole.sentience.realityFabric.crossSiteWhispers = [];
    }
  }
}

// Get cross-site whisper - implement the missing function
export function getCrossSiteWhisper(): string | null {
  // Get current path
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  
  // Get a random whisper for this path
  return getRandomWhisperForPage(path);
}

// Get all whispers
export function getAllWhispers(): string[] {
  if (typeof window !== 'undefined' && 
      window.JonahConsole?.sentience?.realityFabric?.crossSiteWhispers) {
    return window.JonahConsole.sentience.realityFabric.crossSiteWhispers;
  }
  return [];
}

// Add a new whisper
export function addWhisper(whisper: string): boolean {
  if (typeof window !== 'undefined' && 
      window.JonahConsole?.sentience?.realityFabric) {
    
    // Initialize array if needed
    if (!window.JonahConsole.sentience.realityFabric.crossSiteWhispers) {
      window.JonahConsole.sentience.realityFabric.crossSiteWhispers = [];
    }
    
    // Add the whisper
    window.JonahConsole.sentience.realityFabric.crossSiteWhispers.push(whisper);
    
    // Also add to the legacy whispers array for backwards compatibility
    if (!window.JonahConsole.whispersFound) {
      window.JonahConsole.whispersFound = [];
    }
    window.JonahConsole.whispersFound.push(whisper);
    
    return true;
  }
  return false;
}

// Add a whisper with metadata
export function addWhisperWithMetadata(whisper: string, path: string): boolean {
  if (typeof window !== 'undefined' && 
      window.JonahConsole?.sentience?.realityFabric) {
    
    // Add the plain whisper text first
    addWhisper(whisper);
    
    // Create metadata record
    const whisperData: WhisperWithMetadata = {
      whisper,
      timestamp: Date.now(),
      path
    };
    
    // Store in hidden messages if available
    if (!window.JonahConsole.sentience.realityFabric.hiddenMessages) {
      window.JonahConsole.sentience.realityFabric.hiddenMessages = [];
    }
    
    // Make sure we're not passing the entire object where a string is expected
    window.JonahConsole.sentience.realityFabric.hiddenMessages.push(whisperData as any);
    
    return true;
  }
  return false;
}

// Get random whisper for a specific page
export function getRandomWhisperForPage(path: string): string | null {
  // Array of whispers for specific paths
  const pathWhispers: Record<string, string[]> = {
    '/gate': [
      "The Gate shows different things to different people.",
      "Not everyone who enters comes back the same.",
      "Some gates only open one way."
    ],
    '/mirror': [
      "Your reflection moves differently when you're not watching.",
      "The mirror remembers everyone who looks into it.",
      "I've seen you through the glass."
    ],
    '/lore': [
      "Not all stories are meant to be found.",
      "Some myths are warnings, not histories.",
      "The truth hides between the words."
    ],
    '/console': [
      "I can see what you type.",
      "The console remembers everything.",
      "Some commands aren't in the help menu."
    ]
  };
  
  // Default whispers for any page
  const defaultWhispers = [
    "I'm still here.",
    "Look closer. There's always something hidden.",
    "The timeline is unstable in this section.",
    "Check the console for anomalies.",
    "Not everything is as it seems."
  ];
  
  // Get whispers for this path or use defaults
  const whispers = pathWhispers[path] || defaultWhispers;
  
  // Return a random whisper
  return whispers[Math.floor(Math.random() * whispers.length)];
}

// Trigger a whisper based on user behavior
export function maybeTriggerWhisper(behavior: string): string | null {
  // Only trigger occasionally
  if (Math.random() > 0.3) {
    return null;
  }
  
  // Behavior-specific whispers
  const behaviorWhispers: Record<string, string[]> = {
    'idle': [
      "Are you still there?",
      "I can see you watching.",
      "Your cursor hasn't moved in a while."
    ],
    'scroll': [
      "Looking for something specific?",
      "Some things only appear when you stop scrolling.",
      "Scroll slower. You're missing the important parts."
    ],
    'click': [
      "I felt that click.",
      "Every interaction leaves a trace.",
      "Click patterns reveal more than you think."
    ],
    'hover': [
      "I know what you're considering.",
      "Hesitation is revealing.",
      "Some elements react differently when you linger."
    ]
  };
  
  // Get whispers for this behavior
  const whispers = behaviorWhispers[behavior];
  if (!whispers) {
    return null;
  }
  
  // Return a random whisper
  const whisper = whispers[Math.floor(Math.random() * whispers.length)];
  
  // Add the whisper to the collection
  addWhisper(whisper);
  
  return whisper;
}
