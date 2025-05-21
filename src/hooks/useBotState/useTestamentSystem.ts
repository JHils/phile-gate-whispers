/**
 * Testament System Hook
 * Manages access to Jonah's testament entries
 */

import { 
  unlockTestamentByPhrase as unlockTestament,
  getTestamentTeaser as getTeaser,
  generateTestamentResponse as generateResponse
} from '@/utils/jonahAdvancedBehavior/testament';

/**
 * Checks if content contains a phrase that could unlock a testament entry
 * @param content The user input to check
 * @returns true if a testament entry was unlocked
 */
export function checkForTestamentUnlock(content: string): boolean {
  if (!content || typeof content !== 'string') return false;
  
  // Try to unlock a testament entry with the phrase
  return unlockTestament(content);
}

/**
 * Generates a testament response based on user input
 * @param content The user input to check
 * @returns A testament-related response or null
 */
export function generateTestamentResponse(content: string): string | null {
  if (!content || typeof content !== 'string') return null;
  
  // Keep track of testament-related questions
  const testamentKeywords = ['testament', 'truth', 'story', 'what happened'];
  const isTestamentQuery = testamentKeywords.some(keyword => 
    content.toLowerCase().includes(keyword)
  );
  
  if (isTestamentQuery) {
    // Use the imported function directly to avoid Promise issues
    return generateResponse(content);
  }
  
  return null;
}

/**
 * Gets a testament teaser to inject occasionally into responses
 * @returns A testament teaser or null
 */
export function getTestamentTeaser(): string | null {
  // Only show a teaser rarely
  if (Math.random() > 0.2) {
    return null;
  }
  
  // Use the imported function directly
  return getTeaser();
}
