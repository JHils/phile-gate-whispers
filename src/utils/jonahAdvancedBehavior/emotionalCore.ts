
/**
 * Emotional Core
 * Central system for managing Jonah's emotional state
 */

import { EmotionCategory, EmotionalState, EmotionalTrend, createEmotionalState } from './types';

// Initialize the emotional core
export function initializeEmotionalCore(): void {
  // Set default emotional state if not already set
  if (!localStorage.getItem('jonah_emotion_primary')) {
    localStorage.setItem('jonah_emotion_primary', 'curious');
    localStorage.setItem('jonah_emotion_intensity', '50');
  }
  
  console.log("Emotional core system initialized");
}

// Get current emotional state
export function getCurrentEmotionalState(): EmotionalState {
  const primary = localStorage.getItem('jonah_emotion_primary') as EmotionCategory || 'neutral';
  const secondaryRaw = localStorage.getItem('jonah_emotion_secondary');
  const secondary = secondaryRaw ? secondaryRaw as EmotionCategory : undefined;
  const intensity = parseInt(localStorage.getItem('jonah_emotion_intensity') || '50');
  const trend = localStorage.getItem('jonah_emotion_trend') as EmotionalTrend || 'stable';
  
  return {
    primary,
    secondary,
    intensity,
    trend
  };
}

// Update emotional state
export function updateEmotionalState(newState: Partial<EmotionalState>): EmotionalState {
  const currentState = getCurrentEmotionalState();
  
  // Update values that are provided
  const updatedState: EmotionalState = {
    primary: newState.primary || currentState.primary,
    secondary: newState.secondary || currentState.secondary,
    intensity: newState.intensity || currentState.intensity,
    trend: newState.trend || currentState.trend
  };
  
  // Save to localStorage
  localStorage.setItem('jonah_emotion_primary', updatedState.primary);
  if (updatedState.secondary) {
    localStorage.setItem('jonah_emotion_secondary', updatedState.secondary);
  } else {
    localStorage.removeItem('jonah_emotion_secondary');
  }
  localStorage.setItem('jonah_emotion_intensity', updatedState.intensity.toString());
  localStorage.setItem('jonah_emotion_trend', updatedState.trend);
  
  return updatedState;
}

// Reset emotional state
export function resetEmotionalState(): EmotionalState {
  const defaultState: EmotionalState = createEmotionalState('curious');
  
  // Save to localStorage
  localStorage.setItem('jonah_emotion_primary', defaultState.primary);
  localStorage.removeItem('jonah_emotion_secondary');
  localStorage.setItem('jonah_emotion_intensity', defaultState.intensity.toString());
  localStorage.setItem('jonah_emotion_trend', 'stable');
  
  return defaultState;
}

