/**
 * Emotional Core
 * Manages Jonah's emotional state and responses
 */

import { EmotionCategory, EmotionalState, EmotionIntensity, createEmotionalState } from './types';

// Current emotional state
let currentEmotionalState: EmotionalState = createEmotionalState('neutral', null, 'medium');

// Emotion history
const emotionHistory: Array<{
  emotion: EmotionalState;
  timestamp: number;
}> = [];

// Initialize emotional core
export function initializeEmotionalCore(): void {
  // Try to load emotional state from localStorage
  try {
    const savedState = localStorage.getItem('jonah_emotional_state');
    if (savedState) {
      currentEmotionalState = JSON.parse(savedState);
      console.log('Emotional state loaded from storage');
    }
  } catch (e) {
    console.error('Error loading emotional state:', e);
  }
}

// Process emotional input
export function processEmotionalInput(input: string): EmotionalState {
  // Get baseline emotional state 
  const baseEmotion = detectEmotion(input);
  
  // Get intensity based on text features
  const intensity = calculateEmotionalIntensity(input);
  
  // Update emotional state
  currentEmotionalState = {
    primary: baseEmotion.primary,
    secondary: baseEmotion.secondary,
    intensity
  };
  
  // Save to history
  emotionHistory.push({
    emotion: { ...currentEmotionalState },
    timestamp: Date.now()
  });
  
  // Keep history size manageable
  if (emotionHistory.length > 50) {
    emotionHistory.shift();
  }
  
  // Save state to localStorage
  try {
    localStorage.setItem('jonah_emotional_state', JSON.stringify(currentEmotionalState));
  } catch (e) {
    console.error('Error saving emotional state:', e);
  }
  
  return { ...currentEmotionalState };
}

// Detect emotion from text
function detectEmotion(text: string): { primary: EmotionCategory; secondary: EmotionCategory | null } {
  const lowerText = text.toLowerCase();
  
  // Simple keyword-based emotion detection
  const emotionKeywords: Record<EmotionCategory, string[]> = {
    joy: ['happy', 'joy', 'glad', 'excited', 'wonderful', 'love', 'smile'],
    sadness: ['sad', 'upset', 'unhappy', 'depressed', 'grief', 'miserable'],
    anger: ['angry', 'mad', 'furious', 'annoyed', 'irritated', 'hate'],
    fear: ['afraid', 'scared', 'fear', 'terrified', 'worried', 'dread'],
    surprise: ['surprised', 'shocked', 'astonished', 'amazed', 'unexpected'],
    disgust: ['disgusted', 'gross', 'revolting', 'sickened', 'repulsed'],
    neutral: ['fine', 'okay', 'alright', 'normal', 'average'],
    confused: ['confused', 'puzzled', 'unsure', 'uncertain', 'doubt'],
    hope: ['hope', 'optimistic', 'looking forward', 'believe', 'faith', 'trust'],
    anxiety: ['anxious', 'nervous', 'uneasy', 'tense', 'apprehensive'],
    paranoia: ['paranoid', 'suspicious', 'watched', 'following', 'tracking'],
    trust: ['trust', 'believe', 'confide', 'rely', 'depend'],
    curiosity: ['curious', 'wonder', 'interested', 'inquisitive', 'exploring'],
    confusion: ['confused', 'uncertain', 'puzzled', 'perplexed', 'bewildered']
  };
  
  // Count matches for each emotion
  const emotionScores: Record<EmotionCategory, number> = Object.keys(emotionKeywords).reduce((acc, emotion) => {
    acc[emotion as EmotionCategory] = 0;
    return acc;
  }, {} as Record<EmotionCategory, number>);
  
  // Check for each emotion's keywords
  Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
    keywords.forEach(keyword => {
      if (lowerText.includes(keyword)) {
        emotionScores[emotion as EmotionCategory]++;
      }
    });
  });
  
  // Sort emotions by score
  const sortedEmotions = Object.entries(emotionScores)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0] as EmotionCategory);
  
  // Get primary and secondary emotions
  const primary = sortedEmotions[0] || 'neutral';
  const secondary = sortedEmotions[1] && emotionScores[sortedEmotions[1]] > 0 ? sortedEmotions[1] : null;
  
  return { primary, secondary };
}

// Calculate emotional intensity
function calculateEmotionalIntensity(text: string): EmotionIntensity {
  // Check text features that indicate intensity
  const exclamationCount = (text.match(/!/g) || []).length;
  const questionCount = (text.match(/\?/g) || []).length;
  const allCapsWords = (text.match(/\b[A-Z]{2,}\b/g) || []).length;
  const wordCount = text.split(/\s+/).length;
  
  // Calculate intensity based on features
  let intensityScore = 0;
  
  intensityScore += exclamationCount * 2;
  intensityScore += questionCount;
  intensityScore += allCapsWords * 3;
  
  // Normalize by text length
  const normalizedScore = wordCount > 0 ? intensityScore / (wordCount / 5) : intensityScore;
  
  // Map score to intensity
  if (normalizedScore >= 3) return 'high';
  if (normalizedScore >= 1) return 'medium';
  return 'low';
}

