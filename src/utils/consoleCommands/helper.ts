
import { TrackEventFunction } from "../consoleCommands/types";
import { UserState } from "@/hooks/useTrackingSystem";

export const helperFunctions = {
  setupHelperFunctions: (trackEvent: TrackEventFunction, userState: UserState) => {
    // Basic help command
    window.help = function(): string {
      console.log("%cAvailable Commands:", "color:#4ade80; font-weight:bold;");
      console.log("%cstatus() - View your current status and stats", "color:#4ade80;");
      console.log("%cecho_me(message) - Echo a message back to you", "color:#4ade80;");
      console.log("%cbook(code) - Enter a book code, or view found books", "color:#4ade80;");
      console.log("%cbiome(name) - Explore a biome", "color:#4ade80;");
      console.log("%chelp() - Show this help message", "color:#4ade80;");
      
      trackEvent("command_help_viewed");
      
      return "Commands displayed in console";
    };
    
    // Echo message command
    window.echo_me = function(message: string): string {
      if (!message) {
        return "You need to provide a message to echo.";
      }
      
      // Add echo tracker to user stats
      const trustIncrease = userState?.trust?.score ? 
        Math.floor(userState.trust.score / 200) + 1 : 1;
      
      trackEvent("command_echo_used");
      
      if (message.toLowerCase().includes("mirror") || 
          message.toLowerCase().includes("echo") || 
          message.toLowerCase().includes("gate")) {
        trackEvent("command_echo_special");
        return `ECHO: ${message.toUpperCase()} ... ${message.toUpperCase()} ... ${message.toUpperCase()}`;
      }
      
      return `Echo: ${message}`;
    };
    
    // Clear console command
    window.clear_console = function(): string {
      if (typeof window.console?.clear === 'function') {
        console.clear();
        return "Console cleared";
      } else {
        return "Console clear not supported in this browser";
      }
    };
  }
};
