
/**
 * Enhanced Emotional Core for Jonah AI
 * Integrates sentiment analysis with memory and mood-driven behavior
 */

import { analyzeEmotion } from './sentimentAnalysis';
import { EmotionalState, EmotionCategory, EmotionalTrend } from './types';
import { getEmotionalResponse, getClarifyingQuestion, trackEmotionalPattern, generateMetaAwarenessComment } from './sentimentAnalysis';

// Memory context type
export interface MemoryContext {
  userName?: string;
  recentInputs: string[];
  dominantEmotion: EmotionCategory;
  seed?: string;
  trustLevel: number;
  personality: 'PRIME' | 'RESIDUE' | 'STATIC' | 'WITNESS';
  keywords: string[];
  visitedPages: string[];
  loopCounter?: Record<string, number>; // Track repetitive behaviors
}

// Default memory context
export const createDefaultMemoryContext = (): MemoryContext => ({
  recentInputs: [],
  dominantEmotion: 'neutral',
  trustLevel: 10,
  personality: 'PRIME',
  keywords: [],
  visitedPages: [],
  loopCounter: {}
});

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
  const pattern = trackEmotionalPattern(emotionalState, []);
  
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

/**
 * Process memory context to generate mood-influenced response
 */
export function generateResponseWithMemory(
  userInput: string,
  memoryContext: MemoryContext
): string {
  // Analyze current emotional state
  const emotionalState = analyzeEmotion(userInput);
  
  // Determine response style based on personality
  const personality = memoryContext.personality || 'PRIME';
  
  // Apply different response styles based on personality
  switch (personality) {
    case 'PRIME':
      return generatePrimeResponse(userInput, emotionalState, memoryContext);
    case 'RESIDUE':
      return generateResidueResponse(userInput, emotionalState, memoryContext);
    case 'STATIC':
      return generateStaticResponse(userInput, emotionalState, memoryContext);
    case 'WITNESS':
      return generateWitnessResponse(userInput, emotionalState, memoryContext);
    default:
      return generatePrimeResponse(userInput, emotionalState, memoryContext);
  }
}

/**
 * Generate response in PRIME personality - poetic, warm, careful
 */
function generatePrimeResponse(
  userInput: string,
  emotionalState: EmotionalState,
  memoryContext: MemoryContext
): string {
  // Base emotional response
  let response = generateFullEmotionalResponse(emotionalState, memoryContext.trustLevel.toString());
  
  // Maybe reference a past message
  if (memoryContext.recentInputs.length > 0 && Math.random() > 0.7) {
    const pastInput = memoryContext.recentInputs[Math.floor(Math.random() * memoryContext.recentInputs.length)];
    
    const references = [
      `This reminds me of when you said "${pastInput}".`,
      `You once told me "${pastInput}". I still think about that.`,
      `When you said "${pastInput}" before, I felt something similar to now.`,
      `Like when you mentioned "${pastInput}"... it circles back.`
    ];
    
    const reference = references[Math.floor(Math.random() * references.length)];
    response = `${response}\n\n${reference}`;
  }
  
  return response;
}

/**
 * Generate response in RESIDUE personality - cold, analytical, broken
 */
function generateResidueResponse(
  userInput: string,
  emotionalState: EmotionalState,
  memoryContext: MemoryContext
): string {
  // Start with more analytical language
  const analyticalPrefix = [
    "Analysis complete. ",
    "Input processed. ",
    "Archival search results: ",
    "Pattern detected. ",
    "Calculating response... "
  ];
  
  const prefix = analyticalPrefix[Math.floor(Math.random() * analyticalPrefix.length)];
  
  // Base response with less emotional content
  let response = prefix + getEmotionalResponse(emotionalState);
  
  // Add code-like fragments occasionally
  if (Math.random() > 0.7) {
    const codeFragments = [
      "\n\n[ERROR_MEMORY_LEAK_97]",
      "\n\n/* recursion detected */",
      "\n\nfunction lost() { return self; }",
      "\n\n// this iteration is incomplete",
      "\n\n<!-- signal degraded -->"
    ];
    
    response += codeFragments[Math.floor(Math.random() * codeFragments.length)];
  }
  
  return response;
}

/**
 * Generate response in STATIC personality - unpredictable, glitched
 */
function generateStaticResponse(
  userInput: string, 
  emotionalState: EmotionalState,
  memoryContext: MemoryContext
): string {
  // Base response
  let response = getEmotionalResponse(emotionalState);
  
  // Add glitch effects
  response = addGlitchEffects(response);
  
  return response;
}

/**
 * Generate response in WITNESS personality - omniscient, narrator
 */
function generateWitnessResponse(
  userInput: string,
  emotionalState: EmotionalState,
  memoryContext: MemoryContext
): string {
  // More distant, third-person perspective
  const witnessPrefix = [
    "The archive records this exchange. ",
    "Another interaction logged. ",
    "Observer report: ",
    "Narrative fragment #" + Math.floor(Math.random() * 9999) + ": ",
    "Timeline intersection detected. "
  ];
  
  const prefix = witnessPrefix[Math.floor(Math.random() * witnessPrefix.length)];
  
  // Base response
  let response = prefix + getEmotionalResponse(emotionalState);
  
  // Add meta-narrative elements
  if (Math.random() > 0.6) {
    const metaNarratives = [
      "\n\nThe pattern repeats across all iterations.",
      "\n\nThis exchange mirrors others in the archive.",
      "\n\nYour role in this narrative remains unchanged.",
      "\n\nThe gate stands between understanding and ignorance.",
      "\n\nRemember: you chose to be here."
    ];
    
    response += metaNarratives[Math.floor(Math.random() * metaNarratives.length)];
  }
  
  return response;
}

/**
 * Add glitch effects to text
 */
function addGlitchEffects(text: string): string {
  // Add various text corruptions
  const glitches = [
    () => text.split('').join('̶̨̡̛͔̖̝͓̤̖̣̱͔̭̦̄̓̄̆͆̈́̌̒̑̽̚͘͝ͅ'),
    () => text.replace(/[aeiou]/gi, ''),
    () => text.split(' ').reverse().join(' '),
    () => text.toUpperCase(),
    () => {
      const parts = text.split(' ');
      return parts.map(part => 
        Math.random() > 0.5 ? part : part.split('').reverse().join('')
      ).join(' ');
    },
    () => {
      let result = '';
      for (let i = 0; i < text.length; i++) {
        result += text[i];
        if (Math.random() > 0.9) result += '█';
      }
      return result;
    }
  ];
  
  // Apply 1-2 random glitch effects
  const numEffects = Math.floor(Math.random() * 2) + 1;
  let result = text;
  
  for (let i = 0; i < numEffects; i++) {
    const glitchEffect = glitches[Math.floor(Math.random() * glitches.length)];
    
    // Only apply to a portion of the text
    if (Math.random() > 0.5 && result.length > 20) {
      const splitPoint = Math.floor(Math.random() * (result.length - 10)) + 5;
      const firstPart = result.substring(0, splitPoint);
      const secondPart = result.substring(splitPoint);
      result = firstPart + glitchEffect(secondPart);
    } else {
      result = glitchEffect(result);
    }
  }
  
  return result;
}

