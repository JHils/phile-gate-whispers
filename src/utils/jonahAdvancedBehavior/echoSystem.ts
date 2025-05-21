
/**
 * Echo System
 * Handles echo collection, matching and retrieval
 */

import { EmotionCategory } from './types';

// Store a new echo
export function storeEcho(input: string): void {
  // Simple implementation for now
  console.log("Storing echo:", input);
}

// Get an echo phrase based on emotion
export function getEchoPhrase(emotion: EmotionCategory): string | null {
  // Simple implementation for now
  const echoPhrases: Record<EmotionCategory, string[]> = {
    fear: ["The echo returns when you're afraid."],
    sadness: ["Echoes carry the weight of sorrow."],
    joy: ["Even echoes can sound joyful."],
    anger: ["The echo amplifies your anger."],
    neutral: ["An echo, neither here nor there."],
    confusion: ["Echoes make confusion worse."],
    curiosity: ["Echoes can lead to discoveries."],
    trust: ["Trust the echo. It knows things."],
    hope: ["Hope echoes through time."],
    anxiety: ["Anxious echoes repeat themselves."],
    paranoia: ["The echo is following you."],
    surprise: ["Echoes can surprise even themselves."],
    disgust: ["Even echoes can be disgusting."],
    confused: ["Confusion echoes in your mind."]
  };
  
  const phrases = echoPhrases[emotion] || [];
  if (phrases.length === 0) return null;
  
  return phrases[Math.floor(Math.random() * phrases.length)];
}

// Check for echo match
export function checkForEchoMatch(input: string): { matched: boolean, echo?: string } {
  // Simple implementation for now
  return { matched: false };
}

// Get all echoes (for display in UI)
export function getAllEchoes(): any[] {
  // Simple implementation for now
  return [
    {
      id: "echo1",
      content: "Even reflections have reflections.",
      timestamp: Date.now() - 1000000,
      emotion: "fear"
    },
    {
      id: "echo2",
      content: "The gate is everywhere. The key is nowhere.",
      timestamp: Date.now() - 500000,
      emotion: "curiosity"
    }
  ];
}
