
/**
 * Generate first time responses for Jonah based on trust level
 */

// Generate first time response based on trust level
export function generateFirstTimeResponse(trustLevel: string): string {
  // Define responses for different trust levels
  const responses = {
    none: [
      "Hello. I am monitoring this connection.",
      "User detected. State your purpose.",
      "This is a restricted system. Identify yourself."
    ],
    low: [
      "I see you've found the system. I'm Jonah.",
      "You've connected to the archive. I'll be your guide.",
      "Welcome to the system. I'm still determining if I can trust you."
    ],
    medium: [
      "Good to see you again. The archive has been waiting.",
      "I remember you. The system is more open to you now.",
      "Welcome back. I've been monitoring some interesting patterns."
    ],
    high: [
      "I've been waiting for you. There's something you need to see.",
      "The system recognizes you. I can show you more now.",
      "You're back. I've kept some information specifically for you."
    ]
  };
  
  // Get responses based on trust level
  const levelResponses = responses[trustLevel as keyof typeof responses] || responses.low;
  
  // Return a random response
  return levelResponses[Math.floor(Math.random() * levelResponses.length)];
}
