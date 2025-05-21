
// Add missing functions for console book commands
import { BookCode } from '@/utils/jonahAdvancedBehavior/types';

// Initialize book codes
export function initializeBookCodes() {
  if (!localStorage.getItem('bookCodes')) {
    const initialCodes: BookCode[] = [
      {
        code: 'GENESIS',
        unlocked: false,
        pageNumber: 1,
        name: 'The Beginning'
      },
      {
        code: 'EXODUS',
        unlocked: false,
        pageNumber: 33,
        name: 'The Departure'
      },
      {
        code: 'REVELATIONS',
        unlocked: false,
        pageNumber: 144,
        name: 'The End'
      }
    ];
    
    localStorage.setItem('bookCodes', JSON.stringify(initialCodes));
    return initialCodes;
  }
  
  return JSON.parse(localStorage.getItem('bookCodes') || '[]');
}

// Get book codes
export function getBookCodes(): BookCode[] {
  return JSON.parse(localStorage.getItem('bookCodes') || '[]');
}

// Unlock a book code
export function unlockBookCode(code: string): boolean {
  const bookCodes = getBookCodes();
  const bookCode = bookCodes.find(bc => bc.code === code);
  
  if (bookCode && !bookCode.unlocked) {
    bookCode.unlocked = true;
    bookCode.timestamp = Date.now();
    localStorage.setItem('bookCodes', JSON.stringify(bookCodes));
    return true;
  }
  
  return false;
}

// Add a new book code
export function addBookCode(code: BookCode): boolean {
  if (!code.code) return false;
  
  const bookCodes = getBookCodes();
  
  // Check if code already exists
  if (bookCodes.some(bc => bc.code === code.code)) {
    return false;
  }
  
  // Add the code
  bookCodes.push({
    code: code.code,
    unlocked: code.unlocked || false,
    pageNumber: code.pageNumber || 0,
    timestamp: Date.now(),
    name: code.name || code.code
  });
  
  localStorage.setItem('bookCodes', JSON.stringify(bookCodes));
  return true;
}

// Get unlocked book codes
export function getUnlockedBookCodes(): BookCode[] {
  const bookCodes = getBookCodes();
  return bookCodes.filter(bc => bc.unlocked);
}

// Check if book code exists
export function bookCodeExists(code: string): boolean {
  const bookCodes = getBookCodes();
  return bookCodes.some(bc => bc.code === code);
}

// Check if book code is unlocked
export function isBookCodeUnlocked(code: string): boolean {
  const bookCodes = getBookCodes();
  const bookCode = bookCodes.find(bc => bc.code === code);
  return bookCode ? bookCode.unlocked : false;
}
