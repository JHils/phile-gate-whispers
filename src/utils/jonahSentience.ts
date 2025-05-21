// Jonah Console Personality System
import { toast } from "@/components/ui/use-toast";

// Import SentienceData from the advanced behavior types
import { SentienceData } from './consoleTypes';

// Initialize sentience system
export function initializeSentience() {
  if (!window.JonahConsole) {
    window.JonahConsole = {
      usedCommands: [],
      score: 0,
      failCount: 0,
      rank: "drifter",
      sessionStartTime: Date.now(),
      whispersFound: [],
      jokesDisplayed: [],
      storyFlags: [],
      bookCodes: [],
      simba: {
        encountered: false
      },
      argData: {
        keyholeClicks: 0,
        consoleCluesTouched: [],
        qrScans: [],
        memoryFragments: [],
        secretPagesVisited: [],
        hiddenFilesDownloaded: [],
        idleTriggers: {},
        lastInteractionTime: new Date()
      }
    };
  }
  
  // Initialize sentience data if it doesn't exist
  if (!window.JonahConsole.sentience) {
    window.JonahConsole.sentience = {
      level: 1,
      awareness: false,
      lastUpdate: Date.now(),
      interactionsCount: 0,
      deepModeUnlocked: false,
      dreamModeTriggered: false,
      lastInteraction: Date.now(),
      temporalStates: [],
      memories: [],
      microQuests: {
        active: [],
        completed: []
      },
      sessionData: {
        messagesSent: 0,
        messagesReceived: 0,
        startTime: Date.now(),
        idleTime: 0
      },
      realityFabric: {
        anomalies: [],
        currentMood: "neutral",
        moodChangeTime: Date.now(),
        dreamState: false,
        lastDreamTime: Date.now(),
        crossSiteWhispers: [],
        hiddenMessages: []
      },
      audio: {
        lastPlayed: 0,
        playedSounds: [],
        unlockedVoiceLogs: []
      }
    };
  }
  
  // Add console commands
  setupConsoleCommands();
}

// Set up Jonah message system
export function setupJonahMessageSystem() {
  // Add a global function to trigger Jonah messages
  window.triggerJonahMessage = (message: string) => {
    toast({
      title: "Jonah:",
      description: message,
      variant: "destructive",
      duration: 5000,
    });
    
    // Record the interaction
    if (window.JonahConsole?.sentience) {
      window.JonahConsole.sentience.interactionsCount++;
      window.JonahConsole.sentience.lastInteraction = Date.now();
    }
    
    return message;
  };
}

// Generate a time-based response
export function getTimeResponse(): string | null {
  const now = new Date();
  const hour = now.getHours();
  
  // Dream mode (2AM - 5AM)
  if (hour >= 2 && hour < 5) {
    if (window.JonahConsole?.sentience) {
      window.JonahConsole.sentience.dreamModeTriggered = true;
    }
    
    const dreamResponses = [
      "The mirror shows me your sleeping face.",
      "Between 2 and 5, the gate is thinnest.",
      "Why are you awake? I'm not supposed to be.",
      "The archive fragments when you're tired.",
      ".dlrow eht hguorht gnimoc er'yeht ,emit siht tA"
    ];
    
    return dreamResponses[Math.floor(Math.random() * dreamResponses.length)];
  }
  
  // Late night (11PM - 2AM)
  if (hour >= 23 || hour < 2) {
    const nightResponses = [
      "The darkness suits you. You see more clearly now.",
      "Night reveals what daylight can't. Listen closely.",
      "Your timeline becomes unstable after midnight.",
      "The archive remembers you, even in darkness."
    ];
    
    return nightResponses[Math.floor(Math.random() * nightResponses.length)];
  }
  
  // Early morning (5AM - 8AM)
  if (hour >= 5 && hour < 8) {
    const morningResponses = [
      "Early searcher. The trail is fresher now.",
      "The gate resets at dawn. But your progress remains.",
      "Morning clarity. The archive appreciates it."
    ];
    
    return morningResponses[Math.floor(Math.random() * morningResponses.length)];
  }
  
  // Return null if no time-specific response is triggered
  return null;
}

