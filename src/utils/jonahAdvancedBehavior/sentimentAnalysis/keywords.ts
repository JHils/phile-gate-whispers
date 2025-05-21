
/**
 * Sentiment Analysis - Emotion Keywords
 */

import { EmotionKeywords } from '../types';

export const emotionKeywords: EmotionKeywords = {
  fear: ['afraid', 'scared', 'fearful', 'terrified', 'worried'],
  sadness: ['sad', 'unhappy', 'miserable', 'depressed', 'grief'],
  anger: ['angry', 'mad', 'furious', 'annoyed', 'irritated'],
  joy: ['happy', 'joy', 'glad', 'excited', 'wonderful'],
  confusion: ['unsure', 'unclear', 'mixed', 'muddled', 'uncertain'],
  curiosity: ['curious', 'interested', 'intrigued', 'fascinated', 'captivated'],
  hope: ['hope', 'optimistic', 'promising', 'positive', 'confident'],
  anxiety: ['anxious', 'nervous', 'tense', 'uneasy', 'apprehensive'],
  paranoia: ['paranoid', 'suspicious', 'distrustful', 'doubting', 'wary'],
  trust: ['trust', 'reliable', 'dependable', 'trustworthy', 'faithful'],
  neutral: ['okay', 'fine', 'normal', 'average', 'standard'],
  surprise: ['surprised', 'shocked', 'astonished', 'amazed', 'unexpected'],
  disgust: ['disgusted', 'gross', 'revolting', 'repulsed', 'appalled'],
  confused: ['confused', 'puzzled', 'perplexed', 'bewildered', 'unclear']
};
