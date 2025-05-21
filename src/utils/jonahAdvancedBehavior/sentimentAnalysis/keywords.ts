
import { EmotionKeywords } from './types';

// Keywords that indicate different emotions
export const emotionKeywords: EmotionKeywords = {
  fear: [
    'afraid', 'scared', 'terrified', 'frightened', 'fear',
    'horror', 'panic', 'dread', 'terror', 'worry',
    'anxious', 'dark', 'unknown', 'threat', 'danger'
  ],
  sadness: [
    'sad', 'depressed', 'unhappy', 'miserable', 'grief',
    'sorrow', 'despair', 'heartbroken', 'lonely', 'hurt',
    'pain', 'loss', 'missing', 'regret', 'tears'
  ],
  anger: [
    'angry', 'mad', 'furious', 'rage', 'annoyed',
    'irritated', 'hate', 'resent', 'bitter', 'outraged',
    'disgusted', 'hostile', 'aggressive', 'frustrat', 'upset'
  ],
  joy: [
    'happy', 'joy', 'excited', 'glad', 'delighted',
    'pleased', 'satisfied', 'content', 'thrilled', 'elated',
    'cheerful', 'good', 'wonderful', 'excellent', 'enjoy'
  ],
  confusion: [
    'confus', 'puzzled', 'unclear', 'bewildered', 'lost',
    'uncertain', 'doubt', 'perplexed', 'unsure', 'disoriented',
    'complex', 'complicated', 'difficult', 'strange', 'weird'
  ],
  curiosity: [
    'curious', 'interest', 'wonder', 'fascinated', 'intrigued',
    'question', 'explore', 'discover', 'seeking', 'wondering',
    'search', 'knowledge', 'learn', 'tell me', 'how does'
  ],
  hope: [
    'hope', 'optimistic', 'better', 'future', 'wish',
    'dream', 'believe', 'faith', 'anticipate', 'expect',
    'looking forward', 'positive', 'chance', 'possibility', 'brighter'
  ],
  anxiety: [
    'nervous', 'tense', 'uneasy', 'worried', 'restless',
    'agitated', 'stressed', 'uncomfortable', 'troubled', 'bothered',
    'concerned', 'fretful', 'jittery', 'alarm', 'panic'
  ],
  paranoia: [
    'suspici', 'distrust', 'conspiracy', 'watch', 'spy',
    'monitor', 'track', 'follow', 'surveillance', 'paranoi',
    'lie', 'deceit', 'manipulate', 'fake', 'control'
  ],
  trust: [
    'trust', 'believe', 'confidence', 'faith', 'rely',
    'depend', 'certain', 'sure', 'loyal', 'honest',
    'truthful', 'genuine', 'authentic', 'real', 'true'
  ],
  neutral: [
    'ok', 'fine', 'alright', 'average', 'neutral',
    'standard', 'normal', 'regular', 'common', 'usual',
    'typical', 'moderate', 'middle', 'medium', 'ordinary'
  ]
};

// Words that intensify emotions
export const intensifiers = [
  'very', 'extremely', 'incredibly', 'deeply', 'profoundly',
  'absolutely', 'completely', 'totally', 'utterly', 'truly',
  'intensely', 'strongly', 'severely', 'immensely', 'greatly',
  'overwhelmingly', 'remarkably', 'terribly', 'awfully', 'exceptionally',
  'highly', 'really', 'quite', 'so', 'too'
];
