
import { EmotionCategory } from '../types';
import { EmotionKeywords } from './types';

// Emotion keyword dictionaries
export const emotionKeywords: EmotionKeywords = {
  fear: ['afraid', 'scared', 'terrified', 'fear', 'worried', 'anxious', 'dread', 'panic', 'horror'],
  sadness: ['sad', 'depressed', 'unhappy', 'miserable', 'lonely', 'lost', 'grief', 'sorrow', 'crying'],
  anger: ['angry', 'mad', 'frustrated', 'annoyed', 'hate', 'furious', 'rage', 'bitter', 'resentful'],
  joy: ['happy', 'joyful', 'excited', 'glad', 'pleased', 'delighted', 'content', 'thrilled', 'cheerful'],
  confusion: ['confused', 'unsure', 'lost', 'bewildered', 'puzzled', 'perplexed', 'uncertain', 'disoriented'],
  curiosity: ['curious', 'wonder', 'interested', 'intrigued', 'fascinated', 'exploring', 'seeking', 'learning'],
  hope: ['hope', 'optimistic', 'positive', 'better', 'future', 'wish', 'dream', 'aspire', 'looking forward'],
  anxiety: ['anxious', 'nervous', 'tense', 'stressed', 'worried', 'uneasy', 'apprehensive', 'restless'],
  paranoia: ['watching', 'followed', 'suspicious', 'paranoid', 'conspiracy', 'tracked', 'monitored', 'hidden'],
  trust: ['trust', 'believe', 'faith', 'confident', 'reliable', 'secure', 'safe', 'truthful', 'honest'],
  neutral: []
};

// Intensity modifiers
export const intensifiers = [
  'very', 'extremely', 'incredibly', 'terribly', 'absolutely', 
  'completely', 'totally', 'utterly', 'deeply', 'profoundly',
  'so', 'really', 'truly', 'intensely', 'overwhelmingly'
];
