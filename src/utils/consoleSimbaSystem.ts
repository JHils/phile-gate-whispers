
import { typewriterLog, glitchEffectLog, speak } from "./consoleEffects";

type TrackCommandFunction = (commandName: string) => void;

export const initializeSimbaSystem = (trackCommandExecution: TrackCommandFunction) => {
  // Initialize Simba tracking if not already done
  if (!window.JonahConsole.simba) {
    window.JonahConsole.simba = {
      encountered: false,
      interactions: 0
    };
  }
  
  // Initialize the traceCat command
  window.traceCat = function() {
    // First time encounter
    if (!window.JonahConsole.simba.encountered) {
      console.log("%c...", "color: #475B74; font-size:14px;");
      
      setTimeout(() => {
        console.log("%c...", "color: #475B74; font-size:14px;");
      }, 1000);
      
      setTimeout(() => {
        console.log("%c...", "color: #475B74; font-size:14px;");
      }, 2000);
      
      setTimeout(() => {
        console.log("%c*quiet meowing in the distance*", "color: #C97D60; font-size:14px; font-style: italic;");
        speak("meow", { rate: 0.4, pitch: 1.5 });
        
        // Mark as encountered
        window.JonahConsole.simba.encountered = true;
        window.JonahConsole.simba.lastSeen = new Date().toISOString();
        window.JonahConsole.simba.interactions = 1;
        
        // Award points
        window.JonahConsole.score += 10;
        localStorage.setItem('phileScore', window.JonahConsole.score.toString());
      }, 3000);
    }
    // Subsequent encounters
    else {
      const interactions = window.JonahConsole.simba.interactions || 0;
      
      // Update tracking
      window.JonahConsole.simba.interactions = interactions + 1;
      window.JonahConsole.simba.lastSeen = new Date().toISOString();
      
      // Different responses based on number of interactions
      if (interactions < 3) {
        console.log("%c*the cat observes you from a distance*", "color: #C97D60; font-size:14px; font-style: italic;");
        speak("meow", { rate: 0.4, pitch: 1.5 });
      }
      else if (interactions < 6) {
        console.log("%c*the cat comes closer, tilting its head*", "color: #C97D60; font-size:14px; font-style: italic;");
        speak("purr", { rate: 0.4, pitch: 1.5 });
        
        setTimeout(() => {
          console.log("%cIts collar has a name tag: 'SIMBA'", "color: #475B74; font-size:14px;");
        }, 2000);
      }
      else {
        console.log("%c*Simba jumps onto the console and walks across it*", "color: #C97D60; font-size:14px; font-style: italic;");
        
        setTimeout(() => {
          // Cat walking on keyboard effect
          const keys = "nmbvcxzlkjhgfdsapoiuytrewq";
          let randomKeys = "";
          const keyCount = Math.floor(Math.random() * 10) + 5;
          
          for (let i = 0; i < keyCount; i++) {
            randomKeys += keys[Math.floor(Math.random() * keys.length)];
          }
          
          console.log(`%c${randomKeys}`, "color: #C97D60; font-size:14px;");
          
          // Hint at the feed command after enough interactions
          if (interactions >= 7 && !window.JonahConsole.usedCommands.includes('feedSimba')) {
            setTimeout(() => {
              console.log("%cSimba seems hungry...", "color: #475B74; font-size:14px; font-style:italic;");
            }, 1500);
          }
        }, 1500);
      }
    }
    
    trackCommandExecution('traceCat');
  };

  // Initialize the feedSimba command
  window.feedSimba = function() {
    if (!window.JonahConsole.simba.encountered) {
      typewriterLog("You don't have anyone to feed yet.");
      speak("You don't have anyone to feed yet", { rate: 0.3, pitch: 0.2 });
      return;
    }
    
    console.log("%c*you offer some food*", "color: #C97D60; font-size:14px; font-style: italic;");
    
    setTimeout(() => {
      console.log("%c*Simba approaches cautiously*", "color: #C97D60; font-size:14px; font-style: italic;");
    }, 1500);
    
    setTimeout(() => {
      console.log("%c*Simba eats the food happily*", "color: #C97D60; font-size:14px; font-style: italic;");
      speak("purr", { rate: 0.5, pitch: 1.5 });
    }, 3000);
    
    setTimeout(() => {
      // After eating, Simba might reveal a clue
      const interactions = window.JonahConsole.simba.interactions || 0;
      
      if (interactions > 5) {
        console.log("%c*Simba drops something shiny from its collar*", "color: #C97D60; font-size:14px;");
        
        setTimeout(() => {
          console.log("%cIt's a tiny key with the number '427' engraved on it.", "color: #475B74; font-size:14px;");
          
          // Award points for finding the key
          window.JonahConsole.score += 15;
        }, 2000);
      } else {
        console.log("%c*Simba purrs and rubs against the screen*", "color: #C97D60; font-size:14px;");
      }
      
      // Increment interactions
      window.JonahConsole.simba.interactions = interactions + 1;
      window.JonahConsole.simba.lastSeen = new Date().toISOString();
    }, 4500);
    
    trackCommandExecution('feedSimba');
  };

  // Enable the system to respond to "Simba" mentions
  window.triggerSimbaComment = function(message) {
    if (!window.JonahConsole.simba.encountered) return;
    
    if (message.toLowerCase().includes('simba') || 
        message.toLowerCase().includes('cat')) {
      
      // Add a small delay before Simba responds
      setTimeout(() => {
        console.log("%c*Simba's ears perk up at hearing its name*", "color: #C97D60; font-size:14px; font-style: italic;");
      }, 2000);
    }
  };
};

// Declare the global functions for TypeScript
declare global {
  interface Window {
    traceCat: () => void;
    feedSimba: () => void;
    triggerSimbaComment?: (message: string) => void;
  }
}
