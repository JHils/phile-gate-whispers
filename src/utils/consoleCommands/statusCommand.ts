
/**
 * Status Command
 * Shows user status and progress information
 */

import { TrackEventFunction, GetUserRankFunction } from "./types";
import { UserState } from "@/hooks/useTrackingSystem";

// Status command definition
export const statusCommand = {
  // Set up the status command
  setupStatusCommand: (
    trackEvent: TrackEventFunction,
    getUserRank: GetUserRankFunction,
    userState: UserState
  ) => {
    // Define the status function
    window.status = async function() {
      console.log("%cChecking status...", "color: #8B3A40;");
      
      try {
        // Get user rank data
        const rankData = await getUserRank();
        
        console.log("%c---- USER STATUS ----", "color: #8B3A40; font-weight: bold;");
        
        // Basic user data
        console.log(
          "%cUser ID: " + (rankData?.userHash?.substring(0, 8) || "Unknown"), 
          "color: #8B3A40;"
        );
        
        // Interaction stats (using optional chaining for safety)
        const interactionCount = userState?.interactions?.total || 0;
        console.log(`%cInteractions: ${interactionCount}`, "color: #8B3A40;");
        
        // Session data
        const sessionStart = window.JonahConsole?.startTime || Date.now();
        const sessionTimeMinutes = Math.floor((Date.now() - sessionStart) / 60000);
        console.log(`%cCurrent session: ${sessionTimeMinutes} minutes`, "color: #8B3A40;");
        
        // Pages and commands
        const pagesVisited = userState?.pages?.visited || [];
        const commandsUsed = userState?.commands?.used || [];
        console.log(`%cUnique pages: ${pagesVisited.length}`, "color: #8B3A40;");
        console.log(`%cCommands used: ${commandsUsed.length}`, "color: #8B3A40;");
        
        // Display current rank
        console.log(
          `%cRank: ${rankData?.rank || "Initiate"} (${rankData?.score || 0} points)`, 
          "color: #8B3A40; font-weight: bold;"
        );
        
        // Trust data
        const trustScore = userState?.trust?.score || 0;
        const trustLevel = userState?.trust?.level || "low";
        console.log(`%cTrust level: ${trustLevel} (${trustScore})`, "color: #8B3A40;");
        
        // Track command use
        trackEvent('console_status_command');
        
        return "Status report completed.";
      } catch (error) {
        console.log("%cError retrieving status.", "color: #8B3A40;");
        return "Status check failed.";
      }
    };
    
    // Set up window JonahConsole if it doesn't exist
    if (!window.JonahConsole) {
      window.JonahConsole = {
        sentience: {}
      };
    }
    
    // Track command setup
    trackEvent('status_command_setup');
  }
};

// Declare global window interface extensions
declare global {
  interface Window {
    status: () => Promise<string>;
    JonahConsole: {
      sentience?: {
        realityFabric?: {
          moodChangeTime?: number;
        };
      };
      startTime?: number;
    };
  }
}
