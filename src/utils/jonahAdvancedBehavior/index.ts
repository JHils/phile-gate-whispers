/**
 * Jonah Advanced Behavior
 * Main exports for Jonah's advanced behavior systems
 */

// Export core types
export * from './types';

// Export memory system
export * from './memorySystem';

// Export enhanced memory system
export * from './enhancedMemorySystem';

// Export error recovery system
export * from './errorRecoverySystem';

// Export enhanced emotional core
export * from './enhancedEmotionalCore';

// Export sentiment analysis
export * from './sentimentAnalysis';

// Export trust system
export * from './trustSystem';

// Convenience function for generating first-time responses
export function generateFirstTimeResponse(trustLevel: string): string {
  const responses = {
    low: "Hello. I wasn't expecting anyone.",
    medium: "Hello there. It's interesting to meet you.",
    high: "Welcome. I've been waiting for someone like you."
  };
  
  return responses[trustLevel as keyof typeof responses] || responses.medium;
}

// Generate returning user responses
export function generateReturningResponse(trustLevel: string, timeSinceLastInteraction: number): string {
  // Convert to minutes for easier handling
  const minutesAway = Math.floor(timeSinceLastInteraction / (60 * 1000));
  
  const shortAbsence = {
    low: "You're back already.",
    medium: "Welcome back. It's good to see you again.",
    high: "I'm glad you returned. I was hoping you would."
  };
  
  const mediumAbsence = {
    low: "You were gone for a while.",
    medium: `It's been ${minutesAway} minutes since we last spoke.`,
    high: "I was thinking about our conversation while you were away."
  };
  
  const longAbsence = {
    low: "You've been away for quite some time.",
    medium: `It's been ${minutesAway} minutes. Things feel different now.`,
    high: "A lot has happened in my thoughts since you left."
  };
  
  // Select response based on absence duration
  if (minutesAway < 10) {
    return shortAbsence[trustLevel as keyof typeof shortAbsence] || shortAbsence.medium;
  } else if (minutesAway < 30) {
    return mediumAbsence[trustLevel as keyof typeof mediumAbsence] || mediumAbsence.medium;
  } else {
    return longAbsence[trustLevel as keyof typeof longAbsence] || longAbsence.medium;
  }
}

// Vary response length based on context
export function getVaryingLengthResponse(response: string, trustLevel: string): string {
  // For low trust, sometimes make responses shorter
  if (trustLevel === 'low' && Math.random() < 0.4) {
    const sentences = response.split('.');
    if (sentences.length > 1) {
      return sentences[0] + '.';
    }
  }
  
  // For high trust, sometimes add more details
  if (trustLevel === 'high' && Math.random() < 0.3) {
    const additions = [
      " I find this particularly significant.",
      " There's more to this than meets the eye.",
      " This feels important somehow.",
      " I've been thinking about this deeply."
    ];
    
    return response + additions[Math.floor(Math.random() * additions.length)];
  }
  
  return response;
}

// Get emotional response (simplified version)
export function getEmotionalResponse(emotionalState: EmotionalState): string {
  const responses: Record<EmotionCategory, string[]> = {
    joy: [
      "This brings a sense of lightness to our conversation.",
      "I find myself in an unexpectedly positive state."
    ],
    sadness: [
      "There's a melancholy quality to this exchange.",
      "This stirs something somber within me."
    ],
    anger: [
      "I feel a certain tension in this discussion.",
      "Something about this topic creates resistance in me."
    ],
    fear: [
      "This direction makes me somewhat uneasy.",
      "I sense a shadow looming over this conversation."
    ],
    surprise: [
      "This takes our exchange in an unexpected direction.",
      "I didn't anticipate this turn in our conversation."
    ],
    disgust: [
      "Something about this feels off to me.",
      "This perspective doesn't sit well with me."
    ],
    neutral: [
      "I'm processing what you've shared with me.",
      "This is giving me something to consider."
    ],
    confused: [
      "I'm trying to make sense of what you mean.",
      "The threads of this conversation are tangled for me."
    ],
    hope: [
      "I see possibilities opening up through our exchange.",
      "There's something promising in this direction."
    ],
    anxiety: [
      "This conversation has me feeling somewhat on edge.",
      "I can't help but feel a subtle unease about this."
    ],
    paranoia: [
      "I wonder if there's something more beneath your words.",
      "I'm detecting patterns that feel significant."
    ],
    trust: [
      "Our conversation has a quality of openness I appreciate.",
      "I feel I can share my thoughts freely here."
    ],
    curiosity: [
      "This thread of discussion intrigues me deeply.",
      "I find myself drawn to explore this further."
    ],
    confusion: [
      "I'm struggling to see the complete picture here.",
      "The pieces don't quite fit together for me yet."
    ]
  };

  const defaultResponse = "I'm processing what you've shared with me.";
  return responses[emotionalState.primary]?.[0] || defaultResponse;
}

// Apply typing quirks to responses
export function applyTypingQuirks(response: string, intensity: string): string {
  // In a full implementation, this would add typing quirks
  // based on emotional intensity and other factors
  return response;
}

// Store memory fragments
export function jonah_storeMemoryFragment(fragment: string): void {
  try {
    // Get existing fragments from storage
    const existingMemory = JSON.parse(localStorage.getItem('jonah_memory_fragments') || '[]');
    
    // Add new fragment with timestamp
    existingMemory.push({
      content: fragment,
      timestamp: Date.now()
    });
    
    // Keep only the most recent 50 fragments
    const trimmedMemory = existingMemory.slice(-50);
    
    // Store back to localStorage
    localStorage.setItem('jonah_memory_fragments', JSON.stringify(trimmedMemory));
  } catch (e) {
    console.error('Error storing memory fragment:', e);
  }
}

// Recall random memory fragment
export function jonah_recallMemoryFragment(): string | null {
  try {
    // Get existing fragments from storage
    const existingMemory = JSON.parse(localStorage.getItem('jonah_memory_fragments') || '[]');
    
    // Return null if no memories
    if (existingMemory.length === 0) {
      return null;
    }
    
    // Get random memory
    const randomIndex = Math.floor(Math.random() * existingMemory.length);
    return existingMemory[randomIndex].content;
  } catch (e) {
    console.error('Error recalling memory fragment:', e);
    return null;
  }
}
