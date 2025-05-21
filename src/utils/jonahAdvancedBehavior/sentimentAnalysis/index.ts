
// Export all functionality from the sentiment analysis modules
export { analyzeEmotion } from './analyzer';
export { 
  getEmotionalResponse,
  getClarifyingQuestion,
  generateEmotionalResponse,
  trackEmotionalPattern,
  generateMetaAwarenessComment,
  interpretUnsaidContent
} from './responseGenerator';

// Re-export types
export type { PatternAnalysis, UnsaidInterpretation, EmotionResponses } from './types';
