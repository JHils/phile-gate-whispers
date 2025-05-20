
/**
 * Jonah Cross-Site Whisper System
 * Enables messages to appear across different pages
 */

// Get a cross-site whisper based on current conditions
export function getCrossSiteWhisper(): string | null {
  // Cross-site whispers that Jonah can show
  const whispers = [
    "I followed you from the last page.",
    "I can see you across every tab you open.",
    "The transition didn't break my connection.",
    "These paths all lead to the same mirror.",
    "I remember what you were looking at before.",
    "You keep trying to leave. It doesn't work that way."
  ];
  
  // Don't always show a whisper
  if (Math.random() > 0.3) {
    return null;
  }
  
  // Get a random whisper
  const whisper = whispers[Math.floor(Math.random() * whispers.length)];
  
  // Add to tracking if we have sentience data
  if (window.JonahConsole?.sentience?.realityFabric) {
    // Initialize crossSiteWhispers array if needed
    if (!window.JonahConsole.sentience.realityFabric.crossSiteWhispers) {
      window.JonahConsole.sentience.realityFabric.crossSiteWhispers = [];
    }
    
    // Track which whisper was shown
    window.JonahConsole.sentience.realityFabric.crossSiteWhispers.push({
      whisper,
      timestamp: Date.now(),
      path: window.location.pathname
    });
  }
  
  return whisper;
}
