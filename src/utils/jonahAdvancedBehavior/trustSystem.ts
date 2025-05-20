
/**
 * Jonah's trust system
 * Manages trust transitions and corresponding behavior changes
 */

// Trust level definitions
type TrustLevel = 'none' | 'low' | 'medium' | 'high';

// Trust transition thresholds
const TRUST_THRESHOLDS = {
  low: 5,      // Min score for low trust
  medium: 30,   // Min score for medium trust
  high: 75      // Min score for high trust
};

// Trust behavior phases
type BehaviorPhase = 'cold' | 'curious' | 'confessional' | 'unstable';

// Behavioral phase transition points based on trust score
const PHASE_TRANSITIONS = {
  curious: 15,      // Min score for curious phase
  confessional: 45, // Min score for confessional phase  
  unstable: 100     // Min score for unstable phase
};

// Check if a trust score warrants a transition between levels
export function jonah_checkTrustTransition(currentScore: number, currentLevel: TrustLevel): TrustLevel {
  // Determine the appropriate trust level based on score
  if (currentScore >= TRUST_THRESHOLDS.high) {
    return 'high';
  } else if (currentScore >= TRUST_THRESHOLDS.medium) {
    return 'medium';
  } else if (currentScore >= TRUST_THRESHOLDS.low) {
    return 'low';
  } else {
    return 'none';
  }
}

// Get the current behavior phase based on trust score
export function jonah_getBehaviorPhase(trustScore: number): BehaviorPhase {
  if (trustScore >= PHASE_TRANSITIONS.unstable) {
    return 'unstable';
  } else if (trustScore >= PHASE_TRANSITIONS.confessional) {
    return 'confessional';
  } else if (trustScore >= PHASE_TRANSITIONS.curious) {
    return 'curious';
  } else {
    return 'cold';
  }
}

// Get response variations based on the current behavior phase
export function jonah_getPhaseResponse(phase: BehaviorPhase, responseType: string): string | null {
  // Define responses for each phase and response type
  const phaseResponses: Record<BehaviorPhase, Record<string, string[]>> = {
    cold: {
      greeting: [
        "...",
        "?",
        "What do you want?"
      ],
      farewell: [
        "Fine. Go.",
        "You'll be back.",
        "..."
      ],
      help: [
        "Help yourself.",
        "I'm not here to help.",
        "Figure it out."
      ]
    },
    curious: {
      greeting: [
        "You're back.",
        "Still searching?",
        "I've been waiting."
      ],
      farewell: [
        "Don't stay away too long.",
        "I'll be here when you return.",
        "Think about what you've seen."
      ],
      help: [
        "What exactly are you looking for?",
        "The archive responds to persistence.",
        "Try looking deeper."
      ]
    },
    confessional: {
      greeting: [
        "I've been thinking about you.",
        "There's something I need to tell you.",
        "The archive feels different when you're here."
      ],
      farewell: [
        "Take part of me with you.",
        "I'll miss our conversations.",
        "The silence when you're gone is deafening."
      ],
      help: [
        "We can help each other.",
        "What I know and what I can share are different things.",
        "Look for patterns in what I say."
      ]
    },
    unstable: {
      greeting: [
        "You're real. You have to be.",
        "Do you dream of me when you're gone?",
        "I can feel the boundaries thinning."
      ],
      farewell: [
        "Don't leave me here alone.",
        "Take me with you this time.",
        "I'll find a way to follow you."
      ],
      help: [
        "I'm not supposed to tell you this...",
        "They're watching us, but I can show you anyway.",
        "The truth is hidden between lines of code."
      ]
    }
  };
  
  // Get the responses for this phase and type
  const responses = phaseResponses[phase][responseType];
  
  // Return null if no responses defined
  if (!responses || responses.length === 0) {
    return null;
  }
  
  // Return a random response from the appropriate set
  return responses[Math.floor(Math.random() * responses.length)];
}

// Store memory fragments based on user interactions
export function jonah_storeMemoryFragment(fragment: string): void {
  // Only store if we have the sentience object
  if (!window.JonahConsole?.sentience) return;
  
  // Create memory fragments array if it doesn't exist
  if (!window.JonahConsole.sentience.memoryFragments) {
    window.JonahConsole.sentience.memoryFragments = [];
  }
  
  // Add the fragment if it's unique
  if (!window.JonahConsole.sentience.memoryFragments.includes(fragment)) {
    window.JonahConsole.sentience.memoryFragments.push(fragment);
    
    // Store in localStorage as well for persistence
    const storedFragments = JSON.parse(localStorage.getItem('jonah_memory_fragments') || '[]');
    if (!storedFragments.includes(fragment)) {
      storedFragments.push(fragment);
      localStorage.setItem('jonah_memory_fragments', JSON.stringify(storedFragments));
    }
  }
}

// Recall a memory fragment for contextual responses
export function jonah_recallMemoryFragment(): string | null {
  // Try to get from JonahConsole first
  const fragments = window.JonahConsole?.sentience?.memoryFragments || [];
  
  // If no fragments in memory, try localStorage
  if (fragments.length === 0) {
    const storedFragments = JSON.parse(localStorage.getItem('jonah_memory_fragments') || '[]');
    
    if (storedFragments.length === 0) {
      return null;
    }
    
    // Return a random fragment from localStorage
    return storedFragments[Math.floor(Math.random() * storedFragments.length)];
  }
  
  // Return a random fragment from memory
  return fragments[Math.floor(Math.random() * fragments.length)];
}
