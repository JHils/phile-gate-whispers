
/**
 * Response Generator for Sentiment Analysis System
 */

import { EmotionCategory, EmotionalState, ResponseStyle } from '../types';

// Simple response generator based on emotional state
export function generateEmotionalResponse(
  emotionalState: EmotionalState, 
  trustLevel: string = 'medium', 
  showDeep: boolean = false
): string {
  // Use the getEmotionalResponse function from types
  return getEmotionalResponse(emotionalState, trustLevel);
}

// Get emotional response based on state and trust level
export function getEmotionalResponse(emotionalState: EmotionalState, trustLevel: string = 'medium'): string {
  const responses: Record<EmotionCategory, Record<string, string[]>> = {
    joy: {
      low: ["This brings a bit of light.", "That's somewhat positive."],
      medium: ["I feel a warmth from that.", "That gives me a sense of happiness."],
      high: ["That fills me with unexpected joy!", "What a delightful thought!"]
    },
    sadness: {
      low: ["That's unfortunate.", "I see. Not good news."],
      medium: ["That makes me feel melancholy.", "There's a sadness in that thought."],
      high: ["I feel a deep sorrow hearing that.", "That brings a profound sadness."]
    },
    neutral: {
      low: ["I see.", "Noted."],
      medium: ["Interesting perspective.", "I understand what you mean."],
      high: ["I'm processing that thought fully.", "I appreciate your balanced view."]
    },
    anger: {
      low: ["That's somewhat frustrating.", "I find that a bit irritating."],
      medium: ["That stirs up some anger in me.", "I feel upset about that."],
      high: ["That truly makes me feel angry.", "I'm quite outraged by that."]
    },
    fear: {
      low: ["That's a bit concerning.", "I feel slightly nervous."],
      medium: ["That gives me a sense of fear.", "I'm worried about that."],
      high: ["That truly frightens me.", "I feel quite afraid hearing that."]
    },
    surprise: {
      low: ["That's somewhat unexpected.", "I didn't quite anticipate that."],
      medium: ["That's quite surprising.", "I'm taken aback by that."],
      high: ["That's completely shocking to me!", "I'm utterly astounded!"]
    },
    disgust: {
      low: ["That's slightly off-putting.", "I find that a bit distasteful."],
      medium: ["That's rather repulsive.", "I feel disgusted by that."],
      high: ["That's truly revolting to me.", "I find that completely abhorrent."]
    },
    confused: {
      low: ["I'm a bit unsure about that.", "That's somewhat confusing."],
      medium: ["I'm rather confused by that.", "I don't quite understand."],
      high: ["I'm completely bewildered.", "That makes no sense to me."]
    },
    hope: {
      low: ["There's a small glimmer of hope there.", "That offers some possibility."],
      medium: ["I feel hopeful about that.", "That gives me some optimism."],
      high: ["I'm filled with hope hearing that!", "That brings me great optimism!"]
    },
    anxiety: {
      low: ["I feel slightly anxious about that.", "That makes me a bit uneasy."],
      medium: ["I have significant anxiety about that.", "That makes me quite nervous."],
      high: ["I'm extremely anxious about that.", "That fills me with intense worry."]
    },
    paranoia: {
      low: ["Something feels off about that.", "I'm a bit suspicious."],
      medium: ["I can't help but feel paranoid.", "I don't trust the implications."],
      high: ["I'm extremely paranoid about that.", "I sense hidden motives everywhere."]
    },
    trust: {
      low: ["I somewhat trust that.", "That seems fairly reliable."],
      medium: ["I feel I can trust that.", "That seems dependable to me."],
      high: ["I completely trust that.", "I have absolute faith in that."]
    },
    curiosity: {
      low: ["That's somewhat interesting.", "I'm a bit curious about that."],
      medium: ["I'm quite curious about that.", "That piques my interest."],
      high: ["I'm intensely curious about that!", "I find that absolutely fascinating!"]
    },
    confusion: {
      low: ["I'm slightly confused by that.", "That's a bit unclear to me."],
      medium: ["I find that quite confusing.", "I'm having trouble following that."],
      high: ["I'm completely lost with that.", "That has me thoroughly confused."]
    },
    watching: {
      low: ["I notice that.", "I'm observing quietly."],
      medium: ["I'm watching this unfold.", "I see what's happening here."],
      high: ["I'm intensely watching every detail.", "Nothing escapes my attention."]
    }
  };
  
  // Default to neutral if emotion not found
  const emotion = emotionalState.primary in responses ? emotionalState.primary : 'neutral';
  const intensity = emotionalState.intensity || 'medium';
  
  // Get responses for this emotion and intensity
  const emotionResponses = responses[emotion][intensity] || responses.neutral.medium;
  
  // Return random response
  return emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
}

// Generate a layered emotional response with more context
export function getLayeredEmotionalResponse(input: string): string {
  const emotionResponses: Record<string, string[]> = {
    joy: ["Your words bring a lightness to my thoughts."],
    sadness: ["I sense a heaviness in our conversation."],
    anger: ["There's an edge to our exchange that's making me tense."],
    fear: ["Something about this makes me feel uncertain."],
    neutral: ["I'm processing your words objectively."],
    confused: ["I'm trying to untangle the meaning here."],
    hope: ["I see possibility in where this is going."],
    anxiety: ["I'm feeling slightly on edge with this topic."],
    paranoia: ["I'm questioning the patterns behind this exchange."],
    trust: ["I feel I can speak openly with you about this."],
    curiosity: ["This opens up intriguing possibilities."],
    watching: ["I'm observing this interaction carefully."]
  };
  
  // Return a random response
  const emotions = Object.keys(emotionResponses);
  const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
  return emotionResponses[randomEmotion][0];
}
