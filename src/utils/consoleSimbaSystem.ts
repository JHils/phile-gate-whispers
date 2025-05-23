
// Adding this file as a placeholder since it's mentioned in the error logs
// We'll just create a minimal version to fix the type errors

/**
 * Simba System - Virtual pet companion in Jonah's console
 */

interface SimbaState {
  encountered: boolean;
  interactions: number;
  lastSeen: number;
  mood: string;
  trustLevel: number;
  fed: boolean;
  stories: string[];
}

// Initialize Simba
export function initializeSimba(): void {
  if (!window.JonahConsole) window.JonahConsole = {};
  
  if (!window.JonahConsole.simba) {
    window.JonahConsole.simba = {
      encountered: false,
      interactions: 0,
      lastSeen: Date.now(),
      mood: 'neutral',
      trustLevel: 50,
      fed: false,
      stories: []
    };
  }
}

// Feed Simba
export function feedSimba(): string {
  initializeSimba();
  
  if (!window.JonahConsole.simba) return "Error: Simba not initialized.";
  
  // Ensure simba properties use number types
  if (typeof window.JonahConsole.simba.interactions === 'string') {
    window.JonahConsole.simba.interactions = Number(window.JonahConsole.simba.interactions);
  }
  
  window.JonahConsole.simba.interactions = (window.JonahConsole.simba.interactions || 0) + 1;
  window.JonahConsole.simba.lastSeen = Date.now();
  window.JonahConsole.simba.fed = true;
  
  return "You feed Simba some kibble. He purrs contentedly.";
}

// Pet Simba
export function petSimba(): string {
  initializeSimba();
  
  if (!window.JonahConsole.simba) return "Error: Simba not initialized.";
  
  // Ensure simba properties use number types
  if (typeof window.JonahConsole.simba.interactions === 'string') {
    window.JonahConsole.simba.interactions = Number(window.JonahConsole.simba.interactions);
  }
  
  window.JonahConsole.simba.interactions = (window.JonahConsole.simba.interactions || 0) + 1;
  window.JonahConsole.simba.lastSeen = Date.now();
  
  const responses = [
    "Simba purrs as you stroke his fur.",
    "Simba rubs against your hand.",
    "Simba closes his eyes contentedly as you pet him.",
    "Simba seems to appreciate the attention.",
    "Simba stretches and enjoys your petting."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Play with Simba
export function playWithSimba(): string {
  initializeSimba();
  
  if (!window.JonahConsole.simba) return "Error: Simba not initialized.";
  
  // Ensure simba properties use number types
  if (typeof window.JonahConsole.simba.interactions === 'string') {
    window.JonahConsole.simba.interactions = Number(window.JonahConsole.simba.interactions);
  }
  
  window.JonahConsole.simba.interactions = (window.JonahConsole.simba.interactions || 0) + 1;
  window.JonahConsole.simba.lastSeen = Date.now();
  
  return "You dangle a string for Simba. He paws at it playfully.";
}

// Check Simba's status
export function checkSimba(): string {
  initializeSimba();
  
  if (!window.JonahConsole.simba) return "Error: Simba not initialized.";
  
  const timeSinceSeen = Date.now() - (window.JonahConsole.simba.lastSeen || 0);
  const hoursSinceSeen = timeSinceSeen / (1000 * 60 * 60);
  
  let status = "Simba is here. ";
  
  if (hoursSinceSeen < 0.5) {
    status += "He seems content.";
  } else if (hoursSinceSeen < 24) {
    status += "He looks a bit lonely.";
  } else if (hoursSinceSeen < 72) {
    status += "He misses you.";
  } else {
    status += "He seems very distant. It's been a while since you've spent time with him.";
  }
  
  if (window.JonahConsole.simba.fed) {
    status += " He's well-fed.";
  } else {
    status += " He looks hungry.";
  }
  
  return status;
}

// Export all functions for use in console commands
export const simbaCommands = {
  feed: feedSimba,
  pet: petSimba,
  play: playWithSimba,
  status: checkSimba,
  initialize: initializeSimba
};

export default simbaCommands;
