
/**
 * Sentiment Analysis - Keywords Module
 */

import { EmotionCategory } from '../types';

export const emotionKeywords: Record<EmotionCategory, string[]> = {
  fear: [
    'afraid', 'scared', 'terrified', 'frightened', 'fearful', 
    'horror', 'terror', 'panic', 'dread', 'phobia'
  ],
  sadness: [
    'sad', 'depressed', 'unhappy', 'miserable', 'sorrowful',
    'grief', 'mourning', 'despair', 'regret', 'lonely'
  ],
  anger: [
    'angry', 'furious', 'mad', 'rage', 'hostile',
    'irritated', 'annoyed', 'resent', 'hate', 'furious'
  ],
  joy: [
    'happy', 'joyful', 'delighted', 'pleased', 'cheerful',
    'elated', 'jubilant', 'thrilled', 'excited', 'glad'
  ],
  confusion: [
    'confused', 'puzzled', 'perplexed', 'uncertain', 'disoriented',
    'unclear', 'baffled', 'bewildered', 'unsure', 'lost'
  ],
  curiosity: [
    'curious', 'interested', 'intrigued', 'wonder', 'fascinated',
    'inquisitive', 'exploring', 'inquiring', 'discovering', 'learning'
  ],
  hope: [
    'hope', 'optimistic', 'expectant', 'looking forward', 'anticipation',
    'promising', 'encouraging', 'uplifting', 'faith', 'positive'
  ],
  anxiety: [
    'anxious', 'worried', 'uneasy', 'nervous', 'stressed',
    'tense', 'fretful', 'jittery', 'restless', 'apprehensive'
  ],
  paranoia: [
    'paranoid', 'suspicious', 'mistrustful', 'doubt', 'skeptical',
    'watchful', 'wary', 'guarded', 'vigilant', 'distrustful'
  ],
  trust: [
    'trust', 'confident', 'belief', 'faith', 'assured',
    'reliance', 'conviction', 'dependence', 'credence', 'certainty'
  ],
  neutral: [
    'ok', 'fine', 'neutral', 'alright', 'so-so', 
    'fair', 'average', 'moderate', 'neither', 'balanced'
  ],
  surprise: [
    'surprised', 'shocked', 'amazed', 'astonished', 'startled',
    'unexpected', 'sudden', 'wonder', 'stunned', 'awestruck'
  ],
  disgust: [
    'disgusted', 'repulsed', 'revolted', 'nauseated', 'appalled',
    'sickened', 'distaste', 'aversion', 'abhorrence', 'loathing'
  ],
  confused: [
    'confused', 'mixed up', 'bewildered', 'foggy', 'unclear',
    'disorder', 'chaos', 'disarray', 'jumbled', 'muddled'
  ],
  watching: [
    'watching', 'observing', 'monitoring', 'surveilling', 'eyeing',
    'noticing', 'tracking', 'following', 'witnessing', 'overseeing'
  ]
};
