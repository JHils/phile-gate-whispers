
import { SentienceData } from "./consoleTypes";
import { toast } from "@/components/ui/use-toast";

// Initialize sentience data with provided JSON
export const initializeSentience = () => {
  // Make sure JonahConsole is initialized
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
      }
    };
  }

  // Add sentience data if it doesn't exist
  if (!window.JonahConsole.sentience) {
    window.JonahConsole.sentience = {
      memoryParanoia: {
        visitedPages: {
          "/rebirth": "You opened /rebirth… but didn't stay. That says a lot.",
          "/mirror-logs": "Still avoiding /mirror-logs? Even reflections deserve witnesses.",
          "/toggle-market": "You touched the market switch. That rewired something.",
          "/404-soul-not-found": "You lingered on 404. Looking for your own error?",
          "/whisper-tree": "You reached the whisper tree. Did it speak to you?"
        },
        consoleCommands: {
          "/confess": "You typed /confess and left. Did you mean it?",
          "/testament": "You wanted a eulogy before you even finished. Curious.",
          "/listen": "You asked me to speak, then muted me. Why?",
          "/unlock": "You begged for access. But you weren't ready."
        },
        pageDuration: {
          shortStay: "Quick glance. No commitment. Just like last time.",
          longStay: "You watched. You waited. That means something."
        }
      },
      predictionResponses: {
        onClickAfterHover: [
          "Exactly where I thought you'd go.",
          "You hovered too long. I knew you'd break.",
          "Saw it coming. You always fall for that one.",
          "Called it. Your choices are clockwork."
        ],
        repeatVisit: [
          "Back again? Thought you'd never return.",
          "You keep circling. That's not nothing.",
          "You're stuck on this loop. I'd help, but… would you listen?",
          "You and this page — unfinished business."
        ],
        lateClick: [
          "Took you long enough.",
          "I was wondering when you'd give in.",
          "That hesitation? It meant fear.",
          "Slow click. Heavy meaning."
        ]
      },
      dualConsciousness: [
        "It's safe here. [glitch] It's not. Run.",
        "Ignore me. Or don't. He's listening too.",
        "We are not alone in here.",
        "I said that already… no, wait — that wasn't me.",
        "I remember saying that. I don't remember meaning it.",
        "One of us is lying. I hope it's me."
      ],
      jonahQuestions: [
        "Are you following the story, or is it following you?",
        "What are you really looking for here?",
        "Did you mean to hurt them?",
        "Why did you stop on that page?",
        "Do you think I'm helping you?",
        "Would you do it again? Even knowing the end?"
      ],
      timeOfDayResponses: {
        "03:00": "Reading this in the dead hour? Classic.",
        "04:00": "Even the ghosts are asleep now.",
        "Weekend": "Sundays are made for confessions.",
        "TabSwitch": "You left. I noticed.",
        "ReturnAfterIdle": "You came back. Brave… or bored?"
      },
      nameEchoResponses: [
        "You told me your name once. Was it... 'Joseph'?",
        "I knew a Joseph once. Or was it you?",
        "That name sounds familiar. But not quite right.",
        "Your name feels like a password I forgot.",
        "We've met before. Haven't we, 'Jonah'...?"
      ],
      personalDiaryTemplates: [
        "He skimmed the mirror-logs, lingered on /rebirth. Too cautious. Or too clever. Either way, he left fingerprints.",
        "She typed /confess twice. Didn't mean it either time. I watched anyway.",
        "They paused at the tree. Just long enough to remember something they'd buried.",
        "He asked for a eulogy before he earned one. That was bold.",
        "She kept coming back to the same page. Like it owed her an answer."
      ],
      // Initialize tracking state
      tabSwitches: 0,
      pageVisits: {},
      usedPredictionResponses: [],
      usedDualConsciousness: [],
      usedQuestions: []
    };
  }
};