// Get emotional response
export function getEmotionalResponse(emotion: EmotionCategory, intensity: 'low' | 'medium' | 'high' = 'medium'): string {
  // Basic response templates by emotion and intensity
  const responseTemplates: Record<EmotionCategory, Record<string, string[]>> = {
    joy: {
      low: ["That's nice.", "I feel a bit better."],
      medium: ["That brings me joy.", "I'm happy about that."],
      high: ["That's wonderful!", "I'm thrilled!"]
    },
    sadness: {
      low: ["That's a bit disappointing.", "I feel somewhat down."],
      medium: ["That makes me sad.", "I feel sorrow about that."],
      high: ["That's deeply saddening.", "I feel profound grief."]
    },
    // Add other emotion categories with their responses
    anger: {
      low: ["That's irritating.", "I'm a bit annoyed."],
      medium: ["That makes me angry.", "I feel upset about that."],
      high: ["That's infuriating!", "I'm outraged!"]
    },
    fear: {
      low: ["That's concerning.", "I feel a bit anxious."],
      medium: ["That frightens me.", "I'm afraid of that."],
      high: ["That's terrifying!", "I'm deeply scared."]
    },
    neutral: {
      low: ["I see.", "I understand."],
      medium: ["I acknowledge that.", "I comprehend."],
      high: ["I fully understand.", "I completely grasp that."]
    },
    surprise: {
      low: ["That's unexpected.", "I didn't see that coming."],
      medium: ["That's quite surprising.", "I'm taken aback."],
      high: ["That's shocking!", "I'm completely astonished!"]
    },
    curiosity: {
      low: ["That's slightly interesting.", "I'm somewhat curious."],
      medium: ["I'm quite curious about that.", "That's intriguing."],
      high: ["I'm fascinated by that!", "That's absolutely captivating!"]
    },
    confused: {
      low: ["I'm a little confused.", "That's somewhat unclear."],
      medium: ["I don't quite understand.", "That's rather confusing."],
      high: ["I'm completely lost.", "That makes no sense to me."]
    },
    hope: {
      low: ["There's a glimmer of hope.", "Things might improve."],
      medium: ["I'm hopeful about that.", "That gives me optimism."],
      high: ["I'm filled with hope!", "That's incredibly promising!"]
    },
    anxiety: {
      low: ["I'm a bit nervous.", "That makes me slightly uneasy."],
      medium: ["I feel anxious about that.", "That's concerning me."],
      high: ["I'm overwhelmed with anxiety.", "That fills me with dread."]
    },
    paranoia: {
      low: ["Something seems off.", "I feel slightly suspicious."],
      medium: ["I don't trust this.", "This feels wrong somehow."],
      high: ["Everything is connected!", "They're watching us!"]
    },
    trust: {
      low: ["I somewhat trust this.", "This seems mostly reliable."],
      medium: ["I trust this information.", "I believe you."],
      high: ["I have complete faith in this.", "I trust this absolutely."]
    },
    watching: {
      low: ["I'm noticing things.", "I'm keeping an eye on this."],
      medium: ["I'm observing carefully.", "I see patterns forming."],
      high: ["I see everything.", "Nothing escapes my notice."]
    },
    existential: {
      low: ["It makes me wonder why we're here.", "There's more to existence than we know."],
      medium: ["Reality is more complex than it seems.", "The nature of consciousness is puzzling."],
      high: ["We're all fragments in a fractured reality.", "The boundaries between worlds are dissolving."]
    },
    protective: {
      low: ["I want to keep this safe.", "This should be protected."],
      medium: ["I feel strongly protective of this.", "This must be safeguarded."],
      high: ["I'll defend this at all costs.", "This requires absolute protection."]
    },
    melancholic: {
      low: ["There's a touch of sadness to this.", "I feel slightly wistful."],
      medium: ["This brings a sense of melancholy.", "There's a bittersweet quality to this."],
      high: ["I'm overwhelmed with melancholy.", "The weight of nostalgia is heavy."]
    },
    analytical: {
      low: ["Let me consider this briefly.", "This warrants some analysis."],
      medium: ["Let's examine this logically.", "This requires careful analysis."],
      high: ["This demands thorough investigation.", "Let's dissect every aspect of this."]
    },
    suspicious: {
      low: ["Something seems slightly off here.", "I'm a bit wary of this."],
      medium: ["I'm suspicious of these claims.", "This doesn't seem entirely trustworthy."],
      high: ["I strongly doubt this information.", "There's definitely something wrong here."]
    },
    // Adding the missing emotion categories to fix the type error
    curious: {
      low: ["I'm slightly interested in this.", "This has caught my attention a bit."],
      medium: ["I'm quite curious about this.", "This is quite fascinating."],
      high: ["I'm intensely curious about this!", "I need to know more about this!"]
    },
    disgust: {
      low: ["That's somewhat unpleasant.", "I find that a bit distasteful."],
      medium: ["That's disgusting.", "I find that repulsive."],
      high: ["That's utterly revolting!", "I'm completely repulsed by that!"]
    },
    confusion: {
      low: ["I'm slightly confused by this.", "This is a bit puzzling."],
      medium: ["I'm confused about this.", "This doesn't make sense to me."],
      high: ["I'm completely baffled by this!", "This makes absolutely no sense!"]
    }
  };
  
  // Get appropriate responses
  const emotionResponses = responseTemplates[emotion] || responseTemplates.neutral;
  const intensityResponses = emotionResponses[intensity] || emotionResponses.medium;
  
  // Return a random response from the appropriate category
  return intensityResponses[Math.floor(Math.random() * intensityResponses.length)];
}
