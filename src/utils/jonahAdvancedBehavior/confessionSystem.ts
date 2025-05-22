
/**
 * Confession System for Jonah AI
 */

import { ConfessionEntry, generateUniqueId } from './types';

// Storage key for confessions
const CONFESSIONS_KEY = 'jonah_confessions';

// Get all confessions
export function getAllConfessions(): ConfessionEntry[] {
  try {
    const data = localStorage.getItem(CONFESSIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error retrieving confessions:', e);
    return [];
  }
}

// Add a new confession
export function addConfession(
  title: string,
  content: string,
  author: string = 'anonymous'
): ConfessionEntry {
  const confession: ConfessionEntry = {
    id: generateUniqueId(),
    title,
    content,
    timestamp: Date.now(),
    author,
    sentiment: getSentiment(content),
    isCorrupted: Math.random() < 0.1,
    category: 'general',
    version: '1.0'
  };
  
  // Get existing confessions
  const confessions = getAllConfessions();
  
  // Add new confession
  confessions.push(confession);
  
  // Save back to storage
  try {
    localStorage.setItem(CONFESSIONS_KEY, JSON.stringify(confessions));
  } catch (e) {
    console.error('Error saving confession:', e);
  }
  
  return confession;
}

// Get a specific confession
export function getConfession(id: string): ConfessionEntry | undefined {
  return getAllConfessions().find(c => c.id === id);
}

// Corrupt a confession (for narrative purposes)
export function corruptConfession(id: string): ConfessionEntry | undefined {
  const confessions = getAllConfessions();
  const index = confessions.findIndex(c => c.id === id);
  
  if (index === -1) return undefined;
  
  // Apply corruption
  const corrupted: ConfessionEntry = {
    ...confessions[index],
    content: applyCorruption(confessions[index].content),
    isCorrupted: true,
    sentiment: 'corrupted',
    category: 'corrupted',
    version: '0.0'
  };
  
  // Update confession
  confessions[index] = corrupted;
  
  // Save back to storage
  localStorage.setItem(CONFESSIONS_KEY, JSON.stringify(confessions));
  
  return corrupted;
}

// Helper function to apply text corruption
function applyCorruption(text: string): string {
  // Replace some characters with glitch characters
  const glitchChars = '¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉ';
  let result = '';
  
  for (let i = 0; i < text.length; i++) {
    if (Math.random() < 0.1) {
      result += glitchChars[Math.floor(Math.random() * glitchChars.length)];
    } else {
      result += text[i];
    }
  }
  
  return result;
}

// Helper function to determine sentiment
function getSentiment(text: string): string {
  const positive = ['hope', 'happy', 'joy', 'love', 'glad', 'good', 'nice'];
  const negative = ['sad', 'fear', 'anger', 'hate', 'bad', 'terrible', 'awful'];
  
  let positiveCount = 0;
  let negativeCount = 0;
  
  const lowerText = text.toLowerCase();
  
  positive.forEach(word => {
    if (lowerText.includes(word)) positiveCount++;
  });
  
  negative.forEach(word => {
    if (lowerText.includes(word)) negativeCount++;
  });
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}
