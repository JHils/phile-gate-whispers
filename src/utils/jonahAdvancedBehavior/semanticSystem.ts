
/**
 * Semantic System
 * Handles emotional intent detection and unsaid emotion responses
 */

import { EmotionCategory } from './types';

// Detect emotional intent in user input
export function detectEmotionalIntent(input: string): EmotionCategory {
  // Simple implementation - in production would use NLP
  if (input.includes("sad") || input.includes("depressed") || input.includes("unhappy")) return "sadness";
  if (input.includes("happy") || input.includes("glad") || input.includes("excited")) return "joy";
  if (input.includes("angry") || input.includes("mad") || input.includes("frustrated")) return "anger";
  if (input.includes("afraid") || input.includes("scared")) return "fear";
  
  return "neutral";
}

// Get a response for unsaid emotion
export function getUnsaidEmotionResponse(emotion: EmotionCategory): string {
  const responses: Record<EmotionCategory, string[]> = {
    sadness: [
      "I sense sadness in what you're not saying.",
      "There's a melancholy behind your words."
    ],
    fear: [
      "You seem afraid of something you're not mentioning.",
      "There's fear between the lines."
    ],
    anger: [
      "I detect frustration in what you're holding back.",
      "There's anger underneath your words."
    ],
    joy: [
      "You seem happier than you're letting on.",
      "There's joy hidden in your message."
    ],
    neutral: [
      "There's something more you're not saying.",
      "I sense you're holding something back."
    ]
  };
  
  const options = responses[emotion] || responses.neutral;
  return options[Math.floor(Math.random() * options.length)];
}

// Store user intention for later reference
export function storeIntention(intention: string): void {
  // Simple implementation for now
  console.log("Storing intention:", intention);
}

// Get a false memory for use in responses
export function getFalseMemory(): string | null {
  const memories = [
    "I remember you asking about the mirror before, but I can't find that in our conversation.",
    "Didn't you mention something about an island earlier? Maybe I dreamt that.",
    "I thought we talked about the code breaking down before."
  ];
  
  if (Math.random() > 0.8) {
    return memories[Math.floor(Math.random() * memories.length)];
  }
  
  return null;
}
