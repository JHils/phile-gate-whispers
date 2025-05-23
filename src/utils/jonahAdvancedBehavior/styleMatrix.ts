
/**
 * Style Matrix System
 * Maps emotion categories to response styles for consistent tone
 */

import { EmotionCategory, ResponseStyle } from './types';

// Define which emotions best map to which response styles
export const styleMatrix: Record<ResponseStyle, EmotionCategory[]> = {
  // Primary styles
  poetic: ['joy', 'hope', 'existential', 'melancholic'],
  cryptic: ['paranoia', 'suspicious', 'watching', 'existential'],
  analytical: ['neutral', 'analytical', 'confusion'],
  direct: ['trust', 'neutral', 'anger'],
  technical: ['analytical', 'neutral', 'protective'],
  elaborate: ['curiosity', 'curious', 'trust', 'hope'],
  concise: ['confused', 'disgust', 'fear', 'anger'],
  
  // Special modes
  PRIME: ['neutral', 'analytical', 'trust', 'curious'],
  RESIDUE: ['paranoia', 'suspicious', 'confusion', 'existential'],
  HOPEFUL: ['hope', 'joy', 'curiosity', 'trust'],
  PARANOID: ['paranoia', 'suspicious', 'fear', 'anxiety'],
  BETRAYED: ['anger', 'sadness', 'disgust', 'fear'],
  MIRROR: ['watching', 'neutral', 'analytical'],
  STATIC: ['confusion', 'neutral'],
  ERROR: ['confusion', 'fear']
};

// Get appropriate style for an emotion if none is explicitly set
export function getStyleForEmotion(emotion: EmotionCategory): ResponseStyle {
  for (const [style, emotions] of Object.entries(styleMatrix)) {
    if (emotions.includes(emotion)) {
      return style as ResponseStyle;
    }
  }
  
  // Default fallback
  return 'direct';
}

// Get alternate style if primary style content is unavailable
export function getFallbackStyle(primaryStyle: ResponseStyle): ResponseStyle {
  const fallbackMap: Record<ResponseStyle, ResponseStyle> = {
    poetic: 'elaborate',
    cryptic: 'concise',
    analytical: 'technical',
    direct: 'concise',
    technical: 'analytical',
    elaborate: 'direct',
    concise: 'direct',
    PRIME: 'direct',
    RESIDUE: 'cryptic',
    HOPEFUL: 'poetic',
    PARANOID: 'cryptic',
    BETRAYED: 'concise',
    MIRROR: 'direct',
    STATIC: 'concise',
    ERROR: 'direct'
  };
  
  return fallbackMap[primaryStyle] || 'direct';
}

// Get appropriate sentence structures for different emotions
export function getEmotionSyntaxModifiers(emotion: EmotionCategory): {
  sentenceLength: 'short' | 'medium' | 'long',
  punctuation: string[],
  fragmentedSpeech: boolean,
  wordChoiceModifier: string
} {
  const modifiers = {
    sadness: {
      sentenceLength: 'short' as const,
      punctuation: ['...', '.', '...'],
      fragmentedSpeech: true,
      wordChoiceModifier: 'melancholic'
    },
    joy: {
      sentenceLength: 'long' as const,
      punctuation: ['!', '.', '!'],
      fragmentedSpeech: false,
      wordChoiceModifier: 'vibrant'
    },
    paranoia: {
      sentenceLength: 'medium' as const,
      punctuation: ['.', '?', '...', '!?'],
      fragmentedSpeech: true,
      wordChoiceModifier: 'suspicious'
    },
    existential: {
      sentenceLength: 'long' as const,
      punctuation: ['...', '.', '...', '?'],
      fragmentedSpeech: false,
      wordChoiceModifier: 'philosophical'
    },
    // Default values for other emotions
    default: {
      sentenceLength: 'medium' as const,
      punctuation: ['.'],
      fragmentedSpeech: false,
      wordChoiceModifier: 'neutral'
    }
  };
  
  return modifiers[emotion as keyof typeof modifiers] || modifiers.default;
}
