
/**
 * Console Tracking Utilities
 * Functions for tracking and managing console interactions
 */

import { typewriterLog } from './consoleEffects';

// Initialize console tracking
export function initializeConsoleTracking(): void {
  if (typeof window !== 'undefined' && !window.JonahConsole) {
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

// Initialize interactive commands
export function initializeInteractiveCommands(): void {
  if (typeof window !== 'undefined') {
    // Define the start command
    window.start = function() {
      // Set command as used
      addUsedCommand('start');
      
      typewriterLog(`
JONAS INTERACTIVE ARCHIVE v3.7.2
================================
Welcome to the interactive archive. I've been expecting you.

What would you like to know?

Type 'inventory()' to see what you've collected.
Type 'help()' for basic commands.
Type 'look_around()' to examine your surroundings.
`);
      
      return "Archive initialized.";
    };
    
    // Define the inventory command
    window.inventory = function() {
      // Set command as used
      addUsedCommand('inventory');
      
      // Get user's collected items and progress
      const storyFlags = window.JonahConsole?.storyFlags?.length || 0;
      const bookCodes = window.JonahConsole?.bookCodes?.length || 0;
      const whisperCount = window.JonahConsole?.whispersFound?.length || 0;
      const anomalies = window.JonahConsole?.sentience?.realityFabric?.anomalyCount || 0;
      
      typewriterLog(`
YOUR INVENTORY:
==============
Story flags: ${storyFlags}
Book codes: ${bookCodes}
Whispers heard: ${whisperCount}
Anomalies detected: ${anomalies}
Rank: ${window.JonahConsole?.rank || "drifter"}
`);
      
      return "Inventory checked.";
    };
    
    // Echo command
    window.echo_me = function(input: string) {
      addUsedCommand('echo_me');
      
      if (!input) {
        return "Echo requires input. Try echo_me('your message')";
      }
      
      typewriterLog(`
ECHO SYSTEM:
===========
${input}
${input}
${input.split('').reverse().join('')}
`);
      
      return "Echo complete.";
    };
    
    // Access journal command
    window.access_journal = function() {
      addUsedCommand('access_journal');
      
      if (!window.JonahConsole?.sentience?.realityFabric?.journal) {
        return "Journal not found.";
      }
      
      const journal = window.JonahConsole.sentience.realityFabric.journal;
      let journalOutput = `
JONAH'S JOURNAL:
==============
`;
      
      // Show the last 5 entries only
      const entries = journal.slice(-5);
      entries.forEach(entry => {
        const date = new Date(entry.timestamp).toLocaleDateString();
        journalOutput += `Entry #${entry.entryId} - ${date}\n${entry.content}\n\n`;
      });
      
      typewriterLog(journalOutput);
      
      return "Journal accessed.";
    };
  }
}

// Track a used command
export function addUsedCommand(command: string): void {
  if (window.JonahConsole) {
    if (!window.JonahConsole.usedCommands.includes(command)) {
      window.JonahConsole.usedCommands.push(command);
    }
    
    // Store the last command
    window.JonahConsole.lastCommand = command;
  }
}

// Check if a command has been used
export function hasUsedCommand(command: string): boolean {
  return window.JonahConsole?.usedCommands.includes(command) || false;
}

// Track a command execution
export function trackCommand(command: string): void {
  if (window.JonahConsole) {
    addUsedCommand(command);
  }
}

// Get current mood from sentience
export function getCurrentMood(): string {
  if (window.JonahConsole?.sentience?.realityFabric?.currentMood) {
    return window.JonahConsole.sentience.realityFabric.currentMood;
  }
  return 'watching'; // Default mood
}

// Set current mood
export function setCurrentMood(mood: string): void {
  if (window.JonahConsole?.sentience?.realityFabric) {
    window.JonahConsole.sentience.realityFabric.currentMood = mood;
    window.JonahConsole.sentience.realityFabric.moodChangeTime = Date.now();
    
    // Track mood history
    if (!window.JonahConsole.sentience.realityFabric.moodHistory) {
      window.JonahConsole.sentience.realityFabric.moodHistory = [];
    }
    
    window.JonahConsole.sentience.realityFabric.moodHistory.push({
      mood,
      timestamp: Date.now()
    });
  }
}
