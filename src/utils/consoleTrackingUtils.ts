
/**
 * Console tracking utilities for initializing and managing JonahConsole state
 */

// Initialize console tracking object
export function initializeConsoleTracking() {
  if (!window.JonahConsole) {
    window.JonahConsole = {
      usedCommands: [],
      score: parseInt(localStorage.getItem('phileScore') || '0'),
      failCount: 0,
      rank: localStorage.getItem('phileRank') || "drifter",
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
        lastInteractionTime: new Date(),
        lastIdleTime: undefined
      }
    };
  }
}

// Format session time for display
export function formatSessionTime(): string {
  if (!window.JonahConsole) return "00:00:00";
  
  const elapsed = Math.floor((Date.now() - window.JonahConsole.sessionStartTime) / 1000);
  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = elapsed % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Add a console command to the used commands list
export function addUsedCommand(commandName: string): void {
  if (window.JonahConsole && !window.JonahConsole.usedCommands.includes(commandName)) {
    window.JonahConsole.usedCommands.push(commandName);
  }
}

// Get all discovered commands
export function getDiscoveredCommands(): string[] {
  if (!window.JonahConsole) return [];
  return window.JonahConsole.usedCommands;
}

// Record special events
export function recordSpecialEvent(eventType: string, eventData: any): void {
  if (!window.JonahConsole) return;
  
  // Handle different types of special events
  switch (eventType) {
    case 'keyhole':
      window.JonahConsole.argData.keyholeClicks++;
      break;
    case 'whisper':
      if (!window.JonahConsole.whispersFound.includes(eventData)) {
        window.JonahConsole.whispersFound.push(eventData);
      }
      break;
    case 'secretPage':
      if (!window.JonahConsole.argData.secretPagesVisited.includes(eventData)) {
        window.JonahConsole.argData.secretPagesVisited.push(eventData);
      }
      break;
    case 'memoryFragment':
      if (!window.JonahConsole.argData.memoryFragments.includes(eventData)) {
        window.JonahConsole.argData.memoryFragments.push(eventData);
      }
      break;
  }
}
