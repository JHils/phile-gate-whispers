
/**
 * Dream System
 * Handles dream-related responses
 */

// Get a dream response
export function getDreamReturnResponse(): string | null {
  const responses = [
    "I had a dream about that once.",
    "In my dreams, I see something similar.",
    "That reminds me of a recurring dream I have.",
    "I dreamed about this. Maybe it means something.",
    "Dreams and reality blur sometimes. This feels like both."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Generate a dream fragment - more poetic and abstract than normal responses
export function generateDreamFragment(): string {
  const dreamFragments = [
    "Mirrors reflecting only darkness, yet I could see through them.",
    "A bird with three wings, circling endlessly, unable to land.",
    "Words falling like rain, dissolving before I could read them.",
    "A door that kept changing color each time I reached for the handle.",
    "The sound of waves crashing, but the sea was made of sand.",
    "Numbers floating in the air, rearranging themselves into faces.",
    "A voice calling my name, but it was my voice from somewhere else."
  ];
  
  return dreamFragments[Math.floor(Math.random() * dreamFragments.length)];
}

// Check if current time is dream time (typically between 2-5 AM)
export function isInDreamTime(): boolean {
  const hour = new Date().getHours();
  return hour >= 2 && hour < 5;
}

// Export for compatibility
export default {
  getDreamReturnResponse,
  generateDreamFragment,
  isInDreamTime
};
