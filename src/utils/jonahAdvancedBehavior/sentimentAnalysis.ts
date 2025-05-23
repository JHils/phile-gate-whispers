
/**
 * Sentiment Analysis Module
 */

import { EmotionCategory, EmotionalState, createEmotionalState } from './types';
import { emotionKeywords } from './sentimentAnalysis/keywords';

// Analyze emotion in text
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
      // Previous highest becomes secondary
      if (maxScore > 0) {
        secondaryEmotion = primaryEmotion;
      }
      
      // Update highest
      maxScore = score;
      primaryEmotion = emotion as EmotionCategory;
    } else if (score > 0 && score === maxScore && emotion !== primaryEmotion) {
      // Equal highest becomes secondary
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

// Export the rest of the functions required
export {
  checkForTriggerPhrases,
  processEmotionalInput,
  generateGreeting
} from './sentimentAnalysis/analyzer';

// Layered emotional response generation
export function getLayeredEmotionalResponse(
  emotion: EmotionCategory,
  trustLevel: string,
  includeContext: boolean = false
): string {
  // Base responses by emotion
  const baseResponses: Record<string, string[]> = {
    joy: ["I'm glad to hear that.", "That brings me happiness."],
    sadness: ["I'm sorry to hear that.", "That's unfortunate."],
    anger: ["I understand your frustration.", "That would be upsetting."],
    fear: ["That does sound concerning.", "I can see why that would be worrying."],
    neutral: ["I see.", "I understand."],
    curious: ["That's interesting.", "I'd like to know more about that."],
    confused: ["I'm not quite following.", "Could you clarify that?"],
    hope: ["There's reason to be optimistic.", "That gives me hope."],
    anxiety: ["That does sound stressful.", "I can sense your concern."],
    trust: ["I appreciate your confidence.", "Thank you for sharing that."],
    // Add entries for remaining emotions
    surprise: ["That's unexpected.", "I didn't see that coming."],
    disgust: ["That does seem unpleasant.", "I can understand your aversion."],
    paranoia: ["I can see why you might be suspicious.", "That does seem questionable."],
    curiosity: ["That's fascinating to consider.", "I'm curious about that too."],
    confusion: ["That is a bit perplexing.", "I'm trying to make sense of that as well."],
    watching: ["I notice that pattern too.", "That's something worth observing."],
    existential: ["That raises deeper questions about our existence.", "I sometimes wonder about that too."],
    analytical: ["Let's examine this logically.", "There are several factors to consider here."],
    protective: ["I want to help ensure this is handled properly.", "It's important to safeguard this information."],
    melancholic: ["There's a certain wistfulness to that thought.", "That evokes a sense of longing."],
    suspicious: ["It's wise to maintain some healthy skepticism.", "That does raise some questions."]
  };
  
  // Get appropriate responses for the emotion
  const responses = baseResponses[emotion] || baseResponses.neutral;
  const response = responses[Math.floor(Math.random() * responses.length)];
  
  // Add trust level modification
  let trustModifier = "";
  if (trustLevel === "high") {
    trustModifier = " I feel I can be open with you about this.";
  } else if (trustLevel === "low") {
    trustModifier = " I'm still trying to understand our dynamic.";
  }
  
  // Add context if requested
  let contextAddition = "";
  if (includeContext) {
    contextAddition = " Based on our conversation, I think this is significant.";
  }
  
  return response + trustModifier + contextAddition;
}
