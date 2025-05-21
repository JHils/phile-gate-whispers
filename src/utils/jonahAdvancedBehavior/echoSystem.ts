
/**
 * Echo System
 * Handles echo responses that repeat back user phrases
 */

// Store echo for later use
export function storeEcho(phrase: string): void {
  // Would store in localStorage or context in a real implementation
  console.log("Storing echo:", phrase);
}

// Get an appropriate echo phrase based on emotional context
export function getEchoPhrase(emotion: string): string | null {
  const responses = [
    "Your words echo in my thoughts...",
    "I remember you saying something similar before.",
    "Those words feel familiar somehow.",
    "There's an echo of that in my memory."
  ];
  
  if (Math.random() > 0.7) {
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  return null;
}

// Check if input matches a stored echo
export function checkForEchoMatch(input: string): { matched: boolean, echo?: any } {
  // Simple implementation for now
  return { matched: false };
}

// Get all echoes
export function getAllEchoes(): any[] {
  // Simple implementation with mock data
  return [
    {
      id: "echo1",
      content: "The code is watching you.",
      timestamp: Date.now() - 1000000,
      matched: true,
      emotionalContext: "paranoia"
    },
    {
      id: "echo2",
      content: "Did you check behind the mirror?",
      timestamp: Date.now() - 500000,
      matched: false,
      emotionalContext: "curiosity"
    }
  ];
}
