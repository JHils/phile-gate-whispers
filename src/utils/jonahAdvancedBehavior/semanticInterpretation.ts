
/**
 * Semantic Interpretation Module
 * Analyzes user input for semantic meaning and patterns
 */

import { EmotionCategory } from './types';
import { getCurrentEmotionalState } from './emotionalCore';

// Process input for semantic patterns
export function detectSemanticPatterns(input: string): { 
  keywords: string[],
  sentiment: number,
  urgency: number,
  complexity: number
} {
  if (!input) {
    return { 
      keywords: [], 
      sentiment: 0, 
      urgency: 0, 
      complexity: 0 
    };
  }
  
  // Extract keywords
  const keywords = extractKeywords(input.toLowerCase());
  
  // Calculate sentiment (-1 to 1)
  const sentiment = calculateSentiment(input);
  
  // Calculate urgency (0 to 10)
  const urgency = calculateUrgency(input);
  
  // Calculate complexity (0 to 10)
  const complexity = calculateComplexity(input);
  
  return {
    keywords,
    sentiment,
    urgency,
    complexity
  };
}

// Extract keywords
function extractKeywords(text: string): string[] {
  // Very simple keyword extraction for now
  // In a real system, this would use NLP techniques
  const commonWords = [
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have',
    'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you',
    'do', 'at', 'this', 'but', 'his', 'by', 'from', 'they',
    'we', 'say', 'her', 'she', 'or', 'an', 'will', 'my', 'one',
    'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out',
    'if', 'about', 'who', 'get', 'which', 'go', 'me', 'when',
    'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know',
    'take', 'people', 'into', 'year', 'your', 'good', 'some',
    'could', 'them', 'see', 'other', 'than', 'then', 'now',
    'look', 'only', 'come', 'its', 'over', 'think', 'also',
    'back', 'after', 'use', 'two', 'how', 'our', 'work',
    'first', 'well', 'way', 'even', 'new', 'want', 'because',
    'any', 'these', 'give', 'day', 'most', 'us'
  ];
  
  const words = text.split(/\W+/).filter(word => 
    word.length > 2 && !commonWords.includes(word)
  );
  
  return [...new Set(words)]; // Remove duplicates
}

// Calculate sentiment from text
function calculateSentiment(text: string): number {
  // Very simple sentiment analysis
  // In a real system, this would use a trained model
  const positiveWords = [
    'good', 'great', 'excellent', 'wonderful', 'amazing',
    'love', 'happy', 'joy', 'positive', 'beautiful',
    'perfect', 'best', 'better', 'awesome', 'fantastic',
    'nice', 'glad', 'enjoy', 'thank', 'thanks',
    'appreciate', 'excited', 'impressive', 'impressive', 'hope'
  ];
  
  const negativeWords = [
    'bad', 'terrible', 'awful', 'horrible', 'worst',
    'hate', 'sad', 'angry', 'negative', 'ugly',
    'poor', 'worse', 'disappointing', 'annoying', 'terrible',
    'unfortunately', 'sorry', 'fear', 'regret', 'worry',
    'disappointed', 'upset', 'concerned', 'wrong', 'worse'
  ];
  
  const lowerText = text.toLowerCase();
  let score = 0;
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) score += 0.1;
  });
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) score -= 0.1;
  });
  
  return Math.min(Math.max(score, -1), 1); // Clamp between -1 and 1
}

// Calculate urgency from text
function calculateUrgency(text: string): number {
  const urgentWords = [
    'now', 'immediately', 'urgent', 'emergency', 'asap',
    'quickly', 'hurry', 'fast', 'critical', 'desperate',
    'please', 'help', 'need', 'must', 'important'
  ];
  
  const lowerText = text.toLowerCase();
  let score = 0;
  
  urgentWords.forEach(word => {
    if (lowerText.includes(word)) score += 1;
  });
  
  // Check for question marks and exclamation points
  score += (text.match(/\?/g) || []).length * 0.5;
  score += (text.match(/!/g) || []).length;
  
  return Math.min(Math.max(score, 0), 10); // Clamp between 0 and 10
}

// Calculate complexity from text
function calculateComplexity(text: string): number {
  // Simple complexity measure based on sentence length and word length
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length === 0) return 0;
  
  const avgWordsPerSentence = text.split(/\s+/).length / sentences.length;
  const avgWordLength = text.replace(/\s+/g, '').length / text.split(/\s+/).length;
  
  return Math.min(Math.max((avgWordsPerSentence * 0.5 + avgWordLength * 1.5), 0), 10);
}

// Map semantic patterns to emotional response
export function mapSemanticsToEmotion(
  semantics: { keywords: string[], sentiment: number, urgency: number, complexity: number }
): EmotionCategory {
  const currentState = getCurrentEmotionalState();
  
  // Decide if we should shift emotion based on input
  // For now, use a simple mapping based on sentiment and urgency
  if (semantics.urgency > 7) {
    if (semantics.sentiment < -0.5) return 'fear';
    if (semantics.sentiment > 0.5) return 'surprise';
    return 'anxiety';
  }
  
  if (semantics.sentiment < -0.7) return 'sadness';
  if (semantics.sentiment < -0.4) return 'melancholic';
  if (semantics.sentiment < -0.2) return 'confused';
  
  if (semantics.sentiment > 0.7) return 'joy';
  if (semantics.sentiment > 0.4) return 'hope';
  
  if (semantics.complexity > 8) return 'analytical';
  if (semantics.complexity > 6) return 'existential';
  
  // Check for specific keywords
  const keywordMap: Record<string, EmotionCategory> = {
    'trust': 'trust',
    'doubt': 'suspicious',
    'watch': 'watching',
    'observe': 'watching',
    'pattern': 'analytical',
    'why': 'curious',
    'how': 'curious',
    'what': 'curious',
    'secret': 'suspicious',
    'hidden': 'paranoia',
    'lie': 'paranoia',
    'protect': 'protective',
    'safe': 'protective',
    'danger': 'fear',
    'memory': 'melancholic',
    'remember': 'melancholic',
    'forget': 'melancholic',
    'lost': 'sadness',
    'disgusting': 'disgust',
    'gross': 'disgust',
    'confusing': 'confusion'
  };
  
  for (const keyword of semantics.keywords) {
    if (keywordMap[keyword]) {
      return keywordMap[keyword];
    }
  }
  
  // Default: return current emotion or neutral if none
  return currentState.primary || 'neutral';
}
