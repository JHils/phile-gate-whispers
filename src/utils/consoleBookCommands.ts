
// Import the BookCode interface
import { BookCode } from './jonahAdvancedBehavior/types';

// Initialize book codes
export const initializeBookCodes = () => {
  if (!window.JonahConsole) {
    window.JonahConsole = {
      usedCommands: [],
      score: 0,
      failCount: 0,
      rank: 'drifter',
      sessionStartTime: Date.now(),
      whispersFound: [],
      jokesDisplayed: [],
      storyFlags: [],
      bookCodes: []
    };
  }
  
  if (!window.JonahConsole.bookCodes) {
    window.JonahConsole.bookCodes = [];
  }
};

// Add a book code
export const addBookCode = (codeId: string, codeName: string): boolean => {
  if (!window.JonahConsole?.bookCodes) {
    initializeBookCodes();
  }
  
  // Check if code already exists
  const existingCode = window.JonahConsole.bookCodes.find((c: BookCode) => c.id === codeId);
  if (existingCode) {
    return false;
  }
  
  // Add new code
  const newCode: BookCode = {
    id: codeId,
    name: codeName,
    unlocked: true
  };
  
  window.JonahConsole.bookCodes.push(newCode);
  
  // Update user state if available
  if (window.JonahConsole?.rank) {
    const newRank = getUpdatedRank(window.JonahConsole.bookCodes.length);
    window.JonahConsole.rank = newRank;
  }
  
  return true;
};

// Get updated rank based on codes found
const getUpdatedRank = (codeCount: number): string => {
  if (codeCount >= 5) return 'archivist';
  if (codeCount >= 3) return 'scholar';
  if (codeCount >= 1) return 'reader';
  return 'drifter';
};

// Verify a book code
export const verifyBookCode = (code: string): { success: boolean; message: string } => {
  if (!window.JonahConsole) return { success: false, message: 'Console not initialized.' };
  
  // List of valid codes
  const validCodes = [
    { id: 'ECHOMIKE', name: 'Echo Mike Protocol' },
    { id: 'PARALLAX', name: 'Parallax Theorem' },
    { id: 'LOOKAWAY', name: 'Look-Away Technique' },
    { id: 'DARKHALF', name: 'Dark Half Theory' },
    { id: 'WOODWICK', name: 'Wood Wick Passage' },
    { id: 'FRACTURE', name: 'Fracture Pattern' },
    { id: 'OBSIDIAN', name: 'Obsidian Mirror' }
  ];
  
  // Normalize input
  const normalizedCode = code.trim().toUpperCase();
  
  // Find matching code
  const matchingCode = validCodes.find(c => c.id === normalizedCode);
  
  if (matchingCode) {
    // Check if already unlocked
    const alreadyUnlocked = window.JonahConsole.bookCodes.some((c: BookCode) => c.id === matchingCode.id);
    
    if (alreadyUnlocked) {
      return {
        success: false,
        message: `Book code ${matchingCode.name} already unlocked.`
      };
    }
    
    // Add new code
    addBookCode(matchingCode.id, matchingCode.name);
    
    return {
      success: true,
      message: `Book code confirmed: ${matchingCode.name}`
    };
  }
  
  return {
    success: false,
    message: 'Invalid book code.'
  };
};

// Setup the window function
export const setupBookCodeFunction = () => {
  window.verifyCode = function(code: string) {
    const result = verifyBookCode(code);
    console.log(`%c${result.message}`, 'color: #8B3A40; font-size: 14px;');
    return result.message;
  };
};

// Initialize on import
initializeBookCodes();
setupBookCodeFunction();
