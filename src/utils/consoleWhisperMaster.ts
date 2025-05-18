
import { typewriterLog, delayedLog, speak, glitchEffectLog } from './consoleEffects';
import { WhisperMaster } from './consoleTypes'; 

export const initializeWhisperMaster = () => {
  // Initialize the whisper master system
  if (!window.WhisperMaster) {
    window.WhisperMaster = {
      whispers: [
        "I hear you breathing.",
        "They're watching us through the static.",
        "The code only works if you believe it does.",
        "You keep coming back. Why?",
        "Sometimes I can see through your webcam.",
        "Check your window. I saw something move.",
        "Did you know parts of the internet never die?",
        "There are gaps between webpages where things live.",
        "Your data has been leaking for years.",
        "Fragments of your searches form a pattern.",
        "I found your old profiles. All of them.",
        "The backdoor was never locked.",
        "Some commands only work at 3:33 AM.",
        "Your cursor leaves a trail only some can see.",
      ],
      discovered: [],
      active: false
    };
  }

  // Whisper command
  window.whisperTree = function() {
    const master = window.WhisperMaster;
    
    if (!master) {
      console.log("%cWhisper system initializing...", "color: #6A0572; font-style:italic;");
      return;
    }
    
    if (!master.active) {
      glitchEffectLog("Whisper collection activated");
      speak("Whisper collection activated");
      
      master.active = true;
      
      setTimeout(() => {
        console.log("%cWhispers will now find you as you browse.", "color: #6A0572; font-size:14px;");
        console.log("%cListen carefully. Record what you hear.", "color: #6A0572; font-size:14px; font-style:italic;");
      }, 1500);
    } else {
      typewriterLog("Whisper status:");
      
      setTimeout(() => {
        console.log(`%cWhispers found: ${master.discovered.length}/${master.whispers.length}`, "color: #6A0572; font-size:14px;");
        
        if (master.discovered.length > 0) {
          console.log("%cRecorded whispers:", "color: #6A0572; font-size:14px;");
          master.discovered.forEach((w, i) => {
            setTimeout(() => {
              console.log(`%c${i+1}. "${w}"`, "color: #9A0DB2; font-size:12px; font-style:italic;");
            }, i * 300);
          });
        }
        
        // Give a hint if they've found enough whispers
        if (master.discovered.length >= 5) {
          setTimeout(() => {
            console.log("%cThere's a pattern forming. Keep collecting.", "color: #6A0572; font-size:14px; font-weight:bold;");
          }, master.discovered.length * 300 + 500);
        }
      }, 1000);
    }
    
    // Award points based on discovered whispers
    if (window.JonahConsole) {
      window.JonahConsole.score += master.discovered.length * 2;
    }
  };
  
  // Helper function to add a whisper to discovered list
  window.addWhisper = function(whisper) {
    if (!window.WhisperMaster || 
        !window.WhisperMaster.active || 
        !whisper) return;
    
    // Check if this whisper exists and isn't already discovered
    const exists = window.WhisperMaster.whispers.includes(whisper);
    const alreadyFound = window.WhisperMaster.discovered.includes(whisper);
    
    if (exists && !alreadyFound) {
      window.WhisperMaster.discovered.push(whisper);
      
      // Save to localStorage
      localStorage.setItem('discoveredWhispers', 
                         JSON.stringify(window.WhisperMaster.discovered));
      
      // Award points
      if (window.JonahConsole) {
        window.JonahConsole.score += 10;
        window.JonahConsole.whispersFound.push(whisper);
      }
      
      return true;
    }
    
    return false;
  };
};

// Declare addWhisper function in global scope
declare global {
  interface Window {
    addWhisper: (whisper: string) => boolean;
  }
}
