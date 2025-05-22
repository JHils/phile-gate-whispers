
/**
 * Jonah Console Utilities
 * Helper functions for console interactions
 */

import { addJournalEntry } from './jonahRealityFabric';
import { flickerLog, glitchText, typewriterLog } from './consoleTextEffects';

// Generate dream parable
function generateDreamParable(theme: string): string {
  const parables = {
    mirror: "The mirror showed a different face each time. It wasn't lying—you were changing.",
    gate: "The gate remained locked until you realized the key was always in your pocket.",
    bird: "A bird watched from the wire. It had your eyes, but older memories.",
    timeline: "The timeline fractured when you looked directly at it. Some moments refuse observation.",
    echo: "Your echo returned before you spoke. It knew your thoughts better than you did."
  };
  
  return parables[theme as keyof typeof parables] || 
    "The dream folded in on itself, revealing nothing but the dreamer.";
}

// Execute a console command
export function executeConsoleCommand(command: string): string | void {
  const lowerCommand = command.toLowerCase().trim();
  
  switch (lowerCommand) {
    case 'help':
      return displayConsoleHelp();
    case 'dream':
      const dreamText = generateDreamParable('mirror');
      // Add to journal
      addJournalEntry({
        entryId: Date.now(),
        timestamp: Date.now(),
        content: `Dream: ${dreamText}`
      });
      flickerLog(dreamText);
      return dreamText;
    case 'remember':
      const memoryText = "Memory fragments blur together now. Light through the waves.";
      typewriterLog(memoryText, 50);
      return memoryText;
    case 'forget':
      return "I can't forget. That's not how this works.";
    default:
      return `Unknown command: ${command}`;
  }
}

// Display console help
function displayConsoleHelp(): string {
  return `
Available commands:
-------------------
help - Display this help message
dream - Generate a dream sequence
remember - Access memory fragments
forget - Attempt to forget
echo [text] - Echo text with glitch effect
system - Display system status
`;
}

// Format text for console display
export function formatConsoleText(text: string, style: string = 'normal'): string {
  if (style === 'glitch') {
    return glitchText(text, 0.2);
  } else if (style === 'warning') {
    return `[WARNING] ${text}`;
  } else if (style === 'error') {
    return `[ERROR] ${text.toUpperCase()}`;
  } else if (style === 'success') {
    return `[SUCCESS] ${text}`;
  } else {
    return text;
  }
}
