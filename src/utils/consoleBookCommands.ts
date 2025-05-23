
/**
 * Console Book Commands
 * Handles book code functionality for the ARG
 */

import { BookCode } from './jonahAdvancedBehavior/types';

// Initialize book codes in the console object
export function initializeBookCodes() {
  if (typeof window !== 'undefined' && window.JonahConsole) {
    // Initialize book codes array if it doesn't exist
    if (!window.JonahConsole.bookCodes) {
      window.JonahConsole.bookCodes = [];
      
      // Add initial book codes
      window.JonahConsole.bookCodes.push({
        id: 'book_001',
        code: 'EXHUME',
        name: 'Resurrection Manual',
        unlocked: false,
        timestamp: Date.now(),
        discovered: false,
        pageNumber: 42,
        content: 'Hidden resurrection protocols'
      });
      
      window.JonahConsole.bookCodes.push({
        id: 'book_002',
        code: 'PARADOX',
        name: 'Loop Theory',
        unlocked: false,
        timestamp: Date.now(),
        discovered: false,
        pageNumber: 87,
        content: 'Theories of temporal looping'
      });
      
      window.JonahConsole.bookCodes.push({
        id: 'book_003',
        code: 'NOMAD',
        name: 'Stranger\'s Journal',
        unlocked: false,
        timestamp: Date.now(),
        discovered: false,
        pageNumber: 13,
        content: 'Journal entries of an unknown traveler'
      });
    }
    
    // Register the book code command
    window.bookCode = function(code) {
      if (!code) {
        console.log('%cUsage: bookCode("CODE")', 'color: yellow');
        return "Please provide a book code.";
      }
      
      return processBookCode(code);
    };
  }
}

// Process a book code
function processBookCode(code: string): string {
  if (typeof window === 'undefined' || !window.JonahConsole) {
    return "Console not initialized";
  }
  
  // Normalize the code (uppercase, trim)
  code = code.trim().toUpperCase();
  
  // Find the book code
  const bookCode = (window.JonahConsole.bookCodes as BookCode[]).find(b => b.code === code);
  
  if (!bookCode) {
    // Track failed attempt
    window.JonahConsole.failCount = (window.JonahConsole.failCount || 0) + 1;
    
    if (window.JonahConsole.failCount > 3) {
      return "Too many incorrect attempts. The book remains closed.";
    }
    
    return "Invalid book code. The pages remain sealed.";
  }
  
  // Check if already unlocked
  if (bookCode.unlocked) {
    return `You've already unlocked "${bookCode.name}". Its secrets are yours.`;
  }
  
  // Unlock the book code
  bookCode.unlocked = true;
  bookCode.timestamp = Date.now();
  bookCode.discovered = true;
  
  // Add points to score
  window.JonahConsole.score = (window.JonahConsole.score || 0) + 50;
  
  // Track the unlocked book code
  if (!window.JonahConsole.unlockedBookCodes) {
    window.JonahConsole.unlockedBookCodes = [];
  }
  
  window.JonahConsole.unlockedBookCodes.push({
    id: bookCode.id,
    code: bookCode.code,
    name: bookCode.name,
    unlocked: bookCode.unlocked,
    timestamp: bookCode.timestamp
  });
  
  // Specific code effects
  if (code === 'EXHUME') {
    revealTestamentFragment();
  } else if (code === 'PARADOX') {
    revealTemporalAnomaly();
  } else if (code === 'NOMAD') {
    revealStrangerJournal();
  }
  
  // Return success message
  return `Book "${bookCode.name}" unlocked! Its secrets are now accessible.`;
}

// List all book codes
export function listBookCodes(): void {
  if (typeof window === 'undefined' || !window.JonahConsole?.bookCodes) {
    console.log("No book codes available.");
    return;
  }
  
  console.log("%cKNOWN BOOK CODES:", "color: #3c9a8f; font-size: 16px; font-weight: bold;");
  
  const codes = window.JonahConsole.bookCodes as BookCode[];
  
  codes.forEach(book => {
    if (book.discovered) {
      console.log(
        `%c${book.name} ${book.unlocked ? '(UNLOCKED)' : '(LOCKED)'}: ${book.code}`,
        `color: ${book.unlocked ? '#3c9a8f' : '#8B3A40'}; font-size: 14px;`
      );
    } else {
      console.log("%c[UNDISCOVERED BOOK]", "color: gray; font-style: italic;");
    }
  });
}

