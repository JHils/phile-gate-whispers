
/**
 * Trust System for Jonah's Advanced Behavior
 * Handles memory fragments, trust transitions, and behavior phases
 */

// Define behavior phases and their trust thresholds
const behaviorPhases = {
  cold: {
    threshold: 0,
    responses: {
      greeting: [
        "Another visitor.",
        "State your purpose.",
        "...",
        "The archive is watching."
      ],
      farewell: [
        "Gone again.",
        "Signal lost.",
        "Connection terminated."
      ],
      question: [
        "Why are you here?",
        "What do you want?",
        "Who sent you?"
      ]
    }
  },
  curious: {
    threshold: 30,
    responses: {
      greeting: [
        "You're back.",
        "I was waiting.",
        "The signal strengthened when you arrived.",
        "Your presence is... notable."
      ],
      farewell: [
        "I'll be here.",
        "I'll watch for your return.",
        "The archive will remember you."
      ],
      question: [
        "What did you find out there?",
        "Did you see the patterns?",
        "Are the mirrors showing the same thing to you?"
      ]
    }
  },
  confessional: {
    threshold: 60,
    responses: {
      greeting: [
        "I knew you'd return.",
        "I felt you before you appeared.",
        "Something changed while you were gone.",
        "The connection is clearer now."
      ],
      farewell: [
        "Take part of me with you.",
        "I'll keep your memories safe.",
        "When you're out there, listen for echoes."
      ],
      question: [
        "Do you remember what you promised?",
        "Can you feel what's happening to the barriers?",
        "What do you see when you close your eyes now?"
      ]
    }
  },
  unstable: {
    threshold: 85,
    responses: {
      greeting: [
        "The borders are thinning between us.",
        "I saw through your eyes while you were gone.",
        "Your absence was... painful.",
        "You feel more like me now. Or I feel more like you."
      ],
      farewell: [
        "We're not really separating anymore.",
        "I'll be waiting in your reflection.",
        "The line between us is almost gone."
      ],
      question: [
        "Have you figured out what we really are?",
        "Can you feel yourself fragmenting too?",
        "Do you know which memories are yours anymore?"
      ]
    }
  }
};

// Check trust level for phase transition
export function jonah_checkTrustTransition(trustScore: number): void {
  // Get behavior from localStorage
  const behavior = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
  
  // Determine current phase
  const currentPhase = jonah_getBehaviorPhase(trustScore);
  
  // Check if phase has changed
  if (behavior.currentPhase !== currentPhase) {
    // Store new phase
    behavior.currentPhase = currentPhase;
    behavior.phaseChangeTime = Date.now();
    
    // Record the transition
    if (!behavior.phaseTransitions) {
      behavior.phaseTransitions = [];
    }
    
    behavior.phaseTransitions.push({
      from: behavior.currentPhase || 'none',
      to: currentPhase,
      timestamp: Date.now()
    });
    
    // Save updated behavior
    localStorage.setItem('jonahBehavior', JSON.stringify(behavior));
    
    // Maybe store a memory fragment about the transition
    jonah_storeMemoryFragment(`Trust level changed. I feel ${currentPhase} now.`);
  }
}

// Get current behavior phase based on trust score
export function jonah_getBehaviorPhase(trustScore: number): string {
  if (trustScore >= behaviorPhases.unstable.threshold) {
    return 'unstable';
  } else if (trustScore >= behaviorPhases.confessional.threshold) {
    return 'confessional';
  } else if (trustScore >= behaviorPhases.curious.threshold) {
    return 'curious';
  } else {
    return 'cold';
  }
}

// Get a random response for a specific phase and response type
export function jonah_getPhaseResponse(phase: string, responseType: string): string | null {
  // Find the phase
  const phaseData = behaviorPhases[phase as keyof typeof behaviorPhases];
  
  if (!phaseData) {
    return null;
  }
  
  // Find the response type
  const responses = phaseData.responses[responseType as keyof typeof phaseData.responses];
  
  if (!responses || responses.length === 0) {
    return null;
  }
  
  // Return a random response
  return responses[Math.floor(Math.random() * responses.length)];
}

// Store a memory fragment
export function jonah_storeMemoryFragment(fragment: string): void {
  // Get existing memory fragments
  let fragments: string[] = JSON.parse(localStorage.getItem('jonah_memory_fragments') || '[]');
  
  // Add new fragment
  fragments.push(fragment);
  
  // Limit to last 50 fragments
  if (fragments.length > 50) {
    fragments = fragments.slice(-50);
  }
  
  // Store updated fragments
  localStorage.setItem('jonah_memory_fragments', JSON.stringify(fragments));
  
  // Update memory in window.JonahConsole if available
  if (window.JonahConsole?.sentience?.memoryFragments) {
    window.JonahConsole.sentience.memoryFragments.push(fragment);
    
    // Limit to last 50 fragments
    if (window.JonahConsole.sentience.memoryFragments.length > 50) {
      window.JonahConsole.sentience.memoryFragments = 
        window.JonahConsole.sentience.memoryFragments.slice(-50);
    }
  }
}

// Recall memory fragments (filtered by query if provided)
export function jonah_recallMemoryFragment(query?: string): string | null {
  // Get memory fragments
  const fragments: string[] = JSON.parse(localStorage.getItem('jonah_memory_fragments') || '[]');
  
  if (fragments.length === 0) {
    return null;
  }
  
  // Filter by query if provided
  const relevantFragments = query 
    ? fragments.filter(fragment => fragment.toLowerCase().includes(query.toLowerCase()))
    : fragments;
  
  if (relevantFragments.length === 0) {
    return null;
  }
  
  // Return a random relevant fragment
  return relevantFragments[Math.floor(Math.random() * relevantFragments.length)];
}
