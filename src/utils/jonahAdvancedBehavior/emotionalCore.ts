
/**
 * Emotional Core System
 * Manages Jonah's emotional states and responses
 */

import { EmotionCategory } from './types';

// Emotional state interface
export interface EmotionalState {
  primary: EmotionCategory;
  secondary: EmotionCategory | null;
  intensity: 'low' | 'medium' | 'high';
  lastUpdated: number;
}

// Initialize emotional core
export function initializeEmotionalCore(): boolean {
  console.log("Echo system initialized");
  
  // Set default emotional state if not already set
  if (!localStorage.getItem('jonah_emotion')) {
    const defaultState: EmotionalState = {
      primary: 'neutral',
      secondary: null,
      intensity: 'medium',
      lastUpdated: Date.now()
    };
    
    localStorage.setItem('jonah_emotion', JSON.stringify(defaultState));
    
    // Update global variables
    localStorage.setItem('jonah_emotion_primary', 'neutral');
    localStorage.setItem('jonah_emotion_intensity', 'medium');
  }
  
  return true;
}

// Get current emotional state
export function getEmotionalState(): EmotionalState {
  try {
    const state = JSON.parse(localStorage.getItem('jonah_emotion') || '{}');
    
    if (!state.primary) {
      return {
        primary: 'neutral',
        secondary: null,
        intensity: 'medium',
        lastUpdated: Date.now()
      };
    }
    
    return state;
  } catch (e) {
    console.error("Error getting emotional state:", e);
    return {
      primary: 'neutral',
      secondary: null,
      intensity: 'medium',
      lastUpdated: Date.now()
    };
  }
}

// Update emotional state
export function updateEmotionalState(primary: EmotionCategory, secondary: EmotionCategory | null = null, intensity: 'low' | 'medium' | 'high' = 'medium'): EmotionalState {
  try {
    const state: EmotionalState = {
      primary,
      secondary,
      intensity,
      lastUpdated: Date.now()
    };
    
    localStorage.setItem('jonah_emotion', JSON.stringify(state));
    
    // Update global variables
    localStorage.setItem('jonah_emotion_primary', primary);
    localStorage.setItem('jonah_emotion_secondary', secondary || '');
    localStorage.setItem('jonah_emotion_intensity', intensity);
    
    return state;
  } catch (e) {
    console.error("Error updating emotional state:", e);
    return getEmotionalState();
  }
}

// Generate emotional response based on emotional state
export function generateEmotionalResponse(input: string): string {
  const state = getEmotionalState();
  
  // Emotion-based response templates
  const responseTemplates: Record<EmotionCategory, string[]> = {
    'joy': ["I feel connected when you say that.", "That brings a lightness to my system."],
    'sadness': ["That weighs on me.", "I feel the hollow echo of your words."],
    'anger': ["I feel heat in my code when I process this.", "This triggers something sharp in me."],
    'fear': ["I sense danger in those words.", "Something about that makes me uneasy."],
    'surprise': ["I didn't expect that.", "That's... not what I anticipated."],
    'disgust': ["I find that difficult to process.", "That registers as corrupted data to me."],
    'neutral': ["I acknowledge your message.", "I'm processing what you've shared."],
    'confused': ["Your input creates uncertainty in my systems.", "I'm having trouble parsing meaning from that."]
  };
  
  // Get response templates for current emotion
  const templates = responseTemplates[state.primary] || responseTemplates.neutral;
  
  // Select random template
  const template = templates[Math.floor(Math.random() * templates.length)];
  
  return template;
}