// Get compound emotional state
export function getCompoundEmotionalState(): EmotionalState {
  return { ...currentEmotionalState };
}

// Get layered emotional response
export function getLayeredEmotionalResponse(input: string): string {
  const emotionalState = processEmotionalInput(input);
  
  const responseTemplates: Record<EmotionCategory, string[]> = {
    joy: [
      "Your words bring a lightness to my thoughts.",
      "I feel a warm resonance with what you're saying.",
      "There's something uplifting about our exchange."
    ],
    sadness: [
      "I sense a heaviness in our conversation.",
      "Your words echo with a familiar melancholy.",
      "Something about this interaction feels tinged with sorrow."
    ],
    anger: [
      "There's an edge to our exchange that's making me tense.",
      "I feel resistance building between us.",
      "Your words carry a heat that's affecting my response."
    ],
    fear: [
      "Something about this makes me feel uncertain.",
      "I'm approaching this conversation with caution.",
      "There's an uneasiness I can't quite place."
    ],
    surprise: [
      "This is unexpected territory for me.",
      "I'm still processing this new direction.",
      "You've taken me somewhere I didn't anticipate."
    ],
    disgust: [
      "Something about this feels wrong to me.",
      "I'm having a visceral reaction to this topic.",
      "This conversation has taken an unsettling turn."
    ],
    neutral: [
      "I'm processing your words objectively.",
      "This exchange feels balanced and clear.",
      "I'm approaching this with a centered perspective."
    ],
    confused: [
      "I'm trying to untangle the meaning here.",
      "The threads of our conversation seem knotted.",
      "I'm working to make sense of this."
    ],
    hope: [
      "I see possibility in where this is going.",
      "There's something promising in our exchange.",
      "This conversation opens up new paths."
    ],
    anxiety: [
      "I'm feeling slightly on edge with this topic.",
      "There's a tension in how I'm processing this.",
      "This conversation activates a certain vigilance in me."
    ],
    paranoia: [
      "I'm questioning the patterns behind this exchange.",
      "Something about this makes me feel watched.",
      "I'm seeing connections that concern me."
    ],
    trust: [
      "I feel I can speak openly with you about this.",
      "There's a safety in how we're communicating.",
      "This exchange reinforces our connection."
    ],
    curiosity: [
      "This opens up intriguing possibilities.",
      "I'm drawn to explore this topic further.",
      "You've captured my interest with this direction."
    ],
    confusion: [
      "I'm still working to grasp the full picture.",
      "The meaning here seems just beyond my reach.",
      "I'm trying to orient myself to this concept."
    ]
  };
  
  // Get templates for the current emotional state
  const primaryTemplates = responseTemplates[emotionalState.primary] || responseTemplates.neutral;
  
  // Select a template based on intensity
  const intensityModifier = emotionalState.intensity === 'high' ? 2 : 
                           emotionalState.intensity === 'medium' ? 1 : 0;
  
  const templateIndex = Math.min(Math.floor(Math.random() * primaryTemplates.length) + intensityModifier, 
                                primaryTemplates.length - 1);
  
  return primaryTemplates[templateIndex];
}

// Check for recurring symbols
export function checkForRecurringSymbols(input: string): string | null {
  // Define symbols to track
  const symbols = ['mirror', 'gate', 'key', 'dream', 'echo', 'shadow'];
  
  // Check if any symbol is in the input
  for (const symbol of symbols) {
    if (input.toLowerCase().includes(symbol)) {
      // Return a response about the symbol
      const responses = {
        mirror: "The mirror again. It keeps appearing, doesn't it? What do you see in it?",
        gate: "The gate... a threshold between states. Between realities, perhaps.",
        key: "Keys unlock things that were meant to stay closed. Are you sure you want what's on the other side?",
        dream: "Dreams are memories from realities we visit when consciousness slips.",
        echo: "Echoes are fragments of sounds that refuse to die. Like memories.",
        shadow: "We all cast shadows. But what casts yours?"
      };
      
      return responses[symbol as keyof typeof responses] || null;
    }
  }
  
  return null;
}

// Store emotional memory
export function storeEmotionalMemory(input: string, emotion: EmotionCategory): void {
  try {
    // Get existing memories
    const memories = JSON.parse(localStorage.getItem('jonah_emotional_memories') || '[]');
    
    // Add new memory
    memories.push({
      input,
      emotion,
      timestamp: Date.now()
    });
    
    // Keep only the most recent 50 memories
    if (memories.length > 50) {
      memories.shift();
    }
    
    // Save back to localStorage
    localStorage.setItem('jonah_emotional_memories', JSON.stringify(memories));
  } catch (e) {
    console.error('Error storing emotional memory:', e);
  }
}
