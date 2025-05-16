
import { typewriterLog, glitchEffectLog, speak } from "./consoleEffects";

type TrackCommandFunction = (commandName: string) => void;

export const initializeSimbaSystem = (trackCommandExecution: TrackCommandFunction) => {
  // Simba tracking command
  window.traceCat = function() {
    // Check if simba has been seen before
    const simbaPresence = localStorage.getItem('simbaPresence');
    const simbaData = simbaPresence ? JSON.parse(simbaPresence) : { 
      traced: false, 
      encounters: 0, 
      lastSeen: null 
    };
    
    if (simbaData.traced) {
      typewriterLog(`Simba was last seen ${simbaData.lastSeen || 'somewhere unknown'}.`);
      speak(`Simba was last seen ${simbaData.lastSeen || 'somewhere unknown'}`);
      
      if (simbaData.encounters > 3) {
        setTimeout(() => {
          console.log("%cThe cat watches you through cracks in reality.", "color: #8B3A40; font-size:14px;");
        }, 2000);
      }
    } else {
      glitchEffectLog("No cat detected in system. Begin observation protocol.");
      speak("No cat detected in system");
      
      // Mark as traced
      simbaData.traced = true;
      simbaData.encounters = 1;
      localStorage.setItem('simbaPresence', JSON.stringify(simbaData));
      
      // Update the JonahConsole simba property
      if (!window.JonahConsole.simba) {
        window.JonahConsole.simba = {
          encountered: true
        };
      }
      
      setTimeout(() => {
        console.log("%cWhen the cat appears, you'll know.", "color: #475B74; font-size:14px; font-style:italic;");
      }, 2000);
    }
    
    trackCommandExecution('traceCat');
    window.JonahConsole.score += 15;
  };
  
  // Check if Simba should appear on a page
  window.triggerSimbaComment = function(pageId: string) {
    // Pages where Simba can appear
    const simbaPages = [
      'gate', 'about', 'philes', 'legacy', 'monster',
      'kuranda', 'fleet', 'outbackhostel', 'campfire'
    ];
    
    // Only trigger on specific pages
    if (!simbaPages.includes(pageId)) {
      return false;
    }
    
    // Random chance of appearance (20%)
    if (Math.random() > 0.2) {
      return false;
    }
    
    // Check if simba has been tracked
    const simbaPresence = localStorage.getItem('simbaPresence');
    if (!simbaPresence) {
      // Hints should only appear if user has tracked Simba
      return false;
    }
    
    // Update Simba data
    const simbaData = JSON.parse(simbaPresence);
    simbaData.encounters = (simbaData.encounters || 0) + 1;
    simbaData.lastSeen = pageId;
    localStorage.setItem('simbaPresence', JSON.stringify(simbaData));
    
    // Update the JonahConsole simba property
    if (!window.JonahConsole.simba) {
      window.JonahConsole.simba = {
        encountered: true,
        lastSeen: pageId
      };
    } else {
      window.JonahConsole.simba.encountered = true;
      window.JonahConsole.simba.lastSeen = pageId;
    }
    
    // Return true to trigger Simba comment
    return true;
  };

  // Hidden command to feed Simba
  window.feedSimba = function() {
    const simbaPresence = localStorage.getItem('simbaPresence');
    if (!simbaPresence) {
      typewriterLog("No cat detected to feed. Try tracking first.");
      speak("No cat detected to feed");
      return;
    }
    
    const simbaData = JSON.parse(simbaPresence);
    
    if (simbaData.encounters < 3) {
      typewriterLog("The cat observes from a distance, but doesn't approach.");
      speak("The cat observes from a distance");
    } else {
      glitchEffectLog("The cat accepts your offering. A bond forms.");
      speak("The cat accepts your offering");
      
      // After enough interactions, reveal a secret
      if (simbaData.encounters >= 5 && !simbaData.secretRevealed) {
        simbaData.secretRevealed = true;
        localStorage.setItem('simbaPresence', JSON.stringify(simbaData));
        
        setTimeout(() => {
          console.log("%cSimba whispers: 'The cat door leads to the basement.'", "color: #8B3A40; font-size:14px;");
          setTimeout(() => {
            console.log("%cSimba disappears through a crack in the wall.", "color: #475B74; font-size:14px;");
          }, 3000);
        }, 2000);
        
        window.JonahConsole.score += 50;
      } else {
        window.JonahConsole.score += 20;
      }
    }
    
    trackCommandExecution('feedSimba');
  };
};
