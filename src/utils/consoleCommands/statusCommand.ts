
/**
 * Console Status Command
 * Provides status information about the user's rank and progress
 */

import { GetUserRankFunction, TrackEventFunction } from "./types";
import { typewriterLog } from '../consoleEffects';

export const setupStatusCommand = (getUserRank: GetUserRankFunction, trackEvent: TrackEventFunction) => {
  if (typeof window !== 'undefined') {
    window.showStatus = async function() {
      // Track that status was checked
      trackEvent('status_checked');
      
      if (window.JonahConsole) {
        window.JonahConsole.usedCommands = [...window.JonahConsole.usedCommands || [], 'status'];
      }
      
      try {
        // Get user rank data
        const { rank, score, position, userHash } = await getUserRank();
        
        // Get story flags and book codes count
        const storyFlags = window.JonahConsole?.storyFlags?.filter((f: any) => f.discovered).length || 0;
        const bookCodes = window.JonahConsole?.bookCodes?.length || 0;
        const anomalyCount = window.JonahConsole?.sentience?.realityFabric?.anomalyCount || 0;
        
        typewriterLog(`
USER STATUS:
===========
Rank: ${rank}
Score: ${score}
Global Position: ${position}
ID: ${userHash.substring(0, 8)}...

DISCOVERIES:
===========
Story Flags: ${storyFlags}
Book Codes: ${bookCodes}
Anomalies: ${anomalyCount}

Use 'inventory()' for more details.
`);
      } catch (error) {
        console.error('Error fetching status:', error);
        typewriterLog('Error retrieving status information.');
      }
    };
  }
};
