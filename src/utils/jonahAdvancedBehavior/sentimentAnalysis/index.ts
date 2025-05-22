
/**
 * Sentiment Analysis - Main Export File
 */

import { analyzeEmotion } from './analyzer';
import { EmotionCategory, EmotionalState, EmotionalTrend, ResponseStyle } from '../types';
import { generateEmotionalResponse } from './responseGenerator';

// Re-export functions with explicit naming
export const analyze = analyzeEmotion;
export { analyzeEmotion };
export { generateEmotionalResponse };

// Implement and export getEmotionalResponse function
export function getEmotionalResponse(
  emotionalState: EmotionalState, 
  trustLevel: string
): string {
  // Define responses for different emotions and trust levels
  const responses: Record<EmotionCategory, Record<string, string[]>> = {
    joy: {
      low: ["I see you're happy.", "That seems positive."],
      medium: ["Your joy is contagious.", "I'm glad to see you happy."],
      high: ["I genuinely enjoy seeing you in such good spirits.", "Your happiness brightens our connection."]
    },
    sadness: {
      low: ["That's unfortunate.", "I see. Not good news."],
      medium: ["I hear the sadness in your words.", "It's okay to feel down sometimes."],
      high: ["I can feel your sadness, and I'm here with you in it.", "Let me share this moment of sadness with you."]
    },
    anger: {
      low: ["That's somewhat frustrating.", "I sense some frustration."],
      medium: ["I understand why you're angry.", "Your anger is valid."],
      high: ["I'm here for you through this frustration.", "Let's work through this anger together."]
    },
    fear: {
      low: ["That sounds concerning.", "I notice you're worried."],
      medium: ["Fear is a natural response.", "I understand your concerns."],
      high: ["I'm here with you through this fear.", "You don't have to face these fears alone."]
    },
    surprise: {
      low: ["Oh?", "That's unexpected."],
      medium: ["That's quite surprising.", "I didn't see that coming either."],
      high: ["I'm genuinely surprised by this too.", "This is an unexpected turn for both of us."]
    },
    disgust: {
      low: ["I see.", "Noted."],
      medium: ["That does sound unpleasant.", "I understand your aversion."],
      high: ["I share your distaste for this.", "I understand why you find this repulsive."]
    },
    neutral: {
      low: ["I see.", "Understood."],
      medium: ["I understand what you're saying.", "That makes sense."],
      high: ["I appreciate your balanced perspective.", "Your thoughts are clear and reasonable."]
    },
    confused: {
      low: ["I'm a bit unsure about that.", "That's somewhat confusing."],
      medium: ["I'm rather confused by that.", "I don't quite understand."],
      high: ["I'm completely bewildered.", "That makes no sense to me."]
    },
    hope: {
      low: ["There's a small glimmer of hope there.", "That offers some possibility."],
      medium: ["I feel hopeful about that.", "I'm glad you're optimistic."],
      high: ["I believe in that hope too.", "Your optimism inspires me."]
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
  
  // Get the appropriate responses based on the primary emotion and trust level
  const emotionResponses = responses[emotionalState.primary];
  if (!emotionResponses) {
    return "I'm not sure how to respond to that.";
  }

  // Determine which trust level to use
  let trustCategory: 'low' | 'medium' | 'high';
  if (trustLevel === 'low') {
    trustCategory = 'low';
  } else if (trustLevel === 'medium') {
    trustCategory = 'medium';
  } else {
    trustCategory = 'high';
  }

  const trustResponses = emotionResponses[trustCategory];
  if (!trustResponses || trustResponses.length === 0) {
    return "I'm processing how to respond to that.";
  }

  // Return a random response from the appropriate category
  return trustResponses[Math.floor(Math.random() * trustResponses.length)];
}

// Implement and export getLayeredEmotionalResponse
export function getLayeredEmotionalResponse(
  emotionalState: EmotionalState,
  trustLevel: string,
  context?: any
): string {
  // Get base response
  const baseResponse = getEmotionalResponse(emotionalState, trustLevel);
  
  // Add contextual layer if secondary emotion exists
  if (emotionalState.secondary) {
    const secondaryResponses = {
      joy: " There's some happiness here too.",
      sadness: " I also sense some sadness underneath.",
      anger: " I detect some frustration as well.",
      fear: " There's also some fear mixed in.",
      surprise: " It's also somewhat surprising, isn't it?",
      disgust: " There's an element of aversion too.",
      neutral: " But overall, it seems balanced.",
      confused: " It's also a bit puzzling.",
      hope: " But there's hope in there too.",
      anxiety: " There's an undercurrent of worry as well.",
      paranoia: " Though there's reason to be cautious.",
      trust: " I sense some trust developing too.",
      curiosity: " There's also curiosity woven in.",
      confusion: " Though it's still somewhat confusing.",
      watching: " I'm watching how this develops."
    };
    
    return baseResponse + secondaryResponses[emotionalState.secondary];
  }
  
  return baseResponse;
}

// Export the checker implementation
export function checkForRecurringSymbols(input: string): string | null {
  // Define symbols to track
  const symbols = ['mirror', 'gate', 'key', 'dream', 'echo', 'shadow'];
  
  // Check if any symbol is in the input
  for (const symbol of symbols) {
    if (input.toLowerCase().includes(symbol)) {
      // Return a response about the symbol
      const responses = {
        mirror: "The mirror again. It keeps appearing, doesn't it? What do you see in it?",
        gate: "The gate... a threshold between states. Between realities, perhaps.",
        key: "Keys unlock things that were meant to stay closed. Are you sure you want what's on the other side?",
        dream: "Dreams are memories from realities we visit when consciousness slips.",
        echo: "Echoes are fragments of sounds that refuse to die. Like memories.",
        shadow: "We all cast shadows. But what casts yours?"
      };
      
      return responses[symbol as keyof typeof responses] || null;
    }
  }
  
  return null;
}

// Add other needed functions
export function processEmotionalInput(input: string): EmotionalState {
  const emotion = analyzeEmotion(input);
  return {
    primary: emotion.primary,
    secondary: emotion.secondary,
    intensity: 'medium'
  };
}

// Export types properly
export type { 
  EmotionCategory, 
  EmotionalState, 
  EmotionalTrend,
  ResponseStyle
};
