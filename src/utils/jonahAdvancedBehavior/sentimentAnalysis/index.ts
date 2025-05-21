
// Export all functionality from the sentiment analysis modules
export { analyzeEmotion } from './analyzer';
export { 
  generateEmotionalResponse,
  getEmotionalResponse,
  getClarifyingQuestion,
  trackEmotionalPattern,
  generateMetaAwarenessComment,
  interpretUnsaidContent
} from './responseGenerator';

// Re-export types
export type { PatternAnalysis, UnsaidInterpretation } from './types';
