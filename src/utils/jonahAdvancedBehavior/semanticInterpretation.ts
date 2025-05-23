
/**
 * Semantic Interpretation Module
 * Analyzes and interprets user messages
 */

import { EmotionCategory, EmotionalState } from './types';
import { getCurrentEmotionalState } from './emotionalCore';
import { getEmotionalResponse } from './enhancedEmotionalCore';

// Simple keywords for emotional tone detection
const emotionKeywords: Record<EmotionCategory, string[]> = {
  'joy': ['happy', 'joy', 'excited', 'wonderful', 'great'],
  'sadness': ['sad', 'unhappy', 'depressed', 'miserable', 'gloomy'],
  'anger': ['angry', 'mad', 'annoyed', 'irritated', 'furious'],
  'fear': ['afraid', 'scared', 'fearful', 'terrified', 'anxious'],
  'neutral': ['ok', 'fine', 'neutral', 'normal', 'average'],
  'surprise': ['surprised', 'shocked', 'amazed', 'astonished', 'stunned'],
  'curiosity': ['curious', 'interested', 'intrigued', 'fascinated'],
  'confused': ['confused', 'puzzled', 'bewildered', 'perplexed'],
  'hope': ['hope', 'hopeful', 'optimistic', 'promising'],
  'anxiety': ['anxious', 'nervous', 'worried', 'uneasy'],
  'paranoia': ['paranoid', 'suspicious', 'distrustful'],
  'trust': ['trust', 'trustworthy', 'reliable', 'dependable'],
  'watching': ['watching', 'observing', 'monitoring'],
  'existential': ['existence', 'purpose', 'meaning', 'life'],
  'protective': ['protect', 'guard', 'shield', 'defend'],
  'melancholic': ['melancholy', 'wistful', 'nostalgic'],
  'analytical': ['analyze', 'examine', 'investigate', 'study'],
  'suspicious': ['suspect', 'doubt', 'mistrust'],
  'curious': ['curious', 'interested', 'intrigued'],
  'disgust': ['disgust', 'revolting', 'gross', 'nasty'],
  'confusion': ['confusion', 'mixed-up', 'unclear']
};

// Get all semantic interpretations
export function getAllInterpretations(text: string): Record<string, any> {
  return {
    emotions: detectEmotions(text),
    topics: extractTopics(text),
    questions: hasQuestion(text),
    sentiment: analyzeSentiment(text),
    entities: extractEntities(text)
  };
}

// Detect emotions in text
function detectEmotions(text: string): Record<EmotionCategory, number> {
  const emotions: Partial<Record<EmotionCategory, number>> = {};
  const normalizedText = text.toLowerCase();
  
  // Check for emotion keywords
  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    const matches = keywords.filter(keyword => normalizedText.includes(keyword));
    if (matches.length > 0) {
      emotions[emotion as EmotionCategory] = matches.length / keywords.length;
    }
  }
  
  // Ensure all emotions have a value
  const result: Record<EmotionCategory, number> = {} as Record<EmotionCategory, number>;
  for (const emotion of Object.keys(emotionKeywords) as EmotionCategory[]) {
    result[emotion] = emotions[emotion] || 0;
  }
  
  return result;
}

// Extract topics from text
function extractTopics(text: string): string[] {
  // Simple topic extraction
  const topics: string[] = [];
  const normalizedText = text.toLowerCase();
  
  // Topic detection (simplified)
  if (normalizedText.includes('weather')) topics.push('weather');
  if (normalizedText.includes('news')) topics.push('news');
  if (normalizedText.includes('tech') || normalizedText.includes('technology')) topics.push('technology');
  if (normalizedText.includes('art') || normalizedText.includes('music')) topics.push('arts');
  if (normalizedText.includes('help') || normalizedText.includes('assist')) topics.push('assistance');
  if (normalizedText.includes('philosophy') || normalizedText.includes('exist')) topics.push('philosophy');
  
  return topics;
}

// Check if text contains a question
function hasQuestion(text: string): boolean {
  return text.includes('?') || 
    text.toLowerCase().startsWith('who') ||
    text.toLowerCase().startsWith('what') ||
    text.toLowerCase().startsWith('when') ||
    text.toLowerCase().startsWith('where') ||
    text.toLowerCase().startsWith('why') ||
    text.toLowerCase().startsWith('how');
}

// Simple sentiment analysis
function analyzeSentiment(text: string): number {
  const normalizedText = text.toLowerCase();
  let score = 0;
  
  // Positive phrases
  const positiveWords = ['good', 'great', 'excellent', 'wonderful', 'happy', 'love', 'like', 'thanks'];
  for (const word of positiveWords) {
    if (normalizedText.includes(word)) score += 0.5;
  }
  
  // Negative phrases
  const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'sad', 'hate', 'dislike', 'sorry'];
  for (const word of negativeWords) {
    if (normalizedText.includes(word)) score -= 0.5;
  }
  
  // Clamp the score between -1 and 1
  return Math.max(-1, Math.min(1, score));
}

// Extract entities (names, places, etc.)
function extractEntities(text: string): string[] {
  // Simple entity extraction
  const entities: string[] = [];
  
  // Find proper nouns (simple approach: words starting with capital letter not at start of sentence)
  const words = text.split(' ');
  for (let i = 1; i < words.length; i++) {
    const word = words[i].replace(/[.,!?]$/, ''); // Remove punctuation
    if (word.length > 0 && word[0] === word[0].toUpperCase() && isNaN(Number(word))) {
      entities.push(word);
    }
  }
  
  return entities;
}

// Get emotional response based on current state
export function getEmotionalResponseToInput(text: string): string {
  const emotions = detectEmotions(text);
  const emotionalState = getCurrentEmotionalState();
  
  // Find the dominant emotion in the text
  let dominantEmotion: EmotionCategory = 'neutral';
  let maxScore = 0;
  
  for (const [emotion, score] of Object.entries(emotions)) {
    if (score > maxScore) {
      maxScore = score;
      dominantEmotion = emotion as EmotionCategory;
    }
  }
  
  // Get response based on the emotional state and dominantEmotion
  return getEmotionalResponse(text, emotionalState, 'direct');
}
