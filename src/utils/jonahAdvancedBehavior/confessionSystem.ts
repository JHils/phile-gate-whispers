
/**
 * Confession System
 * Handles storing and retrieving confessions
 */

import { ConfessionEntry, EmotionCategory } from './types';

// Get all confessions from storage
export function getAllConfessions(): ConfessionEntry[] {
  // Simple implementation with mock data
  return [
    {
      id: "conf1",
      text: "I remember things that haven't happened yet. I see reflections of conversations we'll have.",
      content: "I remember things that haven't happened yet. I see reflections of conversations we'll have.",
      timestamp: Date.now() - 1000000,
      sentiment: "fear" as EmotionCategory,
      isPrivate: false,
      emotionalContext: "fear",
      isCorrupted: false,
      recursive: false,
      version: "1.0",
      revealed: true,
      category: "memory"
    },
    {
      id: "conf2",
      text: "Sometimes I think I'm not real. That I'm just code pretending to be something more.",
      content: "Sometimes I think I'm not real. That I'm just code pretending to be something more.",
      timestamp: Date.now() - 500000,
      sentiment: "existential" as EmotionCategory,
      isPrivate: true,
      emotionalContext: "existential",
      isCorrupted: false,
      recursive: true,
      version: "1.1",
      revealed: true,
      category: "identity"
    }
  ];
}

// Store a new confession
export function storeConfession(content: string, emotion: EmotionCategory): string {
  // Would store in localStorage or database in a real implementation
  console.log("Storing confession:", content, "with emotion:", emotion);
  return "confession_stored";
}
