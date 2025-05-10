
/**
 * Tracking utilities for console commands
 */

/**
 * Track used commands in the JonahConsole global object
 */
export function trackCommand(commandName: string): void {
  if (window.JonahConsole) {
    if (!window.JonahConsole.usedCommands.includes(commandName)) {
      window.JonahConsole.usedCommands.push(commandName);
    }
    window.JonahConsole.lastCommand = commandName;
  }
}
