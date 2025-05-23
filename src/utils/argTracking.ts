
/**
 * ARG Tracking System
 * For Alternate Reality Game elements
 */

import { typewriterLog, glitchEffectLog } from './consoleEffects';
import { trackCommand } from './consoleTracking/commandTracking';

// Import centralized types
import './types/globalConsoleTypes';

// Initialize ARG tracking commands
export function initializeARGCommands(trackCommandExecution: (command: string) => void): void {
  if (typeof window !== 'undefined') {
    // Hidden memory command
    window.dreamJournal = function(): string {
      trackCommandExecution('dreamJournal');
      
      const journal = `
DREAM FRAGMENTS:
==============
#137: Magnetic Island, eastern shore. The ferry never came back.
#245: Mirror tunnel stretching infinitely. My reflection moves independently.
#389: The Gate's architecture shifts when not directly observed.
#421: Joseph asked me to check the console. Numbers don't match.
#517: Timeline instability detected in sector 7G. Request denied.
`;
      
      glitchEffectLog(journal);
      return "Dream fragments recovered. Unstable memory patterns detected.";
    };
    
    // QR code tracking
    window.rememberMe = function(): Record<string, any> {
      trackCommandExecution('rememberMe');
      
      // Get current ARG data and ensure it exists
      if (!window.JonahConsole) {
        return { error: "Console system not initialized." };
      }
      
      if (!window.JonahConsole.argData) {
        window.JonahConsole.argData = {
          keyholeClicks: 0,
          consoleCluesTouched: [],
          qrScans: [],
          memoryFragments: [],
          secretPagesVisited: [],
          hiddenFilesDownloaded: [],
          idleTriggers: {},
          lastInteractionTime: new Date()
        };
      }
      
      // Ensure consoleCluesTouched exists
      if (!window.JonahConsole.argData.consoleCluesTouched) {
        window.JonahConsole.argData.consoleCluesTouched = [];
      }
      
      const argData = window.JonahConsole.argData;
      
      const output = `
ARG PROGRESSION DATA:
===================
QR codes found: ${argData.qrScans.length || 0}/12
Memory fragments: ${argData.memoryFragments.length || 0}/8
Secret pages: ${argData.secretPagesVisited.length || 0}/5
Console clue touchpoints: ${argData.consoleCluesTouched.length || 0}/10
`;
      
      typewriterLog(output);
      return argData;
    };
    
    // Bridge to whispers system
    window.whisperTree = function(): string {
      trackCommandExecution('whisperTree');
      
      const whispers = window.JonahConsole?.whispersFound || [];
      let output = `
WHISPER NETWORK ACCESS:
=====================
${whispers.length} whispers collected.
`;
      
      if (whispers.length > 0) {
        output += "\nLast whisper heard:\n";
        output += whispers[whispers.length - 1];
      } else {
        output += "\nNo whispers collected yet. Listen more carefully.";
      }
      
      typewriterLog(output);
      return "Whisper network accessed.";
    };
  }
}
