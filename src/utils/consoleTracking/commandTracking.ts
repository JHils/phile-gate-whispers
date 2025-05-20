
/**
 * Command Tracking Utilities
 * Functions for tracking and managing console command usage
 */

/**
 * Track a used command
 */
export function addUsedCommand(command: string): void {
  if (window.JonahConsole) {
    if (!window.JonahConsole.usedCommands.includes(command)) {
      window.JonahConsole.usedCommands.push(command);
    }
    
    // Store the last command
    window.JonahConsole.lastCommand = command;
  }
}

/**
 * Check if a command has been used
 */
export function hasUsedCommand(command: string): boolean {
  return window.JonahConsole?.usedCommands.includes(command) || false;
}

/**
 * Track a command execution (alias for addUsedCommand for backward compatibility)
 */
export function trackCommand(command: string): void {
  if (window.JonahConsole) {
    addUsedCommand(command);
  }
}
