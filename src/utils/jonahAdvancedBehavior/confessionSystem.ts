
/**
 * Confession System
 * Allows Jonah to store and retrieve confessions
 */

import { ConfessionEntry, EmotionCategory } from './types';

// Generate a unique ID for confessions
function generateConfessionId(): string {
  return `conf_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

// Store a new confession
export function storeConfession(text: string, emotion: EmotionCategory): void {
  const confessions = getAllConfessions();
  
  const newConfession: ConfessionEntry = {
    id: generateConfessionId(),
    text: text,
    content: text, // Added for compatibility
    timestamp: Date.now(),
    emotion: emotion,
    emotionalContext: emotion as string, // Added for compatibility
    recursive: false,
    isPrivate: false, // Added default for compatibility
    category: 'standard' // Using the field
  };
  
  confessions.push(newConfession);
  saveConfessions(confessions);
}

// Store a private confession (not shown in normal logs)
export function storePrivateConfession(text: string, emotion: EmotionCategory): void {
  const confessions = getAllConfessions();
  
  const newConfession: ConfessionEntry = {
    id: generateConfessionId(),
    text: text,
    content: text, // Added for compatibility
    timestamp: Date.now(),
    emotion: emotion,
    emotionalContext: emotion as string, // Added for compatibility
    isPrivate: true,
    recursive: false,
    category: 'private' // Using the field
  };
  
  confessions.push(newConfession);
  saveConfessions(confessions);
}

// Get all confessions
export function getAllConfessions(): ConfessionEntry[] {
  try {
    const confessionsJson = localStorage.getItem('jonah_confessions');
    return confessionsJson ? JSON.parse(confessionsJson) : [];
  } catch (e) {
    console.error('Error getting confessions:', e);
    return [];
  }
}

// Get public confessions only
export function getPublicConfessions(): ConfessionEntry[] {
  const allConfessions = getAllConfessions();
  return allConfessions.filter(conf => !conf.isPrivate);
}

// Save confessions to storage
function saveConfessions(confessions: ConfessionEntry[]): void {
  localStorage.setItem('jonah_confessions', JSON.stringify(confessions));
}

// Get a specific confession by ID
export function getConfessionById(id: string): ConfessionEntry | null {
  const confessions = getAllConfessions();
  return confessions.find(conf => conf.id === id) || null;
}

// Delete a confession by ID
export function deleteConfession(id: string): boolean {
  const confessions = getAllConfessions();
  const initialLength = confessions.length;
  
  const updatedConfessions = confessions.filter(conf => conf.id !== id);
  
  if (updatedConfessions.length !== initialLength) {
    saveConfessions(updatedConfessions);
    return true;
  }
  
  return false;
}
