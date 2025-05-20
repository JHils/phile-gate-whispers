
/**
 * ARG Tracking System
 * For Alternate Reality Game elements
 */

import { typewriterLog, glitchEffectLog } from './consoleEffects';
import { trackCommand } from './consoleTrackingUtils';

// Initialize ARG tracking commands
export function initializeARGCommands(trackCommandExecution: (command: string) => void): void {
  if (typeof window !== 'undefined') {
    // Hidden memory command
    window.dreamJournal = function() {
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
    window.rememberMe = function() {
      trackCommandExecution('rememberMe');
      
      // Get current ARG data
      const argData = window.JonahConsole?.argData || {
        qrScans: [],
        memoryFragments: [],
        secretPagesVisited: []
      };
      
      const output = `
ARG PROGRESSION DATA:
===================
QR codes found: ${argData.qrScans.length || 0}/12
Memory fragments: ${argData.memoryFragments.length || 0}/8
Secret pages: ${argData.secretPagesVisited.length || 0}/5
Console clue touchpoints: ${argData.consoleCluesTouched?.length || 0}/10
`;
      
      typewriterLog(output);
      return argData;
    };
    
    // Bridge to whispers system
    window.whisperTree = function() {
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
