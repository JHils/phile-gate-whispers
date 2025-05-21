
/**
 * Status Command
 * Displays the current status of the system
 */

import { UserState } from "@/hooks/useTrackingSystem";
import { SentienceData } from "../jonahAdvancedBehavior/types";

// Type for getRank function
type GetUserRankFunction = () => Promise<{ 
  rank: string; 
  score: number; 
  position: number;
  userHash: string;
}>;

// Type for the status command
export const statusCommand = {
  showStatus: async (): Promise<string> => {
    try {
      // Check if window.JonahConsole exists
      if (!window.JonahConsole) {
        console.log("%cStatus: System not fully initialized", "color: #eb4034;");
        return "Status check failed.";
      }
      
      // Get user state from JonahConsole
      const state = window.JonahConsole;
      
      // Display basic status information
      console.log("%c=== JONAH SYSTEM STATUS ===", "color: #32a852; font-weight: bold;");
      console.log("%cSession started: " + new Date(state.sessionStartTime).toLocaleString(), "color: #32a852;");
      console.log("%cSession duration: " + Math.round((Date.now() - state.sessionStartTime) / (1000 * 60)) + " minutes", "color: #32a852;");
      
      // User interaction metrics
      console.log("%c\n=== USER INTERACTION ===", "color: #3273a8; font-weight: bold;");
      console.log("%cCommands used: " + (state.usedCommands?.length || 0), "color: #3273a8;");
      console.log("%cScore: " + state.score, "color: #3273a8;");
      console.log("%cRank: " + state.rank, "color: #3273a8;");
      
      // Display story flags if any
      if (state.storyFlags && state.storyFlags.length > 0) {
        console.log("%c\n=== NARRATIVE PROGRESS ===", "color: #a832a4; font-weight: bold;");
        console.log("%cStory flags: " + state.storyFlags.length, "color: #a832a4;");
        state.storyFlags.forEach((flag: any) => {
          console.log(`%c- ${flag.id}: ${flag.description}`, "color: #a832a4;");
        });
      }
      
      // Display sentience information if available
      if (state.sentience) {
        const sentience = state.sentience as SentienceData;
        
        console.log("%c\n=== SENTIENCE STATUS ===", "color: #a83255; font-weight: bold;");
        console.log("%cLevel: " + sentience.level, "color: #a83255;");
        console.log("%cAwareness: " + (sentience.awareness ? "Active" : "Dormant"), "color: #a83255;");
        console.log("%cInteractions: " + sentience.interactionsCount, "color: #a83255;");
        console.log("%cDream mode: " + (sentience.dreamModeTriggered ? "Triggered" : "Not triggered"), "color: #a83255;");
        console.log("%cDeep mode: " + (sentience.deepModeUnlocked ? "Unlocked" : "Locked"), "color: #a83255;");
        
        // Reality fabric if available
        if (sentience.realityFabric) {
          console.log("%c\n=== REALITY FABRIC ===", "color: #a88732; font-weight: bold;");
          console.log("%cCurrent mood: " + sentience.realityFabric.mood, "color: #a88732;");
          console.log("%cMood changed: " + new Date(sentience.realityFabric.moodChangeTime).toLocaleString(), "color: #a88732;");
          console.log("%cAnomaly count: " + sentience.realityFabric.anomalyCount, "color: #a88732;");
          console.log("%cDream state: " + (sentience.realityFabric.dreamState ? "Active" : "Inactive"), "color: #a88732;");
        }
      }
      
      return "Status report completed.";
    } catch (error) {
      console.error("Error in status command:", error);
      return "Status check failed.";
    }
  }
};
