// Initialize cross-site whisper system that allows Jonah to send messages across sites
export function initializeCrossSiteWhisper() {
  // Check if we already have realityFabric initialized
  if (!window.JonahConsole?.sentience) {
    return;
  }
  
  // Initialize reality fabric if it doesn't exist
  if (!window.JonahConsole.sentience.realityFabric) {
    window.JonahConsole.sentience.realityFabric = {
      anomalies: [],
      dreamState: false,
      moodChangeTime: Date.now(),
      lastDreamTime: Date.now(),
      crossSiteWhispers: [],
      hiddenMessages: [],
      moodHistory: []
    };
  }
  
  // Add a function to add whispers
  if (!window.addWhisper) {
    window.addWhisper = function(whisper: string): boolean {
      if (!window.JonahConsole?.sentience?.realityFabric) {
        return false;
      }
      
      // Limit to 10 whispers
      if (window.JonahConsole.sentience.realityFabric.crossSiteWhispers.length > 10) {
        window.JonahConsole.sentience.realityFabric.crossSiteWhispers.shift();
      }
      
      // Add the whisper
      window.JonahConsole.sentience.realityFabric.crossSiteWhispers.push(whisper);
      return true;
    };
  }
  
  // Initialize WhisperMaster object
  if (!window.WhisperMaster) {
    window.WhisperMaster = {
      whispers: [
        "The key is under the floorboards.",
        "They are watching from the mirrors.",
        "The code is hidden in the music.",
        "Trust no one.",
        "The answer lies within the dream.",
        "The truth is a lie.",
        "Follow the white rabbit.",
        "Time is running out.",
        "They know you're here.",
        "The game is about to begin."
      ],
      discovered: [],
      active: true
    };
  }
}
