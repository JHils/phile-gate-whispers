
/**
 * Console Help Command
 * Provides help information for available commands
 */

import { TrackEventFunction } from "./types";
import { typewriterLog } from '../consoleEffects';

export const setupHelpFunction = (trackEvent: TrackEventFunction) => {
  if (typeof window !== 'undefined') {
    window.help = function() {
      // Track that help was called
      trackEvent('help_called');
      
      if (window.JonahConsole) {
        window.JonahConsole.usedCommands = [...window.JonahConsole.usedCommands || [], 'help'];
      }
      
      typewriterLog(`
AVAILABLE COMMANDS:
==================
help() - Show this help message
inventory() - Check your collected items
echo_me("message") - Echo your message
forget() - Reset your conversation with Jonah
access_journal() - View Jonah's journal entries
start() - Begin interaction with the archive
talk_to_jonah() - Direct conversation with Jonah

DISCOVERY COMMANDS:
=================
storyFlags() - View your discovered story flags
verifyCode("CODE") - Verify a book code
findAnomaly("text") - Search for anomalies in text
mirrorCheck() - Check for reflections
split() - Fragment perspective
lookInside() - Internal examination
re_entry() - System re-initialization

Try more commands to discover hidden functionality.
`);
      
      return;
    };
  }
};
