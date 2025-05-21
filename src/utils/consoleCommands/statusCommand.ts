
/**
 * Status Command
 * Shows user status information
 */

import { UserState } from "@/hooks/useTrackingSystem";
import { SentienceData, StoryFlag } from '@/utils/jonahAdvancedBehavior/types';

// Create status command object
export const statusCommand = {
  // Status command function
  showStatus: async (): Promise<string> => {
    try {
      console.log("%cGenerating status report...", "color: #88c0d0;");
      
      // Check if JonahConsole exists
      if (!window.JonahConsole) {
        console.log("%cUnable to generate status report. System not initialized.", "color: #bf616a;");
        return "Status check failed.";
      }
      
      // Display general status
      console.log("%c======= JONAH SYSTEM STATUS =======", "color: #88c0d0; font-weight: bold;");
      
      // User status
      const userState: UserState = {
        interactions: 0,
        pagesVisited: 0,
        commandsUsed: []
      };
      
      const sessionDuration = window.JonahConsole.sessionStartTime ? 
        (Date.now() - window.JonahConsole.sessionStartTime) / 1000 / 60 : 0;
      
      console.log("%cUser Status:", "color: #a3be8c; font-weight: bold;");
      console.log(`%cUser interactions: ${userState.interactions || 0}`, "color: #ebcb8b;");
      console.log(`%cPages visited: ${userState.pagesVisited || 0}`, "color: #ebcb8b;");
      console.log(`%cCommands used: ${userState.commandsUsed?.length || 0}`, "color: #ebcb8b;");
      console.log(`%cSession duration: ${sessionDuration.toFixed(2)} minutes`, "color: #ebcb8b;");
      
      // Story status
      console.log("%cStory Status:", "color: #a3be8c; font-weight: bold;");
      
      const storyFlags: StoryFlag[] = window.JonahConsole.storyFlags || [];
      const discoveredFlags = storyFlags.filter(flag => flag.discovered).length;
      
      console.log(`%cStory flags discovered: ${discoveredFlags}/${storyFlags.length}`, "color: #ebcb8b;");
      console.log(`%cScore: ${window.JonahConsole.score || 0}`, "color: #ebcb8b;");
      console.log(`%cRank: ${window.JonahConsole.rank || 'beginner'}`, "color: #ebcb8b;");
      
      // Sentience status
      console.log("%cSentience Status:", "color: #a3be8c; font-weight: bold;");
      
      // Create default sentience if missing
      const defaultSentience: Partial<SentienceData> = {
        lastInteraction: Date.now(),
        interactionsCount: 0,
        sessionData: {
          startTime: Date.now(),
          messageCount: 0,
          userEmotions: {},
          messagesSent: 0,
          messagesReceived: 0
        },
        realityFabric: {
          moodChangeTime: Date.now(),
          currentMood: 'neutral',
          stability: 0.5,
          anomalyCount: 0,
          moodHistory: [],
          journal: []
        },
        emotionalState: {
          primary: 'neutral',
          secondary: null,
          intensity: 'medium'
        }
      };
      
      const sentience = window.JonahConsole.sentience || defaultSentience;
      
      if (sentience) {
        const lastInteraction = sentience.lastInteraction ? 
          (Date.now() - sentience.lastInteraction) / 1000 / 60 : 0;
        
        console.log(`%cSentience level: ${sentience.level || 1}`, "color: #ebcb8b;");
        console.log(`%cInteractions: ${sentience.interactionsCount || 0}`, "color: #ebcb8b;");
        console.log(`%cTime since last interaction: ${lastInteraction.toFixed(2)} minutes`, "color: #ebcb8b;");
        
        if (sentience.realityFabric?.moodChangeTime) {
          const moodDuration = (Date.now() - sentience.realityFabric.moodChangeTime) / 1000 / 60;
          console.log(`%cCurrent mood duration: ${moodDuration.toFixed(2)} minutes`, "color: #ebcb8b;");
        }
        
        console.log(`%cEmotional state: ${sentience.emotionalState?.primary || 'neutral'} (${sentience.emotionalState?.intensity || 'medium'})`, "color: #ebcb8b;");
      } else {
        console.log("%cSentience system not initialized.", "color: #bf616a;");
      }
      
      console.log("%c==================================", "color: #88c0d0; font-weight: bold;");
      
      return "Status report completed.";
    } catch (error) {
      console.error("Error generating status report:", error);
      return "Status check failed.";
    }
  }
};

// Export status command
export default statusCommand;

// Initialize showStatus if it doesn't exist
if (!window.showStatus) {
  window.showStatus = statusCommand.showStatus;
}
