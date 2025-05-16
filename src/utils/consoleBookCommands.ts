
import { typewriterLog, flickerLog, glitchEffectLog, speak } from "./consoleEffects";

type TrackCommandFunction = (commandName: string) => void;

// Initialize book-locked commands
export const initializeBookCommands = (trackCommandExecution: TrackCommandFunction) => {
  // Reading page numbers in secret order unlocks content
  window.readPage = function(pageNum) {
    // Convert to number if string
    const page = parseInt(String(pageNum).trim(), 10);
    
    if (isNaN(page) || page < 1 || page > 300) {
      console.log("%cInvalid page number. The book has pages 1-300.", "color: #475B74; font-size:14px;");
      return;
    }
    
    // Get book reading history
    const bookCodes = JSON.parse(localStorage.getItem('bookCodes') || '{"unlockedCodes":[],"totalCodesUnlocked":0}');
    const readHistory = JSON.parse(localStorage.getItem('readPageHistory') || '[]');
    
    // Add to reading history
    readHistory.push({
      page,
      timestamp: Date.now()
    });
    
    if (readHistory.length > 10) {
      readHistory.shift(); // Keep only the last 10 page reads
    }
    
    localStorage.setItem('readPageHistory', JSON.stringify(readHistory));
    
    // Check for specific page numbers that unlock content
    const specialPages = {
      42: "genesis-code",
      87: "threshold-map",
      111: "mirror-sequence", 
      127: "digital-pulse",
      183: "liminal-space",
      205: "void-stare",
      255: "signal-decay",
      273: "final-echo"
    };
    
    if (specialPages[page]) {
      const codeId = specialPages[page];
      
      if (!bookCodes.unlockedCodes.includes(codeId)) {
        bookCodes.unlockedCodes.push(codeId);
        bookCodes.lastCodeEnteredAt = Date.now();
        bookCodes.totalCodesUnlocked = (bookCodes.totalCodesUnlocked || 0) + 1;
        localStorage.setItem('bookCodes', JSON.stringify(bookCodes));
        
        if (codeId === "genesis-code") {
          glitchEffectLog("Genesis Code activated. The book remembers you.");
          speak("Genesis Code activated");
        } else if (codeId === "threshold-map") {
          typewriterLog("Threshold map unlocked. New coordinates available.");
          speak("Threshold map unlocked");
        } else if (codeId === "mirror-sequence") {
          flickerLog("Mirror sequence initiated. The reflection knows.");
          speak("Mirror sequence initiated");
        } else if (codeId === "digital-pulse") {
          glitchEffectLog("Digital pulse detected. Signal origin: unknown.");
          speak("Digital pulse detected");
        } else if (codeId === "liminal-space") {
          typewriterLog("Liminal space breach confirmed. The between-place opens.");
          speak("Liminal space breach confirmed");
        } else if (codeId === "void-stare") {
          flickerLog("Void stare engaged. Something watches back.");
          speak("Void stare engaged");
        } else if (codeId === "signal-decay") {
          glitchEffectLog("Signal decay accelerating. Time buffer corrupted.");
          speak("Signal decay accelerating");
        } else if (codeId === "final-echo") {
          typewriterLog("Final echo recorded. The circle closes.");
          speak("Final echo recorded");
        }
        
        // Award points for finding book codes
        window.JonahConsole.score += 40;
        
        // Special effect for completing the full set
        if (bookCodes.totalCodesUnlocked >= 8) {
          setTimeout(() => {
            console.log("%cAll codes unlocked. The book has given all it can.", "color: #8B3A40; font-size:16px; font-weight:bold;");
            setTimeout(() => {
              console.log("%cBut there is always a deeper layer...", "color: #475B74; font-size:14px; font-style:italic;");
            }, 2000);
          }, 3000);
          window.JonahConsole.score += 100;
        }
      } else {
        console.log(`%cPage ${page} code already activated: ${codeId}`, "color: #475B74; font-size:14px;");
      }
    } else {
      // Check for special reading sequences
      checkReadingSequence(readHistory);
      
      // Generic response for normal pages
      console.log(`%cPage ${page} processed. Nothing unusual detected.`, "color: #475B74; font-size:14px;");
    }
    
    trackCommandExecution('readPage');
  };
  
  // Check for special reading sequences
  const checkReadingSequence = (history) => {
    if (history.length < 3) return;
    
    // Get the last 3 page numbers
    const last3 = history.slice(-3).map(h => h.page);
    
    // Special sequence: reading pages 7, 7, 7 in succession
    if (last3[0] === 7 && last3[1] === 7 && last3[2] === 7) {
      flickerLog("7-7-7 sequence detected. Lucky numbers invoke the abyss.");
      speak("Lucky numbers invoke the abyss");
      window.JonahConsole.score += 30;
    }
    
    // Special sequence: reading pages in descending order (any 3 consecutive descending numbers)
    if (last3[0] > last3[1] && last3[1] > last3[2]) {
      flickerLog("Countdown sequence detected. Time shifts in reverse.");
      speak("Countdown sequence detected");
      window.JonahConsole.score += 20;
    }
    
    // Special sequence: reading first page, last page, first page (1, 300, 1)
    if (last3[0] === 1 && last3[1] === 300 && last3[2] === 1) {
      glitchEffectLog("Alpha-Omega-Alpha circuit complete. The loop is acknowledged.");
      speak("Alpha Omega Alpha circuit complete");
      
      // Unlock special command
      window.bridgeCollapse = function() {
        typewriterLog("Bridge collapse initiated. The way back is severed.");
        speak("Bridge collapse initiated");
        
        setTimeout(() => {
          console.log("%cYou can never return to who you were before reading this book.", "color: #8B3A40; font-size:14px;");
        }, 2000);
        
        window.JonahConsole.score += 50;
      };
      
      setTimeout(() => {
        console.log("%cNew command unlocked: bridgeCollapse()", "color: #8B3A40; font-size:14px;");
      }, 3000);
      
      window.JonahConsole.score += 75;
    }
  };
  
  // Code verification command
  window.verifyCode = function(code) {
    if (!code) {
      console.log("%cPlease provide a code to verify.", "color: #475B74; font-size:14px;");
      return;
    }
    
    const cleanCode = String(code).trim().toLowerCase().replace(/-/g, '');
    
    const bookCodes = JSON.parse(localStorage.getItem('bookCodes') || '{"unlockedCodes":[],"totalCodesUnlocked":0}');
    
    if (cleanCode === "genesiscode" && bookCodes.unlockedCodes.includes("genesis-code")) {
      typewriterLog("Genesis Code verified. Initialization sequence: valid.");
      speak("Genesis Code verified");
    } else if (cleanCode === "thresholdmap" && bookCodes.unlockedCodes.includes("threshold-map")) {
      typewriterLog("Threshold Map verified. Coordinate system: aligned.");
      speak("Threshold Map verified");
    } else if (cleanCode === "mirrorsequence" && bookCodes.unlockedCodes.includes("mirror-sequence")) {
      typewriterLog("Mirror Sequence verified. Reflection protocol: active.");
      speak("Mirror Sequence verified");
    } else if (cleanCode === "digitalpulse" && bookCodes.unlockedCodes.includes("digital-pulse")) {
      typewriterLog("Digital Pulse verified. Signal transmission: stable.");
      speak("Digital Pulse verified");
    } else if (cleanCode === "liminalspace" && bookCodes.unlockedCodes.includes("liminal-space")) {
      typewriterLog("Liminal Space verified. Threshold access: granted.");
      speak("Liminal Space verified");
    } else if (cleanCode === "voidstare" && bookCodes.unlockedCodes.includes("void-stare")) {
      typewriterLog("Void Stare verified. Observer status: recognized.");
      speak("Void Stare verified");
    } else if (cleanCode === "signaldecay" && bookCodes.unlockedCodes.includes("signal-decay")) {
      typewriterLog("Signal Decay verified. Entropy management: engaged.");
      speak("Signal Decay verified");
    } else if (cleanCode === "finalecho" && bookCodes.unlockedCodes.includes("final-echo")) {
      typewriterLog("Final Echo verified. Loop completion: acknowledged.");
      speak("Final Echo verified");
    } else {
      flickerLog("Code verification failed. Sequence unknown or incomplete.");
      speak("Code verification failed");
    }
    
    trackCommandExecution('verifyCode');
  };
};
