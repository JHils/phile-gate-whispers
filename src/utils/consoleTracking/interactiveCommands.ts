
/**
 * Interactive Commands
 * Functions for initializing basic interactive commands
 */

import { typewriterLog } from '../consoleEffects';
import { addUsedCommand } from './commandTracking';

/**
 * Initialize interactive commands
 */
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
