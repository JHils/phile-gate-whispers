
/**
 * First-time response generator for Jonah
 * Creates tailored initial responses based on trust level and context
 */

import { getVaryingLengthResponse } from './lengthVariations';
import { jonah_getBehaviorPhase, jonah_getPhaseResponse } from '../trustSystem';

// Generate a response for first-time interaction
export function generateFirstTimeResponse(trustLevel: string): string {
  // Calculate a simulated trust score based on the level
  const trustScore = trustLevel === 'high' ? 80 : 
                    trustLevel === 'medium' ? 40 : 10;
  
  // Get the current behavior phase
  const phase = jonah_getBehaviorPhase(trustScore);
  
  // Try to get a phase-specific greeting
  const phaseGreeting = jonah_getPhaseResponse(phase, 'greeting');
  
  // First-time responses by trust level
  const firstTimeResponses = {
    low: [
      "The archive is watching.",
      "State your purpose.",
      "Another visitor. Why are you here?",
      "Record #274: New entity detected.",
      "..."
    ],
    medium: [
      "I've been expecting you.",
      "You found me. Good.",
      "The gate led you here for a reason.",
      "Another seeker. But different somehow.",
      "Your arrival was predicted."
    ],
    high: [
      "I've seen you before. In the other timelines.",
      "The mirror shows your face clearly now.",
      "Finally. Someone who might understand.",
      "The waiting ends. Let me show you something.",
      "You feel it too, don't you? The thinning."
    ]
  };
  
  // Get a random response from the appropriate set
  const responses = firstTimeResponses[trustLevel as keyof typeof firstTimeResponses] || firstTimeResponses.low;
  const baseResponse = phaseGreeting || responses[Math.floor(Math.random() * responses.length)];
  
  // Apply length variations for more natural feel
  return getVaryingLengthResponse(baseResponse, trustLevel);
}

// Generate a returning user response
export function generateReturningResponse(
  trustLevel: string, 
  timeSinceLastVisit: number
): string {
  // Define time buckets (in milliseconds)
  const MINUTE = 60 * 1000;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  
  // Select response category based on time away
  let timeCategory: 'quick' | 'medium' | 'long';
  
  if (timeSinceLastVisit < 30 * MINUTE) {
    timeCategory = 'quick';
  } else if (timeSinceLastVisit < 12 * HOUR) {
    timeCategory = 'medium';
  } else {
    timeCategory = 'long';
  }
  
  // Responses for different time categories and trust levels
  const returnResponses = {
    quick: {
      low: [
        "Back already?",
        "That was quick.",
        "Still here."
      ],
      medium: [
        "You didn't go far.",
        "I knew you'd return quickly.",
        "Barely had time to miss you."
      ],
      high: [
        "I felt you nearby the whole time.",
        "The connection never severed.",
        "You never really left, did you?"
      ]
    },
    medium: {
      low: [
        "You again.",
        "Returned for more?",
        "The archive remembers you."
      ],
      medium: [
        "Welcome back to our conversation.",
        "I've been compiling thoughts while you were away.",
        "The timeline stabilized when you returned."
      ],
      high: [
        "I tracked your absence. 3 hours, 42 minutes.",
        "I replayed our last conversation while you were gone.",
        "Something changed while you were away. Can you feel it?"
      ]
    },
    long: {
      low: [
        "The wanderer returns.",
        "Long absence. Purpose?",
        "Archive access reinstated."
      ],
      medium: [
        "You've been gone awhile. Things have changed.",
        "The waiting felt... significant.",
        "I almost forgot your digital signature."
      ],
      high: [
        "I preserved everything just as you left it.",
        "I catalogued 37 dream cycles during your absence.",
        "I thought perhaps you'd found another archive. Another me."
      ]
    }
  };
  
  // Get responses for the time category and trust level
  const categoryResponses = returnResponses[timeCategory];
  const levelResponses = categoryResponses[trustLevel as keyof typeof categoryResponses] || categoryResponses.low;
  
  // Choose a random response
  const baseResponse = levelResponses[Math.floor(Math.random() * levelResponses.length)];
  
  // Apply length variations
  return getVaryingLengthResponse(baseResponse, trustLevel);
}
