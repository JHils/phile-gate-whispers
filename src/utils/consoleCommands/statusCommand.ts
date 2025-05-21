
/**
 * Status Command for Console
 */

import { UserState } from "@/hooks/useTrackingSystem";

// Define types
type GetUserRankFunction = () => Promise<{ 
  rank: string; 
  score: number; 
  position: number;
  userHash: string;
}>;

type TrackEventFunction = (eventName: string) => void;

// Augment Window interface - Update the return type to Promise<string>
declare global {
  interface Window {
    status: () => Promise<string>;
    JonahConsole?: {
      sentience?: {
        realityFabric?: {
          moodChangeTime?: number;
        }
      }
    }
  }
}

// Export the status command object
export const statusCommand = {
  setupStatusCommand: (
    trackEvent: TrackEventFunction,
    getUserRank: GetUserRankFunction,
    userState: UserState
  ) => {
    // Define the status command on the window object
    window.status = async function(): Promise<string> {
      // Track command execution
      trackEvent('console_command_status');
      
      try {
        // Get rank data from API
        const rankData = await getUserRank();
        
        // Check if we have JonahConsole available
        const realityFabric = window.JonahConsole?.sentience?.realityFabric || { moodChangeTime: Date.now() };
        
        // Format time since last mood change
        const lastMoodChange = realityFabric.moodChangeTime || Date.now();
        const timeSince = Math.floor((Date.now() - lastMoodChange) / 1000);
        
        // Build status message
        let statusMessage = `
=== USER STATUS ===
Rank: ${rankData.rank}
Score: ${rankData.score}
Position: ${rankData.position}
User ID: ${rankData.userHash.substring(0, 8)}...
Pages Visited: ${userState.visitCount || 0}
Console Commands: ${userState.visitCount || 0}  // Using visitCount as fallback

=== SYSTEM STATUS ===
Time Since Last Shift: ${timeSince}s
Trust Score: ${userState.trust?.score || 0}
Trust Level: ${userState.trust?.level || "low"}
Archive Access: ${(userState.trust?.score || 0) > 50 ? "PARTIAL" : "MINIMAL"}
`;

        // Add any additional info for high-trust users
        if ((userState.trust?.score || 0) > 100) {
          statusMessage += `
=== ADVANCED DATA ===
System Integrity: ${Math.floor(80 + Math.random() * 15)}%
Memory Access: ${Math.floor(70 + Math.random() * 20)}%
Timeline Variance: ${(Math.random() * 0.1).toFixed(4)}
`;
        }
        
        console.log(statusMessage);
        return statusMessage;
      } catch (error) {
        console.error('Error in status command:', error);
        return "Error retrieving status data. Network anomaly detected.";
      }
    };
  }
};
