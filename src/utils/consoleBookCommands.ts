
import { BookCode } from "./jonahAdvancedBehavior/types";

// Initialize book codes
export const initializeBookCodes = () => {
  // Check if we already have book codes stored
  const existingCodes = localStorage.getItem("jonah_book_codes");
  if (existingCodes) return;
  
  // Define initial book codes
  const initialCodes: BookCode[] = [
    {
      id: "book1",
      code: "MIRROR",
      timestamp: Date.now(),
      name: "The Reflection",
      pageNumber: 17,
      unlocked: false
    },
    {
      id: "book2",
      code: "ECHO",
      timestamp: Date.now(),
      name: "The Response",
      pageNumber: 42,
      unlocked: false
    },
    {
      id: "book3",
      code: "GATE",
      timestamp: Date.now(),
      name: "The Threshold",
      pageNumber: 108,
      unlocked: false
    }
  ];
  
  // Store in localStorage
  localStorage.setItem("jonah_book_codes", JSON.stringify(initialCodes));
};

// Get book codes
export const getBookCodes = (): BookCode[] => {
  try {
    const codes = localStorage.getItem("jonah_book_codes");
    return codes ? JSON.parse(codes) : [];
  } catch (e) {
    console.error("Error loading book codes:", e);
    return [];
  }
};

// Check if a code matches
export const checkBookCode = (inputCode: string): BookCode | null => {
  const codes = getBookCodes();
  const matchedCode = codes.find(c => c.code === inputCode.toUpperCase());
  
  if (matchedCode && !matchedCode.unlocked) {
    // Update the code to be unlocked
    matchedCode.unlocked = true;
    matchedCode.timestamp = Date.now();
    
    // Save back to localStorage
    localStorage.setItem("jonah_book_codes", JSON.stringify(codes));
    
    // Also update in JonahConsole for ARG tracking if available
    if (window.JonahConsole?.bookCodes) {
      window.JonahConsole.bookCodes = codes;
    }
    
    return matchedCode;
  }
  
  return matchedCode;
};

// Create book command
export const createBookCommand = () => {
  window.book = function(code: string) {
    if (!code) {
      // Display the books that have been found
      const codes = getBookCodes();
      const unlockedCodes = codes.filter(c => c.unlocked);
      
      if (unlockedCodes.length === 0) {
        return "You haven't found any books yet. Look for codes.";
      }
      
      console.log("%cBOOKS FOUND:", "color:#4ade80; font-weight:bold;");
      unlockedCodes.forEach(code => {
        console.log(
          `%c${code.name} (Page ${code.pageNumber})`,
          "color:#4ade80;"
        );
      });
      
      return `You've found ${unlockedCodes.length} out of ${codes.length} books.`;
    }
    
    // Try to unlock a book with the given code
    const matchedCode = checkBookCode(code);
    
    if (matchedCode && matchedCode.unlocked) {
      console.log(
        `%cBOOK UNLOCKED: ${matchedCode.name}`,
        "color:#4ade80; font-weight:bold;"
      );
      return `You've unlocked "${matchedCode.name}" (Page ${matchedCode.pageNumber})`;
    } else if (matchedCode) {
      return `You've already found that book: "${matchedCode.name}"`;
    } else {
      return "That code doesn't match any known books.";
    }
  };
  
  // Allow for unlocking codes programmatically (internal use)
  window.unlockBookCode = function(codeId: string) {
    const codes = getBookCodes();
    const code = codes.find(c => c.id === codeId);
    
    if (code && !code.unlocked) {
      code.unlocked = true;
      code.timestamp = Date.now();
      localStorage.setItem("jonah_book_codes", JSON.stringify(codes));
      
      if (window.JonahConsole?.bookCodes) {
        window.JonahConsole.bookCodes = codes;
      }
      
      return true;
    }
    
    return false;
  };
  
  // Initialize the codes
  initializeBookCodes();
};
