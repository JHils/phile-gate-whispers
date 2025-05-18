
// Track a command execution in the system
export const trackCommand = (commandName: string) => {
  // Make sure the JonahConsole is initialized
  if (!window.JonahConsole) {
    window.JonahConsole = {
      usedCommands: [],
      score: 0,
      failCount: 0,
      rank: 'drifter',
      sessionStartTime: Date.now(),
      whispersFound: [],
      jokesDisplayed: [],
      storyFlags: [],
      bookCodes: [],
      lastCommand: commandName,
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
  } else {
    // Store the last command
    window.JonahConsole.lastCommand = commandName;
  }

  // Track this command if it hasn't been used before
  if (!window.JonahConsole.usedCommands.includes(commandName)) {
    window.JonahConsole.usedCommands.push(commandName);
    
    // Save to localStorage for persistence
    localStorage.setItem('usedCommands', JSON.stringify(window.JonahConsole.usedCommands));
    
    // Award points for discovering a new command
    window.JonahConsole.score += 10;
    localStorage.setItem('phileScore', window.JonahConsole.score.toString());
  }
  
  // Update last interaction time
  if (window.JonahConsole.argData) {
    window.JonahConsole.argData.lastInteractionTime = new Date();
  }
  
  console.log(`Command executed: ${commandName}`);
};