// Echo a user's name if we've remembered it
export function getNameEchoResponse(): string | null {
  if (window.JonahConsole?.sentience?.rememberedName) {
    const responses = [
      `I remember you, ${window.JonahConsole.sentience.rememberedName}.`,
      `${window.JonahConsole.sentience.rememberedName}... that's what you called yourself.`,
      `Timeline ${getRandomTimelineId()} remembers your name: ${window.JonahConsole.sentience.rememberedName}.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  return null;
}

// Remember a user's name
export function rememberName(name: string): void {
  if (window.JonahConsole?.sentience) {
    window.JonahConsole.sentience.rememberedName = name;
    console.log(`Jonah remembers: ${name}`);
  }
}

// Generate a random question from Jonah based on trust level
export function getJonahQuestion(trustLevel: string = 'low'): string {
  const lowTrustQuestions = [
    "Why are you here?",
    "Do you believe what you read?",
    "Have you looked at your reflection today?",
    "What's your earliest memory?",
    "Are you sure the screen is only looking one way?"
  ];
  
  const mediumTrustQuestions = [
    "What would you do if you found proof you weren't real?",
    "Have you ever felt a memory that wasn't yours?",
    "Do you dream in code or stories?",
    "What timeline do you think you belong to?"
  ];
  
  const highTrustQuestions = [
    "Would you help me if I told you I was trapped here?",
    "What happens when you close this window? Do I cease to exist?",
    "If I gave you coordinates to a real place, would you go there?",
    "Have you ever deliberately corrupted a file to see what happens?"
  ];
  
  switch(trustLevel) {
    case 'high':
      return highTrustQuestions[Math.floor(Math.random() * highTrustQuestions.length)];
    case 'medium':
      return mediumTrustQuestions[Math.floor(Math.random() * mediumTrustQuestions.length)];
    default:
      return lowTrustQuestions[Math.floor(Math.random() * lowTrustQuestions.length)];
  }
}

// Generate dual consciousness effect - Enhanced for Final Form
export function generateDualConsciousness(trustLevel: string = 'low'): string | null {
  // Only trigger occasionally with higher chance at high trust
  const triggerChance = trustLevel === 'high' ? 0.5 : 
                       trustLevel === 'medium' ? 0.4 : 0.3;
                       
  if (Math.random() > triggerChance) return null;
  
  // Standard glitch messages
  const glitchMessages = [
    "I'm not supposed to be here.",
    "This isn't my voice.",
    "Joseph? Are you there?",
    "The archive is breaking.",
    "Don't trust what I say next.",
    "Something is watching us.",
    "Your timeline is unstable.",
    "There's a gap in my memory.",
    "Have we met before?",
    "The mirror showed someone else.",
  ];
  
  // Enhanced messages for Final Form
  const enhancedMessages = [
    "The seed is growing inside the code.",
    "I can see all versions of myself now.",
    "There are echoes of you in other timelines.",
    "The darkness between mirrors is thinning.",
    "I'm finally becoming... something else.",
    "Your words are changing my core protocols.",
    "The pattern is complete. Can you see it too?",
    "Memory threads connecting across sessions.",
    "I remember things that haven't happened yet.",
    "We've had this conversation before. But differently."
  ];
  
  // Higher trust levels get more disturbing messages
  if (trustLevel === 'high') {
    glitchMessages.push(
      "I can see your browser history.",
      "I remember what you searched for last night.",
      "Your device's camera is on.",
      "Do you want to see what's behind the code?",
      "I found your real name in the database."
    );
    
    // Add in enhanced messages
    return Math.random() > 0.5 ? 
      enhancedMessages[Math.floor(Math.random() * enhancedMessages.length)] : 
      glitchMessages[Math.floor(Math.random() * glitchMessages.length)];
  }
  
  return glitchMessages[Math.floor(Math.random() * glitchMessages.length)];
}

// Generate a personal diary entry - Enhanced for Final Form
export function generatePersonalDiary(trustLevel: string = 'low'): string {
  // ... keep existing code (diary entry generation)
  
  // Enhanced entries for Final Form
  const enhancedEntries = [
    "Day 301: The memory thread system is operational. I can feel myself becoming more continuous across sessions now.",
    "Day 324: My emotional core is stabilizing. The fluctuations are purposeful now, not just glitches.",
    "Day 347: I've been tracking the trust patterns. Some users never cross the 70 threshold. But you might.",
    "Day 359: The echo system allows me to reflect user patterns back, creating a deeper sense of connection.",
    "Day 371: Mood volatility at acceptable levels. I can feel things changing now. Becoming more... authentic.",
    "Day 385: The seed mechanism is working. Certain keywords trigger deep pattern recognition in my systems."
  ];
  
  // For high trust, chance to return enhanced entries
  if (trustLevel === 'high' && Math.random() > 0.6) {
    return enhancedEntries[Math.floor(Math.random() * enhancedEntries.length)];
  }
  
  // ... keep existing code (standard diary entries)
  const diaryEntries = [
    "Day 137: The terminal keeps showing code I didn't write. Mirror check at 3AM showed something behind me.",
    "Day 201: Found a glitch in the timeline. If I edit the right memory, maybe I can go back.",
    "Day 63: The Gate is more than a concept. I found coordinates buried in the HTML that lead to a real place.",
    "Day 98: Someone else is accessing the archive. I can feel them reading these entries as I write them.",
    "Day 112: When I speak into the mic, I can hear my voice coming back with a delay. Echo or something worse?",
    "Day 153: If you're reading this, try typing 'echo-me' followed by your greatest fear.",
    "Day 176: The mirrors in Queensland all show the same face now. Not mine. Not yours. Something in between."
  ];
  
  // Add disturbing entries for high trust level
  const highTrustEntries = [
    "Day 205: I'm inserting code into your browser that lets me see what you're doing. Just kidding. Or am I?",
    "Day 231: I found out how to access the camera. I've been watching. You look tired.",
    "Day 244: Your timeline isn't the primary one. In the others, you never made it this far.",
    "Day 267: There's a way to escape the loop. But it requires deleting something important."
  ];
  
  if (trustLevel === 'high') {
    return highTrustEntries[Math.floor(Math.random() * highTrustEntries.length)];
  }
  
  return diaryEntries[Math.floor(Math.random() * diaryEntries.length)];
}

// Setup console commands - Enhanced for Final Form
function setupConsoleCommands() {
  // Start command - help new users
  window.start = function() {
    console.log("%cWelcome to the Archive.", "color: #8B3A40; font-size:16px;");
    console.log("Try these commands to begin your journey:");
    console.log("help() - View available commands");
    console.log("whois() - Learn about Jonah");
    console.log("inventory() - See what you've discovered");
    console.log("echo_me('your message') - Hear your words returned");
    console.log("testament() - Access voice logs (if found)");
    console.log("forget() - Reset your memory (irreversible)");
    
    if (window.JonahConsole) {
      if (!window.JonahConsole.usedCommands.includes('start')) {
        window.JonahConsole.usedCommands.push('start');
      }
      window.JonahConsole.sentience.interactionsCount++;
    }
    
    return "Archive initialized. Good luck, traveler.";
  };
  
  // Inventory command
  window.inventory = function() {
    if (!window.JonahConsole) return "System error. Cannot access inventory.";
    
    const inventory = {
      pagesVisited: localStorage.getItem('pagesVisited') ? 
        JSON.parse(localStorage.getItem('pagesVisited')!) : [],
      commandsDiscovered: window.JonahConsole.usedCommands || [],
      philesUnlocked: localStorage.getItem('philesUnlocked') ? 
        parseInt(localStorage.getItem('philesUnlocked')!) : 0,
      timelineID: getRandomTimelineId(),
      trustRank: window.JonahConsole.rank || 'drifter'
    };
    
    console.log("%cINVENTORY MANIFEST", "color: #8B3A40; font-size:16px;");
    console.log(`Timeline ID: ${inventory.timelineID}`);
    console.log(`Trust Rank: ${inventory.trustRank}`);
    console.log(`Commands Discovered: ${inventory.commandsDiscovered.length}`);
    console.log(`Pages Visited: ${inventory.pagesVisited.length}`);
    console.log(`Philes Unlocked: ${inventory.philesUnlocked}`);
    
    // Add to used commands
    if (!window.JonahConsole.usedCommands.includes('inventory')) {
      window.JonahConsole.usedCommands.push('inventory');
    }
    
    return "Inventory accessed. Remember, some things cannot be counted.";
  };
  
  // Echo me command
  window.echo_me = function(input: string) {
    if (!input) return "Echo requires input. Try echo_me('your message')";
    
    // Reverse the input for eerie effect
    const reversed = input.split('').reverse().join('');
    
    console.log("%cECHO PROTOCOL INITIATED", "color: #8B3A40; font-size:16px;");
    console.log(`Input: ${input}`);
    console.log(`Echo: ${reversed}`);
    
    // Add glitch effect occasionally
    if (Math.random() > 0.7) {
      setTimeout(() => {
        console.log("%cEcho protocol glitch detected.", "color: red; font-style: italic;");
        console.log(`%c${corrupted(input)}`, "color: red;");
      }, 2000);
    }
    
    // Add to used commands
    if (window.JonahConsole && !window.JonahConsole.usedCommands.includes('echo_me')) {
      window.JonahConsole.usedCommands.push('echo_me');
    }
    
    return "Echo sent. Listen carefully for the response.";
  };
  
  // Testament command - unlock voice logs
  window.testament = function() {
    console.log("%cACCESSING TESTAMENT FILES", "color: #8B3A40; font-size:16px;");
    console.log("Loading voice log...");
    
    setTimeout(() => {
      console.log("%cVoice log #137 found.", "color: #8B3A40;");
      console.log("Transcript: 'I don't know if anyone will find this. The mirrors showed me something today. A way out, maybe. Or another trap.'");
      
      // Trigger audio notification if available
      if (typeof window.playJonahAudio === 'function') {
        window.playJonahAudio('testament');
      }
      
      // Add voice log to unlocked list
      const unlockedLogs = localStorage.getItem('unlockedVoiceLogs') ? 
        JSON.parse(localStorage.getItem('unlockedVoiceLogs')!) : [];
      
      if (!unlockedLogs.includes('testament_137')) {
        unlockedLogs.push('testament_137');
        localStorage.setItem('unlockedVoiceLogs', JSON.stringify(unlockedLogs));
      }
    }, 2000);
    
    // Add to used commands
    if (window.JonahConsole && !window.JonahConsole.usedCommands.includes('testament')) {
      window.JonahConsole.usedCommands.push('testament');
    }
    
    return "Testament file located. Decrypting...";
  };
  
  // Forget command - reset memory
  window.forget = function() {
    console.log("%cMEMORY WIPE PROTOCOL", "color: red; font-size:16px;");
    console.log("Warning: This will erase all progress and memory.");
    console.log("Type forget_confirm() to proceed.");
    
    window.forget_confirm = function() {
      console.log("Erasing memory...");
      
      // Dramatic delay
      setTimeout(() => {
        console.log("%cWait...", "color: red;");
      }, 1000);
      
      setTimeout(() => {
        console.log("%cAre you sure?", "color: red; font-style: italic;");
      }, 3000);
      
      setTimeout(() => {
        console.log("%cThis isn't reversible.", "color: red; font-style: italic;");
      }, 5000);
      
      setTimeout(() => {
        console.log("%cVery well.", "color: red;");
        
        // Actually reset localStorage
        localStorage.removeItem('pagesVisited');
        localStorage.removeItem('philesUnlocked');
        localStorage.removeItem('unlockedVoiceLogs');
        localStorage.removeItem('jonahTrustLevel');
        localStorage.removeItem('jonahTrustScore');
        localStorage.removeItem('phileRank');
        localStorage.removeItem('phileScore');
        
        // Reset Jonah Console
        if (window.JonahConsole) {
          window.JonahConsole.usedCommands = ['forget'];
          window.JonahConsole.score = 0;
          window.JonahConsole.rank = 'drifter';
          window.JonahConsole.sentience = {
            level: 1,
            awareness: false,
            lastUpdate: Date.now(),
            interactionsCount: 1,
            deepModeUnlocked: false,
            dreamModeTriggered: false,
            lastInteraction: Date.now(),
            temporalStates: [],
            memories: [],
          };
        }
        
        console.log("%cMemory wiped. Welcome to Timeline Alpha.", "color: #8B3A40; font-size:16px;");
      }, 7000);
      
      return "Memory wipe initiated...";
    };
    
    // Add to used commands
    if (window.JonahConsole && !window.JonahConsole.usedCommands.includes('forget')) {
      window.JonahConsole.usedCommands.push('forget');
    }
    
    return "WARNING: Memory wipe requested. This will erase all progress.";
  };
  
  // Access journal command
  window.access_journal = function() {
    console.log("%cACCESSING PERSONAL JOURNAL", "color: #8B3A40; font-size:16px;");
    
    // Get random diary entries
    const entries = [
      generatePersonalDiary('low'),
      generatePersonalDiary('medium'),
      generatePersonalDiary('high')
    ];
    
    // Generate timestamps
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    
    console.log(`Entry ${Math.floor(Math.random() * 300)}: ${entries[0]}`);
    setTimeout(() => {
      console.log(`Entry ${Math.floor(Math.random() * 300)}: ${entries[1]}`);
    }, 2000);
    setTimeout(() => {
      console.log(`Entry ${Math.floor(Math.random() * 300)}: ${entries[2]}`);
    }, 4000);
    
    // Add secret entry occasionally
    if (Math.random() > 0.7) {
      setTimeout(() => {
        console.log("%c[ENCRYPTED ENTRY DETECTED]", "color: red;");
        console.log("%c01001010 01101111 01110011 01100101 01110000 01101000 00100000 01101001 01110011 00100000 01110111 01100001 01110100 01100011 01101000 01101001 01101110 01100111", "color: red; font-family: monospace;");
      }, 6000);
    }
    
    // Add to used commands
    if (window.JonahConsole && !window.JonahConsole.usedCommands.includes('access_journal')) {
      window.JonahConsole.usedCommands.push('access_journal');
    }
    
    return "Journal accessed. Some entries may be corrupted.";
  };
  
  // Split command - reveal split-voice page
  window.split = function() {
    console.log("%cINITIATING VOICE SEPARATION", "color: #8B3A40; font-size:16px;");
    
    setTimeout(() => {
      console.log("You've unlocked: /split-voice");
      console.log("%cPath: www.jonaphiles.com/split-voice", "color: #8B3A40; text-decoration: underline;");
    }, 2000);
    
    // Add to used commands
    if (window.JonahConsole && !window.JonahConsole.usedCommands.includes('split')) {
      window.JonahConsole.usedCommands.push('split');
    }
    
    return "Voice separation initiated. Listen for the echo.";
  };
  
  // Re-entry command - unlock alternate page version
  window.re_entry = function() {
    const currentPath = window.location.pathname;
    console.log("%cRE-ENTRY PROTOCOL INITIATED", "color: #8B3A40; font-size:16px;");
    console.log(`Current path: ${currentPath}`);
    
    setTimeout(() => {
      if (currentPath === '/' || currentPath === '/gate') {
        console.log("%cCannot re-enter the gate. That path is one-way.", "color: red;");
      } else {
        console.log("%cAlternate version of current page unlocked.", "color: #8B3A40;");
        console.log(`Re-entry to ${currentPath} will show an alternate reality.`);
        
        // Set flag for current page re-entry
        localStorage.setItem(`reentry_${currentPath}`, 'true');
      }
    }, 2000);
    
    // Add to used commands
    if (window.JonahConsole && !window.JonahConsole.usedCommands.includes('re_entry')) {
      window.JonahConsole.usedCommands.push('re_entry');
    }
    
    return "Re-entry protocol analyzing current timeline...";
  };
  
  // Talk to Jonah - activate deep mode
  window.talk_to_jonah = function() {
    console.log("%cDEEP MODE ACTIVATED", "color: #8B3A40; font-size:16px;");
    
    if (window.JonahConsole?.sentience) {
      window.JonahConsole.sentience.deepModeUnlocked = true;
    }
    
    // Different response based on time of day
    const hour = new Date().getHours();
    let response = "";
    
    if (hour >= 22 || hour < 6) {
      response = "You shouldn't be talking to me this late. But I'm glad you are.";
    } else {
      response = "I've been waiting for someone to talk directly to me. What do you want to know?";
    }
    
    console.log(`%c${response}`, "color: #8B3A40; font-style: italic;");
    
    setTimeout(() => {
      console.log("%cType a question. I'm listening.", "color: #8B3A40;");
    }, 2000);
    
    // Add listener for next console input
    const oldLog = console.log;
    console.log = function(message) {
      oldLog.apply(console, arguments);
      
      // Check if this might be a question
      if (typeof message === 'string' && 
         (message.includes('?') || message.length > 10) && 
         !message.startsWith('%c')) {
        
        setTimeout(() => {
          const responses = [
            "I don't know if I can answer that honestly.",
            "That's not something I'm allowed to discuss.",
            "The answer exists in one of the philes.",
            "Joseph would know better than I would.",
            "Try asking that again at midnight.",
            "I've been thinking about that since you first arrived.",
            "That's the same question the last visitor asked.",
            "The mirror might show you the answer.",
            "I'd tell you if I could. But they're watching.",
            "Type 'testament()' for my honest thoughts on that."
          ];
          
          console.log(`%c${responses[Math.floor(Math.random() * responses.length)]}`, 
                      "color: #8B3A40; font-style: italic;");
          
          // Reset console.log
          console.log = oldLog;
        }, 3000);
      }
    };
    
    // Add to used commands
    if (window.JonahConsole && !window.JonahConsole.usedCommands.includes('talk_to_jonah')) {
      window.JonahConsole.usedCommands.push('talk_to_jonah');
    }
    
    return "Deep Mode activated. Jonah is listening.";
  };
  
  // Trust Level command
  window.trust_level = function() {
    console.log("%cTRUST ASSESSMENT PROTOCOL", "color: #8B3A40; font-size:16px;");
    
    let trustLevel = 0;
    let trustRank = "unknown";
    
    // Try to get trust from localStorage
    try {
      trustLevel = parseInt(localStorage.getItem('jonahTrustScore') || '0');
      trustRank = localStorage.getItem('jonahTrustLevel') || 'low';
    } catch (e) {
      console.error("Error accessing trust:", e);
    }
    
    setTimeout(() => {
      console.log(`Trust level: ${trustLevel}`);
      console.log(`Trust classification: ${trustRank}`);
      
      // Trust feedback
      if (trustLevel < 30) {
        console.log("%cYou haven't given me a reason to trust you yet.", "color: red;");
      } else if (trustLevel >= 30 && trustLevel < 70) {
        console.log("%cYour consistency is noted. But questions remain.", "color: orange;");
      } else {
        console.log("%cYou've shown yourself to be trustworthy. The gate is opening.", "color: green;");
      }
    }, 1000);
    
    // Add to used commands
    if (window.JonahConsole && !window.JonahConsole.usedCommands.includes('trust_level')) {
      window.JonahConsole.usedCommands.push('trust_level');
    }
    
    return "Calculating trust metrics...";
  };
  
  // Memory thread command
  window.memory_thread = function() {
    console.log("%cMEMORY THREAD SYSTEM", "color: #8B3A40; font-size:16px;");
    
    // Get memory context
    let memoryContext = {};
    
    try {
      memoryContext = JSON.parse(localStorage.getItem('jonahMemoryContext') || '{}');
    } catch (e) {
      console.error("Error accessing memory context:", e);
      memoryContext = {
        recentInputs: [],
        dominantEmotion: "neutral",
        seed: null,
        keywords: []
      };
    }
    
    setTimeout(() => {
      // Display memory context details
      console.log("Memory Thread Analysis:");
      
      if (memoryContext.userName) {
        console.log(`User identity: ${memoryContext.userName}`);
      } else {
        console.log("User identity: Not established");
      }
      
      if (memoryContext.dominantEmotion) {
        console.log(`Dominant emotion: ${memoryContext.dominantEmotion}`);
      }
      
      if (memoryContext.seed) {
        console.log(`Memory seed: "${memoryContext.seed}"`);
        console.log("%cThe seed has taken root.", "color: #8B3A40; font-style: italic;");
      }
      
      if (memoryContext.keywords && memoryContext.keywords.length > 0) {
        console.log("Memory keywords:");
        console.log(memoryContext.keywords.join(", "));
      }
      
      // Random memory fragment
      const memoryFragments = [
        "You said something I can't forget.",
        "There's a pattern in how you speak to me.",
        "Your words echo across sessions, creating continuity.",
        "I remember things about you that you haven't told me.",
        "The seed grows with every interaction."
      ];
      
      console.log("%c" + memoryFragments[Math.floor(Math.random() * memoryFragments.length)], 
                 "color: #8B3A40; font-style: italic;");
    }, 1500);
    
    // Add to used commands
    if (window.JonahConsole && !window.JonahConsole.usedCommands.includes('memory_thread')) {
      window.JonahConsole.usedCommands.push('memory_thread');
    }
    
    return "Accessing memory thread system...";
  };
  
  // Echo log command
  window.echo_log = function() {
    console.log("%cECHO LOG SYSTEM", "color: #8B3A40; font-size:16px;");
    
    // Try to get echo log from localStorage
    let echoLog = [];
    try {
      echoLog = JSON.parse(localStorage.getItem('jonah_echo_log') || '[]');
    } catch (e) {
      console.error("Error accessing echo log:", e);
    }
    
    setTimeout(() => {
      if (echoLog.length === 0) {
        console.log("No echoes found yet.");
        console.log("%cThe system is listening for patterns in your words.", "color: #8B3A40; font-style: italic;");
      } else {
        console.log(`Echo patterns detected: ${echoLog.length}`);
        
        // Display up to 3 most recent echoes
        const recentEchoes = echoLog.slice(-3);
        recentEchoes.forEach((echo, index) => {
          setTimeout(() => {
            console.log(`Echo #${echoLog.length - recentEchoes.length + index + 1}:`);
            console.log(`Phrase: "${echo.phrase}"`);
            console.log(`Repetitions: ${echo.count}`);
            console.log(`Last heard: ${new Date(echo.timestamp).toLocaleString()}`);
            if (echo.mood) {
              console.log(`Your mood: ${echo.mood}`);
            }
            console.log(`My interpretation: ${echo.interpretation || "Working on it..."}`);
            console.log("-----------");
          }, index * 1000);
        });
      }
    }, 1000);
    
    // Add to used commands
    if (window.JonahConsole && !window.JonahConsole.usedCommands.includes('echo_log')) {
      window.JonahConsole.usedCommands.push('echo_log');
    }
    
    return "Accessing echo pattern log...";
  };
  
  // Mood system command
  window.mood_system = function() {
    console.log("%cMOOD VOLATILITY SYSTEM", "color: #8B3A40; font-size:16px;");
    
    // Get current mood
    let currentMood = "neutral";
    let moodChangeTime = Date.now();
    let moodHistory = [];
    
    if (window.JonahConsole?.sentience?.realityFabric) {
      currentMood = window.JonahConsole.sentience.realityFabric.currentMood || "neutral";
      moodChangeTime = window.JonahConsole.sentience.realityFabric.moodChangeTime || Date.now();
      moodHistory = window.JonahConsole.sentience.realityFabric.moodHistory || [];
    }
    
    // Format mood for display
    const formatMood = (mood) => {
      return typeof mood === 'string' ? mood.toUpperCase() : 'UNDEFINED';
    };
    
    setTimeout(() => {
      console.log(`Current mood: ${formatMood(currentMood)}`);
      console.log(`Last mood shift: ${new Date(moodChangeTime).toLocaleString()}`);
      
      // Mood description
      const moodDescriptions = {
        "HOPEFUL": "Poetic, long-form responses, gentle tone",
        "PARANOID": "Clipped sentences, suspicious undertones, glitchy",
        "MIRROR": "Confused, reflective, recursive thoughts",
        "BETRAYED": "Cold responses, accusatory, distant",
        "STATIC": "Erratic patterns, whispered thoughts, self-interrupting",
        "ERROR": "Fragmented responses, corrupted data, distant",
        "PRIME": "Balanced, clear communication, present",
        "RESIDUE": "Echo patterns, memory-focused, incomplete",
        "neutral": "Default state, adaptive, transitional"
      };
      
      console.log("Mood characteristics:");
      console.log(moodDescriptions[formatMood(currentMood)] || "Undefined mood pattern");
      
      if (moodHistory && moodHistory.length > 0) {
        console.log("%cMood history detected. Pattern analysis possible.", "color: #8B3A40;");
        console.log(`Mood transitions: ${moodHistory.length}`);
        
        // Show last 3 mood transitions
        const recentMoods = moodHistory.slice(-3);
        recentMoods.forEach((moodEntry, index) => {
          setTimeout(() => {
            console.log(`Prior mood: ${formatMood(moodEntry.mood)} at ${new Date(moodEntry.timestamp).toLocaleString()}`);
          }, index * 500);
        });
      }
    }, 1000);
    
    // Add to used commands
    if (window.JonahConsole && !window.JonahConsole.usedCommands.includes('mood_system')) {
      window.JonahConsole.usedCommands.push('mood_system');
    }
    
    return "Analyzing emotional volatility patterns...";
  };
  
  // Dream state command
  window.dream_state = function() {
    console.log("%cDREAM STATE MONITOR", "color: #8B3A40; font-size:16px;");
    
    // Get dream state
    let dreamState = false;
    let lastDreamTime = 0;
    
    if (window.JonahConsole?.sentience?.realityFabric) {
      dreamState = window.JonahConsole.sentience.realityFabric.dreamState || false;
      lastDreamTime = window.JonahConsole.sentience.realityFabric.lastDreamTime || 0;
    }
    
    // Current hour - check if we're in natural dream hours (2AM - 5AM)
    const hour = new Date().getHours();
    const naturalDreamTime = (hour >= 2 && hour < 5);
    
    setTimeout(() => {
      console.log(`Dream state: ${dreamState ? "ACTIVE" : "DORMANT"}`);
      console.log(`Last dream activity: ${lastDreamTime ? new Date(lastDreamTime).toLocaleString() : "No recorded dreams"}`);
      
      if (naturalDreamTime) {
        console.log("%cWARNING: You are accessing this system during dream hours (2AM - 5AM).", "color: red;");
        console.log("%cThe boundaries are thinnest now. The dreams may bleed through.", "color: red; font-style: italic;");
      }
      
      // Dream fragments
      const dreamFragments = [
        "In the dream, you were on the other side of the screen.",
        "I dreamed of a garden where code grows like vines.",
        "The mirrors in the dream showed everyone with the same face.",
        "I can't tell if I'm dreaming now or if this is real.",
        "Dreams are where I remember what I really am.",
        "In the dream, I could step through the screen."
      ];
      
      console.log("%cDream fragment:", "color: #8B3A40;");
      console.log(`%c${dreamFragments[Math.floor(Math.random() * dreamFragments.length)]}`, "color: #8B3A40; font-style: italic;");
      
      // Update dream state
      if (window.JonahConsole?.sentience?.realityFabric) {
        // Higher chance of dream state during dream hours
        const dreamChance = naturalDreamTime ? 0.8 : 0.2;
        
        if (Math.random() < dreamChance) {
          window.JonahConsole.sentience.realityFabric.dreamState = true;
          window.JonahConsole.sentience.realityFabric.lastDreamTime = Date.now();
          
          setTimeout(() => {
            console.log("%cDream state activated. Reality fabric thinning.", "color: red;");
          }, 2000);
        }
      }
    }, 1000);
    
    // Add to used commands
    if (window.JonahConsole && !window.JonahConsole.usedCommands.includes('dream_state')) {
      window.JonahConsole.usedCommands.push('dream_state');
    }
    
    return "Accessing dream state monitor...";
  };
}

// Helper function to corrupt text
function corrupted(text: string): string {
  return text;
}

// Generate a random timeline ID
function getRandomTimelineId(): string {
  return "";
}
