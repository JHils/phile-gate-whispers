
/**
 * Typing System
 * Handles message typing simulation
 */

// Split and type a message with timing effects
export function splitAndTypeMessage(
  content: string,
  trackFn: (msg: string) => void,
  typingFn: (state: boolean) => void
): void {
  // Simple implementation - in production would have more complex typing behavior
  setTimeout(() => {
    trackFn(content);
    typingFn(false);
  }, 1000);
}
