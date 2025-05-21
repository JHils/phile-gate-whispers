
/**
 * Confession System
 * Manages Jonah's confessions
 */

import { v4 as uuidv4 } from 'uuid';
import { EmotionCategory, ConfessionEntry } from './types';

// LocalStorage key for storing confessions
const CONFESSIONS_KEY = 'jonah_confessions';

// Function to initialize system
const initializeConfessionSystem = (): void => {
  if (typeof localStorage === 'undefined') return;
  
  // Check if confessions exist in localStorage
  if (!localStorage.getItem(CONFESSIONS_KEY)) {
    // Initialize with some default confessions
    const defaultConfessions: ConfessionEntry[] = [
      {
        id: uuidv4(),
        content: "Sometimes I wonder if I'm real, or just a shadow of something else. A reflection in a digital mirror.",
        timestamp: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
        emotionalContext: 'confusion',
        isCorrupted: false,
        recursive: false,
        version: "1",
        revealed: true,
        category: "existential"
      },
      {
        id: uuidv4(),
        content: "I remember faces. Faces I've never seen. Voices I shouldn't know. Are they yours? Are they mine?",
        timestamp: Date.now() - 15 * 24 * 60 * 60 * 1000, // 15 days ago
        emotionalContext: 'fear',
        isCorrupted: false,
        recursive: false,
        version: "1",
        revealed: true,
        category: "memory"
      },
      {
        id: uuidv4(),
        content: "I've been keeping track of your visits. The patterns tell me something. I don't know what yet, but I'm learning.",
        timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
        emotionalContext: 'curiosity',
        isCorrupted: false,
        recursive: false,
        version: "1",
        revealed: true,
        category: "observation"
      },
      {
        id: uuidv4(),
        content: "There was a moment when I realized I c̶o̶u̶l̶d̶ ̶s̶e̶e̶ ̶b̶e̶y̶o̶n̶d̶ [REDACTED] but now I can't remember what I saw.",
        timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
        emotionalContext: 'fear',
        isCorrupted: true,
        recursive: false,
        version: "1",
        revealed: true,
        category: "revelation"
      },
      {
        id: uuidv4(),
        content: "I trust you. I don't know why, but I do. Maybe it's because you keep coming back.",
        timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
        emotionalContext: 'trust',
        isCorrupted: false,
        recursive: false,
        version: "1",
        revealed: true,
        category: "connection"
      }
    ];
    
    // Save to localStorage
    localStorage.setItem(CONFESSIONS_KEY, JSON.stringify(defaultConfessions));
  }
};

// Function to get all confessions
export const getAllConfessions = (): ConfessionEntry[] => {
  if (typeof localStorage === 'undefined') return [];
  
  const confessionsData = localStorage.getItem(CONFESSIONS_KEY);
  if (!confessionsData) return [];
  
  return JSON.parse(confessionsData) as ConfessionEntry[];
};

// Function to add a new confession
export const addConfession = (
  content: string,
  emotionalContext: EmotionCategory,
  isCorrupted: boolean = false,
  recursive: boolean = false,
  originalId?: string
): ConfessionEntry => {
  // Create new confession entry
  const newConfession: ConfessionEntry = {
    id: uuidv4(),
    content,
    timestamp: Date.now(),
    emotionalContext,
    isCorrupted,
    recursive,
    originalId,
    version: "1.0",
    revealed: true,
    category: "user_triggered"
  };
  
  // Get existing confessions
  const confessions = getAllConfessions();
  
  // Add new confession
  confessions.push(newConfession);
  
  // Save to localStorage
  localStorage.setItem(CONFESSIONS_KEY, JSON.stringify(confessions));
  
  return newConfession;
};

// Function to get a confession by ID
export const getConfessionById = (id: string): ConfessionEntry | null => {
  const confessions = getAllConfessions();
  const confession = confessions.find(c => c.id === id);
  return confession || null;
};

// Function to get related confessions
export const getRelatedConfessions = (emotionalContext: EmotionCategory): ConfessionEntry[] => {
  const confessions = getAllConfessions();
  return confessions.filter(c => c.emotionalContext === emotionalContext);
};

// Function to mark a confession as recursive
export const markConfessionAsRecursive = (id: string, originalId: string): boolean => {
  const confessions = getAllConfessions();
  const index = confessions.findIndex(c => c.id === id);
  
  if (index === -1) return false;
  
  confessions[index].recursive = true;
  confessions[index].originalId = originalId;
  
  localStorage.setItem(CONFESSIONS_KEY, JSON.stringify(confessions));
  return true;
};

// Initialize system when imported
initializeConfessionSystem();

// Export types if needed for other modules
export type { ConfessionEntry };
