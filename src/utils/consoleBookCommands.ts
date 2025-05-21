
import { BookCode } from '@/utils/jonahAdvancedBehavior/types';

// Initialize book codes function
export function initializeBookCodes() {
  try {
    // Check if codes already exist
    let codes = JSON.parse(localStorage.getItem('jonahBookCodes') || '[]');
    
    if (codes.length === 0) {
      // Add starter codes
      codes = [
        {
          id: "fragment-alpha",
          code: "alpha-001",
          name: "The Beginning",
          unlocked: true
        },
        {
          id: "fragment-beta",
          code: "beta-002",
          name: "The Journey",
          unlocked: false
        },
        {
          id: "fragment-gamma",
          code: "gamma-003",
          name: "The End",
          unlocked: false
        }
      ];
      
      // Store back to localStorage
      localStorage.setItem('jonahBookCodes', JSON.stringify(codes));
    }
    
    return codes;
  } catch (e) {
    console.error("Error initializing book codes:", e);
    return [];
  }
}

// Basic implementation of console book commands
export function addConsoleBookCommands(console: any) {
  console.addCommand({
    name: 'unlockBookCode',
    help: 'Unlock a book code',
    args: [
      { name: 'code', type: 'string', help: 'The code to unlock' }
    ],
    func: (args: any) => {
      const code = args.code;
      
      if (!code) {
        console.log("Please provide a code to unlock.");
        return;
      }
      
      try {
        // Get existing codes
        const codes = JSON.parse(localStorage.getItem('jonahBookCodes') || '[]');
        
        // Check if code already exists
        const existingCode = codes.find((c: BookCode) => c.code === code);
        
        if (existingCode) {
          console.log(`Code "${code}" already exists.`);
          return;
        }
        
        // Add new code
        codes.push({
          id: `code-${Date.now()}`,
          code: code,
          unlocked: true,
          timestamp: Date.now()
        });
        
        // Store back to localStorage
        localStorage.setItem('jonahBookCodes', JSON.stringify(codes));
        
        console.log(`Code "${code}" unlocked.`);
      } catch (e) {
        console.error("Error unlocking code:", e);
      }
    }
  });
  
  console.addCommand({
    name: 'getAllBookCodes',
    help: 'Get all book codes',
    func: () => {
      try {
        // Get existing codes
        const codes = JSON.parse(localStorage.getItem('jonahBookCodes') || '[]');
        
        if (codes.length === 0) {
          console.log("No book codes found.");
          return;
        }
        
        console.log("Book Codes:");
        codes.forEach((code: BookCode) => {
          console.log(`- ${code.code}: ${code.unlocked ? 'Unlocked' : 'Locked'}`);
        });
      } catch (e) {
        console.error("Error getting book codes:", e);
      }
    }
  });
  
  console.addCommand({
    name: 'resetBookCodes',
    help: 'Reset all book codes',
    func: () => {
      try {
        // Reset codes
        localStorage.setItem('jonahBookCodes', JSON.stringify([]));
        console.log("Book codes reset.");
      } catch (e) {
        console.error("Error resetting book codes:", e);
      }
    }
  });
  
  console.addCommand({
    name: 'addStarterBookCodes',
    help: 'Add starter book codes',
    func: () => {
      const codes = initializeBookCodes();
      console.log("Starter book codes added.");
    }
  });
}
