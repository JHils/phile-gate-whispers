
import { typewriterLog, flickerLog, speak } from "./consoleEffects";

type TrackCommandFunction = (commandName: string) => void;

export const initializeSimbaSystem = (trackCommandExecution: TrackCommandFunction) => {
  // Initialize the traceCat command
  window.traceCat = function() {
    // Initialize simba data if needed
    if (!window.JonahConsole.simba) {
      window.JonahConsole.simba = {
        encountered: false
      };
    }
    
    // Simba appearance is random and rare
    const roll = Math.random();
    if (roll > 0.7 || window.JonahConsole.simba.encountered) {
      window.JonahConsole.simba.encountered = true;
      window.JonahConsole.simba.lastSeen = new Date().toISOString();
      
      // Initialize or increment interaction count
      if (!window.JonahConsole.simba.interactions) {
        window.JonahConsole.simba.interactions = 1;
      } else {
        window.JonahConsole.simba.interactions++;
      }
      
      // Save to localStorage for persistence
      localStorage.setItem('simbaData', JSON.stringify(window.JonahConsole.simba));
      
      // Display Simba's presence
      flickerLog("A subtle movement in the corner of your screen...");
      
      setTimeout(() => {
        console.log("%c/ᐠ｡ꞈ｡ᐟ\\", "color: #FFA500; font-size:24px;");
        speak("meow", 0.4);
        
        setTimeout(() => {
          console.log("%cSimba watches you from a distance.", "color: #FFA500; font-size:14px; font-style:italic;");
          
          // Award points
          window.JonahConsole.score += 5;
          
          // Special interaction if they've seen Simba multiple times
          if (window.JonahConsole.simba.interactions && window.JonahConsole.simba.interactions > 3) {
            setTimeout(() => {
              console.log("%cHe seems to be getting more comfortable with you.", "color: #FFA500; font-size:14px;");
              console.log("%cTry feedSimba() next time.", "color: #FFA500; font-size:14px; font-style:italic;");
            }, 2000);
          }
        }, 1000);
      }, 1500);
    } else {
      // No Simba this time
      typewriterLog("You sense a presence, but nothing appears...");
      setTimeout(() => {
        console.log("%cTry again later. Cats are fickle creatures.", "color: #475B74; font-size:14px; font-style:italic;");
      }, 1500);
    }
    
    trackCommandExecution('traceCat');
  };
  
  // Initialize the feedSimba command
  window.feedSimba = function() {
    // Check if Simba has been encountered first
    if (!window.JonahConsole.simba || !window.JonahConsole.simba.encountered) {
      console.log("%cYou don't have anyone to feed yet.", "color: #475B74; font-size:14px;");
      console.log("%cTry traceCat() first to find a friend.", "color: #475B74; font-size:14px; font-style:italic;");
      return;
    }
    
    // Simba's reaction depends on interaction count
    const interactions = window.JonahConsole.simba.interactions || 0;
    
    // First feeding
    if (interactions < 2) {
      typewriterLog("You offer some digital kibble...");
      
      setTimeout(() => {
        console.log("%cThe cat watches cautiously from a distance.", "color: #FFA500; font-size:14px;");
        console.log("%c/ᐠ｡ᴗ｡ᐟ\\︵‿︵‿︵‿︵", "color: #FFA500; font-size:24px;");
        speak("meow", 0.4);
        
        window.JonahConsole.simba.interactions = interactions + 1;
        localStorage.setItem('simbaData', JSON.stringify(window.JonahConsole.simba));
      }, 1500);
    } 
    // Multiple feedings
    else if (interactions < 5) {
      typewriterLog("You place some premium virtual treats...");
      
      setTimeout(() => {
        console.log("%cSimba approaches cautiously and nibbles the treats.", "color: #FFA500; font-size:14px;");
        console.log("%c/ᐠ｡ﻌ｡ᐟ\\", "color: #FFA500; font-size:24px;");
        speak("purr", 0.3);
        
        // Award points for feeding
        window.JonahConsole.score += 5;
        window.JonahConsole.simba.interactions = interactions + 1;
        localStorage.setItem('simbaData', JSON.stringify(window.JonahConsole.simba));
      }, 1500);
    }
    // Many interactions - special event
    else {
      flickerLog("You offer some rare digital fish...");
      
      setTimeout(() => {
        console.log("%cSimba happily eats the fish and rubs against your cursor.", "color: #FFA500; font-size:14px;");
        console.log("%c/ᐠ≧ᴥ≦ᐟ\\", "color: #FFA500; font-size:24px;");
        speak("purr purr", 0.5);
        
        setTimeout(() => {
          console.log("%cHe drops something at your feet: a glowing keycard.", "color: #8B3A40; font-size:14px; font-weight:bold;");
          console.log("%c[SIMBA_ACCESS_GRANTED]", "color: #8B3A40; font-size:14px;");
          
          // Add story flag
          if (window.JonahConsole.storyFlags && 
              window.discoverStoryFlag && 
              typeof window.discoverStoryFlag === 'function') {
            window.discoverStoryFlag('simba_friend');
          }
          
          // Award significant points
          window.JonahConsole.score += 50;
          window.JonahConsole.simba.interactions = interactions + 1;
          localStorage.setItem('simbaData', JSON.stringify(window.JonahConsole.simba));
        }, 2000);
      }, 1500);
    }
    
    trackCommandExecution('feedSimba');
  };
};

// Declare the new Simba-related console functions in global scope
declare global {
  interface Window {
    traceCat: () => void;
    feedSimba: () => void;
  }
}
