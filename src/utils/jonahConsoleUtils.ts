
/**
 * Jonah Console Utilities
 * Helper functions for console interactions
 */

import { typewriterLog } from './consoleEffects';
import { setCurrentMood, addJournalEntry } from './jonahRealityFabric';

/**
 * Process user input for console responses
 */
export const processConsoleInput = (input: string): string | null => {
  if (!input || typeof input !== 'string') return null;
  
  // Normalize input
  const normalizedInput = input.trim().toLowerCase();
  
  // Log input to journal
  addJournalEntry(`User console input: ${normalizedInput}`);
  
  // Check for keywords that might trigger mood changes
  const moodTriggers = {
    paranoid: ['help', 'scared', 'afraid', 'scared', 'watching', 'following', 'spy'],
    hopeful: ['thank', 'hope', 'better', 'trust', 'friend', 'together'],
    betrayed: ['hate', 'liar', 'wrong', 'stupid', 'useless', 'broken'],
    mirror: ['reflection', 'mirror', 'self', 'see', 'image', 'similar'],
    error: ['glitch', 'error', 'corrupt', 'broken', 'fault', 'crash']
  };
  
  // Check for mood triggers
  for (const [mood, triggers] of Object.entries(moodTriggers)) {
    if (triggers.some(trigger => normalizedInput.includes(trigger))) {
      // 30% chance of changing mood when triggered
      if (Math.random() < 0.3) {
        setCurrentMood(mood);
        break;
      }
    }
  }
  
  // Check for specific response triggers
  if (normalizedInput.includes('jonah')) {
    return 'I hear you say my name sometimes.';
  } else if (normalizedInput.includes('mirror')) {
    return 'Mirrors show what you expect to see. Usually.';
  } else if (normalizedInput.includes('timeline')) {
    return 'This timeline is unstable. There are others.';
  }
  
  // Default: no special response
  return null;
};

/**
 * Display Jonah's welcome message in the console
 */
export const displayConsoleWelcome = (): void => {
  typewriterLog(`JONAH CONSOLE SYSTEM v3.7.2
  
Type 'help()' for commands.
Type 'start()' to begin.`);
};
