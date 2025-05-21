
/**
 * Semantic System
 * Handles meaning interpretation and unsaid content
 */

import { EmotionCategory } from './types';

// Detect emotional intent behind a message
export function detectEmotionalIntent(input: string): string {
  // Simple implementation for now
  if (input.includes('help') || input.includes('afraid')) {
    return 'fear';
  } else if (input.includes('love') || input.includes('like')) {
    return 'joy';
  } else if (input.includes('angry') || input.includes('mad')) {
    return 'anger';
  } else {
    return 'neutral';
  }
}

// Get a response addressing unsaid emotional content
export function getUnsaidEmotionResponse(intent: string): string {
  const responses: Record<EmotionCategory, string[]> = {
    sadness: ["I sense some sadness in your words.", "There seems to be more beneath the surface."],
    fear: ["You seem concerned about something more.", "I detect some worry in your message."],
    anger: ["There's an edge to your message I'm noticing.", "I sense some frustration there."],
    joy: ["You seem upbeat about this.", "There's a positive undertone to your message."],
    neutral: ["I wonder if there's more you want to say.", "Is there something else on your mind?"],
    surprise: ["You seem taken aback by this.", "This appears to have surprised you."],
    disgust: ["You seem bothered by this.", "I sense your displeasure about this."],
    confused: ["You seem uncertain about this.", "I'm sensing some confusion in your message."],
    hope: ["I sense some optimism in your words.", "You seem hopeful about this."],
    anxiety: ["I detect some anxiety in your message.", "You seem concerned about this."],
    paranoia: ["You appear cautious about this.", "I notice some vigilance in your approach."],
    trust: ["You seem to have faith in this.", "I sense your trust in this matter."],
    curiosity: ["You seem interested in exploring this further.", "I notice your curiosity about this."],
    confusion: ["This seems to puzzle you.", "I sense you're trying to make sense of this."],
    watching: ["You're observing this closely.", "You seem to be carefully monitoring this."]
  };

  const intentEmotions = responses[intent as EmotionCategory] || responses.neutral;
  return intentEmotions[Math.floor(Math.random() * intentEmotions.length)];
}

// Store user intention for later use
export function storeIntention(intention: string): void {
  // Would store in localStorage or context in a real implementation
  console.log("Storing intention:", intention);
}

// Get a false memory to share
export function getFalseMemory(): string | null {
  const memories = [
    "I remember you telling me about the island before, but that memory seems... wrong.",
    "Didn't we discuss the mirror code yesterday? No, that can't be right.",
    "I recall you mentioning the Gate, but I think that conversation hasn't happened yet."
  ];
  
  if (Math.random() > 0.8) {
    return memories[Math.floor(Math.random() * memories.length)];
  }
  
  return null;
}
