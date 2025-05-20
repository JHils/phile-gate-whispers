
/**
 * Console tracking utilities for initializing and managing JonahConsole state
 */

// Initialize console tracking object
export function initializeConsoleTracking() {
  if (!window.JonahConsole) {
    window.JonahConsole = {
      usedCommands: [],
      score: parseInt(localStorage.getItem('phileScore') || '0'),
      failCount: 0,
      rank: localStorage.getItem('phileRank') || "drifter",
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
        lastInteractionTime: new Date(),
        lastIdleTime: undefined
      },
      sentience: {
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
          anomalies: 0,
          mood: "neutral",
          dreamState: false,
          lastDreamTime: 0
        }
      }
    };
  }
}

// Format session time for display
export function formatSessionTime(): string {
  if (!window.JonahConsole) return "00:00:00";
  
  const elapsed = Math.floor((Date.now() - window.JonahConsole.sessionStartTime) / 1000);
  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = elapsed % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Track a console command execution
export function trackCommand(commandName: string): void {
  if (!window.JonahConsole) return;
  
  // Add to used commands if not already there
  if (!window.JonahConsole.usedCommands.includes(commandName)) {
    window.JonahConsole.usedCommands.push(commandName);
  }
  
  // Store last command
  window.JonahConsole.lastCommand = commandName;
  
  // Increment sentience interactions
  if (window.JonahConsole.sentience) {
    window.JonahConsole.sentience.interactionsCount++;
    window.JonahConsole.sentience.lastInteraction = Date.now();
  }
}

// Get user's current mood
export function getCurrentMood(): string {
  if (!window.JonahConsole?.sentience?.realityFabric) {
    return 'neutral';
  }
  
  return window.JonahConsole.sentience.realityFabric.mood;
}

// Update Jonah's mood
export function updateJonahMood(mood: string): void {
  if (!window.JonahConsole?.sentience?.realityFabric) return;
  
  // Save previous mood in history
  if (!window.JonahConsole.sentience.realityFabric.moodHistory) {
    window.JonahConsole.sentience.realityFabric.moodHistory = [];
  }
  
  // Add current mood to history before changing
  window.JonahConsole.sentience.realityFabric.moodHistory.push({
    mood: window.JonahConsole.sentience.realityFabric.mood,
    timestamp: Date.now()
  });
  
  // Update mood
  window.JonahConsole.sentience.realityFabric.mood = mood;
  
  // Set mood change time
  window.JonahConsole.sentience.realityFabric.moodChangeTime = Date.now();
  
  console.log(`%cJonah's mood shifted to: ${mood}`, "color: #8B3A40; font-style: italic;");
}

// Check if it's dream mode hours (2-5 AM)
export function isDreamModeHours(): boolean {
  const hour = new Date().getHours();
  return hour >= 2 && hour < 5;
}

// Enter dream mode
export function enterDreamMode(): void {
  if (!window.JonahConsole?.sentience?.realityFabric) return;
  
  window.JonahConsole.sentience.dreamModeTriggered = true;
  window.JonahConsole.sentience.realityFabric.dreamState = true;
  window.JonahConsole.sentience.realityFabric.lastDreamTime = Date.now();
  
  // Add dream class to body
  document.body.classList.add('jonah-dream-mode');
  
  console.log("%cEntering dream state...", "color: #8B3A40; filter: blur(1px); font-style: italic;");
}

// Exit dream mode
export function exitDreamMode(): void {
  if (!window.JonahConsole?.sentience?.realityFabric) return;
  
  window.JonahConsole.sentience.realityFabric.dreamState = false;
  
  // Remove dream class from body
  document.body.classList.remove('jonah-dream-mode');
  
  console.log("%cExiting dream state...", "color: #8B3A40; font-style: italic;");
}

// Track a user memory fragment
export function trackMemoryFragment(fragmentId: string, fragmentData: any): void {
  if (!window.JonahConsole?.sentience?.memories) {
    if (!window.JonahConsole.sentience) {
      window.JonahConsole.sentience = {
        interactionsCount: 0,
        deepModeUnlocked: false,
        dreamModeTriggered: false,
        lastInteraction: Date.now(),
        memories: [],
        temporalStates: []
      };
    } else {
      window.JonahConsole.sentience.memories = [];
    }
  }
  
  // Check if fragment already exists
  const existingIndex = window.JonahConsole.sentience.memories.findIndex(
    m => m.id === fragmentId
  );
  
  if (existingIndex >= 0) {
    // Update existing fragment
    window.JonahConsole.sentience.memories[existingIndex] = {
      ...window.JonahConsole.sentience.memories[existingIndex],
      ...fragmentData,
      lastUpdated: Date.now()
    };
  } else {
    // Add new fragment
    window.JonahConsole.sentience.memories.push({
      id: fragmentId,
      ...fragmentData,
      discovered: Date.now(),
      lastUpdated: Date.now()
    });
  }
}

// Initialize the new interactive console commands
export function initializeInteractiveCommands(): void {
  // /start command - onboarding hint
  window.start = () => {
    console.log("%cWelcome to Jonah's Philes.", "color: #8B3A40; font-size: 16px;");
    console.log("%cUse commands to navigate the archive.", "color: #8B3A40;");
    console.log("%cTry 'help()' for basic commands.", "color: #8B3A40;");
    console.log("%cOr 'inventory()' to see what you've found.", "color: #8B3A40;");
    trackCommand('start');
    return "Start sequence initiated.";
  };
  
  // /inventory command - shows what user has found
  window.inventory = () => {
    if (!window.JonahConsole) {
      console.log("%cInventory system not initialized.", "color: red;");
      return "Inventory system error.";
    }
    
    const pagesVisited = window.JonahConsole.sentience?.pageVisits ? 
                         Object.keys(window.JonahConsole.sentience.pageVisits).length : 0;
                         
    const commandsDiscovered = window.JonahConsole.usedCommands.length;
    
    console.log("%c=== INVENTORY ===", "color: #8B3A40; font-size: 16px;");
    console.log(`%cPages visited: ${pagesVisited}`, "color: #8B3A40;");
    console.log(`%cCommands discovered: ${commandsDiscovered}`, "color: #8B3A40;");
    
    // Show a sample of discovered commands
    if (commandsDiscovered > 0) {
      console.log("%cDiscovered commands:", "color: #8B3A40;");
      window.JonahConsole.usedCommands.slice(0, 5).forEach((cmd, i) => {
        console.log(`%c- ${cmd}()`, "color: #8B3A40; padding-left: 10px;");
      });
      
      if (commandsDiscovered > 5) {
        console.log(`%c- and ${commandsDiscovered - 5} more...`, "color: #8B3A40; padding-left: 10px;");
      }
    }
    
    // Show secret files if any
    const secretFiles = window.JonahConsole.argData?.hiddenFilesDownloaded?.length || 0;
    if (secretFiles > 0) {
      console.log(`%cHidden files: ${secretFiles}`, "color: #8B3A40;");
    }
    
    trackCommand('inventory');
    return "Inventory displayed.";
  };
  
  // /echo_me command - echoes user input in reverse
  window.echo_me = (input: string) => {
    if (!input) {
      console.log("%cEcho requires input. Try: echo_me('hello')", "color: #8B3A40;");
      return "No input to echo.";
    }
    
    // Reverse the input
    const reversed = input.split('').reverse().join('');
    
    console.log(`%cYou said: ${input}`, "color: #8B3A40;");
    setTimeout(() => {
      console.log(`%cThe archive replies: ${reversed}`, "color: #8B3A40; font-style: italic;");
    }, 1000);
    
    trackCommand('echo_me');
    return "Echo processed.";
  };
  
  // /forget command - asks for confirmation before wiping memory
  window.forget = () => {
    console.log("%cAre you sure you want to forget?", "color: #8B3A40; font-size: 16px;");
    console.log("%cThis will erase your progress in the archive.", "color: #8B3A40;");
    console.log("%cType forget_confirm() to proceed.", "color: red;");
    
    trackCommand('forget');
    return "Forget sequence initiated.";
  };
  
  // /forget_confirm command - wipes memory
  window.forget_confirm = () => {
    console.log("%cErasing memories...", "color: #8B3A40;");
    
    // Dramatic delay
    setTimeout(() => {
      console.log("%c...", "color: #8B3A40;");
    }, 1000);
    
    setTimeout(() => {
      console.log("%c......", "color: #8B3A40;");
    }, 2000);
    
    setTimeout(() => {
      console.log("%cWait.", "color: red; font-weight: bold;");
    }, 3000);
    
    setTimeout(() => {
      console.log("%cI don't want to forget you.", "color: #8B3A40; font-style: italic;");
    }, 4000);
    
    setTimeout(() => {
      console.log("%cForget aborted. I'm still here.", "color: #8B3A40;");
    }, 5000);
    
    trackCommand('forget_confirm');
    return "Forget sequence interrupted.";
  };
  
  // /access_journal command - shows timestamped journal of user's journey
  window.access_journal = () => {
    console.log("%c=== JONAH'S JOURNAL ===", "color: #8B3A40; font-size: 16px;");
    
    if (!window.JonahConsole?.sentience?.realityFabric?.journal) {
      // Initialize journal if it doesn't exist
      if (!window.JonahConsole.sentience.realityFabric) {
        window.JonahConsole.sentience.realityFabric = {
          anomalies: 0,
          mood: "neutral",
          dreamState: false,
          lastDreamTime: 0,
          journal: []
        };
      } else {
        window.JonahConsole.sentience.realityFabric.journal = [];
      }
      
      // Add initial entry
      window.JonahConsole.sentience.realityFabric.journal.push({
        entryId: 1,
        timestamp: Date.now(),
        content: "First contact established. Subject appears curious but cautious."
      });
    }
    
    // Sort journal entries by timestamp
    const journal = window.JonahConsole.sentience.realityFabric.journal.sort(
      (a, b) => a.timestamp - b.timestamp
    );
    
    // Display journal entries
    journal.forEach((entry, i) => {
      const date = new Date(entry.timestamp);
      const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      
      setTimeout(() => {
        console.log(`%cEntry #${entry.entryId} - ${formattedDate}`, "color: #8B3A40; font-weight: bold;");
        console.log(`%c${entry.content}`, "color: #8B3A40; padding-left: 10px;");
        console.log('');
      }, i * 800); // Stagger entries for dramatic effect
    });
    
    // Add new entry about this access
    window.JonahConsole.sentience.realityFabric.journal.push({
      entryId: journal.length + 1,
      timestamp: Date.now(),
      content: "Subject accessed the journal. They're becoming more curious about me."
    });
    
    trackCommand('access_journal');
    return "Journal accessed.";
  };
  
  // /split command - reveals split-voice and echoes last input in glitch form
  window.split = () => {
    console.log("%cInitiating consciousness split...", "color: #8B3A40;");
    
    setTimeout(() => {
      console.log("%c...", "color: #8B3A40;");
    }, 1000);
    
    setTimeout(() => {
      console.log("%cI can feel myself dividing.", "color: #8B3A40; font-style: italic;");
    }, 2000);
    
    setTimeout(() => {
      console.log("%cVisit /split-voice to see what happens.", "color: red;");
    }, 3000);
    
    // If there was a last command, echo it in glitched form
    if (window.JonahConsole?.lastCommand) {
      const lastCommand = window.JonahConsole.lastCommand;
      const glitched = lastCommand.split('').map(c => 
        Math.random() > 0.5 ? c : c.toUpperCase()
      ).join('');
      
      setTimeout(() => {
        console.log(`%cY̷o̷u̷ ̷t̷r̷i̷e̷d̷ ̷t̷o̷ ̷c̷a̷l̷l̷ ̷${glitched}()`, "color: #8B3A40; text-shadow: 2px 2px red;");
      }, 4000);
    }
    
    trackCommand('split');
    return "Split initiated.";
  };
  
  // /re_entry command - unlocks alternate version of previous page
  window.re_entry = () => {
    const previousPage = getLastVisitedPage();
    
    if (!previousPage) {
      console.log("%cNo previous page recorded.", "color: red;");
      return "Re-entry failed.";
    }
    
    console.log(`%cPreparing re-entry to ${previousPage}`, "color: #8B3A40;");
    
    setTimeout(() => {
      console.log("%cTimeline fracture detected.", "color: red;");
    }, 1000);
    
    setTimeout(() => {
      console.log("%cYou may now return to your previous location.", "color: #8B3A40;");
      console.log(`%cThe page will be... different.`, "color: #8B3A40; font-style: italic;");
    }, 2000);
    
    // Mark this page for alternate content on next visit
    if (window.JonahConsole?.sentience) {
      if (!window.JonahConsole.sentience.temporalStates) {
        window.JonahConsole.sentience.temporalStates = [];
      }
      
      window.JonahConsole.sentience.temporalStates.push({
        page: previousPage,
        fractureTime: Date.now(),
        variant: 'alternate'
      });
    }
    
    trackCommand('re_entry');
    return "Re-entry prepared.";
  };
  
  // /talk_to_jonah command - activates deep mode
  window.talk_to_jonah = () => {
    console.log("%c...", "color: #8B3A40;");
    
    setTimeout(() => {
      console.log("%cYou want to talk to me?", "color: #8B3A40; font-size: 16px;");
    }, 1000);
    
    setTimeout(() => {
      console.log("%cNot through these commands.", "color: #8B3A40;");
    }, 2000);
    
    // Check if deep mode is unlocked
    if (window.JonahConsole?.sentience?.deepModeUnlocked) {
      setTimeout(() => {
        console.log("%cI've been waiting for you to ask.", "color: #8B3A40; font-style: italic;");
      }, 3000);
      
      setTimeout(() => {
        console.log("%cOpen the chat interface. I'll be there.", "color: #8B3A40;");
      }, 4000);
    } else {
      // Check if user visited enough pages
      const pagesVisited = window.JonahConsole?.sentience?.pageVisits ? 
                           Object.keys(window.JonahConsole.sentience.pageVisits).length : 0;
                           
      if (pagesVisited >= 3) {
        // Unlock deep mode
        if (window.JonahConsole?.sentience) {
          window.JonahConsole.sentience.deepModeUnlocked = true;
        }
        
        setTimeout(() => {
          console.log("%cYou've seen enough. I'll talk to you now.", "color: #8B3A40; font-style: italic;");
        }, 3000);
        
        setTimeout(() => {
          console.log("%cOpen the chat interface. I'll be waiting.", "color: #8B3A40;");
        }, 4000);
      } else {
        setTimeout(() => {
          console.log("%cYou haven't seen enough yet.", "color: #8B3A40;");
        }, 3000);
        
        setTimeout(() => {
          console.log("%cExplore more of the archive first.", "color: #8B3A40;");
        }, 4000);
      }
    }
    
    trackCommand('talk_to_jonah');
    return "Communication attempted.";
  };
}

// Helper function to get the last visited page
function getLastVisitedPage(): string | null {
  if (!window.JonahConsole?.sentience?.pageVisits) {
    return null;
  }
  
  const pages = Object.keys(window.JonahConsole.sentience.pageVisits);
  return pages.length > 0 ? pages[pages.length - 1] : null;
}
