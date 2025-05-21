
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

// Export for compatibility
export default {
  getDreamReturnResponse
};
