
/**
 * Helper Functions for Console Commands
 */

import { UserState } from "@/hooks/useTrackingSystem";

type TrackEventFunction = (eventName: string) => void;

// Augment the Window interface to include the console commands
declare global {
  interface Window {
    help: () => string;
    clear: () => void; // Changed to void return type
    echo_me: (text: string) => string;
  }
}

// Export the helper functions object
export const helperFunctions = {
  setupHelperFunctions: (
    trackEvent: TrackEventFunction,
    userState: UserState
  ) => {
    // Help command
    window.help = function() {
      trackEvent('console_command_help');
      
      let helpText = `
=== JONAH CONSOLE HELP ===
Available commands:

Basic Commands:
- help() - Show this help message
- status() - Show your current status and rank
- clear() - Clear the console

Exploration Commands:
- echo_me("text") - Echo a message back
- check_timeline() - Check current timeline status
- memory_scan() - Scan for memory fragments
`;

      // Show advanced commands for users with higher trust
      if (userState.trust && userState.trust.score > 30) {
        helpText += `
Advanced Commands:
- newsFlash() - Check for news updates
- weatherReport() - Get a weather observation
- dream_sequence() - Access dream sequence protocol
- questHint() - Get a hint for active quests
`;
      }

      // Show developer commands for high trust users
      if (userState.trust && userState.trust.score > 70) {
        helpText += `
Developer Commands:
- decode("string") - Attempt to decode a string
- inspect_object(obj) - Inspect object properties
- completeQuest("id") - Complete a specific quest
`;
      }
      
      console.log(helpText);
      return helpText;
    };
    
    // Clear command
    window.clear = function() {
      trackEvent('console_command_clear');
      console.clear();
      return "Console cleared. Some things can't be forgotten.";
    };
    
    // Echo command
    window.echo_me = function(text) {
      trackEvent('console_command_echo');
      return `Echo: ${text || "...silence..."}`;
    };
    
    // Add other helper functions as needed
  }
};
