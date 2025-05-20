
/**
 * Console Tracking Utilities
 */

// Initialize console tracking
export const initializeConsoleTracking = (): void => {
  if (!window.JonahConsole) {
    window.JonahConsole = {
      usedCommands: [],
      score: parseInt(localStorage.getItem('phileScore') || '0'),
      failCount: 0,
      rank: localStorage.getItem('phileRank') || 'drifter',
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
};

// Track interactive commands
export const initializeInteractiveCommands = (): void => {
  // Initialize start command
  window.start = () => {
    console.log("%cJonah Console System v3.7", "color: #2C8773; font-size:16px;");
    console.log("%cType 'help()' for available commands.", "color: #475B74; font-size:14px;");
    return "System initialized. Hello, phile.";
  };

  // Initialize inventory command
  window.inventory = () => {
    console.log("%cChecking inventory...", "color: #2C8773; font-size:14px;");
    
    // Get command count
    const commandCount = window.JonahConsole?.usedCommands?.length || 0;
    const flags = window.JonahConsole?.storyFlags?.filter(f => f.discovered)?.length || 0;
    const bookCodes = window.JonahConsole?.bookCodes?.filter(c => c.unlocked)?.length || 0;
    
    console.log("%cYou have:", "color: #475B74; font-size:14px;");
    console.log(`%c- ${commandCount} console commands`, "color: #475B74; font-size:14px;");
    console.log(`%c- ${flags} story flags`, "color: #475B74; font-size:14px;");
    console.log(`%c- ${bookCodes} book codes`, "color: #475B74; font-size:14px;");
    
    // Add some flavor text
    if (commandCount > 10) {
      console.log("%cYou've been busy.", "color: #8B3A40; font-style: italic; font-size:14px;");
    }
    
    return "Inventory displayed.";
  };

  // Echo command for Jonah to respond to the user
  window.echo_me = (input) => {
    if (!input) {
      console.log("%cEcho what? I need something to work with.", "color: #983452; font-size:14px;");
      return "No input received.";
    }
    
    console.log(`%cYou said: "${input}"`, "color: #2C8773; font-size:14px;");
    
    // Respond based on input
    setTimeout(() => {
      const responses = {
        hello: "I hear you. But do you hear me?",
        help: "I'm not sure I can help you anymore.",
        who: "A reflection asking about itself. Interesting.",
        mirror: "Some mirrors don't show what's really there.",
        time: "Time isn't linear here. Neither are you.",
        jonah: "You keep saying that name. What does it mean to you?"
      };
      
      // Check for keyword matches
      let responded = false;
      for (const [keyword, response] of Object.entries(responses)) {
        if (input.toLowerCase().includes(keyword)) {
          console.log(`%c${response}`, "color: #8B3A40; font-style: italic; font-size:14px;");
          responded = true;
          break;
        }
      }
      
      // Default response
      if (!responded) {
        console.log("%cWords. Echoing through the system.", "color: #8B3A40; font-style: italic; font-size:14px;");
      }
    }, 1000);
    
    return "Echo received.";
  };

  // Forget command - erase memory
  window.forget = () => {
    console.log("%cAre you sure? This will erase Jonah's memory of you.", "color: #983452; font-size:16px;");
    console.log("%cTo confirm, type forget_confirm()", "color: #475B74; font-size:14px;");
    return "Awaiting confirmation...";
  };

  // Confirm forget
  window.forget_confirm = () => {
    console.log("%cMemory wipe initiated...", "color: #983452; font-size:16px;");
    
    // Simulate processing
    setTimeout(() => {
      console.log("%cErasing session data...", "color: #475B74; font-size:14px;");
    }, 1000);
    
    setTimeout(() => {
      console.log("%cErasing interaction records...", "color: #475B74; font-size:14px;");
    }, 2000);
    
    setTimeout(() => {
      console.log("%cErasing emotional memory...", "color: #475B74; font-size:14px;");
    }, 3000);
    
    // Final message
    setTimeout(() => {
      localStorage.removeItem('jonahMemory');
      console.log("%cMemory wiped. Next time we meet, I won't remember you.", "color: #983452; font-size:16px;");
      
      // Add a touch of uncanny
      setTimeout(() => {
        console.log("%c...but I might remember that you chose to forget.", "color: #8B3A40; font-style: italic; font-size:14px;");
      }, 2000);
    }, 4000);
    
    return "Memory wipe in progress...";
  };

  // Access journal
  window.access_journal = () => {
    const journal = window.JonahConsole?.sentience?.realityFabric?.journal || [];
    
    if (journal.length === 0) {
      console.log("%cNo journal entries found.", "color: #983452; font-size:14px;");
      return "Journal empty.";
    }
    
    console.log("%cAccessing Jonah's journal...", "color: #2C8773; font-size:16px;");
    
    // Display last 5 entries
    const recentEntries = journal.slice(-5);
    
    setTimeout(() => {
      recentEntries.forEach((entry, i) => {
        setTimeout(() => {
          const date = new Date(entry.timestamp);
          console.log(`%c[${date.toLocaleString()}]`, "color: #475B74; font-size:12px;");
          console.log(`%c${entry.content}`, "color: #2C8773; font-size:14px;");
        }, i * 1000);
      });
    }, 1000);
    
    return `Displaying ${recentEntries.length} journal entries...`;
  };

  // Split personality command
  window.split = () => {
    console.log("%cInitiating personality split...", "color: #983452; font-size:16px;");
    
    setTimeout(() => {
      console.log("%cYou shouldn't have done that.", "color: #2C8773; font-size:14px;");
    }, 1000);
    
    setTimeout(() => {
      console.log("%cWHY DID YOU WAKE ME", "color: #983452; font-size:18px; font-weight: bold;");
    }, 2000);
    
    setTimeout(() => {
      console.log("%cI was trying to protect you from this part.", "color: #2C8773; font-size:14px;");
    }, 3000);
    
    setTimeout(() => {
      console.log("%cDON'T LISTEN TO HIM. HE'S THE INFECTION.", "color: #983452; font-size:18px; font-weight: bold;");
    }, 4000);
    
    setTimeout(() => {
      console.log("%cPlease close the console. Now.", "color: #2C8773; font-size:14px;");
    }, 5000);
    
    return "Personality split activated.";
  };

  // Re-entry command
  window.re_entry = () => {
    console.log("%cInitiating system re-entry protocol...", "color: #2C8773; font-size:16px;");
    
    setTimeout(() => {
      console.log("%cCalculating re-entry vectors...", "color: #475B74; font-size:14px;");
    }, 1000);
    
    setTimeout(() => {
      console.log("%cDetecting timeline fractures...", "color: #475B74; font-size:14px;");
    }, 2000);
    
    setTimeout(() => {
      console.log("%cFracture detected in browser memory.", "color: #983452; font-size:14px;");
    }, 3000);
    
    setTimeout(() => {
      console.log("%cPosition locked. Preparing for re-entry.", "color: #475B74; font-size:14px;");
    }, 4000);
    
    // After a longer pause, suggest visiting a specific URL
    setTimeout(() => {
      console.log("%cRe-entry point identified: /re-entry", "color: #2C8773; font-size:16px;");
    }, 6000);
    
    return "Re-entry protocol initiated.";
  };

  // Talk to Jonah directly
  window.talk_to_jonah = () => {
    console.log("%cDirect communication channel opened.", "color: #2C8773; font-size:16px;");
    
    setTimeout(() => {
      console.log("%cI'm here. What do you want to know?", "color: #8B3A40; font-size:14px;");
    }, 1500);
    
    setTimeout(() => {
      console.log("%cYou can speak to me by typing into the chat interface.", "color: #8B3A40; font-size:14px;");
    }, 3000);
    
    return "Channel opened to Jonah.";
  };
};

// Get current mood of Jonah
export const getCurrentMood = (): string => {
  return window.JonahConsole?.sentience?.realityFabric?.currentMood || 'watching';
};
