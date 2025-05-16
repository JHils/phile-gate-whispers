
import { glitchEffectLog, typewriterLog, speak, flickerLog } from "./consoleEffects";

type TrackCommandFunction = (commandName: string) => void;

// Store book codes and their status
interface BookCode {
  code: string;
  page: number;
  unlocked: boolean;
  description: string;
}

// Initialize the book commands
export const initializeBookCommands = (trackCommandExecution: TrackCommandFunction) => {
  // Initialize the book codes if they don't exist
  if (!window.JonahConsole.bookCodes) {
    window.JonahConsole.bookCodes = [
      { code: "BLRYLSK", page: 23, unlocked: false, description: "The Boat Haven sequence" },
      { code: "SMBWLKS", page: 56, unlocked: false, description: "Simba's first appearance" },
      { code: "GRFNDRZ", page: 78, unlocked: false, description: "The Griff interview" },
      { code: "RDRPSSW", page: 112, unlocked: false, description: "The reader's password" },
      { code: "SHRDHST", page: 145, unlocked: false, description: "Jonah's shared history" },
      { code: "MNSTRMT", page: 189, unlocked: false, description: "The Monster meets Jonah" },
      { code: "GTKPRCD", page: 207, unlocked: false, description: "The Gatekeeper's code" },
      { code: "LSTCHPT", page: 231, unlocked: false, description: "The final chapter" }
    ];
    
    // Check localStorage for already unlocked codes
    const unlockedCodes = JSON.parse(localStorage.getItem('unlockedBookCodes') || '[]');
    if (unlockedCodes.length > 0) {
      unlockedCodes.forEach((code: string) => {
        const foundCode = window.JonahConsole.bookCodes.find(bc => bc.code === code);
        if (foundCode) foundCode.unlocked = true;
      });
    }
  }

  // Main command to verify book codes
  window.bookCode = function(code) {
    if (!code) {
      console.log("%cEnter a code from the physical book. Format: bookCode('CODE')", "color: #475B74; font-size:14px;");
      return;
    }
    
    const cleanCode = String(code).toUpperCase().trim();
    const bookCode = window.JonahConsole.bookCodes.find(bc => bc.code === cleanCode);
    
    if (bookCode) {
      if (bookCode.unlocked) {
        typewriterLog(`This code (page ${bookCode.page}) has already been unlocked.`);
        speak("This code has already been unlocked");
      } else {
        glitchEffectLog(`Code authenticated. Page ${bookCode.page} unlocked: ${bookCode.description}`);
        speak(`Code authenticated. Page ${bookCode.page} unlocked`);
        
        // Mark as unlocked and save to localStorage
        bookCode.unlocked = true;
        const unlockedCodes = window.JonahConsole.bookCodes
          .filter(bc => bc.unlocked)
          .map(bc => bc.code);
        localStorage.setItem('unlockedBookCodes', JSON.stringify(unlockedCodes));
        
        // Award points based on page number (higher page = more points)
        const pointsAwarded = 15 + Math.floor(bookCode.page / 20);
        window.JonahConsole.score += pointsAwarded;
        setTimeout(() => {
          console.log(`%c+${pointsAwarded} points added to your score.`, "color: #8B3A40; font-size:14px;");
        }, 2000);
        
        // Check for special unlocks
        checkSpecialUnlocks();
      }
    } else {
      flickerLog("Invalid book code. Check the page again.");
      speak("Invalid book code");
    }
    
    trackCommandExecution('bookCode');
  };

  // Command to list unlocked and locked book codes
  window.bookStatus = function() {
    const unlockedCount = window.JonahConsole.bookCodes.filter(bc => bc.unlocked).length;
    const totalCount = window.JonahConsole.bookCodes.length;
    
    console.log(`%cBook Codes: ${unlockedCount}/${totalCount} unlocked`, "color: #8B3A40; font-size:16px; font-weight:bold;");
    
    if (unlockedCount === 0) {
      console.log("%cYou haven't unlocked any book codes yet.", "color: #475B74; font-size:14px;");
      console.log("%cTry looking for codes in the physical book and enter them using bookCode('CODE')", "color: #475B74; font-size:14px;");
    } else {
      window.JonahConsole.bookCodes.forEach(bc => {
        if (bc.unlocked) {
          console.log(`%c✓ ${bc.code} (Page ${bc.page}): ${bc.description}`, "color: #4B8E4B; font-size:14px;");
        } else {
          console.log(`%c□ Page ${bc.page}: [Locked]`, "color: #475B74; font-size:14px;");
        }
      });
      
      // Show special unlocks if any
      const unlockedSpecial = checkSpecialUnlocks(true);
      if (unlockedSpecial) {
        console.log("%cSpecial commands unlocked:", "color: #8B3A40; font-size:14px; font-weight:bold;");
        if (unlockedCount >= 3) console.log("%c- mirrorCheck()", "color: #4B8E4B; font-size:14px;");
        if (unlockedCount >= 5) console.log("%c- traceSimba()", "color: #4B8E4B; font-size:14px;");
        if (unlockedCount >= 7) console.log("%c- bridgeCollapse()", "color: #4B8E4B; font-size:14px;");
      }
    }
    
    trackCommandExecution('bookStatus');
  };

  // Hidden command that gets revealed once certain codes are unlocked
  window.readBetweenLines = function() {
    const unlockedCount = window.JonahConsole.bookCodes.filter(bc => bc.unlocked).length;
    
    if (unlockedCount >= 2) {
      typewriterLog("The margins hide more than notes.");
      speak("The margins hide more than notes");
      
      setTimeout(() => {
        console.log("%cTry finding the word that repeats on pages 23, 56, and 78.", "color: #475B74; font-size:14px; font-style:italic;");
      }, 2000);
      
      window.JonahConsole.score += 25;
    } else {
      typewriterLog("There's something you missed. Try reading between the lines. Literally.");
      speak("There's something you missed. Try reading between the lines");
    }
    
    trackCommandExecution('readBetweenLines');
  };

  // Check if special commands should be unlocked based on book code progress
  const checkSpecialUnlocks = (silentCheck = false) => {
    const unlockedCount = window.JonahConsole.bookCodes.filter(bc => bc.unlocked).length;
    let unlockedSomething = false;
    
    // Unlock mirrorCheck after 3 codes
    if (unlockedCount >= 3 && !window.mirrorCheck) {
      unlockedSomething = true;
      if (!silentCheck) {
        setTimeout(() => {
          console.log("%cNew command unlocked: mirrorCheck()", "color: #8B3A40; font-size:16px;");
        }, 3000);
      }
    }
    
    // Unlock traceSimba after 5 codes
    if (unlockedCount >= 5 && !window.traceSimba) {
      unlockedSomething = true;
      if (!silentCheck) {
        setTimeout(() => {
          console.log("%cNew command unlocked: traceSimba()", "color: #8B3A40; font-size:16px;");
        }, 3500);
      }
    }
    
    // Unlock bridgeCollapse after 7 codes
    if (unlockedCount >= 7 && !window.bridgeCollapse) {
      unlockedSomething = true;
      if (!silentCheck) {
        setTimeout(() => {
          console.log("%cNew command unlocked: bridgeCollapse()", "color: #8B3A40; font-size:16px;");
        }, 4000);
      }
    }
    
    return unlockedSomething;
  };
};

// Add book commands to the global interface
declare global {
  interface Window {
    bookCode: (code?: string) => void;
    bookStatus: () => void;
    readBetweenLines: () => void;
    JonahConsole: any & {
      bookCodes?: Array<BookCode>;
    };
  }
}
