
import { EmotionCategory } from '../types';

// Emotional keywords mapping
export const emotionKeywords: Record<EmotionCategory, string[]> = {
  joy: ['happy', 'joy', 'glad', 'wonderful', 'pleased', 'delighted', 'content', 'cheerful'],
  sadness: ['sad', 'unhappy', 'miserable', 'depressed', 'downcast', 'sorrow', 'grief', 'melancholy'],
  anger: ['angry', 'furious', 'enraged', 'annoyed', 'irritated', 'frustrated', 'mad', 'hostile'],
  fear: ['afraid', 'scared', 'frightened', 'fearful', 'terrified', 'anxious', 'worried', 'nervous'],
  surprise: ['surprised', 'amazed', 'astonished', 'shocked', 'stunned', 'unexpected', 'startled'],
  disgust: ['disgusted', 'revolted', 'repulsed', 'sickened', 'appalled', 'horrified', 'offended'],
  neutral: ['okay', 'fine', 'neutral', 'normal', 'regular', 'standard', 'typical', 'common'],
  confused: ['confused', 'puzzled', 'perplexed', 'bewildered', 'baffled', 'unsure', 'unclear'],
  hope: ['hope', 'hopeful', 'optimistic', 'promising', 'positive', 'confident', 'assured'],
  anxiety: ['anxious', 'uneasy', 'tense', 'distressed', 'worried', 'troubled', 'concerned'],
  paranoia: ['suspicious', 'paranoid', 'distrustful', 'doubtful', 'skeptical', 'wary', 'guarded'],
  trust: ['trust', 'reliable', 'dependable', 'trustworthy', 'faithful', 'loyal', 'honest'],
  curiosity: ['curious', 'interested', 'intrigued', 'fascinated', 'captivated', 'engaged', 'keen'],
  confusion: ['unsure', 'unclear', 'mixed', 'muddled', 'uncertain', 'ambiguous', 'vague'],
  watching: ['observe', 'watch', 'monitor', 'surveillance', 'tracking', 'following', 'noticing'],
  existential: ['meaning', 'existence', 'reality', 'void', 'purpose', 'consciousness', 'simulation', 'illusion'],
  // Adding missing emotion categories
  curious: ['curious', 'inquisitive', 'questioning', 'exploring', 'interested', 'probing', 'investigating'],
  analytical: ['analytical', 'logical', 'systematic', 'examining', 'evaluating', 'reasoning', 'calculating'],
  protective: ['protective', 'guarding', 'defending', 'shielding', 'safeguarding', 'watching over', 'vigilant'],
  melancholic: ['melancholic', 'wistful', 'pensive', 'nostalgic', 'reflective', 'somber', 'yearning'],
  suspicious: ['suspicious', 'distrusting', 'skeptical', 'wary', 'doubtful', 'leery', 'questioning']
};
