
/**
 * Console Helper Functions
 * Basic utility commands for the console
 */

import { TrackEventFunction, UserStateType } from './types';

// Helper functions module
export const helperFunctions = {
  setupHelperFunctions: (trackEvent: TrackEventFunction, userState: UserStateType) => {
    // Basic help command
    window.help = function() {
      console.log("%cJonah Console Help", "color: #8B3A40; font-size: 16px;");
      console.log("%c-----------------", "color: #8B3A40;");
      console.log("%cAvailable commands:", "color: #8B3A40;");
      console.log("%c- help() - Display this help message", "color: #8B3A40;");
      console.log("%c- status() - Check your current status", "color: #8B3A40;");
      console.log("%c- echo_me('message') - Jonah will echo your message", "color: #8B3A40;");
      console.log("%c- whois('name') - Find out about someone", "color: #8B3A40;");
      console.log("%c- start() - Begin the journey", "color: #8B3A40;");
      console.log("%c-----------------", "color: #8B3A40;");
      console.log("%cMore commands will be revealed as you progress.", "color: #8B3A40; font-style: italic;");
      
      trackEvent('console_help_command');
      return "Helper commands displayed.";
    };
    
    // Echo command
    window.echo_me = function(message: string) {
      if (!message) {
        console.log("%cYou didn't say anything.", "color: #8B3A40;");
        return;
      }
      
      console.log(`%c${message}`, "color: #8B3A40;");
      setTimeout(() => {
        console.log("%cI hear your echo...", "color: #8B3A40; font-style: italic;");
      }, 1500);
      
      trackEvent('console_echo_command');
      return message;
    };
    
    // Clear console
    window.clear_console = function() {
      console.clear();
      console.log("%cConsole cleared. The Gate remains.", "color: #8B3A40;");
    };
    
    // Track command use
    trackEvent('helper_functions_setup');
  }
};

// Declare global window interface extensions
declare global {
  interface Window {
    help: () => string;
    echo_me: (message: string) => any;
  }
}