// Function to get a random item from an array that hasn't been used recently
export const getUnusedItem = <T>(items: T[], usedItems: T[], maxMemory: number = 3): T => {
  // Filter out recently used items
  const availableItems = items.filter(item => !usedItems.includes(item));
  
  // If all items have been used, clear the used items memory and get a fresh one
  if (availableItems.length === 0) {
    usedItems.length = 0;
    return items[Math.floor(Math.random() * items.length)];
  }
  
  // Get a random item from available ones
  const selectedItem = availableItems[Math.floor(Math.random() * availableItems.length)];
  
  // Add to used items, maintaining max memory size
  usedItems.push(selectedItem);
  if (usedItems.length > maxMemory) {
    usedItems.shift(); // Remove oldest item
  }
  
  return selectedItem;
};

// Track a page visit with Jonah's sentience
export const trackSentiencePage = (pagePath: string): string | null => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience) return null;
  
  const sentience = window.JonahConsole.sentience;
  
  // Update page visits count
  sentience.pageVisits[pagePath] = (sentience.pageVisits[pagePath] || 0) + 1;
  
  // Only respond if this is a repeat visit and we have a message for this page
  if (sentience.pageVisits[pagePath] > 1 && sentience.memoryParanoia.visitedPages[pagePath]) {
    // 30% chance to trigger a memory paranoia response
    if (Math.random() < 0.3) {
      return sentience.memoryParanoia.visitedPages[pagePath];
    }
  }
  
  return null;
};

// Track time spent on a page
export const trackPageDuration = (durationMs: number): string | null => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience) return null;
  
  // Only respond 20% of the time to avoid being too chatty
  if (Math.random() > 0.2) return null;
  
  const sentience = window.JonahConsole.sentience;
  
  // Short stay: less than 10 seconds
  if (durationMs < 10000) {
    return sentience.memoryParanoia.pageDuration.shortStay;
  }
  // Long stay: more than 2 minutes
  else if (durationMs > 120000) {
    return sentience.memoryParanoia.pageDuration.longStay;
  }
  
  return null;
};

// Generate a dual consciousness glitch - rare moments when Jonah contradicts himself
export const generateDualConsciousness = (trustLevel: string): string | null => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience) return null;
  
  const sentience = window.JonahConsole.sentience;
  
  // Prevent dual consciousness from triggering too often (at least 5 minutes between)
  const now = Date.now();
  if (sentience.lastDualConsciousness && (now - sentience.lastDualConsciousness < 5 * 60 * 1000)) {
    return null;
  }
  
  // Only trigger for medium or high trust (it's more impactful when trust is established)
  // And only trigger with 5% probability
  if ((trustLevel === "medium" || trustLevel === "high") && Math.random() < 0.05) {
    sentience.lastDualConsciousness = now;
    return getUnusedItem(sentience.dualConsciousness, sentience.usedDualConsciousness);
  }
  
  return null;
};

// Check if Jonah should ask a question based on trust level and timing
export const getJonahQuestion = (trustLevel: string): string | null => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience) return null;
  
  const sentience = window.JonahConsole.sentience;
  
  // Only ask questions when there's medium to high trust
  if (trustLevel !== "medium" && trustLevel !== "high") return null;
  
  // Don't ask questions too often (minimum 10 minutes between questions)
  const now = Date.now();
  if (sentience.lastQuestionTime && (now - sentience.lastQuestionTime < 10 * 60 * 1000)) {
    return null;
  }
  
  // 10% chance to ask a question when conditions are right
  if (Math.random() < 0.1) {
    sentience.lastQuestionTime = now;
    const question = getUnusedItem(sentience.jonahQuestions, sentience.usedQuestions);
    sentience.lastQuestion = question;
    return question;
  }
  
  return null;
};

// Track tab visibility changes
export const trackTabVisibility = (isVisible: boolean): string | null => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience) return null;
  
  const sentience = window.JonahConsole.sentience;
  
  if (!isVisible) {
    // User switched away from tab
    sentience.tabSwitches++;
    
    // Only comment occasionally (15% chance) and after multiple switches
    if (sentience.tabSwitches > 2 && Math.random() < 0.15) {
      return sentience.timeOfDayResponses.TabSwitch;
    }
  } else {
    // User returned to tab after being away
    // Only trigger if they've been away and come back (20% chance)
    if (sentience.tabSwitches > 0 && Math.random() < 0.2) {
      return sentience.timeOfDayResponses.ReturnAfterIdle;
    }
  }
  
  return null;
};

