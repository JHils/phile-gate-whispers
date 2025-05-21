
/**
 * Console Book Commands
 * Handles book code system for Jonah
 */

import { BookCode } from '@/utils/jonahAdvancedBehavior/types';

// Book entries
const bookEntries: BookCode[] = [
  {
    id: "book1",
    code: "REFLECTOR",
    timestamp: Date.now() - 1000000,
    name: "The Broken Mirror",
    pageNumber: 42,
    unlocked: false
  },
  {
    id: "book2",
    code: "MAGNETIC",
    timestamp: Date.now() - 500000,
    name: "Magnetic Island",
    pageNumber: 137,
    unlocked: false
  },
  {
    id: "book3",
    code: "GATEWAY",
    timestamp: Date.now() - 250000,
    name: "The Other Side",
    pageNumber: 89,
    unlocked: false
  }
];

// Set up book commands
export function initializeBookCommands(trackCommand: (command: string) => void): void {
  // Store book entries in console
  storeBookEntries();
  
  // Unlock book code command
  window.unlockBookCode = function(code: string): void {
    if (!code) {
      console.log("%cPlease provide a book code.", "color: #8B3A40;");
      return;
    }
    
    const upperCode = code.toUpperCase();
    let found = false;
    
    // Check against all book codes
    const updatedBooks = getStoredBookEntries().map(book => {
      if (book.code === upperCode) {
        found = true;
        if (book.unlocked) {
          console.log("%cThis book code has already been unlocked.", "color: #8B3A40;");
        } else {
          console.log("%cBook code accepted!", "color: #8B3A40; font-weight: bold;");
          console.log(`%cUnlocked: ${book.name} - Page ${book.pageNumber}`, "color: #8B3A40;");
          book.unlocked = true;
          book.timestamp = Date.now();
          
          // Track the command
          trackCommand('book_code_unlocked');
        }
      }
      return book;
    });
    
    if (!found) {
      console.log("%cInvalid book code. Please try again.", "color: #8B3A40;");
    } else {
      // Update stored books
      storeBookEntries(updatedBooks);
    }
  };
  
  // Book command to list unlocked books
  window.book = function(): void {
    const books = getStoredBookEntries();
    const unlockedBooks = books.filter(b => b.unlocked);
    
    if (unlockedBooks.length === 0) {
      console.log("%cYou haven't unlocked any books yet.", "color: #8B3A40;");
      console.log("%cSearch for book codes in your exploration.", "color: #8B3A40; font-style: italic;");
      return;
    }
    
    console.log("%c--- UNLOCKED BOOKS ---", "color: #8B3A40; font-weight: bold;");
    unlockedBooks.forEach(book => {
      const unlockTime = new Date(book.timestamp).toLocaleString();
      console.log(`%c${book.name} - Page ${book.pageNumber}`, "color: #8B3A40; font-weight: bold;");
      console.log(`%cCode: ${book.code} (Unlocked: ${unlockTime})`, "color: #8B3A40;");
      console.log("%c--------------------", "color: #8B3A40;");
    });
    
    // Track the command
    trackCommand('books_listed');
  };
}

// Helper to store book entries in localStorage
function storeBookEntries(books: BookCode[] = bookEntries): void {
  try {
    localStorage.setItem('jonah_book_entries', JSON.stringify(books));
  } catch (e) {
    console.error("Error storing book entries:", e);
  }
}

// Helper to get stored book entries
function getStoredBookEntries(): BookCode[] {
  try {
    const stored = localStorage.getItem('jonah_book_entries');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error("Error retrieving book entries:", e);
  }
  return bookEntries;
}

// Extend window interface
declare global {
  interface Window {
    book: () => void;
    unlockBookCode: (code: string) => void;
  }
}

export default initializeBookCommands;
