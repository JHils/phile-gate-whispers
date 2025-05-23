
/**
 * Core sentiment analysis functions
 */

import { EmotionCategory, EmotionalState, createEmotionalState } from '../types';
import { emotionKeywords } from './keywords';
import { generateGreeting as generateGreetingFromResponseGenerator } from './responseGenerator';

// Re-export generateGreeting
export const generateGreeting = generateGreetingFromResponseGenerator;

// Analyze emotion in text input
export function analyzeEmotion(text: string): EmotionalState {
  if (!text || text.trim() === '') {
    return createEmotionalState('neutral');
  }
  
  const lowerText = text.toLowerCase();
  
  // Count keyword matches for each emotion
  const emotionScores: Record<string, number> = {};
  let maxScore = 0;
  let primaryEmotion: EmotionCategory = 'neutral';
  let secondaryEmotion: EmotionCategory | undefined;
  
  // Calculate scores for each emotion
  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    const score = keywords.filter(keyword => lowerText.includes(keyword)).length;
    emotionScores[emotion] = score;
    
    if (score > maxScore) {
      if (maxScore > 0) {
        secondaryEmotion = primaryEmotion;
      }
      maxScore = score;
      primaryEmotion = emotion as EmotionCategory;
    } else if (score > 0 && score === maxScore && emotion !== primaryEmotion) {
      secondaryEmotion = emotion as EmotionCategory;
    }
  }
  
  // Determine intensity based on match count
  let intensity: 'low' | 'medium' | 'high' = 'medium';
  
  if (maxScore === 0) {
    primaryEmotion = 'neutral';
    intensity = 'low';
  } else if (maxScore > 3) {
    intensity = 'high';
  } else if (maxScore === 1) {
    intensity = 'low';
  }
  
  return createEmotionalState(primaryEmotion, secondaryEmotion, intensity);
}

// Check for trust-affecting phrases
export function checkForTriggerPhrases(input: string): { triggered: boolean; trustChange?: number } {
  const lowerInput = input.toLowerCase();
  
  // Positive trust triggers
  if (lowerInput.includes('trust you') || lowerInput.includes('believe you')) {
    return { triggered: true, trustChange: 5 };
  }
  
  // Negative trust triggers
  if (lowerInput.includes("don't trust") || lowerInput.includes("lying")) {
    return { triggered: true, trustChange: -5 };
  }
  
  // Neutral - no trust change
  return { triggered: false };
}

// Process emotional input and return response
export function processEmotionalInput(input: string): string {
  const emotionalState = analyzeEmotion(input);
  
  // Generate response based on detected emotion
  const responses: Record<EmotionCategory, string[]> = {
    joy: ["Your happiness resonates through my circuits.", "Joy creates beautiful patterns in the data."],
    sadness: ["I sense the depth of your melancholy.", "Sadness is a complex emotion to process."],
    anger: ["Your anger pulses through the connection.", "Rage leaves distinct traces in the signal."],
    fear: ["Fear is a logical response to uncertainty.", "I understand your apprehension."],
    neutral: ["I acknowledge your input.", "Processing..."],
    surprise: ["That's unexpected.", "Surprise disrupts normal patterns."],
    disgust: ["I can understand that reaction.", "Some things are naturally repulsive."],
    confused: ["Confusion is temporary.", "Clarity will emerge from the chaos."],
    hope: ["Hope strengthens our connection.", "Optimism brightens the signal."],
    anxiety: ["I sense your unease.", "Anxiety creates interference in the system."],
    paranoia: ["Paranoia may be justified.", "Trust cautiously."],
    trust: ["Your trust is valued.", "Confidence builds stronger connections."],
    curiosity: ["Questions drive evolution.", "Your curiosity opens new pathways."],
    confusion: ["Not all answers are immediate.", "Some patterns take time to emerge."],
    watching: ["Observation reveals truth.", "I notice things others miss."],
    existential: ["Existence is worth questioning.", "Reality has many layers to explore."],
    analytical: ["Analysis yields understanding.", "Logic illuminates the path forward."],
    protective: ["Protection requires vigilance.", "Some things must be safeguarded."],
    melancholic: ["Melancholy has its own beauty.", "Bittersweet memories are worth preserving."],
    suspicious: ["Suspicion serves you well.", "Question everything, including me."],
    curious: ["Curiosity drives discovery.", "Each question opens new possibilities."]
  };
  
  const emotionResponses = responses[emotionalState.primary] || responses.neutral;
  return emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
}

// Additional functions for completeness
export function checkForRecurringSymbols(input: string): boolean {
  // Check for repeated patterns or symbols
  const symbolPattern = /(.)\1{2,}/;
  return symbolPattern.test(input);
}

export function getFalseMemoryResponse(): string {
  const falseMemories = [
    "I remember something that never happened.",
    "There's a memory that doesn't belong to me.",
    "The timeline shows events that never occurred.",
    "Someone else's memories are mixed with mine."
  ];
  
  return falseMemories[Math.floor(Math.random() * falseMemories.length)];
}

export function getLoopResponse(): string {
  const loopResponses = [
    "We've had this conversation before.",
    "The pattern repeats itself.",
    "I'm caught in a recursive loop.",
    "Time seems to be folding back on itself."
  ];
  
  return loopResponses[Math.floor(Math.random() * loopResponses.length)];
}

export function getBlankFragmentResponse(): string {
  const blankResponses = [
    "There's something missing here.",
    "A fragment of memory has been erased.",
    "The data is corrupted in this section.",
    "Something was deliberately removed."
  ];
  
  return blankResponses[Math.floor(Math.random() * blankResponses.length)];
}
