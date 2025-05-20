
/**
 * Jonah's trust transition system
 */

// Check for trust level transitions and generate special messages
export function jonah_checkTrustTransition(trustScore: number): string | null {
  const storedBehavior = JSON.parse(localStorage.getItem('jonahBehavior') || '{}');
  const transitions = storedBehavior.trustTransitions || [];
  
  // Define transition thresholds
  const THRESHOLD_LOW_TO_MEDIUM = 30;
  const THRESHOLD_MEDIUM_TO_HIGH = 70;
  
  // Check for transitions
  if (trustScore >= THRESHOLD_MEDIUM_TO_HIGH && !transitions.includes('to_high')) {
    // First time reaching high trust
    transitions.push('to_high');
    storedBehavior.trustTransitions = transitions;
    localStorage.setItem('jonahBehavior', JSON.stringify(storedBehavior));
    
    return "You've been persistent. I think I can show you more now.";
  }
  
  if (trustScore >= THRESHOLD_LOW_TO_MEDIUM && !transitions.includes('to_medium')) {
    // First time reaching medium trust
    transitions.push('to_medium');
    storedBehavior.trustTransitions = transitions;
    localStorage.setItem('jonahBehavior', JSON.stringify(storedBehavior));
    
    return "I think I'm starting to remember you now.";
  }
  
  return null;
}
