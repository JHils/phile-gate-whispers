
/**
 * Console Tracking Utilities
 * Used to track console interactions and commands
 */

// Initialize console tracking
export function initializeConsoleTracking(): void {
  if (typeof window === 'undefined') return;
  
  if (!window.JonahConsole) {
    window.JonahConsole = {
      usedCommands: [],
      score: 0,
      failCount: 0,
      rank: "drifter",
      whispersFound: [],
      jokesDisplayed: [],
      storyFlags: [],
      bookCodes: [],
      simba: {
        encountered: false
      }
    };
  }
  
  // Load saved commands
  const savedCommands = localStorage.getItem('jonahUsedCommands');
  if (savedCommands) {
    try {
      window.JonahConsole.usedCommands = JSON.parse(savedCommands);
    } catch (e) {
      console.error('Error loading saved commands:', e);
    }
  }
  
  // Initialize tracking events
  trackUserInteractions();
}

// Track user interactions
function trackUserInteractions(): void {
  if (typeof window === 'undefined') return;
  
  // Last interaction time
  let lastInteractionTime = Date.now();
  
  // Listen for user interactions
  const trackInteraction = () => {
    lastInteractionTime = Date.now();
    
    // Update in argData if it exists
    if (window.JonahConsole?.argData) {
      window.JonahConsole.argData.lastInteractionTime = new Date();
    }
  };
  
  // Add event listeners
  window.addEventListener('mousemove', trackInteraction);
  window.addEventListener('keydown', trackInteraction);
  window.addEventListener('mousedown', trackInteraction);
  window.addEventListener('scroll', trackInteraction);
  
  // Set up idle tracking
  setInterval(() => {
    const idleTime = Date.now() - lastInteractionTime;
    
    // If idle for more than 2 minutes
    if (idleTime > 2 * 60 * 1000) {
      // Update idle time in argData if it exists
      if (window.JonahConsole?.argData && !window.JonahConsole.argData.lastIdleTime) {
        window.JonahConsole.argData.lastIdleTime = new Date();
      }
      
      // Update session idle time if it exists
      if (window.JonahConsole?.sentience?.sessionData) {
        window.JonahConsole.sentience.sessionData.idleTime += idleTime;
      }
    } else {
      // Reset last idle time
      if (window.JonahConsole?.argData) {
        window.JonahConsole.argData.lastIdleTime = undefined;
      }
    }
  }, 30000); // Check every 30 seconds
}

// Initialize interactive commands
export function initializeInteractiveCommands(): void {
  // This will be filled in with the actual interactive commands implementation
  console.log("Interactive commands initialized");
}

// Get current Jonah's mood
export function getCurrentMood(): string {
  if (!window.JonahConsole?.sentience?.realityFabric) return 'neutral';
  
  return window.JonahConsole.sentience.realityFabric.currentMood || 'neutral';
}

// Add a command to used commands
export function addUsedCommand(command: string): void {
  if (!window.JonahConsole) return;
  
  // Add to used commands if not already there
  if (!window.JonahConsole.usedCommands.includes(command)) {
    window.JonahConsole.usedCommands.push(command);
    
    // Save to localStorage
    localStorage.setItem('jonahUsedCommands', JSON.stringify(window.JonahConsole.usedCommands));
  }
}
