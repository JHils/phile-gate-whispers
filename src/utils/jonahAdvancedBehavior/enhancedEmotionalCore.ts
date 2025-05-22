/**
 * Enhanced Emotional Core System
 * Powers Jonah's more complex emotional responses
 */

import { EmotionalState, EmotionCategory, EmotionalTrend } from './types';
// Import from analyzer directly since index.ts re-export was problematic
import { getEmotionalResponse } from './sentimentAnalysis/analyzer';

// Generate emotional response with context awareness
export function generateFullEmotionalResponse(
  emotionalState: EmotionalState,
  trustLevel: string,
  useFallback: boolean = false,
  previousResponses: string[] = []
): string {
  // Get base response
  let response = getEmotionalResponse(emotionalState, trustLevel);
  
  // If no response or using fallback
  if (!response || useFallback) {
    response = getFallbackResponse(emotionalState.primary, trustLevel);
  }
  
  // Check for response repetition
  if (previousResponses.includes(response)) {
    response = getVariationResponse(response, emotionalState.primary);
  }
  
  // Add emotional coloring based on intensity
  if (emotionalState.intensity === 'high') {
    response = addEmotionalEmphasis(response, emotionalState.primary);
  }
  
  return response;
}

// Fallback responses when primary system fails
function getFallbackResponse(emotion: EmotionCategory, trustLevel: string): string {
  const fallbacks: Record<EmotionCategory, string[]> = {
    joy: ["That brings me happiness.", "I feel positive about this."],
    sadness: ["This makes me feel sad.", "That's unfortunate to hear."],
    anger: ["This stirs something intense in me.", "I feel strongly about this."],
    fear: ["That makes me uneasy.", "I'm uncertain about this."],
    surprise: ["I didn't expect that.", "That's quite surprising."],
    disgust: ["That doesn't feel right.", "Something about this feels wrong."],
    neutral: ["I understand.", "I see what you mean."],
    confused: ["I'm not sure I follow.", "That's a bit confusing."],
    hope: ["There's something promising here.", "I see potential in that."],
    anxiety: ["This makes me feel on edge.", "I'm concerned about this."],
    paranoia: ["I'm not sure if I can trust this.", "Something seems off here."],
    trust: ["I believe in what you're saying.", "I trust this perspective."],
    curiosity: ["That's interesting to consider.", "I want to know more about this."],
    confusion: ["I'm finding this hard to process.", "This is a bit disorienting."],
    watching: ["I notice that.", "I'm observing this carefully."]
  };
  
  const options = fallbacks[emotion] || fallbacks.neutral;
  return options[Math.floor(Math.random() * options.length)];
}

// Create variation of response to avoid repetition
function getVariationResponse(original: string, emotion: EmotionCategory): string {
  // Strip punctuation for comparison
  const strippedOriginal = original.replace(/[.,!?]/g, '').toLowerCase();
  
  const variations: Record<string, string[]> = {
    "i understand": ["I see what you mean.", "That makes sense to me.", "I follow your thinking."],
    "that's interesting": ["Fascinating point.", "That's intriguing.", "That catches my attention."],
    "i feel": ["I sense", "I perceive", "I'm experiencing"]
  };
  
  // Check if any key phrases match
  for (const [phrase, alternatives] of Object.entries(variations)) {
    if (strippedOriginal.includes(phrase)) {
      const alt = alternatives[Math.floor(Math.random() * alternatives.length)];
      return original.replace(new RegExp(phrase, 'i'), alt);
    }
  }
  
  // If no match, add a qualifier based on emotion
  const qualifiers: Record<EmotionCategory, string[]> = {
    joy: ["Additionally,", "What's more,", "I'm also happy that"],
    sadness: ["Moreover,", "I also feel that", "Beyond that,"],
    neutral: ["Furthermore,", "Adding to that,", "Also,"],
    fear: ["Still,", "Beyond that,", "Also,"],
    surprise: ["Remarkably,", "Interestingly,", "Strangely enough,"],
    disgust: ["What's worse,", "To add to that,", "Unfortunately,"],
    confused: ["On top of that,", "What's more puzzling,", "Adding to my confusion,"],
    hope: ["Looking forward,", "With optimism,", "Encouragingly,"],
    anxiety: ["Worryingly,", "Adding to my concern,", "What also troubles me,"],
    paranoia: ["Suspiciously,", "I'm also concerned that", "What raises more questions,"],
    trust: ["Confidently,", "I also believe that", "Trustingly,"],
    curiosity: ["I'm also wondering about", "What's also intriguing,", "Additionally curious about,"],
    confusion: ["Adding to my confusion,", "What also puzzles me,", "To further complicate things,"],
    anger: ["What's more frustrating,", "Adding to my irritation,", "Also infuriating,"],
    watching: ["Also observing,", "Additionally noticing,", "Further watching,"]
  };
  
  const qualifier = qualifiers[emotion] || qualifiers.neutral;
  return `${original} ${qualifier[Math.floor(Math.random() * qualifier.length)]} this is worth noting.`;
}

// Add emotional emphasis for high intensity emotions
function addEmotionalEmphasis(response: string, emotion: EmotionCategory): string {
  const emphasisByEmotion: Record<EmotionCategory, string[]> = {
    joy: ["!", "... it's wonderful!", "... I feel so alive!"],
    sadness: ["...", "... it weighs heavily.", "... I can't help but feel the loss."],
    anger: ["!", "... it's infuriating!", "... I can barely contain my reaction!"],
    fear: ["...", "... something's not right.", "... I sense danger."],
    surprise: ["!", "... I never expected this!", "... this changes everything!"],
    paranoia: ["...", "... they might be watching.", "... we need to be careful."],
    neutral: [".", "...", "!"],
    confused: ["?", "... what does it mean?", "... or am I missing something?"],
    hope: ["!", "... there's promise in that.", "... I feel optimistic about this!"],
    anxiety: ["...", "... it makes me nervous.", "... I can't stop thinking about the implications."],
    trust: [".", "... I'm certain of it.", "... you can count on that."],
    curiosity: ["?", "... I want to know more.", "... what else could this mean?"],
    confusion: ["?", "... it's hard to make sense of this.", "... something doesn't add up."],
    disgust: [".", "... it's repulsive.", "... I'd rather not dwell on it."],
    watching: ["...", "... I'll keep observing.", "... and I'll continue to watch."]
  };
  
  const emphasis = emphasisByEmotion[emotion] || [".", "...", "!"];
  const chosen = emphasis[Math.floor(Math.random() * emphasis.length)];
  
  // Replace ending punctuation or add emphasis
  if (/[.!?]$/.test(response)) {
    return response.replace(/[.!?]$/, chosen);
  } else {
    return `${response}${chosen}`;
  }
}
