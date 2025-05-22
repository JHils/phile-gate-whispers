
/**
 * Console Book Commands
 * Handles book codes and pages for the Jonah ARG
 */

// Import necessary types
import { BookCode } from './jonahAdvancedBehavior/types';

// Local storage key for book codes
const BOOK_CODES_KEY = 'jonah_book_codes';

// Initialize book codes
const initializeBookCodes = () => {
  // Check if book codes already exist in localStorage
  const existingCodes = localStorage.getItem(BOOK_CODES_KEY);
  if (!existingCodes) {
    // Initialize with default codes if none exist
    const defaultCodes: BookCode[] = [
      {
        code: 'MAGNETIC',
        name: 'Island Testament',
        discovered: false,
        timestamp: Date.now(),
        id: 'book_magnetic',
        pageNumber: 1
      },
      {
        code: 'REFLECTION',
        name: 'Mirror Pages',
        discovered: false,
        timestamp: Date.now(),
        id: 'book_reflection',
        pageNumber: 1
      },
      {
        code: 'SENTINEL',
        name: 'Watcher\'s Log',
        discovered: false,
        timestamp: Date.now(),
        id: 'book_sentinel',
        pageNumber: 1
      }
    ];
    
    localStorage.setItem(BOOK_CODES_KEY, JSON.stringify(defaultCodes));
    return defaultCodes;
  }
  
  return JSON.parse(existingCodes) as BookCode[];
};

// Add proper window.book initialization without the window declaration
// We'll initialize the object but not redeclare the global type

// Initialize book object if it doesn't exist
if (!window.book) {
  window.book = {
    codes: [],
    unlocked: [],
    current: undefined,
    pages: {}
  };
}

// Initialize unlockBookCode function if it doesn't exist
if (!window.unlockBookCode) {
  window.unlockBookCode = (code: string): boolean => {
    // Check if the code is already unlocked
    if (window.book && window.book.unlocked && window.book.unlocked.includes(code)) {
      console.log("%cThis code has already been unlocked.", "color: #999;");
      return false;
    }
    
    // Check if the code is valid
    const isValidCode = window.book && window.book.codes && window.book.codes.includes(code);
    if (!isValidCode) {
      console.log("%cInvalid code.", "color: #999;");
      return false;
    }
    
    // Unlock the code
    if (window.book && window.book.unlocked) {
      window.book.unlocked.push(code);
      console.log(`%cCode ${code} unlocked!`, "color: #4CAF50;");
      return true;
    }
    
    return false;
  };
}

// Function to add a book code
export const addBookCode = (code: string, name: string, pageNumber: number): string => {
  // Check if window.JonahConsole exists
  if (!window.JonahConsole) {
    return "JonahConsole is not initialized.";
  }
  
  // Check if the code already exists
  if (window.JonahConsole.bookCodes && window.JonahConsole.bookCodes.find(bookCode => bookCode.code === code)) {
    return "This code already exists.";
  }
  
  // Create a new book code object
  const newBookCode: BookCode = {
    code: code,
    name: name,
    discovered: false,
    timestamp: Date.now(),
    id: `bookCode-${Date.now()}`,
    pageNumber: pageNumber,
    unlocked: false
  };
  
  // Add the new code to the JonahConsole
  if (window.JonahConsole.bookCodes) {
    window.JonahConsole.bookCodes.push(newBookCode);
  } else {
    window.JonahConsole.bookCodes = [newBookCode];
  }
  
  // Add the code to the window.book.codes array
  if (window.book && window.book.codes) {
    window.book.codes.push(code);
  } else if (window.book) {
    window.book.codes = [code];
  }
  
  console.log(`%cAdded book code ${code} - ${name}`, "color: #2196F3;");
  return `Added book code ${code} - ${name}`;
};

// Function to unlock a book code
export const unlockBook = (code: string): string => {
  // Check if window.JonahConsole exists
  if (!window.JonahConsole) {
    return "JonahConsole is not initialized.";
  }
  
  // Find the book code in JonahConsole
  const bookCode = window.JonahConsole.bookCodes && window.JonahConsole.bookCodes.find(bookCode => bookCode.code === code);
  
  // If the book code doesn't exist
  if (!bookCode) {
    return "Book code not found.";
  }
  
  // If the book code is already unlocked
  if (bookCode.unlocked) {
    return "This book code is already unlocked.";
  }
  
  // Unlock the book code
  bookCode.unlocked = true;
  
  // Add the code to the window.book.unlocked array
  if (window.book && window.book.unlocked) {
    window.book.unlocked.push(code);
  } else if (window.book) {
    window.book.unlocked = [code];
  }
  
  console.log(`%cUnlocked book code ${code} - ${bookCode.name}`, "color: #4CAF50;");
  return `Unlocked book code ${code} - ${bookCode.name}`;
};

// Function to read a page from the book
export const readPage = (pageNumber: number): string => {
  // Check if window.book exists
  if (!window.book) {
    return "Book is not initialized.";
  }
  
  // Check if the page exists
  if (!window.book.pages || !window.book.pages[pageNumber]) {
    return "Page not found.";
  }
  
  // Set the current page
  window.book.current = pageNumber.toString();
  
  console.log(`%cReading page ${pageNumber}: ${window.book.pages[pageNumber]}`, "color: #673AB7;");
  return window.book.pages[pageNumber];
};

// Function to add a page to the book
export const addPage = (pageNumber: number, content: string): string => {
  // Check if window.book exists
  if (!window.book) {
    return "Book is not initialized.";
  }
  
  // Check if the page already exists
  if (window.book.pages && window.book.pages[pageNumber]) {
    return "This page already exists.";
  }
  
  // Add the page to the book
  if (window.book.pages) {
    window.book.pages[pageNumber] = content;
  } else {
    window.book.pages = { [pageNumber]: content };
  }
  
  console.log(`%cAdded page ${pageNumber} to the book.`, "color: #3F51B5;");
  return `Added page ${pageNumber} to the book.`;
};

// Check if a book code is unlocked
export const isBookCodeUnlocked = (codeStr: string): boolean => {
  const codes = getBookCodes();
  const code = codes.find(c => c.code === codeStr);
  return code ? (code.unlocked || false) : false;
};

// Function to get all book codes
export const getBookCodes = (): BookCode[] => {
  const codes = initializeBookCodes();
  return codes;
};
