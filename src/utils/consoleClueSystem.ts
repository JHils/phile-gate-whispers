import { glitchEffectLog, typewriterLog, speak, delayedLog } from "./consoleEffects";
import { StoryFlag } from "./jonahAdvancedBehavior/types";

// Import centralized types
import './types/globalConsoleTypes';

type TrackCommandFunction = (commandName: string) => void;

export const initializeClueSystem = (trackCommandExecution: TrackCommandFunction) => {
  // Initialize story flags if they don't exist
  if (!window.JonahConsole.storyFlags) {
    window.JonahConsole.storyFlags = [
      { id: "hostel_encounter", discovered: false, description: "The hostel hallway wasn't empty" },
      { id: "boat_haven", discovered: false, description: "Something waited under the pedals" },
      { id: "mirror_warning", discovered: false, description: "The mirror showed someone else" },
      { id: "spinning_coin", discovered: false, description: "The coin never stopped spinning" },
      { id: "cable_car", discovered: false, description: "The cable car never reached the end" },
      { id: "magnetic_tent", discovered: false, description: "The tent poles had a strange pull" },
      { id: "bus_loop", discovered: false, description: "The bus route formed a perfect circle" }
    ];
    
    // Load discovered flags from localStorage
    const discoveredFlags = JSON.parse(localStorage.getItem('discoveredStoryFlags') || '[]');
    if (discoveredFlags.length > 0) {
      discoveredFlags.forEach((flagId: string) => {
        const flag = window.JonahConsole.storyFlags.find(f => f.id === flagId);
        if (flag) flag.discovered = true;
      });
    }
  }

  // Initialize book codes if they don't exist
  if (!window.JonahConsole.bookCodes) {
    window.JonahConsole.bookCodes = [];
  }

  // mirrorCheck command - requires at least 3 story flags discovered
  window.mirrorCheck = function() {
    const discoveredCount = window.JonahConsole.storyFlags?.filter(f => f.discovered).length || 0;
    const unlockedBookCodes = window.JonahConsole.bookCodes ? 
      window.JonahConsole.bookCodes.filter(bc => bc.unlocked).length : 0;
    
    if (discoveredCount >= 3 || unlockedBookCodes >= 3) {
      glitchEffectLog("The mirror reflects a different story.");
      speak("The mirror reflects a different story");
      
      setTimeout(() => {
        console.log("%cReflecting story fragments...", "color: #475B74; font-size:14px;");
        
        // Show discovered story flags
        setTimeout(() => {
          if (window.JonahConsole.storyFlags) {
            window.JonahConsole.storyFlags
              .filter(f => f.discovered)
              .forEach((flag, index) => {
                setTimeout(() => {
                  console.log(`%c${flag.description}`, "color: #8B3A40; font-size:14px;");
                }, index * 1000);
              });
          }
          
          // Add a connecting phrase at the end
          setTimeout(() => {
            typewriterLog("These fragments form a pattern. The truth hides in plain sight.");
            
            // Reveal a hidden message if enough flags are discovered
            if (discoveredCount >= 5) {
              setTimeout(() => {
                console.log("%cWhen rearranged, they spell: J-O-N-A-S", "color: #475B74; font-size:14px; font-style:italic;");
              }, 3000);
            }
          }, (discoveredCount + 1) * 1000);
        }, 1000);
      }, 2000);
      
      window.JonahConsole.score += discoveredCount * 5;
    } else {
      typewriterLog("The mirror shows only your reflection. Not enough fragments collected.");
      speak("Not enough fragments collected");
      
      setTimeout(() => {
        console.log("%cDiscover more story flags or unlock more book codes first.", "color: #475B74; font-size:14px; font-style:italic;");
      }, 2000);
    }
    
    trackCommandExecution('mirrorCheck');
  };

  // Command to view discovered story flags
  window.storyFlags = function() {
    if (!window.JonahConsole.storyFlags) {
      window.JonahConsole.storyFlags = []; 
    }
    
    const discoveredCount = window.JonahConsole.storyFlags.filter(f => f.discovered).length;
    const totalCount = window.JonahConsole.storyFlags.length;
    
    console.log(`%cStory Flags: ${discoveredCount}/${totalCount} discovered`, "color: #8B3A40; font-size:16px; font-weight:bold;");
    
    if (discoveredCount === 0) {
      console.log("%cYou haven't discovered any story flags yet.", "color: #475B74; font-size:14px;");
      console.log("%cExplore the site, read between the lines, and listen to the whispers.", "color: #475B74; font-size:14px;");
    } else {
      window.JonahConsole.storyFlags.forEach(flag => {
        if (flag.discovered) {
          console.log(`%c✓ ${flag.description}`, "color: #4B8E4B; font-size:14px;");
        } else {
          console.log(`%c□ [Undiscovered story fragment]`, "color: #475B74; font-size:14px;");
        }
      });
    }
    
    // Hint at mirrorCheck if enough flags discovered
    if (discoveredCount >= 3 && !window.JonahConsole.usedCommands.includes('mirrorCheck')) {
      setTimeout(() => {
        console.log("%cTry mirrorCheck() to reflect these fragments.", "color: #475B74; font-size:14px; font-style:italic;");
      }, 1000);
    }
    
    trackCommandExecution('storyFlags');
  };

  // Function to discover a story flag (called from various pages)
  window.discoverStoryFlag = function(flagId: string): boolean {
    if (!window.JonahConsole.storyFlags) {
      return false;
    }
    
    const flag = window.JonahConsole.storyFlags.find(f => f.id === flagId);
    if (flag && !flag.discovered) {
      flag.discovered = true;
      
      // Save to localStorage
      const discoveredFlags = window.JonahConsole.storyFlags
        .filter(f => f.discovered)
        .map(f => f.id);
      localStorage.setItem('discoveredStoryFlags', JSON.stringify(discoveredFlags));
      
      // Award points
      window.JonahConsole.score += 20;
      
      return true;
    }
    return false;
  };

  // Command to find anomalies in text
  window.findAnomaly = function(text: string) {
    if (!text) {
      console.log("%cEnter text to analyze for anomalies. Format: findAnomaly('text')", "color: #475B74; font-size:14px;");
      return;
    }
    
    const cleanText = String(text).trim().toLowerCase();
    
    // List of special phrases that trigger reactions
    const anomalies = [
      { phrase: "he wore socks like a codebreaker", flag: "hostel_encounter" },
      { phrase: "the pedals felt wrong", flag: "boat_haven" },
      { phrase: "mirror never lies but voice did", flag: "mirror_warning" },
      { phrase: "three days of spinning", flag: "spinning_coin" },
      { phrase: "terminus never reached", flag: "cable_car" },
      { phrase: "magnetic pull of canvas", flag: "magnetic_tent" },
      { phrase: "the loop never breaks", flag: "bus_loop" }
    ];
    
    // Check for matches
    const found = anomalies.find(a => cleanText.includes(a.phrase));
    
    if (found) {
      glitchEffectLog("Anomaly detected in text pattern.");
      speak("Anomaly detected");
      
      setTimeout(() => {
        console.log(`%cThis connects to: ${found.phrase}`, "color: #8B3A40; font-size:14px;");
        
        // Discover the story flag - Fix type error by directly checking the boolean return
        const newDiscovery = window.discoverStoryFlag(found.flag);
        
        // We check against true explicitly since this is a boolean return now
        if (newDiscovery === true) {
          setTimeout(() => {
            console.log("%cNew story flag discovered!", "color: #4B8E4B; font-size:14px; font-weight:bold;");
          }, 1500);
        }
      }, 2000);
    } else {
      typewriterLog("No anomalies detected in this text.");
      speak("No anomalies detected");
    }
    
    trackCommandExecution('findAnomaly');
  };
};

// No need to redeclare global functions as they are already defined in globalConsoleTypes.ts