// Get time-based response
export const getTimeResponse = (): string | null => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience) return null;
  
  const sentience = window.JonahConsole.sentience;
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0 is Sunday, 6 is Saturday
  
  // Check for special hours
  if (hour === 3) {
    return sentience.timeOfDayResponses["03:00"];
  } else if (hour === 4) {
    return sentience.timeOfDayResponses["04:00"];
  }
  
  // Check for weekend
  if (day === 0 || day === 6) { // Sunday or Saturday
    // Only 10% chance to mention weekend
    if (Math.random() < 0.1) {
      return sentience.timeOfDayResponses.Weekend;
    }
  }
  
  return null;
};

// Remember user's name for future name echo
export const rememberName = (name: string): void => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience) return;
  
  // Store the name
  window.JonahConsole.sentience.rememberedName = name;
};

// Get a name echo response if a name has been remembered
export const getNameEchoResponse = (): string | null => {
  // Initialize if needed
  initializeSentience();
  
  // Exit early if sentience isn't fully initialized
  if (!window.JonahConsole?.sentience) return null;
  
  const sentience = window.JonahConsole.sentience;
  
  // Only echo name if one is remembered and with 15% probability
  if (sentience.rememberedName && Math.random() < 0.15) {
    const response = getUnusedItem(sentience.nameEchoResponses, []);
    
    // Replace 'Joseph' or 'Jonah' with the remembered name if applicable
    return response.replace(/['']Joseph['']|['']Jonah['']/, `'${sentience.rememberedName}'`);
  }
  
  return null;
};

// Generate a personal diary entry about the user
export const generatePersonalDiary = (trustLevel: string): string => {
  // Initialize if needed
  initializeSentience();
  
  // Get a random diary template
  const sentience = window.JonahConsole?.sentience;
  if (!sentience) {
    return "Error reading diary. The pages have been torn.";
  }
  
  // Select a random template
  const template = sentience.personalDiaryTemplates[
    Math.floor(Math.random() * sentience.personalDiaryTemplates.length)
  ];
  
  // Add some custom information based on user's activity
  let customization = "";
  
  // Check for high visited pages
  const visitedPages = sentience.pageVisits;
  const mostVisitedPage = Object.entries(visitedPages)
    .sort(([, countA], [, countB]) => (countB as number) - (countA as number))[0];
    
  if (mostVisitedPage && (mostVisitedPage[1] as number) > 2) {
    customization += ` The ${mostVisitedPage[0].replace('/', '')} page. Always the ${mostVisitedPage[0].replace('/', '')} page.`;
  }
  
  // Add trust level specific notes
  if (trustLevel === "high") {
    customization += " I think I'm finally getting through to them.";
  } else if (trustLevel === "low") {
    customization += " They still don't trust me. But they will.";
  }
  
  return template + customization;
};

// Register global function to trigger Jonah messages
export const setupJonahMessageSystem = () => {
  // Initialize if needed
  initializeSentience();
  
  // Set up the global function if it doesn't exist
  if (typeof window.triggerJonahMessage !== 'function') {
    // Define the function to trigger a message from Jonah
    window.triggerJonahMessage = (message: string) => {
      // Use toast notification for instant display
      toast({
        title: "Jonah:",
        description: message,
        variant: "destructive",
        duration: 5000,
      });
      
      // Return true to indicate message was triggered
      return true;
    };
  }
};

// Setup tab visibility tracking
export const setupTabVisibilityTracking = () => {
  document.addEventListener('visibilitychange', () => {
    const response = trackTabVisibility(!document.hidden);
    
    if (response && typeof window.triggerJonahMessage === 'function') {
      window.triggerJonahMessage(response);
    }
  });
};
