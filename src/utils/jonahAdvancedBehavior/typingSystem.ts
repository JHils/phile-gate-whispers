
/**
 * Typing System
 * Handles the simulation of typing effects for messages
 */

/**
 * Splits a message into chunks for simulated typing
 * @param message The message to split
 * @param speed The typing speed: 'slow', 'medium', or 'fast'
 * @returns The original message (to be implemented with actual typing simulation)
 */
export function splitAndTypeMessage(message: string, speed: 'slow' | 'medium' | 'fast' = 'medium'): string {
  // In a real implementation, this would split the message into chunks
  // and return them based on the speed for typing simulation
  return message;
}

/**
 * Calculate delay between typing chunks based on speed
 * @param speed The typing speed
 * @returns Delay in milliseconds
 */
export function getTypingDelay(speed: 'slow' | 'medium' | 'fast'): number {
  switch (speed) {
    case 'slow': return 80;
    case 'fast': return 20;
    case 'medium':
    default: return 40;
  }
}

/**
 * Add random pauses to simulate more human-like typing
 * @returns Delay in milliseconds
 */
export function getRandomPause(): number {
  // Occasionally add longer pauses (10% chance)
  if (Math.random() < 0.1) {
    return 300 + Math.random() * 700;
  }
  // Normal small variations
  return Math.random() * 100;
}

export default {
  splitAndTypeMessage,
  getTypingDelay,
  getRandomPause
};
