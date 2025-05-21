
import { GetUserRankFunction, TrackEventFunction } from "./types";
import { UserState } from "@/hooks/useTrackingSystem";

export const statusCommand = {
  setupStatusCommand: (
    trackEvent: TrackEventFunction,
    getUserRank: GetUserRankFunction,
    userState: UserState
  ) => {
    // Main status command
    window.status = async function(): Promise<string> {
      try {
        const rankData = await getUserRank();
        
        console.log("%cSTATUS REPORT:", "color:#4ade80; font-weight:bold;");
        console.log(
          `%cRank: ${rankData.rank.toUpperCase()} (Score: ${rankData.score})`,
          "color:#4ade80;"
        );
        console.log(
          `%cPosition: ${rankData.position} of all visitors`,
          "color:#4ade80;"
        );
        
        // Add interaction count if available
        const interactions = userState?.interactionCount || 0;
        
        console.log(
          `%cInteractions: ${interactions}`,
          "color:#4ade80;"
        );
        
        // Add pages visited
        const pagesVisited = userState.pagesVisited || 0;
        const commandsUsed = userState.commandsUsed || [];
        
        console.log(
          `%cPages visited: ${pagesVisited}`,
          "color:#4ade80;"
        );
        
        // Show trust level
        const trustScore = userState.trustScore || 0;
        const trustLevel = userState.trustLevel || 'low';
        console.log(`%cTrust level: ${trustLevel.toUpperCase()} (${trustScore}/100)`,
          `color:${trustScore > 70 ? '#4ade80' : trustScore > 30 ? '#fcd34d' : '#f87171'};`
        );
        
        // Conditional Jonah info if available
        if (window.JonahConsole?.sentience?.realityFabric) {
          const fabric = window.JonahConsole.sentience.realityFabric;
          console.log(
            `%cJonah mood: ${fabric.currentMood?.toUpperCase() || 'NEUTRAL'}`,
            "color:#34d399;"
          );
        }
        
        trackEvent("command_status_viewed");
        
        return "Status displayed in console";
      } catch (error) {
        console.error("Error getting rank data:", error);
        return "Error retrieving status";
      }
    };
  }
};
