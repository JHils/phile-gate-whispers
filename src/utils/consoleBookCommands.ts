
/**
 * Console Book Commands
 * Jonah's discovered book codes and reference material
 */

import { BookCode } from './jonahAdvancedBehavior/types';

// Initialize book codes
export function initializeBookCodes() {
  if (window.JonahConsole) {
    if (!window.JonahConsole.bookCodes) {
      window.JonahConsole.bookCodes = [
        {
          id: "book1",
          name: "The Echo Chamber",
          unlocked: false
        },
        {
          id: "book2",
          name: "Quantum Mirror",
          unlocked: false
        },
        {
          id: "book3",
          name: "Traveler's Guide to Temporal Loops",
          unlocked: false
        }
      ];
    }
  }
  
  // Initialize commands
  setupBookCommands();
}

// Set up book-related console commands
function setupBookCommands() {
  if (typeof window !== 'undefined') {
    // Verify book code command
    window.verifyCode = function(code: string) {
      if (!code) {
        return "Please provide a code to verify.";
      }
      
      // Check if we have book codes to verify against
      if (!window.JonahConsole?.bookCodes) {
        return "Book code system not initialized.";
      }
      
      // Code verification logic
      const validCodes: Record<string, string> = {
        "ECHO-421": "book1",
        "QM-137": "book2",
        "LOOP-913": "book3"
      };
      
      const bookId = validCodes[code];
      if (bookId) {
        // Find the book
        const book = window.JonahConsole.bookCodes.find(b => b.id === bookId);
        if (book && !book.unlocked) {
          // Unlock the book
          book.unlocked = true;
          book.timestamp = Date.now();
          
          console.log(`%cBook Code Verified: ${code}`, "color: #4CAF50;");
          return `Success! You've unlocked "${book.name}".`;
        } else if (book) {
          // Already unlocked
          return `Code valid, but you've already unlocked "${book.name}".`;
        }
      }
      
      console.log(`%cInvalid Book Code: ${code}`, "color: #F44336;");
      return "Invalid code. Please check and try again.";
    };
    
    // Read page command
    window.readPage = function(pageNumber: number) {
      if (!pageNumber || typeof pageNumber !== 'number') {
        return "Please provide a valid page number.";
      }
      
      // Check if we have unlocked books
      if (!window.JonahConsole?.bookCodes) {
        return "Book system not initialized.";
      }
      
      // Get unlocked books
      const unlockedBooks = window.JonahConsole.bookCodes.filter(b => b.unlocked);
      if (unlockedBooks.length === 0) {
        return "You haven't unlocked any books yet. Use verifyCode() to unlock books.";
      }
      
      // Assign the page to a random unlocked book
      const randomBook = unlockedBooks[Math.floor(Math.random() * unlockedBooks.length)];
      
      // Generate page content based on book and page number
      const pageContent = generatePageContent(randomBook.name, pageNumber);
      
      console.log(`%cReading ${randomBook.name}, Page ${pageNumber}`, "color: #9C27B0;");
      return pageContent;
    };
  }
}

// Helper to generate page content
function generatePageContent(bookName: string, pageNumber: number): string {
  const contentMap: Record<string, Record<number, string>> = {
    "The Echo Chamber": {
      42: "...and thus we discovered that echoes aren't simply reflections of sound, but moments of time folding back on themselves. The key is in the resonance frequency.",
      87: "The chamber successfully generated temporal echoes from three weeks in the future. Subject reported hearing their own voice discussing events that had not yet occurred.",
      113: "WARNING: Do not attempt to synchronize your own voice with the echo. Several researchers reported persistent deja vu and timeline contamination."
    },
    "Quantum Mirror": {
      13: "Unlike conventional mirrors, quantum mirrors reflect possibilities rather than actualities. The observer determines which reflection becomes real.",
      77: "Experiment 23: Subject observed three distinct reflections simultaneously. When asked to describe each reflection, the descriptions matched personas from the subject's subconscious.",
      101: "We believe the mirror is not creating these reflections, but merely revealing quantum branches that already exist. The implications for timeline theory are enormous."
    },
    "Traveler's Guide to Temporal Loops": {
      9: "Chapter 1: Recognizing You're In A Loop. Key indicators include: déjà vu, anticipating events before they occur, and discovering messages from 'yourself' that you don't remember writing.",
      47: "Always carry a temporal anchor. Something small but significant that doesn't belong to the timeline. Observe it regularly to maintain awareness during loop resets.",
      91: "NEVER attempt to contact your other loop iterations directly. The resulting temporal paradox can collapse the entire loop structure."
    }
  };
  
  // Get content for the specific book and page
  if (contentMap[bookName] && contentMap[bookName][pageNumber]) {
    return contentMap[bookName][pageNumber];
  }
  
  // Generate generic content for non-specific pages
  return `Page ${pageNumber} appears to be damaged or missing. Try another page number.`;
}
