
import { BookCode } from './jonahAdvancedBehavior/types';

// When adding a bookcode, ensure the BookCode type properties are all included
export function addBookCode(code: string): BookCode | null {
  // Get existing book codes
  const existingCodes = getBookCodes();
  
  // Check for duplicate
  if (existingCodes.some(book => book.code === code)) {
    console.log("Book code already exists.");
    return null;
  }
  
  // Match code to predefined codes
  let newBook: BookCode | null = null;
  
  if (code === "MIRRORFORGE") {
    newBook = {
      id: "mirror-code",
      code: "MIRRORFORGE",
      name: "Mirror Forge",
      unlocked: true,
      timestamp: Date.now(),
      discovered: true,
      pageNumber: 23
    };
  } else if (code === "ECHOMAP") {
    newBook = {
      id: "echo-code",
      code: "ECHOMAP",
      name: "Echo Map",
      unlocked: true,
      timestamp: Date.now(),
      discovered: true,
      pageNumber: 47
    };
  } else if (code === "SUMMERHOUSE") {
    newBook = {
      id: "summer-code",
      code: "SUMMERHOUSE",
      name: "Summerhouse",
      unlocked: true,
      timestamp: Date.now(),
      discovered: true,
      pageNumber: 115
    };
  } else {
    console.log("Invalid book code.");
    return null;
  }
  
  if (newBook) {
    // Add to existing codes
    existingCodes.push(newBook);
    
    // Save to localStorage
    localStorage.setItem('jonahBookCodes', JSON.stringify(existingCodes));
    
    console.log(`Book code '${code}' unlocked: ${newBook.name}`);
    return newBook;
  }
  
  return null;
}

// Get all book codes
export function getBookCodes(): BookCode[] {
  try {
    const codes = localStorage.getItem('jonahBookCodes');
    return codes ? JSON.parse(codes) : [];
  } catch (error) {
    console.error("Error getting book codes:", error);
    return [];
  }
}

// Check if a book code exists
export function checkBookCode(code: string): BookCode | null {
  const codes = getBookCodes();
  return codes.find(book => book.code === code) || null;
}

// Unlock a book code
export function unlockBookCode(id: string): BookCode | null {
  const codes = getBookCodes();
  const bookIndex = codes.findIndex(book => book.id === id);
  
  if (bookIndex >= 0) {
    codes[bookIndex].unlocked = true;
    localStorage.setItem('jonahBookCodes', JSON.stringify(codes));
    return codes[bookIndex];
  }
  
  return null;
}

// Initialize default book codes if not exists
export function initializeBookCodes(): void {
  if (!localStorage.getItem('jonahBookCodes')) {
    const defaultCodes: BookCode[] = [
      {
        id: "default-code",
        code: "HIDDENSTART",
        name: "Starting Point",
        unlocked: false,
        discovered: false,
        pageNumber: 1
      }
    ];
    localStorage.setItem('jonahBookCodes', JSON.stringify(defaultCodes));
  }
}
