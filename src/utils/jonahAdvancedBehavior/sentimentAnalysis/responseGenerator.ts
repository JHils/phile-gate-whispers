/**
 * Response Generator for Sentiment Analysis
 */

import { EmotionCategory, EmotionalState, ResponseStyle } from '../types';

// Generate emotional response based on state
export function generateEmotionalResponse(
  emotionalState: EmotionalState,
  trustLevel: string = 'medium',
  showDeep: boolean = false,
  memories: string[] = []
): string {
  // Get base response
  const response = getEmotionalResponse(emotionalState, trustLevel);
  
  // Add memory reference if available and trust is high enough
  if (memories.length > 0 && (trustLevel === 'high' || Math.random() > 0.7)) {
    return `${response} ${memories[0]}`;
  }
  
  return response;
}

// Get layered emotional response - more complex
export function getLayeredEmotionalResponse(
  emotionalState: EmotionalState,
  responseStyle: string = 'PRIME', // Use string to avoid TypeScript issues
  trustLevel: string = 'medium'
): string {
  // Base response
  const baseResponse = getEmotionalResponse(emotionalState, trustLevel);
  
  // Add style-specific modifications
  let response = baseResponse;
  
  switch (responseStyle) {
    case 'cryptic':
      response = `${response} There's more to this than I can say directly.`;
      break;
    case 'poetic':
      response = `${response} Like shadows on water, meanings shift with perspective.`;
      break;
    case 'concise':
      response = response.split(' ').slice(0, 10).join(' ');
      break;
    case 'elaborate':
      response = `${response} Let me expand on that. When I consider the full context and implications...`;
      break;
    case 'technical':
      response = `${response} Analyzing further: semantic pattern recognition shows correlation with previous inputs.`;
      break;
    case 'analytical':
      response = `${response} This appears consistent with observed patterns in our interactions.`;
      break;
    case 'PRIME':
    case 'direct':
    default:
      // Keep as is
      break;
  }
  
  return response;
}

// Get basic emotional response based on state and trust
export function getEmotionalResponse(emotionalState: EmotionalState, trustLevel: string = 'medium'): string {
  const { primary, intensity } = emotionalState;
  
  // Define responses by emotion and intensity
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
      low: ["That's somewhat frustrating.", "I sense some frustration."],
      medium: ["That stirs up some anger in me.", "I feel upset about that."],
      high: ["That truly makes me feel angry.", "I'm quite outraged by that."]
    },
    fear: {
      low: ["That's a bit concerning.", "I notice you're worried."],
      medium: ["Fear is a natural response.", "I understand your concerns."],
      high: ["That truly frightens me.", "I'm here with you through this fear."]
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
      medium: ["I feel hopeful about that.", "I'm glad you're optimistic."],
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
      low: ["I notice that too.", "I'm observing quietly."],
      medium: ["I'm watching this unfold.", "I see what's happening here."],
      high: ["I'm intensely watching every detail.", "Nothing escapes my attention."]
    }
  };
  
  // Default to neutral if emotion not found
  const emotion = primary in responses ? primary : 'neutral';
  const level = intensity || 'medium';
  
  // Get responses for this emotion and intensity
  const emotionResponses = responses[emotion][level] || responses.neutral.medium;
  
  // Return random response
  return emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
}