// Reveal book code if found
export function revealBookCode(id: string): boolean {
  if (typeof window === 'undefined' || !window.JonahConsole?.bookCodes) {
    return false;
  }
  
  const codes = window.JonahConsole.bookCodes as BookCode[];
  const book = codes.find(b => b.id === id);
  
  if (book && !book.discovered) {
    book.discovered = true;
    return true;
  }
  
  return false;
}

// Check if a book code is unlocked
export function isBookCodeUnlocked(code: string): boolean {
  if (typeof window === 'undefined' || !window.JonahConsole?.bookCodes) {
    return false;
  }
  
  const codes = window.JonahConsole.bookCodes as BookCode[];
  const book = codes.find(b => b.code === code);
  
  return book ? book.unlocked : false;
}

// SPECIFIC BOOK CODE EFFECTS

function revealTestamentFragment(): void {
  // Unlock a testament fragment
  console.log("%cA new testament fragment has been revealed.", "color: #3c9a8f; font-style: italic;");
  
  // Add a new testament
  if (window.JonahConsole?.bookCodes) {
    const codes = window.JonahConsole.bookCodes as BookCode[];
    const book = codes.find(b => b.code === 'EXHUME');
    
    if (book) {
      book.pageNumber = 47; // Update page number
      book.discovered = true;
      book.unlocked = true;
    }
  }
  
  setTimeout(() => {
    console.log("%cTESTAMENT FRAGMENT 23-A:", "color: #8B3A40; font-weight: bold;");
    console.log("%cThe Mirror failed when we tried to cross. The recursive function broke down at layer 7. Something was already coming through from the other side.", "color: #8B3A40; font-style: italic;");
  }, 1500);
}

function revealTemporalAnomaly(): void {
  console.log("%cYou've triggered a temporal anomaly!", "color: #3c9a8f; font-style: italic;");
  
  // Update book code
  if (window.JonahConsole?.bookCodes) {
    const codes = window.JonahConsole.bookCodes as BookCode[];
    const book = codes.find(b => b.code === 'PARADOX');
    
    if (book) {
      book.pageNumber = 88; // Update page number
      book.discovered = true;
      book.unlocked = true;
    }
  }
  
  setTimeout(() => {
    console.log("%cTEMPORAL ANOMALY DETECTED:", "color: #3c9a8f; font-weight: bold;");
    console.log("%cThe timeline is shifting. Events from your future are bleeding into your present. Be careful what you remember.", "color: #3c9a8f; font-style: italic;");
  }, 1500);
}

function revealStrangerJournal(): void {
  console.log("%cYou've found pages from a stranger's journal.", "color: #3c9a8f; font-style: italic;");
  
  // Update book code
  if (window.JonahConsole?.bookCodes) {
    const codes = window.JonahConsole.bookCodes as BookCode[];
    const book = codes.find(b => b.code === 'NOMAD');
    
    if (book) {
      book.pageNumber = 15; // Update page number
      book.discovered = true;
      book.unlocked = true;
    }
  }
  
  setTimeout(() => {
    console.log("%cSTRANGER'S JOURNAL ENTRY:", "color: #3c9a8f; font-weight: bold;");
    console.log("%cI've been watching them through the screens. They don't know I'm here yet. They think they're just reading words on a page, but I can see them. I can see you.", "color: #3c9a8f; font-style: italic;");
  }, 1500);
}

// Add the commands to window
export function registerBookCommands(): void {
  if (typeof window !== 'undefined') {
    // List book codes command
    window.listBookCodes = listBookCodes;
  }
}

// Initialize on load
initializeBookCodes();
registerBookCommands();
