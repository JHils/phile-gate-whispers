
// Export all functionality from the sentiment analysis modules
export { analyzeEmotion } from './analyzer';
export { 
  getEmotionalResponse,
  getClarifyingQuestion,
  generateEmotionalResponse,
  trackEmotionalPattern,
  generateMetaAwarenessComment
} from './responseGenerator';

// Re-export types
export type { PatternAnalysis, UnsaidInterpretation } from './types';

