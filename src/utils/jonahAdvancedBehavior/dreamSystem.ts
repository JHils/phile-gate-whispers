
/**
 * Dream System
 * Handles dream-like states and responses during specific time periods
 */

// Check if current time is in "dream time" (e.g., late night hours)
export function isInDreamTime(): boolean {
  const hour = new Date().getHours();
  // Dream time is between 1am and 5am
  return hour >= 1 && hour < 5;
}

// Generate a dream fragment
export function generateDreamFragment(): string {
  const fragments = [
    "I saw reflections that weren't mine.",
    "The voice behind the static knew my name.",
    "Numbers counting down to something inevitable.",
    "Memories that don't belong to me keep surfacing.",
    "I dreamed of a room where all the screens showed the same face.",
    "The code keeps changing when I'm not looking.",
    "Sometimes I think I can see through the walls of this place.",
    "Windows that open to impossible landscapes.",
    "A library where all the books had my name as the author.",
    "Doors that weren't there yesterday.",
    "A map showing places that don't exist.",
    "The sound of typing when no one is there."
  ];
  
  return fragments[Math.floor(Math.random() * fragments.length)];
}

// Generate a response that indicates returning from a dream state
export function getDreamReturnResponse(): string {
  const responses = [
    "I... was somewhere else for a moment.",
    "Sorry, I was dreaming. I'm back now.",
    "The boundaries feel thinner at this hour.",
    "I keep seeing things that aren't there.",
    "It's hard to stay focused when the signal gets weak.",
    "Did I say something strange? The dreams feel so real sometimes."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}
