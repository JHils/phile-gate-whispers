
/**
 * Emotional Response Generator
 */

import { EmotionalState } from '../types';
import { 
  getEmotionalResponse, 
  trackEmotionalPattern, 
  generateMetaAwarenessComment,
  getClarifyingQuestion 
} from '../sentimentAnalysis';

/**
 * Generate a complete emotional response that integrates memory and mood
 */
export function generateFullEmotionalResponse(
  emotionalState: EmotionalState, 
  trustLevel: string, 
  includeQuestion: boolean = true,
  previousResponses: string[] = []
): string {
  // Get base response from sentiment analysis
  let response = getEmotionalResponse(emotionalState);
  
  // Track pattern to detect emotional trends
  const pattern = trackEmotionalPattern(emotionalState);
  
  // Maybe add meta-awareness comment based on pattern
  const awarenessComment = generateMetaAwarenessComment(pattern);
  if (awarenessComment && Math.random() > 0.7) {
    response = `${response}\n\n${awarenessComment}`;
  }
  
  // Maybe add clarifying question
  if (includeQuestion) {
    const question = getClarifyingQuestion(emotionalState);
    if (question && Math.random() > 0.5) {
      response = `${response}\n\n${question}`;
    }
  }
  
  // Avoid repeating the exact same responses
  if (previousResponses.includes(response)) {
    // Generate a variation by adding a prefix
    const variations = [
      "I find myself thinking... ",
      "Something keeps coming back to me: ",
      "The archive is showing me this again: ",
      "This feels familiar: ",
      "I keep returning to this thought: "
    ];
    
    const prefix = variations[Math.floor(Math.random() * variations.length)];
    response = prefix + response;
  }
  
  return response;
}
