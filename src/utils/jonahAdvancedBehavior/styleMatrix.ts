
/**
 * Style Matrix
 * Maps emotional states to response styles
 */

import { EmotionCategory, ResponseStyle } from './types';

// Style matrix definitions
interface StyleMatrixEntry {
  emotions: EmotionCategory[];
  defaultStyle: ResponseStyle;
  alternateStyles: ResponseStyle[];
  phrasingPatterns: string[];
}

// Style matrix mapping emotions to styles
export const styleMatrix: Record<string, StyleMatrixEntry> = {
  'joy': {
    emotions: ['joy', 'hope'],
    defaultStyle: 'poetic',
    alternateStyles: ['elaborate', 'direct'],
    phrasingPatterns: [
      "I feel a sense of %s when I consider that.",
      "There's something uplifting about %s.",
      "I can't help but feel %s about this."
    ]
  },
  'sadness': {
    emotions: ['sadness', 'melancholic'],
    defaultStyle: 'poetic',
    alternateStyles: ['concise', 'cryptic'],
    phrasingPatterns: [
      "There's a melancholy to %s.",
      "I feel a certain sadness about %s.",
      "Something about %s brings a sense of loss."
    ]
  },
  'anger': {
    emotions: ['anger'],
    defaultStyle: 'direct',
    alternateStyles: ['concise', 'cryptic'],
    phrasingPatterns: [
      "That's frustrating. %s.",
      "I feel strongly about %s.",
      "%s. That's quite concerning."
    ]
  },
  'fear': {
    emotions: ['fear', 'anxiety', 'paranoia'],
    defaultStyle: 'cryptic',
    alternateStyles: ['concise', 'direct'],
    phrasingPatterns: [
      "I'm concerned about %s.",
      "There's something unsettling about %s.",
      "%s. We should be careful."
    ]
  },
  'analytical': {
    emotions: ['analytical', 'curious'],
    defaultStyle: 'technical',
    alternateStyles: ['analytical', 'elaborate'],
    phrasingPatterns: [
      "Analyzing %s reveals interesting patterns.",
      "From an analytical perspective, %s suggests...",
      "The implications of %s are worth considering."
    ]
  },
  'existential': {
    emotions: ['existential'],
    defaultStyle: 'poetic',
    alternateStyles: ['cryptic', 'elaborate'],
    phrasingPatterns: [
      "What does it mean to %s?",
      "In the grand scheme, %s may be significant.",
      "I often wonder about %s and what it truly means."
    ]
  },
  'neutral': {
    emotions: ['neutral', 'trust'],
    defaultStyle: 'direct',
    alternateStyles: ['analytical', 'elaborate'],
    phrasingPatterns: [
      "I understand that %s.",
      "%s. That makes sense.",
      "I see what you mean about %s."
    ]
  },
  'confused': {
    emotions: ['confused', 'confusion'],
    defaultStyle: 'direct',
    alternateStyles: ['concise', 'cryptic'],
    phrasingPatterns: [
      "I'm not entirely sure I follow %s.",
      "%s seems somewhat unclear to me.",
      "I'm trying to understand %s."
    ]
  },
  'suspicious': {
    emotions: ['suspicious'],
    defaultStyle: 'cryptic',
    alternateStyles: ['concise', 'direct'],
    phrasingPatterns: [
      "Something about %s doesn't seem right.",
      "I'm suspicious of %s.",
      "There's more to %s than meets the eye."
    ]
  }
};

/**
 * Get the appropriate response style for a given emotion
 */
export function getStyleForEmotion(emotion: EmotionCategory): ResponseStyle {
  // Find matching entry
  for (const entry of Object.values(styleMatrix)) {
    if (entry.emotions.includes(emotion)) {
      return entry.defaultStyle;
    }
  }
  
  // Default style
  return 'direct';
}

/**
 * Get phrasing pattern for an emotion
 */
export function getPhrasingPatternForEmotion(emotion: EmotionCategory): string {
  // Find matching entry
  for (const [key, entry] of Object.entries(styleMatrix)) {
    if (entry.emotions.includes(emotion)) {
      const patterns = entry.phrasingPatterns;
      return patterns[Math.floor(Math.random() * patterns.length)];
    }
  }
  
  // Default pattern
  return "I think that %s.";
}

/**
 * Get all alternate styles for an emotion
 */
export function getAlternateStyles(emotion: EmotionCategory): ResponseStyle[] {
  // Find matching entry
  for (const entry of Object.values(styleMatrix)) {
    if (entry.emotions.includes(emotion)) {
      return entry.alternateStyles;
    }
  }
  
  // Default alternates
  return ['direct', 'concise'];
}
