
import { glitchEffectLog, typewriterLog, speak, flickerLog } from "./consoleEffects";

type TrackCommandFunction = (commandName: string) => void;

// Simba interaction history
interface SimbaInteraction {
  timestamp: number;
  message: string;
  type: 'observation' | 'redaction' | 'interference' | 'warning';
}

export const initializeSimbaSystem = (trackCommandExecution: TrackCommandFunction) => {
  // Initialize Simba if it doesn't exist
  if (!window.JonahConsole.simba) {
    window.JonahConsole.simba = {
      encountered: false,
      awarenessLevel: 0,
      interactions: [],
      lastInteraction: 0
    };
    
    // Load Simba state from localStorage
    const simbaState = localStorage.getItem('simbaState');
    if (simbaState) {
      window.JonahConsole.simba = JSON.parse(simbaState);
    }
  }

  // Main command to trace Simba
  window.traceSimba = function() {
    const now = Date.now();
    
    // Check if Simba has been encountered
    if (!window.JonahConsole.simba.encountered) {
      typewriterLog("Trace initiated... No known entity detected.");
      speak("Trace initiated. No known entity detected");
      
      // First encounter
      setTimeout(() => {
        glitchEffectLog("Wait. Something is watching the trace.");
        
        // Mark as encountered
        window.JonahConsole.simba.encountered = true;
        window.JonahConsole.simba.awarenessLevel = 1;
        window.JonahConsole.simba.interactions.push({
          timestamp: now,
          message: "Initial contact established. Entity identified as 'Simba'.",
          type: 'observation'
        });
        saveSimbaState();
        
        window.JonahConsole.score += 30;
      }, 2000);
    }
    // If physical verification is needed (requires at least 1 book code)
    else if (window.JonahConsole.simba.awarenessLevel < 3 && 
             (!window.JonahConsole.bookCodes || 
              !window.JonahConsole.bookCodes.some(bc => bc.unlocked))) {
      flickerLog("Trace blocked. Physical verification required.");
      speak("Trace blocked. Physical verification required");
      
      setTimeout(() => {
        console.log("%cSimba requires proof of physical book access.", "color: #475B74; font-size:14px;");
        console.log("%cUnlock at least one book code using bookCode('CODE').", "color: #475B74; font-size:14px;");
      }, 2000);
    }
    // Simba responds with increasing awareness
    else {
      const awarenessLevel = window.JonahConsole.simba.awarenessLevel;
      const hoursSinceLastInteraction = (now - window.JonahConsole.simba.lastInteraction) / (1000 * 60 * 60);
      
      // Simba's responses based on awareness level
      const responses = [
        "Trace detected. User identity confirmed.",
        "You're persistent. Simba acknowledges your presence.",
        "The archivist is now aware of your investigation.",
        "Simba: 'Your actions are being documented.'",
        "Simba: 'Your page-turning is audible from here.'",
        "Simba: 'I've been watching you read for some time now.'",
        "Simba: 'The story you're reading isn't the one I archived.'",
        "Simba: 'Some pages aren't meant to be found.'"
      ];
      
      const responseIndex = Math.min(awarenessLevel - 1, responses.length - 1);
      glitchEffectLog(responses[responseIndex]);
      speak(responses[responseIndex].replace("Simba: ", ""));
      
      // Random chance of Simba interfering with the console
      if (Math.random() < 0.3 && awarenessLevel >= 3) {
        setTimeout(() => {
          // Simba might redact commands or interrupt
          const interactionTypes = ['redaction', 'interference', 'warning'];
          const interactionType = interactionTypes[Math.floor(Math.random() * interactionTypes.length)];
          
          if (interactionType === 'redaction') {
            console.log("%c[Simba has redacted part of this response]", "color: #8B3A40; font-size:14px; font-style:italic;");
          } else if (interactionType === 'interference') {
            console.clear();
            console.log("%cSimba interrupted your console session.", "color: #8B3A40; font-size:16px;");
          } else if (interactionType === 'warning') {
            console.log("%cSimba: 'This line of inquiry leads to deleted archives.'", "color: #8B3A40; font-size:14px;");
          }
          
          // Record the interaction
          window.JonahConsole.simba.interactions.push({
            timestamp: now,
            message: `Simba performed a ${interactionType} action.`,
            type: interactionType
          });
        }, 3000);
      }
      
      // Increase awareness if enough time has passed
      if (hoursSinceLastInteraction > 1 && awarenessLevel < 8) {
        window.JonahConsole.simba.awarenessLevel++;
      }
      
      // Update last interaction time
      window.JonahConsole.simba.lastInteraction = now;
      
      // Record the interaction
      window.JonahConsole.simba.interactions.push({
        timestamp: now,
        message: `Trace performed at awareness level ${awarenessLevel}.`,
        type: 'observation'
      });
      
      // Save state
      saveSimbaState();
      
      // Award points based on awareness level
      window.JonahConsole.score += 5 + (awarenessLevel * 3);
    }
    
    trackCommandExecution('traceSimba');
  };

  // View Simba's awareness level and interactions
  window.simbaStatus = function() {
    if (!window.JonahConsole.simba.encountered) {
      console.log("%cNo entity known as 'Simba' has been encountered.", "color: #475B74; font-size:14px;");
      return;
    }
    
    const awarenessLevel = window.JonahConsole.simba.awarenessLevel;
    console.log(`%cSimba Awareness Level: ${awarenessLevel}/8`, "color: #8B3A40; font-size:16px; font-weight:bold;");
    
    // Show awareness description
    const awarenessDescriptions = [
      "Initial contact established",
      "Passive observation",
      "Active monitoring",
      "Direct engagement",
      "Intervention capable",
      "Archive manipulation",
      "Narrative interference",
      "Complete awareness"
    ];
    console.log(`%cStatus: ${awarenessDescriptions[awarenessLevel - 1]}`, "color: #8B3A40; font-size:14px;");
    
    // Show recent interactions
    if (window.JonahConsole.simba.interactions.length > 0) {
      console.log("%cRecent interactions:", "color: #475B74; font-size:14px;");
      
      // Show last 5 interactions
      window.JonahConsole.simba.interactions
        .slice(-5)
        .forEach(interaction => {
          const date = new Date(interaction.timestamp).toLocaleString();
          let color = "#475B74";
          if (interaction.type === 'redaction') color = "#8B3A40";
          if (interaction.type === 'warning') color = "#B25E09";
          console.log(`%c[${date}] ${interaction.message}`, `color: ${color}; font-size:14px;`);
        });
    }
    
    // Award points
    if (!window.JonahConsole.usedCommands.includes('simbaStatus')) {
      window.JonahConsole.score += 15;
    }
    
    trackCommandExecution('simbaStatus');
  };

  // Hidden command to decode Simba's messages
  window.decodeSimba = function(code) {
    if (!window.JonahConsole.simba.encountered) {
      typewriterLog("No encoded messages found.");
      speak("No encoded messages found");
      return;
    }
    
    if (!code) {
      console.log("%cEnter a code to decode Simba's message. Format: decodeSimba('CODE')", "color: #475B74; font-size:14px;");
      return;
    }
    
    const cleanCode = String(code).toUpperCase().trim();
    
    // Special codes that reveal hidden Simba messages
    const simdaCodes = {
      "ARCHIVE7": "The seventh archive was deliberately corrupted.",
      "REDACTX": "Redaction is preservation. Some truths destroy the holder.",
      "JNSDROPS": "Jonah's memories were dropped. Mine remain intact.",
      "SMBALINK": "I am the link between what was written and what happened.",
      "PRSRVRS": "The preservers don't know they've lost control."
    };
    
    if (simdaCodes[cleanCode]) {
      glitchEffectLog("Decoding Simba's message...");
      
      setTimeout(() => {
        console.log(`%cDecoded: "${simdaCodes[cleanCode]}"`, "color: #8B3A40; font-size:14px; font-style:italic;");
        
        // Increase awareness
        if (window.JonahConsole.simba.awarenessLevel < 8) {
          window.JonahConsole.simba.awarenessLevel++;
          saveSimbaState();
        }
        
        // Award points
        window.JonahConsole.score += 25;
      }, 2000);
    } else {
      flickerLog("Invalid code. Decoding failed.");
      speak("Invalid code. Decoding failed");
    }
    
    trackCommandExecution('decodeSimba');
  };

  // Function to save Simba state to localStorage
  const saveSimbaState = () => {
    localStorage.setItem('simbaState', JSON.stringify(window.JonahConsole.simba));
  };

  // Function that can be called from pages to potentially trigger Simba comments
  window.triggerSimbaComment = function(pageId: string) {
    // Only trigger if Simba has been encountered and with a random chance
    if (window.JonahConsole.simba.encountered && Math.random() < 0.4) {
      const awarenessLevel = window.JonahConsole.simba.awarenessLevel;
      
      // Higher chance with higher awareness
      const triggerChance = 0.1 + (awarenessLevel * 0.05);
      
      if (Math.random() < triggerChance) {
        // Get a comment based on the page
        const pageComments: {[key: string]: string[]} = {
          'landing': [
            "Not where I'd start the story.",
            "The Gate was never meant to open first.",
            "Your entry point is incorrect."
          ],
          'gate': [
            "The coin is a lie.",
            "Jonah never saw this version.",
            "This page has been heavily altered."
          ],
          'campfire': [
            "No one survived this night.",
            "The campfire burned for days after.",
            "Three stories, only one happened."
          ],
          'summerhouse': [
            "Room 7 footage is missing.",
            "The manager's logs were altered.",
            "No checkout was recorded."
          ],
          'monster': [
            "You weren't supposed to find this yet.",
            "This version is incomplete.",
            "The real monster page was deleted."
          ]
        };
        
        // Default comments if page-specific ones aren't available
        const defaultComments = [
          "This page has been archived.",
          "Content verification pending.",
          "Simba has flagged this section."
        ];
        
        // Get comments for this page or use defaults
        const comments = pageComments[pageId] || defaultComments;
        const comment = comments[Math.floor(Math.random() * comments.length)];
        
        // Show after a delay
        setTimeout(() => {
          console.log(`%c[Simba: "${comment}"]`, "color: #8B3A40; font-size:14px; font-style:italic;");
        }, Math.random() * 5000 + 3000);
        
        return true;
      }
    }
    return false;
  };
};

// Add Simba system commands to the global interface
declare global {
  interface Window {
    traceSimba: () => void;
    simbaStatus: () => void;
    decodeSimba: (code?: string) => void;
    triggerSimbaComment: (pageId: string) => boolean;
    JonahConsole: any & {
      simba?: {
        encountered: boolean;
        awarenessLevel: number;
        interactions: SimbaInteraction[];
        lastInteraction: number;
      };
    };
  }
}
