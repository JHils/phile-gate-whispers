
import { glitchEffectLog, speak, typewriterLog } from "./consoleEffects";
import { BookCode } from "./consoleTypes";

type TrackCommandFunction = (commandName: string) => void;

export const initializeBookCommands = (trackCommandExecution: TrackCommandFunction) => {
  // Initialize the read page function
  window.readPage = function(page: number) {
    // Validate page range
    if (page < 1 || page > 366) {
      console.log("%cPage not found in the system.", "color: red");
      speak("Page not found in the system");
      return;
    }
    
    // Check if we have content for specific pages
    if (page === 42) {
      typewriterLog("The Answer to the Ultimate Question of Life, the Universe, and Everything.");
      speak("The answer to the ultimate question of life the universe and everything");
      
      // Easter egg - reference to Hitchhiker's Guide
      setTimeout(() => {
        console.log("%cBut what was the question?", "color: #4CAF50; font-style: italic;");
      }, 3000);
      
      trackCommandExecution('readPage_42');
      window.JonahConsole.score += 15;
      return;
    }
    
    if (page === 237) {
      glitchEffectLog("REDACTED FILE - SECURITY LEVEL 4 CLEARANCE REQUIRED");
      speak("Redacted file. Security level 4 clearance required");
      
      setTimeout(() => {
        console.log("%cPage 237 appears to be missing from Jonah's journal.", "color: #FFA500;");
        console.log("%cSomeone has torn it out. Violently.", "color: #FFA500;");
      }, 2000);
      
      trackCommandExecution('readPage_237');
      window.JonahConsole.score += 20;
      return;
    }
    
    if (page === 366) {
      typewriterLog("Final page. The last day. Everything ends here.");
      speak("Final page. The last day. Everything ends here");
      
      setTimeout(() => {
        console.log("%cThis page is blank except for a single line of text:", "color: #9C27B0;");
        console.log("%c'I finally understand what the whispers mean.'", "color: #9C27B0; font-weight: bold;");
      }, 2000);
      
      trackCommandExecution('readPage_366');
      window.JonahConsole.score += 25;
      return;
    }
    
    // Generic response for other pages
    console.log(`%cPage ${page} from Jonah's journal:`, "color: #2196F3;");
    console.log(`%c${generateRandomJournalEntry(page)}`, "color: #2196F3; font-style: italic;");
    
    // Secret breadcrumbs in certain page ranges
    if (page >= 100 && page < 150) {
      setTimeout(() => {
        console.log("%c[There's a symbol drawn in the margin that looks like a compass pointing northwest]", "color: #607D8B; font-size: 11px;");
      }, 2000);
    } else if (page >= 200 && page < 250) {
      setTimeout(() => {
        console.log("%c[Several words are heavily underlined: 'recurring', 'pattern', 'cycle']", "color: #607D8B; font-size: 11px;");
      }, 2000);
    }
    
    trackCommandExecution('readPage');
    window.JonahConsole.score += 5;
  };
  
  // Initialize the verify code function
  window.verifyCode = function(code: string) {
    if (!code) {
      console.log("%cPlease provide a code to verify.", "color: orange");
      speak("Please provide a code to verify");
      return;
    }
    
    const normalizedCode = code.trim().toUpperCase();
    
    // Check against known book codes
    const knownCodes: Record<string, string> = {
      "WHISPERBLUE": "Access to Blue Sector granted. Coordinate system unlocked.",
      "REDGATE5": "Red Gate protocol initiated. Warning: unstable connection.",
      "JONAHWASHERE": "Identity confirmed. Timeline divergence detected.",
      "CROSSEDEYES": "Perspective shift enabled. You can now see through the veil.",
      "MARBLEARCH": "Architectural blueprint loaded. The structure was never built.",
      "CAIRNS1962": "Historical records unlocked. The incident was covered up.",
    };
    
    if (knownCodes[normalizedCode]) {
      glitchEffectLog(`CODE VERIFIED: ${normalizedCode}`);
      speak("Code verified");
      
      setTimeout(() => {
        console.log(`%c${knownCodes[normalizedCode]}`, "color: #4CAF50;");
        
        // Update state for verified codes
        if (!window.JonahConsole.bookCodes) {
          window.JonahConsole.bookCodes = [];
        }
        
        const codeExists = window.JonahConsole.bookCodes.some((item: BookCode) => item.id === normalizedCode);
        
        if (!codeExists) {
          window.JonahConsole.bookCodes.push({
            id: normalizedCode,
            unlocked: true
          });
        }
        
        // Special effects for certain codes
        if (normalizedCode === "CROSSEDEYES") {
          document.body.classList.add("crossed-vision");
          setTimeout(() => {
            document.body.classList.remove("crossed-vision");
          }, 10000);
        } else if (normalizedCode === "MARBLEARCH") {
          // Bridge collapse animation effect
          window.bridgeCollapse();
        }
      }, 1500);
      
      trackCommandExecution('verifyCode_success');
      window.JonahConsole.score += 30;
    } else {
      console.log("%cCODE INVALID. Verification failed.", "color: red");
      speak("Code invalid. Verification failed");
      
      // Easter egg - almost correct codes
      if (normalizedCode.includes("JONAH") || normalizedCode.includes("WHISPER")) {
        setTimeout(() => {
          console.log("%cAlmost there. Keep trying.", "color: #FFC107; font-style: italic;");
        }, 1500);
      }
      
      trackCommandExecution('verifyCode_fail');
    }
  };
  
  // Add the bridge collapse function
  window.bridgeCollapse = function() {
    console.log("%cStructural integrity compromised...", "color: #FF5722;");
    
    // Add a visual effect to the page
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.transition = 'all 2s';
    overlay.style.opacity = '0';
    
    const message = document.createElement('div');
    message.textContent = 'CONNECTION SEVERED';
    message.style.color = '#FF5722';
    message.style.fontFamily = 'monospace';
    message.style.fontSize = '3rem';
    message.style.textAlign = 'center';
    
    overlay.appendChild(message);
    document.body.appendChild(overlay);
    
    // Animate the collapse
    setTimeout(() => {
      overlay.style.opacity = '1';
      document.body.style.overflow = 'hidden';
      
      // Shake effect
      document.body.classList.add('earthquake');
      
      setTimeout(() => {
        document.body.classList.remove('earthquake');
        
        // Clean up after animation
        setTimeout(() => {
          overlay.style.opacity = '0';
          setTimeout(() => {
            document.body.removeChild(overlay);
            document.body.style.overflow = '';
          }, 2000);
        }, 3000);
      }, 2000);
    }, 100);
  };
};

// Helper function to generate random journal entries
function generateRandomJournalEntry(pageNum: number) {
  const entries = [
    "Today I saw it again. The shadow that follows but never quite touches the ground.",
    "The locals won't talk about the mountain. They look away when I mention it.",
    "Third night of the same dream. Always ends at the door I can't open.",
    "Found strange markings on the beach this morning. Tide washed them away before I could photograph them.",
    "Someone's been in my room. Nothing taken, but things are slightly moved.",
    "The whispers are getting louder. Almost decipherable now.",
    "Met an old man who claims to have seen 'them' too. He gave me this journal.",
    "The coordinates don't match any known location. Yet I feel drawn there.",
    "My reflection looked wrong today. Just for a second, but I'm sure of it.",
    "The birds all flew away at exactly the same moment. All of them. At once.",
  ];
  
  // Seed the random selection based on page number for consistency
  const index = pageNum % entries.length;
  return entries[index];
}
